import {
  UPDATE_TEMPLATE_PATIENT_AGE,
  UPDATE_TEMPLATE_PATIENT_AGE_GROUP,
  UPDATE_TEMPLATE_PATIENT_AGE_YEARS,
  UPDATE_TEMPLATE_PATIENT_ANIMAL_TYPE,
  UPDATE_TEMPLATE_PATIENT_CATEGORY,
  UPDATE_TEMPLATE_PATIENT_CIRCUMSTANCE,
  UPDATE_TEMPLATE_PATIENT_LOCATION,
  UPDATE_TEMPLATE_PATIENT_MEDICAL_RECORD_NUMBER,
  UPDATE_TEMPLATE_PATIENT_NAME,
  UPDATE_TEMPLATE_PATIENT_OCCUPATION,
  UPDATE_TEMPLATE_PATIENT_POISON_SEVERITY_SCORE,
  UPDATE_TEMPLATE_PATIENT_PLACEID,
  UPDATE_TEMPLATE_PATIENT_LOCATION_NAME,
  UPDATE_TEMPLATE_PATIENT_ADDRESS1,
  UPDATE_TEMPLATE_PATIENT_ADDRESS2,
  UPDATE_TEMPLATE_PATIENT_SUBURB,
  UPDATE_TEMPLATE_PATIENT_STATE,
  UPDATE_TEMPLATE_PATIENT_POSTCODE,
  UPDATE_TEMPLATE_PATIENT_COUNTRY,
  UPDATE_TEMPLATE_PATIENT_ISOCOUNTRY,
  UPDATE_TEMPLATE_PATIENT_TELEPHONE,
  UPDATE_TEMPLATE_PATIENT_GEOMETRY,
  UPDATE_TEMPLATE_PATIENT_PREGNANT_LACTATING,
  UPDATE_TEMPLATE_PATIENT_PREGNANT_STATUS,
  UPDATE_TEMPLATE_PATIENT_PREGNANT_TRIMESTER,
  UPDATE_TEMPLATE_PATIENT_PREGNANT_TRIMESTER_UNKNOWN,
  UPDATE_TEMPLATE_PATIENT_RISK_ASSESSMENT,
  UPDATE_TEMPLATE_PATIENT_SEX,
  UPDATE_TEMPLATE_PATIENT_WEIGHT,
} from '../constants';

export const updateTemplatePatientAge = (templateId, oldAge, age, oldAgeUnits, ageUnits) => ({
  type: UPDATE_TEMPLATE_PATIENT_AGE,
  templateId,
  oldAge: '',
  age,
  oldAgeUnits: '',
  ageUnits,
});

export const updateTemplatePatientAgeGroup = (templateId, old, ageGroup) => ({
  type: UPDATE_TEMPLATE_PATIENT_AGE_GROUP,
  templateId,
  old,
  ageGroup,
});

export const updateTemplatePatientAgeYears = (templateId, old, ageYears) => ({
  type: UPDATE_TEMPLATE_PATIENT_AGE_YEARS,
  templateId,
  old,
  ageYears,
});

export const updateTemplatePatientAnimalType = (templateId, old, animalType) => ({
  type: UPDATE_TEMPLATE_PATIENT_ANIMAL_TYPE,
  templateId,
  old,
  animalType,
});

export const updateTemplatePatientCategory = (templateId, old, category) => ({
  type: UPDATE_TEMPLATE_PATIENT_CATEGORY,
  templateId,
  old,
  category,
});

export const updateTemplatePatientCircumstance = (templateId, old, circumstance) => ({
  type: UPDATE_TEMPLATE_PATIENT_CIRCUMSTANCE,
  templateId,
  old,
  circumstance,
});

export const updateTemplatePatientLocation = (templateId, old, location) => ({
  type: UPDATE_TEMPLATE_PATIENT_LOCATION,
  templateId,
  old,
  location,
});

export const updateTemplatePatientMedicalRecordNumber = (templateId, old, medicalRecordNumber, appKey) => ({
  type: UPDATE_TEMPLATE_PATIENT_MEDICAL_RECORD_NUMBER,
  templateId,
  old,
  medicalRecordNumber,
  appKey,
});

export const updateTemplatePatientName = (templateId, old, name, appKey) => ({
  type: UPDATE_TEMPLATE_PATIENT_NAME,
  templateId,
  old,
  name,
  appKey,
});

