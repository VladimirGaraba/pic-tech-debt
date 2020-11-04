/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_rev"] }]*/

import _cloneDeep from 'lodash/cloneDeep';
import _uniq from 'lodash/uniq';

import {
  ADD_CALL_RECORD,
  ADD_CASE,
  ADD_TEMPLATE,
  ADD_INCIDENT,
  EDIT_TEMPLATE,
  UPDATE_CASE_STATUS,
} from 'containers/CaseEntry/constants';

import {
  SAVE_NOTE,
  SAVE_TEMPLATE_NOTE,
} from 'containers/NoteEntry/constants';

import {
  ADD_CLINICAL_FEATURES,
  ADD_TEMPLATE_CLINICAL_FEATURES,
} from 'containers/ClinicalFeaturesEntry/constants';

import {
  ADD_COMMUNICATION,
} from 'containers/InterlocutorEntry/constants';

import {
  UPDATE_REFERRALS,
  UPDATE_TREATMENTS,
  UPDATE_TEMPLATE_REFERRALS,
  UPDATE_TEMPLATE_TREATMENTS,
} from 'containers/TreatmentEntry/constants';

export function timestamp(state = new Date().toISOString(), action) {
  switch (action.type) {
    default:
      return state;
  }
}

const spiInitialState = {
  name: '',
  id: '',
  org: '',
  job: '',
  siteId: '',
  roles: [],
};

export const spi = (state = _cloneDeep(spiInitialState), action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case ADD_CLINICAL_FEATURES:
    case ADD_COMMUNICATION:
    case ADD_INCIDENT:
    case ADD_TEMPLATE:
    case ADD_TEMPLATE_CLINICAL_FEATURES:
    case EDIT_TEMPLATE:
    case SAVE_NOTE:
    case SAVE_TEMPLATE_NOTE:
    case UPDATE_CASE_STATUS:
    case UPDATE_TEMPLATE_TREATMENTS:
    case UPDATE_TREATMENTS:
      return {
        ...state,
        name: action.spi.name,
        id: action.spi.id,
        org: action.spi.org,
        job: action.spi.job,
        siteId: action.spi.siteId,
        roles: action.spi.roles,
      };
    default:
      return state;
  }
};

export function status(state = 'open', action) {
  switch (action.type) {
    case UPDATE_CASE_STATUS:
      return action.status;
    default:
      return state;
  }
}

export function noteRefs(state = [], action) {
  const newState = [...state];
  switch (action.type) {
    case UPDATE_TREATMENTS:
    case UPDATE_TEMPLATE_TREATMENTS:
      newState.push(action.noteId);
      return newState;
    default:
      return state;
  }
}

export const toggleNode = (state, node) => {
  const newState = { ...state };
  const nextNode = node[0];
  if (typeof (nextNode) !== 'undefined') {
    newState.children[nextNode] = toggleNode(newState.children[nextNode], node.slice(1));
    return newState;
  } else if (newState.checkbox) {
    return { ...newState, checked: !newState.checked };
  }
  return { ...newState, collapsed: !newState.collapsed };
};

export const siteCreated = (state = 1, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_INCIDENT:
    case ADD_TEMPLATE:
      return action.spi.siteId;
    default:
      return state;
  }
};

export const careTeam = (state = [], action) => {
  const newState = [...state];
  switch (action.type) {
    case ADD_CASE:
    case ADD_INCIDENT:
    case ADD_TEMPLATE:
      newState.push(action.spi.siteId);
      return _uniq(newState);
    case UPDATE_REFERRALS:
    case UPDATE_TEMPLATE_REFERRALS:
      newState.push(action.refereeSite);
      return _uniq(newState);
    default:
      return state;
  }
};
