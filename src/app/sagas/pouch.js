/* eslint-disable no-underscore-dangle */

// Pouch integration for the app
import { delay, END, eventChannel } from 'redux-saga';
import { call, put, race, select, take, takeLatest } from 'redux-saga/effects';

import PouchDB from 'pouchdb';
import PouchdbUpsert from 'pouchdb-upsert';

import { makeSelectCurrentCaseId, makeSelectJWTClaims, makeSelectLoggedIn, selectCase, selectIncident, selectSiteConfig } from 'containers/App/selectors';
import { generateUuid, isCaseAction, isIncidentAction } from 'utils/helpers';
import { DELETE_TEMPLATE, SAVE_TEMPLATE } from 'containers/CaseEntry/constants';

import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _isString from 'lodash/isString';

import hash from 'object-hash';

import {
  LOGOUT,
  SET_AUTH,
} from 'containers/App/constants';

import {
  batchInsertDocument,
  deleteDocument,
  insertDocument,
  initSiteConfig,
  syncingPouch,
  updateDocument,
} from 'containers/App/actions';

PouchDB.plugin(PouchdbUpsert);

const docTypeMap = {
  case: 'cases',
  inquiry: 'cases',
  hoax: 'cases',
  incident: 'incidents',
  siteConfig: 'siteConfig',
};

const docTypeFilter = (doc) => (doc.type in docTypeMap && !doc._deleted);

const docChecksums = {};

function* pouchSaga() {
  const jwtClaims = yield select(makeSelectJWTClaims());

  const db = new PouchDB('PicApp');
  const remoteDB = new PouchDB(jwtClaims.couch_uri, {
    fetch(url, opts) {
      opts.headers.set('X-Auth-CouchDB-UserName', jwtClaims.email);
      opts.headers.set('X-Auth-CouchDB-Roles', jwtClaims.couch_roles);
      opts.headers.set('X-Auth-CouchDB-Token', jwtClaims.couch_token);
      return PouchDB.fetch(url, opts);
    },
  });

  // Watch changes to the state
  yield takeLatest('*', handleAction, db);

  // Perform initial sync with upstream
  yield call(syncPouch, db, remoteDB, jwtClaims.site_id);

  // Continue by watching for changes
  yield call(watchDBChanges, db);
}

/**
 * Listen for sync batches and insert
 * Batches default to ~100 and this allows for progressive loading for first load
 *
 * @param db
 * @param remoteDB
 * @param siteId
 */
function* syncPouch(db, remoteDB, siteId) {
  const chan = yield call(dbSyncChannel, db, remoteDB, siteId);

  // Initialise app store
  let wantedDocs = [];
  yield db.allDocs({ include_docs: true })
      .then((allDocsResult) => {
        const allDocs = allDocsResult.rows.map((doc) => doc.doc);
        wantedDocs = allDocs.filter(docTypeFilter);
      });

  wantedDocs.forEach((doc) => { docChecksums[doc._id] = hash(doc); });
  yield put(batchInsertDocument(wantedDocs));

  // Commence sync
  let lastState = null;
  let syncComplete = false;

  while (!syncComplete) {
    const change = yield take(chan);
    if (_isString(change)) {
      if (lastState === 'CHANGE' && change === 'PAUSED') {
        syncComplete = true;
      }
      lastState = change;
    } else {
      lastState = 'CHANGE';
    }
    switch (lastState) {
      case 'PAUSED': {
        yield put(syncingPouch(false));
        break;
      }
      default: {
        yield put(syncingPouch(true));
        break;
      }
    }
    if (lastState === 'CHANGE') {
      /* eslint-disable prefer-const */
      let opts = { include_docs: true };
      /* eslint-enable prefer-const */
      const include = _map(_filter(change.change.docs, docTypeFilter), '_id');

      if (include.length > 0) {
        opts.keys = include;
      }

      wantedDocs = [];
      /* eslint-disable no-loop-func */
      yield db.allDocs(opts)
          .then((allDocsResult) => {
            const allDocs = allDocsResult.rows.map((doc) => doc.doc);
            wantedDocs = allDocs.filter(docTypeFilter);
          });
      /* eslint-enable no-loop-func */

      wantedDocs.forEach((doc) => {
        docChecksums[doc._id] = hash(doc);
      });
      yield put(batchInsertDocument(wantedDocs));
    }
  }
}