export const updateTemplatePatientOccupation = (templateId, old, occupation) => ({
  type: UPDATE_TEMPLATE_PATIENT_OCCUPATION,
  templateId,
  old,
  occupation,
});

export const updateTemplatePatientPoisonSeverityScore = (templateId, old, poisonSeverityScore) => ({
  type: UPDATE_TEMPLATE_PATIENT_POISON_SEVERITY_SCORE,
  templateId,
  old,
  poisonSeverityScore,
});

export const updateTemplatePatientPlaceId = (id, old, placeId) => ({
  type: UPDATE_TEMPLATE_PATIENT_PLACEID,
  id,
  old,
  placeId,
});

export const updateTemplatePatientLocationName = (id, old, locationName) => ({
  type: UPDATE_TEMPLATE_PATIENT_LOCATION_NAME,
  id,
  old,
  locationName,
});

export const updateTemplatePatientAddress1 = (id, old, address1) => ({
  type: UPDATE_TEMPLATE_PATIENT_ADDRESS1,
  id,
  old,
  address1,
});

export const updateTemplatePatientAddress2 = (id, old, address2) => ({
  type: UPDATE_TEMPLATE_PATIENT_ADDRESS2,
  id,
  old,
  address2,
});

export const updateTemplatePatientSuburb = (templateId, old, suburb) => ({
  type: UPDATE_TEMPLATE_PATIENT_SUBURB,
  templateId,
  old,
  suburb,
});

export const updateTemplatePatientState = (id, old, state) => ({
  type: UPDATE_TEMPLATE_PATIENT_STATE,
  id,
  old,
  state,
});

export const updateTemplatePatientPostcode = (templateId, old, postcode) => ({
  type: UPDATE_TEMPLATE_PATIENT_POSTCODE,
  templateId,
  old,
  postcode,
});

export const updateTemplatePatientCountry = (id, old, country) => ({
  type: UPDATE_TEMPLATE_PATIENT_COUNTRY,
  id,
  old,
  country,
});

export const updateTemplatePatientISOCountry = (id, old, isoCountry) => ({
  type: UPDATE_TEMPLATE_PATIENT_ISOCOUNTRY,
  id,
  old,
  isoCountry,
});

export const updateTemplatePatientTelephone = (id, old, telephone) => ({
  type: UPDATE_TEMPLATE_PATIENT_TELEPHONE,
  id,
  old,
  telephone,
});

export const updateTemplatePatientGeometry = (templateId, old, geometry) => ({
  type: UPDATE_TEMPLATE_PATIENT_GEOMETRY,
  templateId,
  old,
  geometry,
});

export const updateTemplatePatientPregnantLactating = (templateId, old, pregnantLactating) => ({
  type: UPDATE_TEMPLATE_PATIENT_PREGNANT_LACTATING,
  templateId,
  old,
  pregnantLactating,
});

export const updateTemplatePatientPregnantStatus = (templateId, old, pregnantStatus) => ({
  type: UPDATE_TEMPLATE_PATIENT_PREGNANT_STATUS,
  templateId,
  old,
  pregnantStatus,
});

export const updateTemplatePatientPregnantTrimester = (templateId, old, pregnantTrimester) => ({
  type: UPDATE_TEMPLATE_PATIENT_PREGNANT_TRIMESTER,
  templateId,
  old,
  pregnantTrimester,
});

export const updateTemplatePatientPregnantTrimesterUnknown = (templateId, old, pregnantTrimesterUnknown) => ({
  type: UPDATE_TEMPLATE_PATIENT_PREGNANT_TRIMESTER_UNKNOWN,
  templateId,
  old,
  pregnantTrimesterUnknown,
});

export const updateTemplatePatientRiskAssessment = (templateId, old, riskAssessment) => ({
  type: UPDATE_TEMPLATE_PATIENT_RISK_ASSESSMENT,
  templateId,
  old,
  riskAssessment,
});

export const updateTemplatePatientSex = (templateId, old, gender) => ({
  type: UPDATE_TEMPLATE_PATIENT_SEX,
  templateId,
  old,
  gender,
});

export const updateTemplatePatientWeight = (templateId, oldWeight, weight, oldWeightUnits, weightUnits) => ({
  type: UPDATE_TEMPLATE_PATIENT_WEIGHT,
  templateId,
  oldWeight: '',
  weight,
  oldWeightUnits: '',
  weightUnits,
});
