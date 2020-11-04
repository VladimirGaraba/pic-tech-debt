import { combineReducers } from 'redux';
import aes256 from 'aes256';
import _isEmpty from 'lodash/isEmpty';

import {
  ADD_CASE,
  ADD_TEMPLATE,
  UPDATE_CASE_OUTCOME,
  UPDATE_TEMPLATE_OUTCOME,
  UPDATE_CASE_TOPIC,
  UPDATE_TEMPLATE_TOPIC,
} from 'containers/CaseEntry/constants';

import patientReducer from 'containers/PatientEntry/reducer';

import {
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
} from 'containers/PatientEntry/constants';

const defaultPatient = patientReducer(undefined, {});

const age = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.age) ? [null, defaultPatient.age] : state;
    case UPDATE_PATIENT_AGE:
    case UPDATE_TEMPLATE_PATIENT_AGE:
      return (state) ? [state[0], action.age] : [action.oldAge, action.age];
    default:
      return state;
  }
};

const ageGroup = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.ageGroup) ? [null, defaultPatient.ageGroup] : state;
    case UPDATE_PATIENT_AGE_GROUP:
    case UPDATE_TEMPLATE_PATIENT_AGE_GROUP:
      return (state) ? [state[0], action.ageGroup] : [action.old, action.ageGroup];
    default:
      return state;
  }
};

const ageUnits = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.ageYears) ? [null, defaultPatient.ageUnits] : state;
    case UPDATE_PATIENT_AGE:
    case UPDATE_TEMPLATE_PATIENT_AGE:
      return (state) ? [state[0], action.ageUnits] : [action.oldAgeUnits, action.ageUnits];
    default:
      return state;
  }
};

const ageYears = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.ageYears) ? [null, defaultPatient.ageYears] : state;
    case UPDATE_PATIENT_AGE_YEARS:
    case UPDATE_TEMPLATE_PATIENT_AGE_YEARS:
      return (state) ? [state[0], action.ageYears] : [action.old, action.ageYears];
    default:
      return state;
  }
};

const animalType = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.animalType) ? [null, defaultPatient.animalType] : state;
    case UPDATE_PATIENT_ANIMAL_TYPE:
    case UPDATE_TEMPLATE_PATIENT_ANIMAL_TYPE:
      return (state) ? [state[0], action.animalType] : [action.old, action.animalType];
    default:
      return state;
  }
};

const category = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.category) ? [null, defaultPatient.category] : state;
    case UPDATE_PATIENT_CATEGORY:
    case UPDATE_TEMPLATE_PATIENT_CATEGORY:
      return (state) ? [state[0], action.category] : [action.old, action.category];
    default:
      return state;
  }
};

const circumstance = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.circumstance) ? [null, defaultPatient.circumstance] : state;
    case UPDATE_PATIENT_CIRCUMSTANCE:
    case UPDATE_TEMPLATE_PATIENT_CIRCUMSTANCE:
      return (state) ? [state[0], action.circumstance] : [action.old, action.circumstance];
    default:
      return state;
  }
};

const gender = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.gender) ? [null, defaultPatient.gender] : state;
    case UPDATE_PATIENT_SEX:
    case UPDATE_TEMPLATE_PATIENT_SEX:
      return (state) ? [state[0], action.gender] : [action.old, action.gender];
    default:
      return state;
  }
};

const medicalRecordNumber = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
    case UPDATE_PATIENT_MEDICAL_RECORD_NUMBER:
    case UPDATE_TEMPLATE_PATIENT_MEDICAL_RECORD_NUMBER:
    default:
      return state;
  }
};

const medicalRecordNumberEnc = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.medicalRecordNumber)
        ? [null, !_isEmpty(defaultPatient.medicalRecordNumber) ? aes256.encrypt(action.appKey.key, defaultPatient.medicalRecordNumber) : '']
        : state;
    case UPDATE_PATIENT_MEDICAL_RECORD_NUMBER:
      return (state)
        ? [
          !_isEmpty(state[0])
            ? aes256.encrypt(action.appKey.key, state[0])
            : '',
          !_isEmpty(action.medicalRecordNumber)
            ? aes256.encrypt(action.appKey.key, action.medicalRecordNumber)
            : '']
        : [
          !_isEmpty(action.old)
            ? aes256.encrypt(action.appKey.key, action.old)
            : '',
          !_isEmpty(action.medicalRecordNumber)
            ? aes256.encrypt(action.appKey.key, action.medicalRecordNumber)
            : ''];
    default:
      return state;
  }
};

const name = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
    case UPDATE_PATIENT_NAME:
    case UPDATE_TEMPLATE_PATIENT_NAME:
    default:
      return state;
  }
};

