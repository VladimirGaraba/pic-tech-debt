import { combineReducers } from 'redux';
import { timestamp, spi } from 'containers/App/reducers/utils';

import {
  ADD_CASE,
  ADD_TEMPLATE,
  EDIT_TEMPLATE,
} from 'containers/CaseEntry/constants';

import {
  ADD_CLINICAL_FEATURES,
  UPDATE_CLINICAL_FEATURES_DESCRIPTORS,
  UPDATE_CLINICAL_FEATURES_WHEN,
  ADD_TEMPLATE_CLINICAL_FEATURES,
  UPDATE_TEMPLATE_CLINICAL_FEATURES_DESCRIPTORS,
  UPDATE_TEMPLATE_CLINICAL_FEATURES_WHEN,
} from './constants';

const when = (state = 'at', action) => {
  switch (action.type) {
    case UPDATE_CLINICAL_FEATURES_WHEN:
    case UPDATE_TEMPLATE_CLINICAL_FEATURES_WHEN:
      return action.when;
    case ADD_CLINICAL_FEATURES:
    case ADD_TEMPLATE_CLINICAL_FEATURES:
    case EDIT_TEMPLATE:
    default:
      return state;
  }
};

const descriptors = (state = {}, action) => {
  switch (action.type) {
    case ADD_CLINICAL_FEATURES:
    case ADD_TEMPLATE_CLINICAL_FEATURES:
    case EDIT_TEMPLATE:
    case UPDATE_CLINICAL_FEATURES_DESCRIPTORS:
    case UPDATE_TEMPLATE_CLINICAL_FEATURES_DESCRIPTORS:
      return action.descriptors ? action.descriptors : {};
    default:
      return state;
  }
};

const featureRecord = combineReducers({
  when,
  descriptors,
  timestamp,
  spi,
});

export const features = (state = [], action) => {
  const newState = [...state];
  switch (action.type) {
    case ADD_CASE:
    case ADD_CLINICAL_FEATURES:
    case ADD_TEMPLATE:
    case ADD_TEMPLATE_CLINICAL_FEATURES:
    case EDIT_TEMPLATE: {
      const newAction = action;

      // copy descriptors from previous
      if (newState.length > 0 && !(newState[newState.length - 1].descriptors instanceof Array)) {
        newAction.descriptors = newState[newState.length - 1].descriptors;
      }
      const feature = featureRecord(undefined, newAction);
      newState.push(feature);
      return newState;
    }
    case UPDATE_CLINICAL_FEATURES_WHEN:
    case UPDATE_CLINICAL_FEATURES_DESCRIPTORS:
    case UPDATE_TEMPLATE_CLINICAL_FEATURES_WHEN:
    case UPDATE_TEMPLATE_CLINICAL_FEATURES_DESCRIPTORS: {
      const currentFeatureId = newState.length === 0 ? 0 : newState.length - 1;
      const currentFeature = newState[currentFeatureId];
      newState[currentFeatureId] = featureRecord(currentFeature, action);
      return newState;
    }
    default:
      return state;
  }
};

export default features;