const dbSyncChannel = (db, remoteDB, siteId) => eventChannel(
      (emit) => {
        const listener = db.sync(remoteDB, {
          live: true,
          retry: true,
          filter: 'pic/by_site',
          query_params: { siteId },
        })
            .on('change', (change) => { if (change) { emit(change); } else { emit(END); } })
            .on('paused', () => { emit('PAUSED'); })
            .on('active', () => { emit('ACTIVE'); });
        return () => listener.cancel();
      }
  );

const dbEventChannel = (db) => eventChannel(
    (emit) => {
      const listener = db.changes({ live: true, include_docs: true, since: 'now', filter: docTypeFilter })
        .on('change', (info) => { if (info) { emit(info); } else { emit(END); } });
      return () => listener.cancel();
    }
  );

function* watchDBChanges(db) {
  const chan = yield call(dbEventChannel, db);

  while (true) { // eslint-disable-line no-constant-condition
    const change = yield take(chan);
    yield call(handlePouchDBChange, change);
  }
}

function* handlePouchDBChange(change) {
  const changeDoc = change.doc;

  if (changeDoc._deleted) {
    if (docChecksums[changeDoc._id]) {
      delete docChecksums[changeDoc._id];
      yield put(deleteDocument(changeDoc._id));
    }
  } else {
    if (docChecksums[changeDoc._id]) {
      yield put(updateDocument(changeDoc));
    } else {
      yield put(insertDocument(changeDoc));
    }
    docChecksums[changeDoc._id] = hash(changeDoc);
  }
}

const getCurrentCaseId = () => makeSelectCurrentCaseId();

const updatedDocuments = {};

function* handleAction(db, action) {
  if (isCaseAction(action)) {
    let caseId = action.id || action.caseId;
    if (!caseId) {
      caseId = yield select(getCurrentCaseId);
    }
    if (caseId) {
      updatedDocuments[caseId] = 'case';
    }
  }
  if (isIncidentAction(action)) {
    if (action.incidentId) {
      updatedDocuments[action.incidentId] = 'incident';
    }
  }
  if (action.type === SAVE_TEMPLATE || action.type === DELETE_TEMPLATE) {
    let document = yield select(selectSiteConfig);
    if (!document._id) {
      const jwtClaims = yield select(makeSelectJWTClaims());

      // Updating here, as soon as we put an action, the generator function restarts
      const newId = generateUuid();
      updatedDocuments[newId] = 'siteConfig';
      yield put(initSiteConfig(generateUuid(), jwtClaims.site_id));

      // Generally won't reach here
      document = yield select(selectSiteConfig);
    }
    updatedDocuments[document._id] = 'siteConfig';
  }

  yield call(delay, 1000);

  for (const docId of Object.keys(updatedDocuments)) { // eslint-disable-line no-restricted-syntax
    const docType = updatedDocuments[docId];
    let selector;
    if (docType === 'case') {
      selector = selectCase;
    } else if (docType === 'incident') {
      selector = selectIncident;
    } else {
      selector = selectSiteConfig;
    }
    const document = yield select(selector, docId);
    if (document) {
      if (!(docId in docChecksums)) {
        db.put(document);
      } else if (document.type && docTypeFilter(document) && docChecksums[docId] !== hash(document, {
        replacer: (value) => {
          if (value instanceof File) {
            return value.size;
          }
          return value;
        },
      })) {
        db.upsert(docId, () => document);
      }
    }
    delete updatedDocuments[docId];
  }
}

function* pouchFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    const loggedIn = yield select(makeSelectLoggedIn());
    if (!loggedIn) {
      yield take(SET_AUTH);
    } else {
      yield race({
        logoutAction: take(LOGOUT),
        dbLoop: call(pouchSaga),
      });
    }
    yield call(delay, 500);
  }
}
export default pouchFlow;
