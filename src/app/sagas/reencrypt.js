import { call, put, select, take } from 'redux-saga/effects';
import aes256 from 'aes256';
import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';

import auth from 'auth';

import { makeSelectAppKey, selectAppKeyById, selectCase } from '../containers/App/selectors';

import { storeKey } from '../containers/App/actions';
import { replaceCommunications } from '../containers/InterlocutorEntry/actions';
import { updateApplicationKeyId } from '../containers/CaseEntry/actions/case';
import { replacePatientName, replacePatientMedicalRecordNumber } from '../containers/PatientEntry/actions/case';

import { DISPLAY_RECORD } from '../containers/App/constants';

function* reencryptFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    const request = yield take(DISPLAY_RECORD);
    const { id } = request;

    const pendingCase = yield select(selectCase, id);
    const appKey = yield select(makeSelectAppKey());

    if (pendingCase.appKeyId && pendingCase.appKeyId !== appKey.id) {
      let oldAppKey = yield select(selectAppKeyById, pendingCase.appKeyId);
      if (!oldAppKey) {
        const response = yield call(fetch, '/api/v1/auth/requestKey', {
          method: 'POST',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${auth.getToken()}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `appKeyId=${pendingCase.appKeyId}`,
        });
        const result = yield call([response, response.json]);
        yield put(storeKey(pendingCase.appKeyId, result.application_key));
        oldAppKey = result.application_key;
      }
      yield call(reencryptFile, pendingCase, oldAppKey, appKey);
    } else if (!pendingCase.appKeyId || _isEmpty(pendingCase.appKeyId)) {
      yield call(reencryptFile, pendingCase, null, appKey);
    }
  }
}

function* reencryptFile(inCase, oldAppKey, appKey) {
  // Encrypted files, reencrypt name field
  if (!_isEmpty(inCase.patient.nameEnc) && !_isEmpty(oldAppKey)) {
    const patientName = aes256.decrypt(oldAppKey, inCase.patient.nameEnc);
    yield put(replacePatientName(inCase._id, patientName, appKey)); // eslint-disable-line
    // Legacy files, create encrypted name field
  } else if (_isEmpty(inCase.appKeyId) && !_isEmpty(inCase.patient.name)) {
    yield put(replacePatientName(inCase._id, inCase.patient.name, appKey)); // eslint-disable-line
  }

  // Encrypted files, reencrypt MRN field
  if (!_isEmpty(inCase.patient.medicalRecordNumberEnc) && !_isEmpty(oldAppKey)) {
    const medicalRecordNumber = aes256.decrypt(oldAppKey, inCase.patient.medicalRecordNumberEnc);
    yield put(replacePatientMedicalRecordNumber(inCase._id, medicalRecordNumber, appKey)); // eslint-disable-line
    // Legacy files, create encrypted MRN field
  } else if (_isEmpty(inCase.appKeyId) && !_isEmpty(inCase.patient.medicalRecordNumber)) {
    yield put(replacePatientMedicalRecordNumber(inCase._id, inCase.patient.medicalRecordNumber, appKey)); // eslint-disable-line
  }

  const communications = inCase.communications.map((c) => {
    const comm = _cloneDeep(c);
    // Encrypted files, reencrypt interlocutor name field
    if (comm.interlocutor && !_isEmpty(c.interlocutor.nameEnc)) {
      comm.interlocutor.nameEnc = aes256.encrypt(appKey.key, aes256.decrypt(oldAppKey, c.interlocutor.nameEnc));
      // Legacy files, create encrypted MRN field
    } else if (_isEmpty(inCase.appKeyId) && !_isEmpty(c.interlocutor.name)) {
      comm.interlocutor.nameEnc = aes256.encrypt(appKey.key, c.interlocutor.name);
      delete comm.interlocutor.name;
    }

    // Encrypted files, reencrypt interlocutor mediumDetail field
    if (c.medium && !_isEmpty(c.medium.detailEnc)) {
      comm.medium.detailEnc = aes256.encrypt(appKey.key, aes256.decrypt(oldAppKey, c.medium.detailEnc));
      // Legacy files, create encrypted mediumDetail field
    } else if (_isEmpty(inCase.appKeyId) && c.medium && !_isEmpty(c.medium.detail)) {
      comm.medium.detailEnc = aes256.encrypt(appKey.key, c.medium.detail);
      delete comm.medium.detail;
    }

    let patientName0;
    let patientName1;
    // Encrypted files, reencrypt patient name history field
    if (c.history && c.history.patient && !_isEmpty(c.history.patient.nameEnc)) {
      patientName0 = !_isEmpty(c.history.patient.nameEnc[0]) ? aes256.encrypt(appKey.key, aes256.decrypt(oldAppKey, c.history.patient.nameEnc[0])) : '';
      patientName1 = !_isEmpty(c.history.patient.nameEnc[1]) ? aes256.encrypt(appKey.key, aes256.decrypt(oldAppKey, c.history.patient.nameEnc[1])) : '';
      comm.history.patient.nameEnc = [patientName0, patientName1];
      // Legacy files, create encrypted patient name history field
    } else if (_isEmpty(inCase.appKeyId) && c.history.patient && !_isEmpty(c.history.patient.name)) {
      patientName0 = !_isEmpty(c.history.patient.name[0]) ? aes256.encrypt(appKey.key, c.history.patient.name[0]) : '';
      patientName1 = !_isEmpty(c.history.patient.name[1]) ? aes256.encrypt(appKey.key, c.history.patient.name[1]) : '';
      comm.history.patient.nameEnc = [patientName0, patientName1];
      delete comm.history.patient.name;
    }

    let patientMRN0;
    let patientMRN1;
    // Encrypted files, reencrypt patient MRN history field
    if (c.history && c.history.patient && !_isEmpty(c.history.patient.medicalRecordNumberEnc)) {
      patientMRN0 = !_isEmpty(c.history.patient.medicalRecordNumberEnc[0]) ? aes256.encrypt(appKey.key, aes256.decrypt(oldAppKey, c.history.patient.medicalRecordNumberEnc[0])) : '';
      patientMRN1 = !_isEmpty(c.history.patient.medicalRecordNumberEnc[1]) ? aes256.encrypt(appKey.key, aes256.decrypt(oldAppKey, c.history.patient.medicalRecordNumberEnc[1])) : '';
      comm.history.patient.nameEnc = [patientMRN0, patientMRN1];
      // Legacy files, create encrypted patient MRN history field
    } else if (_isEmpty(inCase.appKeyId) && c.history.patient && !_isEmpty(c.history.patient.medicalRecordNumber)) {
      patientMRN0 = !_isEmpty(c.history.patient.medicalRecordNumber[0]) ? aes256.encrypt(appKey.key, c.history.patient.medicalRecordNumber[0]) : '';
      patientMRN1 = !_isEmpty(c.history.patient.medicalRecordNumber[1]) ? aes256.encrypt(appKey.key, c.history.patient.medicalRecordNumber[1]) : '';
      comm.history.patient.medicalRecordNumberEnc = [patientMRN0, patientMRN1];
      delete comm.history.patient.medicalRecordNumber;
    }

    return comm;
  });
  yield put(replaceCommunications(inCase._id, communications)); // eslint-disable-line
  yield put(updateApplicationKeyId(inCase._id, appKey)); // eslint-disable-line
}

export {
  reencryptFlow,
};
