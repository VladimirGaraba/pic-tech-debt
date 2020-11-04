import {
  ADD_TEMPLATE_CLINICAL_FEATURES,
  UPDATE_TEMPLATE_CLINICAL_FEATURES_DESCRIPTORS,
  UPDATE_TEMPLATE_CLINICAL_FEATURES_WHEN,
} from '../constants';

export const addTemplateClinicalFeatures = (templateId, descriptors, spi) => ({
  type: ADD_TEMPLATE_CLINICAL_FEATURES,
  templateId,
  descriptors,
  spi,
});
export const updateTemplateClinicalFeaturesDescriptors = (templateId, descriptors) => ({
  type: UPDATE_TEMPLATE_CLINICAL_FEATURES_DESCRIPTORS,
  templateId,
  descriptors,
});
export const updateTemplateClinicalFeaturesWhen = (templateId, when) => ({
  type: UPDATE_TEMPLATE_CLINICAL_FEATURES_WHEN,
  templateId,
  when,
});
