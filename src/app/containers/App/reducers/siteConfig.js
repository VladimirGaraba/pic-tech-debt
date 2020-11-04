/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_rev", "_attachments"] }]*/

import { combineReducers } from 'redux';

import templatesReducer from 'containers/CaseEntry/reducers/templates';
import { isSiteConfig } from 'utils/helpers';

import {
  BATCH_INSERT_DOCUMENT,
  DELETE_DOCUMENT,
  INSERT_DOCUMENT,
  INIT_SITE_CONFIG,
  UPDATE_DOCUMENT,
} from 'containers/App/constants';

const _id = (state = '', action) => {
  let newState = state;
  switch (action.type) {
    case BATCH_INSERT_DOCUMENT:
      action.documents.map((document) => { // eslint-disable-line array-callback-return
        if (isSiteConfig(document)) {
          newState = document._id;
        }
      });
      return newState;
    case DELETE_DOCUMENT:
      return '';
    case INSERT_DOCUMENT:
    case UPDATE_DOCUMENT:
      if (isSiteConfig(action.document)) {
        newState = action.document._id;
      }
      return newState;
    case INIT_SITE_CONFIG:
      return action.configId;
    default:
      return state;
  }
};

const _rev = (state = '', action) => {
  let newState = state;
  switch (action.type) {
    case BATCH_INSERT_DOCUMENT:
      action.documents.map((document) => { // eslint-disable-line array-callback-return
        if (isSiteConfig(document)) {
          newState = document._rev;
        }
      });
      return newState;
    case DELETE_DOCUMENT:
      return '';
    case INSERT_DOCUMENT:
    case UPDATE_DOCUMENT:
      if (isSiteConfig(action.document)) {
        newState = action.document._rev;
      }
      return newState;
    default:
      return state;
  }
};

const siteId = (state = '', action) => {
  let newState = state;
  switch (action.type) {
    case BATCH_INSERT_DOCUMENT:
      action.documents.map((document) => { // eslint-disable-line array-callback-return
        if (isSiteConfig(document)) {
          newState = document.siteId;
        }
      });
      return newState;
    case DELETE_DOCUMENT:
      return '';
    case INSERT_DOCUMENT:
    case UPDATE_DOCUMENT:
      if (isSiteConfig(action.document)) {
        newState = action.document.siteId;
      }
      return newState;
    case INIT_SITE_CONFIG:
      return action.siteId;
    default:
      return state;
  }
};

const type = (state = 'siteConfig', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const siteConfigReducer = combineReducers({
  _id,
  _rev,
  siteId,
  templates: templatesReducer,
  type,
});

export default siteConfigReducer;
