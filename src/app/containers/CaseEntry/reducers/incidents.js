/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_rev"] }]*/

import { combineReducers } from 'redux';

import _pull from 'lodash/pull';

import { timestamp, siteCreated, spi } from 'containers/App/reducers/utils';

import { isIncident } from 'utils/helpers';

import {
  BATCH_INSERT_DOCUMENT, DELETE_DOCUMENT, INSERT_DOCUMENT, UPDATE_DOCUMENT,
} from 'containers/App/constants';

import {
  ADD_INCIDENT, LINK_CASE_INCIDENT, UNLINK_CASE_INCIDENT, UPDATE_INCIDENT_NAME,
} from '../constants';

const _id = (state = '', action) => {
  switch (action.type) {
    case ADD_INCIDENT:
      return action.incidentId;
    default:
      return state;
  }
};

const _rev = (state = '', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const type = (state = 'incident', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const name = (state = '', action) => {
  switch (action.type) {
    case ADD_INCIDENT:
    case UPDATE_INCIDENT_NAME:
      return action.name;
    default:
      return state;
  }
};

const caseRefs = (state = [], action) => {
  switch (action.type) {
    case ADD_INCIDENT:
    case LINK_CASE_INCIDENT:
      return state.concat(action.caseId);
    case UNLINK_CASE_INCIDENT:
      _pull(state, action.caseId);
      return state;
    default:
      return state;
  }
};

export const naturalId = (state = '', action) => {
  switch (action.type) {
    case ADD_INCIDENT: {
      const incidentId = action.incidentId;
      return `${action.prefix}:${new Date().getFullYear()}:${incidentId.substring(0, 8)}`;
    }
    default:
      return state;
  }
};

const incidentRecord = combineReducers({
  _id,
  _rev,
  naturalId,
  type,
  name,
  siteCreated,
  timestamp,
  spi,
  caseRefs,
});


const incidentsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_INCIDENT:
      newState[action.incidentId] = incidentRecord(undefined, action);
      return newState;
    case LINK_CASE_INCIDENT:
    case UNLINK_CASE_INCIDENT:
    case UPDATE_INCIDENT_NAME:
      newState[action.incidentId] = incidentRecord(state[action.incidentId], action);
      return newState;
    case BATCH_INSERT_DOCUMENT:
      action.documents.map((document) => { // eslint-disable-line array-callback-return
        if (isIncident(document)) {
          newState[document._id] = document;
        }
      });
      return newState;
    case DELETE_DOCUMENT:
      delete newState[action.id];
      return newState;
    case INSERT_DOCUMENT:
    case UPDATE_DOCUMENT:
      if (isIncident(document)) {
        newState[action.document._id] = action.document;
      }
      return newState;
    default:
      return newState;
  }
};
export default incidentsReducer;
