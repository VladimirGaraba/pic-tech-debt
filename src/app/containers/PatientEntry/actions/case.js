import {
  REPLACE_PATIENT_MEDICAL_RECORD_NUMBER,
  REPLACE_PATIENT_NAME,
  UPDATE_PATIENT_AGE,
  UPDATE_PATIENT_AGE_GROUP,
  UPDATE_PATIENT_AGE_YEARS,
  UPDATE_PATIENT_ANIMAL_TYPE,
  UPDATE_PATIENT_CATEGORY,
  UPDATE_PATIENT_CIRCUMSTANCE,
  UPDATE_PATIENT_LOCATION,
  UPDATE_PATIENT_MEDICAL_RECORD_NUMBER,
  UPDATE_PATIENT_NAME,
  UPDATE_PATIENT_OCCUPATION,
  UPDATE_PATIENT_POISON_SEVERITY_SCORE,
  UPDATE_PATIENT_PLACEID,
  UPDATE_PATIENT_LOCATION_NAME,
  UPDATE_PATIENT_ADDRESS1,
  UPDATE_PATIENT_ADDRESS2,
  UPDATE_PATIENT_SUBURB,
  UPDATE_PATIENT_STATE,
  UPDATE_PATIENT_POSTCODE,
  UPDATE_PATIENT_COUNTRY,
  UPDATE_PATIENT_ISOCOUNTRY,
  UPDATE_PATIENT_TELEPHONE,
  UPDATE_PATIENT_GEOMETRY,
  UPDATE_PATIENT_PREGNANT_LACTATING,
  UPDATE_PATIENT_PREGNANT_STATUS,
  UPDATE_PATIENT_PREGNANT_TRIMESTER,
  UPDATE_PATIENT_PREGNANT_TRIMESTER_UNKNOWN,
  UPDATE_PATIENT_RISK_ASSESSMENT,
  UPDATE_PATIENT_SEX,
  UPDATE_PATIENT_WEIGHT,
} from '../constants';

export const replacePatientMedicalRecordNumber = (id, medicalRecordNumber, appKey) => ({
  type: REPLACE_PATIENT_MEDICAL_RECORD_NUMBER,
  id,
  medicalRecordNumber,
  appKey,
});

export const replacePatientName = (id, name, appKey) => ({
  type: REPLACE_PATIENT_NAME,
  id,
  name,
  appKey,
});

export const updatePatientAge = (id, oldAge, age, oldAgeUnits, ageUnits) => ({
  type: UPDATE_PATIENT_AGE,
  id,
  oldAge,
  age,
  oldAgeUnits,
  ageUnits,
});

export const updatePatientAgeGroup = (id, old, ageGroup) => ({
  type: UPDATE_PATIENT_AGE_GROUP,
  id,
  old,
  ageGroup,
});

export const updatePatientAgeYears = (id, old, ageYears) => ({
  type: UPDATE_PATIENT_AGE_YEARS,
  id,
  old,
  ageYears,
});

export const updatePatientAnimalType = (id, old, animalType) => ({
  type: UPDATE_PATIENT_ANIMAL_TYPE,
  id,
  old,
  animalType,
});

export const updatePatientCategory = (id, old, category) => ({
  type: UPDATE_PATIENT_CATEGORY,
  id,
  old,
  category,
});

export const updatePatientCircumstance = (id, old, circumstance) => ({
  type: UPDATE_PATIENT_CIRCUMSTANCE,
  id,
  old,
  circumstance,
});

export const updatePatientLocation = (id, old, location) => ({
  type: UPDATE_PATIENT_LOCATION,
  id,
  old,
  location,
});

export const updatePatientMedicalRecordNumber = (id, old, medicalRecordNumber, appKey) => ({
  type: UPDATE_PATIENT_MEDICAL_RECORD_NUMBER,
  id,
  old,
  medicalRecordNumber,
  appKey,
});

export const updatePatientName = (id, old, name, appKey) => ({
  type: UPDATE_PATIENT_NAME,
  id,
  old,
  name,
  appKey,
});

export const updatePatientOccupation = (id, old, occupation) => ({
  type: UPDATE_PATIENT_OCCUPATION,
  id,
  old,
  occupation,
});

export const updatePatientPoisonSeverityScore = (id, old, poisonSeverityScore) => ({
  type: UPDATE_PATIENT_POISON_SEVERITY_SCORE,
  id,
  old,
  poisonSeverityScore,
});

export const updatePatientPlaceId = (id, old, placeId) => ({
  type: UPDATE_PATIENT_PLACEID,
  id,
  old,
  placeId,
});

export const updatePatientLocationName = (id, old, locationName) => ({
  type: UPDATE_PATIENT_LOCATION_NAME,
  id,
  old,
  locationName,
});

export const updatePatientAddress1 = (id, old, address1) => ({
  type: UPDATE_PATIENT_ADDRESS1,
  id,
  old,
  address1,
});

export const updatePatientAddress2 = (id, old, address2) => ({
  type: UPDATE_PATIENT_ADDRESS2,
  id,
  old,
  address2,
});

export const updatePatientSuburb = (id, old, suburb) => ({
  type: UPDATE_PATIENT_SUBURB,
  id,
  old,
  suburb,
});

export const updatePatientState = (id, old, state) => ({
  type: UPDATE_PATIENT_STATE,
  id,
  old,
  state,
});

export const updatePatientPostcode = (id, old, postcode) => ({
  type: UPDATE_PATIENT_POSTCODE,
  id,
  old,
  postcode,
});

export const updatePatientCountry = (id, old, country) => ({
  type: UPDATE_PATIENT_COUNTRY,
  id,
  old,
  country,
});

export const updatePatientISOCountry = (id, old, isoCountry) => ({
  type: UPDATE_PATIENT_ISOCOUNTRY,
  id,
  old,
  isoCountry,
});

export const updatePatientTelephone = (id, old, telephone) => ({
  type: UPDATE_PATIENT_TELEPHONE,
  id,
  old,
  telephone,
});

export const updatePatientGeometry = (id, old, geometry) => ({
  type: UPDATE_PATIENT_GEOMETRY,
  id,
  old,
  geometry,
});

export const updatePatientPregnantLactating = (id, old, pregnantLactating) => ({
  type: UPDATE_PATIENT_PREGNANT_LACTATING,
  id,
  old,
  pregnantLactating,
});

export const updatePatientPregnantStatus = (id, old, pregnantStatus) => ({
  type: UPDATE_PATIENT_PREGNANT_STATUS,
  id,
  old,
  pregnantStatus,
});

export const updatePatientPregnantTrimester = (id, old, pregnantTrimester) => ({
  type: UPDATE_PATIENT_PREGNANT_TRIMESTER,
  id,
  old,
  pregnantTrimester,
});

export const updatePatientPregnantTrimesterUnknown = (id, old, pregnantTrimesterUnknown) => ({
  type: UPDATE_PATIENT_PREGNANT_TRIMESTER_UNKNOWN,
  id,
  old,
  pregnantTrimesterUnknown,
});

export const updatePatientRiskAssessment = (id, old, riskAssessment) => ({
  type: UPDATE_PATIENT_RISK_ASSESSMENT,
  id,
  old,
  riskAssessment,
});

export const updatePatientSex = (id, old, gender) => ({
  type: UPDATE_PATIENT_SEX,
  id,
  old,
  gender,
});

export const updatePatientWeight = (id, oldWeight, weight, oldWeightUnits, weightUnits) => ({
  type: UPDATE_PATIENT_WEIGHT,
  id,
  oldWeight,
  weight,
  oldWeightUnits,
  weightUnits,
});