const nameEnc = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.name)
        ? [null, !_isEmpty(defaultPatient.name) ? aes256.encrypt(action.appKey.key, defaultPatient.name) : '']
        : state;
    case UPDATE_PATIENT_NAME:
      return (state)
        ? [
          !_isEmpty(state[0])
            ? aes256.encrypt(action.appKey.key, state[0])
            : '',
          !_isEmpty(action.name)
            ? aes256.encrypt(action.appKey.key, action.name)
            : '']
        : [
          !_isEmpty(action.old)
            ? aes256.encrypt(action.appKey.key, action.old)
            : '',
          !_isEmpty(action.name)
            ? aes256.encrypt(action.appKey.key, action.name)
            : ''];
    default:
      return state;
  }
};

const occupation = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.occupation) ? [null, defaultPatient.occupation] : state;
    case UPDATE_PATIENT_OCCUPATION:
    case UPDATE_TEMPLATE_PATIENT_OCCUPATION:
      return (state) ? [state[0], action.occupation] : [action.old, action.occupation];
    default:
      return state;
  }
};

const outcome = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.outcome) ? [null, defaultPatient.outcome] : state;
    case UPDATE_CASE_OUTCOME:
    case UPDATE_TEMPLATE_OUTCOME:
      return (state) ? [state[0], action.outcome] : [action.old, action.outcome];
    default:
      return state;
  }
};

const poisonSeverityScore = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.poisonSeverityScore) ? [null, defaultPatient.poisonSeverityScore] : state;
    case UPDATE_PATIENT_POISON_SEVERITY_SCORE:
    case UPDATE_TEMPLATE_PATIENT_POISON_SEVERITY_SCORE:
      return (state) ? [state[0], action.poisonSeverityScore] : [action.old, action.poisonSeverityScore];
    default:
      return state;
  }
};

const localityLocation = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.location) ? [null, defaultPatient.location] : state;
    case UPDATE_PATIENT_LOCATION:
    case UPDATE_TEMPLATE_PATIENT_LOCATION:
      return (state) ? [state[0], action.location] : [action.old, action.location];
    default:
      return state;
  }
};

const localityPlaceId = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.locality.placeId) ? [null, defaultPatient.locality.placeId] : state;
    case UPDATE_PATIENT_PLACEID:
    case UPDATE_TEMPLATE_PATIENT_PLACEID:
      return (state) ? [state[0], action.placeId] : [action.old, action.placeId];
    default:
      return state;
  }
};

const localityName = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.locality.name) ? [null, defaultPatient.locality.name] : state;
    case UPDATE_PATIENT_LOCATION_NAME:
    case UPDATE_TEMPLATE_PATIENT_LOCATION_NAME:
      return (state) ? [state[0], action.locationName] : [action.old, action.locationName];
    default:
      return state;
  }
};

const localityAddress1 = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.locality.address1) ? [null, defaultPatient.locality.address1] : state;
    case UPDATE_PATIENT_ADDRESS1:
    case UPDATE_TEMPLATE_PATIENT_ADDRESS1:
      return (state) ? [state[0], action.address1] : [action.old, action.address1];
    default:
      return state;
  }
};

const localityCity = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.locality.city) ? [null, defaultPatient.locality.city] : state;
    case UPDATE_PATIENT_SUBURB:
    case UPDATE_TEMPLATE_PATIENT_SUBURB:
      return (state) ? [state[0], action.suburb] : [action.old, action.suburb];
    default:
      return state;
  }
};

const localityState = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.locality.state) ? [null, defaultPatient.locality.state] : state;
    case UPDATE_PATIENT_STATE:
    case UPDATE_TEMPLATE_PATIENT_STATE:
      return (state) ? [state[0], action.state] : [action.old, action.state];
    default:
      return state;
  }
};

const localityPostcode = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.locality.postcode) ? [null, defaultPatient.locality.postcode] : state;
    case UPDATE_PATIENT_POSTCODE:
    case UPDATE_TEMPLATE_PATIENT_POSTCODE:
      return (state) ? [state[0], action.postcode] : [action.old, action.postcode];
    default:
      return state;
  }
};

const localityCountry = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.locality.country) ? [null, defaultPatient.locality.country] : state;
    case UPDATE_PATIENT_COUNTRY:
    case UPDATE_TEMPLATE_PATIENT_COUNTRY:
      return (state) ? [state[0], action.country] : [action.old, action.country];
    default:
      return state;
  }
};

const localityISOCountry = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.locality.isoCountry) ? [null, defaultPatient.locality.isoCountry] : state;
    case UPDATE_PATIENT_ISOCOUNTRY:
    case UPDATE_TEMPLATE_PATIENT_ISOCOUNTRY:
      return (state) ? [state[0], action.isoCountry] : [action.old, action.isoCountry];
    default:
      return state;
  }
};

