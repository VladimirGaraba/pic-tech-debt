/* eslint-disable */

import PatientReducer from '../reducer';

import {
  replacePatientMedicalRecordNumber,
  replacePatientName,
  updatePatientAge,
  updatePatientAgeGroup,
  updatePatientAgeYears,
  updatePatientAnimalType,
  updatePatientCategory,
  updatePatientCircumstance,
  updatePatientLocation,
  updatePatientMedicalRecordNumber,
  updatePatientName,
  updatePatientOccupation,
  updatePatientPoisonSeverityScore,
  updatePatientRiskAssessment,
  updatePatientSex,
  updatePatientWeight,
} from '../actions/case';

describe('PatientReducer', () => {
  const appKey = { id: 'appKeyId', key: 'appKey' };
  it('returns the initial state', () => {
    expect(PatientReducer(undefined, {})).toMatchSnapshot();
  });
  it('update patient age', () => {
    expect(PatientReducer({}, replacePatientMedicalRecordNumber(1, 'mrn', appKey))).toMatchSnapshot();
  });
  it('update patient age', () => {
    expect(PatientReducer({}, replacePatientName(1, 'Patient Name', appKey))).toMatchSnapshot();
  });
  it('update patient age', () => {
    expect(PatientReducer({}, updatePatientAge(1, 10, 1, 'months', 'years'))).toMatchSnapshot();
  });
  it('update patient age group', () => {
    expect(PatientReducer({}, updatePatientAgeGroup(1, 'months', 'years'))).toMatchSnapshot();
  });
  it('update patient age years', () => {
    expect(PatientReducer({}, updatePatientAgeYears(1, '', '1.5'))).toMatchSnapshot();
  });
  it('update patient animal type', () => {
    expect(PatientReducer({}, updatePatientAnimalType(1, 'dog', 'bird'))).toMatchSnapshot();
  });
  it('clear patient animal type if human category', () => {
    expect(PatientReducer({'category': 'bird'}, updatePatientCategory(1, 'animal', 'human'))).toMatchSnapshot();
  });
  it('update patient category', () => {
    expect(PatientReducer({}, updatePatientCategory(1, 'human', 'animal'))).toMatchSnapshot();
  });
  it('update patient circumstance', () => {
    expect(PatientReducer({}, updatePatientCircumstance(1, 'Old circumstance', 'New circumstance'))).toMatchSnapshot();
  });
  it('update patient location', () => {
    expect(PatientReducer({}, updatePatientLocation(1, 'Work', 'Hospital'))).toMatchSnapshot();
  });
  it('update patient MRN', () => {
    expect(PatientReducer({}, updatePatientMedicalRecordNumber(1, 5678, 4321, appKey))).toMatchSnapshot();
  });
  it('update patient name', () => {
    expect(PatientReducer({}, updatePatientName(1, 'Joe Blogs', 'John Smith', appKey))).toMatchSnapshot();
  });
  it('update patient occupation', () => {
    expect(PatientReducer({}, updatePatientOccupation(1, 'Student', 'Salesperson'))).toMatchSnapshot();
  });
  it('update patient poison severity score', () => {
    expect(PatientReducer({}, updatePatientPoisonSeverityScore(1, 3, 4))).toMatchSnapshot();
  });
  it('update patient risk assessment', () => {
    expect(PatientReducer({}, updatePatientRiskAssessment(1, 'Old assessment', 'New assessment'))).toMatchSnapshot();
  });
  it('update patient sex', () => {
    expect(PatientReducer({}, updatePatientSex(1, 'female', 'male'))).toMatchSnapshot();
  });
  it('update patient weight', () => {
    expect(PatientReducer({}, updatePatientWeight(1, 65, 68, 'kg', 'kg'))).toMatchSnapshot();
  });
});
