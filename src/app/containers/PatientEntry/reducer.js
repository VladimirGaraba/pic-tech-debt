import { combineReducers } from 'redux';
import aes256 from 'aes256';
import _isEmpty from 'lodash/isEmpty';

import locationReducer from 'containers/CaseEntry/reducers/location';
import pregnantReducer from './reducers/pregnant';

import { createFilteredReducer } from '../../utils/helpers';


import {
  REPLACE_PATIENT_MEDICAL_RECORD_NUMBER,
  REPLACE_PATIENT_NAME,

  UPDATE_PATIENT_AGE,
  UPDATE_PATIENT_AGE_GROUP,
  UPDATE_PATIENT_AGE_YEARS,
  UPDATE_PATIENT_ANIMAL_TYPE,
  UPDATE_PATIENT_CATEGORY,
  UPDATE_PATIENT_CIRCUMSTANCE,
  UPDATE_PATIENT_MEDICAL_RECORD_NUMBER,
  UPDATE_PATIENT_NAME,
  UPDATE_PATIENT_OCCUPATION,
  UPDATE_PATIENT_POISON_SEVERITY_SCORE,
  UPDATE_PATIENT_RISK_ASSESSMENT,
  UPDATE_PATIENT_SEX,
  UPDATE_PATIENT_WEIGHT,

  UPDATE_TEMPLATE_PATIENT_AGE,
  UPDATE_TEMPLATE_PATIENT_AGE_GROUP,
  UPDATE_TEMPLATE_PATIENT_AGE_YEARS,
  UPDATE_TEMPLATE_PATIENT_ANIMAL_TYPE,
  UPDATE_TEMPLATE_PATIENT_CATEGORY,
  UPDATE_TEMPLATE_PATIENT_CIRCUMSTANCE,
  UPDATE_TEMPLATE_PATIENT_MEDICAL_RECORD_NUMBER,
  UPDATE_TEMPLATE_PATIENT_NAME,
  UPDATE_TEMPLATE_PATIENT_OCCUPATION,
  UPDATE_TEMPLATE_PATIENT_POISON_SEVERITY_SCORE,
  UPDATE_TEMPLATE_PATIENT_RISK_ASSESSMENT,
  UPDATE_TEMPLATE_PATIENT_SEX,
  UPDATE_TEMPLATE_PATIENT_WEIGHT,
} from './constants';

const age = (state = '', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_AGE:
    case UPDATE_TEMPLATE_PATIENT_AGE:
      return action.age;
    default:
      return state;
  }
};

const ageGroup = (state = 'adult', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_AGE_GROUP:
    case UPDATE_TEMPLATE_PATIENT_AGE_GROUP:
      return action.ageGroup;
    default:
      return state;
  }
};

const ageYears = (state = '', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_AGE_YEARS:
    case UPDATE_TEMPLATE_PATIENT_AGE_YEARS:
      return action.ageYears;
    default:
      return state;
  }
};

const ageUnits = (state = 'years', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_AGE:
    case UPDATE_TEMPLATE_PATIENT_AGE:
      return action.ageUnits;
    default:
      return state;
  }
};

const animalType = (state = '', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_ANIMAL_TYPE:
    case UPDATE_TEMPLATE_PATIENT_ANIMAL_TYPE:
      return action.animalType;
    case UPDATE_PATIENT_CATEGORY:
    case UPDATE_TEMPLATE_PATIENT_CATEGORY:
      if (action.category === 'human') {
        return '';
      }
      return state;
    default:
      return state;
  }
};

const category = (state = 'human', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_CATEGORY:
    case UPDATE_TEMPLATE_PATIENT_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

const circumstance = (state = '', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_CIRCUMSTANCE:
    case UPDATE_TEMPLATE_PATIENT_CIRCUMSTANCE:
      return action.circumstance;
    default:
      return state;
  }
};

const gender = (state = '', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_SEX:
    case UPDATE_TEMPLATE_PATIENT_SEX:
      return action.gender;
    default:
      return state;
  }
};

const medicalRecordNumber = (state = null, action) => {
  switch (action.type) {
    case REPLACE_PATIENT_MEDICAL_RECORD_NUMBER:
      return '';
    case UPDATE_PATIENT_MEDICAL_RECORD_NUMBER:
    case UPDATE_TEMPLATE_PATIENT_MEDICAL_RECORD_NUMBER:
    default:
      return null;
  }
};

const medicalRecordNumberEnc = (state = '', action) => {
  switch (action.type) {
    case REPLACE_PATIENT_MEDICAL_RECORD_NUMBER:
    case UPDATE_PATIENT_MEDICAL_RECORD_NUMBER:
      return !_isEmpty(action.medicalRecordNumber) ? aes256.encrypt(action.appKey.key, action.medicalRecordNumber) : '';
    default:
      return state;
  }
};

const name = (state = null, action) => {
  switch (action.type) {
    case REPLACE_PATIENT_NAME:
      return '';
    case UPDATE_PATIENT_NAME:
    case UPDATE_TEMPLATE_PATIENT_NAME:
    default:
      return null;
  }
};

const nameEnc = (state = '', action) => {
  switch (action.type) {
    case REPLACE_PATIENT_NAME:
    case UPDATE_PATIENT_NAME:
      return !_isEmpty(action.name) ? aes256.encrypt(action.appKey.key, action.name) : '';
    default:
      return state;
  }
};

const occupation = (state = 'unknown', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_OCCUPATION:
    case UPDATE_TEMPLATE_PATIENT_OCCUPATION:
      return action.occupation;
    default:
      return state;
  }
};

const poisonSeverityScore = (state = 'Moderate', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_POISON_SEVERITY_SCORE:
    case UPDATE_TEMPLATE_PATIENT_POISON_SEVERITY_SCORE:
      return action.poisonSeverityScore;
    default:
      return state;
  }
};

const riskAssessment = (state = 'Moderate Risk', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_RISK_ASSESSMENT:
    case UPDATE_TEMPLATE_PATIENT_RISK_ASSESSMENT:
      return action.riskAssessment;
    default:
      return state;
  }
};

const weight = (state = '', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_WEIGHT:
    case UPDATE_TEMPLATE_PATIENT_WEIGHT:
      return action.weight;
    default:
      return state;
  }
};

const weightUnits = (state = 'kg', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_WEIGHT:
    case UPDATE_TEMPLATE_PATIENT_WEIGHT:
      return action.weightUnits;
    default:
      return state;
  }
};

const patientReducer = combineReducers({
  age,
  ageGroup,
  ageYears,
  ageUnits,
  animalType,
  category,
  circumstance,
  gender,
  locality: createFilteredReducer(locationReducer, (action) => action.type && action.type.match(/PATIENT/)),
  medicalRecordNumberEnc,
  nameEnc,
  occupation,
  poisonSeverityScore,
  pregnant: pregnantReducer,
  riskAssessment,
  weight,
  weightUnits,
});
export default patientReducer;
