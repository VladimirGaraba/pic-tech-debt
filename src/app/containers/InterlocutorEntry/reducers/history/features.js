import { combineReducers } from 'redux';

import {
  EDIT_TEMPLATE,
  UPDATE_CASE_OUTCOME,
  UPDATE_TEMPLATE_OUTCOME,
} from 'containers/CaseEntry/constants';

import {
  ADD_CLINICAL_FEATURES,
  UPDATE_CLINICAL_FEATURES_DESCRIPTORS,
  UPDATE_CLINICAL_FEATURES_WHEN,
  UPDATE_TEMPLATE_CLINICAL_FEATURES_DESCRIPTORS,
  UPDATE_TEMPLATE_CLINICAL_FEATURES_WHEN,
} from 'containers/ClinicalFeaturesEntry/constants';

import {
  SET_PAST_FEATURES_HISTORY,
} from '../../constants';

const descriptors = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CLINICAL_FEATURES_DESCRIPTORS:
    case UPDATE_TEMPLATE_CLINICAL_FEATURES_DESCRIPTORS:
      return action.descriptors;
    default:
      return state;
  }
};

const outcome = (state = '', action) => {
  switch (action.type) {
    case ADD_CLINICAL_FEATURES:
    case EDIT_TEMPLATE:
      return 'no impact';
    case UPDATE_CASE_OUTCOME:
    case UPDATE_TEMPLATE_OUTCOME:
      return action.outcome;
    default:
      return state;
  }
};

const pastDescriptors = (state = {}, action) => {
  switch (action.type) {
    case SET_PAST_FEATURES_HISTORY:
      return action.pastFeatures;
    default:
      return state;
  }
};

const when = (state = '', action) => {
  switch (action.type) {
    case ADD_CLINICAL_FEATURES:
    case EDIT_TEMPLATE:
      return 'at';
    case UPDATE_CLINICAL_FEATURES_WHEN:
    case UPDATE_TEMPLATE_CLINICAL_FEATURES_WHEN:
      return action.when;
    default:
      return state;
  }
};

export const featuresRecord = combineReducers({
  when,
  outcome,
  descriptors,
  pastDescriptors,
});

export default featuresRecord;
