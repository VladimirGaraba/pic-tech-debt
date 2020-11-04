import {
  ADD_CLINICAL_FEATURES,
  UPDATE_CLINICAL_FEATURES_DESCRIPTORS,
  UPDATE_CLINICAL_FEATURES_WHEN,
} from '../constants';

export const addClinicalFeatures = (id, descriptors, spi) => ({
  type: ADD_CLINICAL_FEATURES,
  id,
  descriptors,
  spi,
});

export const updateClinicalFeaturesDescriptors = (id, descriptors) => ({
  type: UPDATE_CLINICAL_FEATURES_DESCRIPTORS,
  id,
  descriptors,
});

export const updateClinicalFeaturesWhen = (id, when) => ({
  type: UPDATE_CLINICAL_FEATURES_WHEN,
  id,
  when,
});
