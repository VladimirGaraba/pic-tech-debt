import { combineReducers } from 'redux';

import {
  UPDATE_REFERRALS,
  UPDATE_TREATMENTS,
  UPDATE_TEMPLATE_REFERRALS,
  UPDATE_TEMPLATE_TREATMENTS,
} from 'containers/TreatmentEntry/constants';

import {
  SET_PAST_TREATMENT_HISTORY,
} from '../../constants';

const referrals = (state = [], action) => {
  switch (action.type) {
    case UPDATE_REFERRALS:
    case UPDATE_TEMPLATE_REFERRALS:
      return [...state, { referee: action.referee, specialty: action.specialty }];
    default:
      return state;
  }
};

const treatments = (state = [], action) => {
  switch (action.type) {
    case UPDATE_TREATMENTS:
    case UPDATE_TEMPLATE_TREATMENTS:
      return [...state, { noteId: action.noteId, disposition: action.disposition, treatments: action.treatments }];
    default:
      return state;
  }
};

const pastTreatments = (state = {}, action) => {
  switch (action.type) {
    case SET_PAST_TREATMENT_HISTORY:
      return action.pastTreatments;
    default:
      return state;
  }
};

export const treatmentsRecord = combineReducers({
  referrals,
  treatments,
  pastTreatments,
});

export default treatmentsRecord;