const localityTelephone = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.locality.telephone) ? [null, defaultPatient.locality.telephone] : state;
    case UPDATE_PATIENT_TELEPHONE:
    case UPDATE_TEMPLATE_PATIENT_TELEPHONE:
      return (state) ? [state[0], action.telephone] : [action.old, action.telephone];
    default:
      return state;
  }
};

const localityGeometry = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.locality.geometry) ? [null, defaultPatient.locality.geometry] : state;
    case UPDATE_PATIENT_GEOMETRY:
    case UPDATE_TEMPLATE_PATIENT_GEOMETRY:
      return (state) ? [state[0], action.geometry] : [action.old, action.geometry];
    default:
      return state;
  }
};

const pregnantLactating = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.pregnant.lactating) ? [null, defaultPatient.pregnant.lactating] : state;
    case UPDATE_PATIENT_PREGNANT_LACTATING:
    case UPDATE_TEMPLATE_PATIENT_PREGNANT_LACTATING:
      return (state) ? [state[0], action.pregnantLactating] : [action.old, action.pregnantLactating];
    default:
      return state;
  }
};

const pregnantStatus = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.pregnant.status) ? [null, defaultPatient.pregnant.status] : state;
    case UPDATE_PATIENT_PREGNANT_STATUS:
    case UPDATE_TEMPLATE_PATIENT_PREGNANT_STATUS:
      return (state) ? [state[0], action.pregnantStatus] : [action.old, action.pregnantStatus];
    default:
      return state;
  }
};

const pregnantTrimester = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.pregnant.trimester) ? [null, defaultPatient.pregnant.trimester] : state;
    case UPDATE_PATIENT_PREGNANT_TRIMESTER:
    case UPDATE_TEMPLATE_PATIENT_PREGNANT_TRIMESTER:
      return (state) ? [state[0], action.pregnantTrimester] : [action.old, action.pregnantTrimester];
    default:
      return state;
  }
};

const pregnantTrimesterUnknown = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.pregnant.trimesterUnknown) ? [null, defaultPatient.pregnant.trimesterUnknown] : state;
    case UPDATE_PATIENT_PREGNANT_TRIMESTER_UNKNOWN:
    case UPDATE_TEMPLATE_PATIENT_PREGNANT_TRIMESTER_UNKNOWN:
      return (state) ? [state[0], action.pregnantTrimesterUnknown] : [action.old, action.pregnantTrimesterUnknown];
    default:
      return state;
  }
};

const riskAssessment = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.riskAssessment) ? [null, defaultPatient.riskAssessment] : state;
    case UPDATE_PATIENT_RISK_ASSESSMENT:
    case UPDATE_TEMPLATE_PATIENT_RISK_ASSESSMENT:
      return (state) ? [state[0], action.riskAssessment] : [action.old, action.riskAssessment];
    default:
      return state;
  }
};

const topic = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.topic) ? [null, defaultPatient.topic] : state;
    case UPDATE_CASE_TOPIC:
    case UPDATE_TEMPLATE_TOPIC:
      return (state) ? [state[0], action.topic] : [action.old, action.topic];
    default:
      return state;
  }
};

const weight = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.weight) ? [null, defaultPatient.weight] : state;
    case UPDATE_PATIENT_WEIGHT:
    case UPDATE_TEMPLATE_PATIENT_WEIGHT:
      return (state) ? [state[0], action.weight] : [action.oldWeight, action.weight];
    default:
      return state;
  }
};

const weightUnits = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_TEMPLATE:
      return (defaultPatient.weightUnits) ? [null, defaultPatient.weightUnits] : state;
    case UPDATE_PATIENT_WEIGHT:
    case UPDATE_TEMPLATE_PATIENT_WEIGHT:
      return (state) ? [state[0], action.weightUnits] : [action.oldWeightUnits, action.weightUnits];
    default:
      return state;
  }
};

const patientHistoryReducer = combineReducers({
  age,
  ageGroup,
  ageUnits,
  ageYears,
  animalType,
  category,
  circumstance,
  gender,
  localityAddress1,
  localityCity,
  localityCountry,
  localityGeometry,
  localityISOCountry,
  localityLocation,
  localityName,
  localityPlaceId,
  localityPostcode,
  localityState,
  localityTelephone,
  medicalRecordNumberEnc,
  nameEnc,
  occupation,
  outcome,
  poisonSeverityScore,
  pregnantLactating,
  pregnantStatus,
  pregnantTrimester,
  pregnantTrimesterUnknown,
  riskAssessment,
  topic,
  weight,
  weightUnits,
});

export default patientHistoryReducer;
