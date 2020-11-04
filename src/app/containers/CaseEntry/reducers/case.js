/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_rev", "_attachments"] }]*/

import { combineReducers } from 'redux';
import _cloneDeep from 'lodash/cloneDeep';

import agentsReducer from 'containers/AgentEntry/reducer';
import communicationsReducer from 'containers/InterlocutorEntry/reducer';
import featuresReducer from 'containers/ClinicalFeaturesEntry/reducer';
import investigationsReducer from 'containers/InvestigationsEntry/reducer';
import patientReducer from 'containers/PatientEntry/reducer';
import referralsReducer from 'containers/TreatmentEntry/reducers/referrals';
import treatmentsReducer from 'containers/TreatmentEntry/reducer';

import { timestamp, status, siteCreated, careTeam } from 'containers/App/reducers/utils';

import notesReducer from 'containers/NoteEntry/reducer';

import {
  ADD_NOTE_ATTACHMENTS,
  REMOVE_NOTE_ATTACHMENT,
  SAVE_NOTE,
} from 'containers/NoteEntry/constants';

import {
  ADD_CASE,
  UPDATE_APPLICATION_KEY_ID,
  UPDATE_CASE_OUTCOME,
  UPDATE_CASE_TOPIC,
  UPDATE_CASE_TYPE,

  ADD_INCIDENT,
  LINK_CASE_INCIDENT,
  UNLINK_CASE_INCIDENT,

  ADD_TEMPLATE,
  UPDATE_TEMPLATE_CASE_TYPE,
  UPDATE_TEMPLATE_OUTCOME,
  UPDATE_TEMPLATE_TOPIC,
} from '../constants';

const _id = (state = '', action) => {
  switch (action.type) {
    case ADD_CASE:
      return action.id || action.caseId;
    case ADD_TEMPLATE:
      return action.templateId;
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

const _attachments = (state = {}, action) => {
  switch (action.type) {
    case ADD_NOTE_ATTACHMENTS:
    case SAVE_NOTE: {
      const newState = _cloneDeep(state);
      if (action.sanitisedAttachments) {
        Object.keys(action.sanitisedAttachments).map((name) => {
          const file = action.sanitisedAttachments[name];
          newState[name] = {
            content_type: file.type,
            data: file,
          };
          return name;
        });
      }
      return newState;
    }
    case REMOVE_NOTE_ATTACHMENT: {
      const newState = _cloneDeep(state);
      delete newState[action.name];
      return newState;
    }
    default:
      return state;
  }
};

const naturalId = (state = '', action) => {
  switch (action.type) {
    case ADD_CASE: {
      const caseId = action.id || action.caseId;
      return `${action.prefix}:${caseId.substring(0, 8)}`;
    }
    default:
      return state;
  }
};

const appKeyId = (state = '', action) => {
  switch (action.type) {
    case ADD_CASE:
    case UPDATE_APPLICATION_KEY_ID:
      return action.appKey.id;
    default:
      return state;
  }
};

const outcome = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CASE_OUTCOME:
    case UPDATE_TEMPLATE_OUTCOME:
      return action.outcome;
    default:
      return state;
  }
};

const topic = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CASE_TOPIC:
    case UPDATE_TEMPLATE_TOPIC:
      return action.topic;
    default:
      return state;
  }
};

const type = (state = 'case', action) => {
  switch (action.type) {
    case UPDATE_CASE_TYPE:
    case UPDATE_TEMPLATE_CASE_TYPE:
      return action.caseType;
    default:
      return state;
  }
};

const incidentId = (state = '', action) => {
  switch (action.type) {
    case ADD_INCIDENT:
    case LINK_CASE_INCIDENT:
      return action.incidentId;
    case UNLINK_CASE_INCIDENT:
      return '';
    default:
      return state;
  }
};

const caseReducer = combineReducers({
  _id,
  _rev,
  _attachments,
  naturalId,
  appKeyId,
  agents: agentsReducer,
  communications: communicationsReducer,
  features: featuresReducer,
  investigations: investigationsReducer,
  notes: notesReducer,
  patient: patientReducer,
  referrals: referralsReducer,
  siteCreated,
  careTeam,
  outcome,
  status,
  timestamp,
  topic,
  treatments: treatmentsReducer,
  type,
  incidentId,
});

export default caseReducer;
