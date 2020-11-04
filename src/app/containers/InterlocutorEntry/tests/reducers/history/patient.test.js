/* eslint-disable */

import {
  addCase,
} from 'containers/CaseEntry/actions/case';

import {
  updatePatientAge,
  updatePatientAgeGroup,
  updatePatientAnimalType,
  updatePatientCategory,
  updatePatientCircumstance,
  updatePatientLocation,
  updatePatientMedicalRecordNumber,
  updatePatientName,
  updatePatientOccupation,
  updatePatientPoisonSeverityScore,
  updatePatientSuburb,
  updatePatientPostcode,
  updatePatientPregnantLactating,
  updatePatientPregnantStatus,
  updatePatientPregnantTrimester,
  updatePatientPregnantTrimesterUnknown,
  updatePatientRiskAssessment,
  updatePatientSex,
  updatePatientWeight,
} from 'containers/PatientEntry/actions/case';

import patientReducer from '../../../reducers/history/patient';

describe('patientReducer', () => {
  var mockedDate = new Date(2018, 3, 29, 6, 22, 20, 817);
  const appKey = { id: 'appKeyId', key: 'appKey' };
  global.Date = jest.fn(() => mockedDate);
  it('returns the initial state', () => {
    expect(patientReducer(undefined, {})).toMatchSnapshot();
  });
  it('add case initial state', () => {
    expect(patientReducer(undefined, addCase({'name': 'Test Tester'}, 'TEST', {id: 'keyId', key: 'key'}))).toMatchSnapshot();
  });
  it('initial state - update patient age called', () => {
    expect(patientReducer(undefined, updatePatientAge(1, null, 1, null, 'months'))).toMatchSnapshot();
  });
  it('defined state - update patient age called', () => {
    expect(patientReducer({'age': [10, 10], 'ageUnits': ['days', 'days']}, updatePatientAge(1, 10, 1, 'days', 'months'))).toMatchSnapshot();
  });
  it('initial state - update patient age group called', () => {
    expect(patientReducer(undefined, updatePatientAgeGroup(1, null, 'Infant'))).toMatchSnapshot();
  });
  it('defined state - update patient age group called', () => {
    expect(patientReducer({'ageGroup': ['Infant', 'Infant']}, updatePatientAgeGroup(1, 'Infant', 'Toddler'))).toMatchSnapshot();
  });
  it('initial state - update patient animal type called', () => {
    expect(patientReducer(undefined, updatePatientAnimalType(1, null, 'Bird'))).toMatchSnapshot();
  });
  it('defined state - update patient animal called', () => {
    expect(patientReducer({'animalType': ['Bird', 'Bird']}, updatePatientAnimalType(1, 'Bird', 'Dog'))).toMatchSnapshot();
  });
  it('initial state - update patient category called', () => {
    expect(patientReducer(undefined, updatePatientCategory(1, null, 'human'))).toMatchSnapshot();
  });
  it('defined state - update patient category called', () => {
    expect(patientReducer({'category': ['animal', 'animal']}, updatePatientCategory(1, 'animal', 'human'))).toMatchSnapshot();
  });
  it('initial state - update patient circumstance called', () => {
    expect(patientReducer(undefined, updatePatientCircumstance(1, null, 'Intentional - Abuse'))).toMatchSnapshot();
  });
  it('defined state - update patient circumstance called', () => {
    expect(patientReducer({'circumstance': ['Intentional - Abuse', 'Intentional - Abuse']}, updatePatientCircumstance(1, 'Intentional - Abuse', 'Intentional - Misuse'))).toMatchSnapshot();
  });
  it('initial state - update patient location called', () => {
    expect(patientReducer(undefined, updatePatientLocation(1, null, 'Home'))).toMatchSnapshot();
  });
  it('defined state - update patient location called', () => {
    expect(patientReducer({'location': [null, 'Home']}, updatePatientLocation(1, 'Home', 'Work'))).toMatchSnapshot();
  });
  it('initial state - update patient MRN called', () => {
    expect(patientReducer(undefined, updatePatientMedicalRecordNumber(1, null, '12345', appKey))).toMatchSnapshot();
  });
  it('defined state - update patient MRN called', () => {
    expect(patientReducer({'medicalRecordNumber': [null, '12345']}, updatePatientMedicalRecordNumber(1, '12345', '54321', appKey))).toMatchSnapshot();
  });
  it('initial state - update patient name called', () => {
    expect(patientReducer(undefined, updatePatientName(1, null, 'Test tester', appKey))).toMatchSnapshot();
  });
  it('defined state - update patient name called', () => {
    expect(patientReducer({'name': [null, 'John Smith']}, updatePatientName(1, 'Test Tester', 'John Smith', appKey))).toMatchSnapshot();
  });
  it('initial state - update patient occupation called', () => {
    expect(patientReducer(undefined, updatePatientOccupation(1, null, 'Teacher'))).toMatchSnapshot();
  });
  it('defined state - update patient occupation called', () => {
    expect(patientReducer({'occupation': [null, 'Teacher']}, updatePatientCategory(1, 'Teacher', 'Principal'))).toMatchSnapshot();
  });
  it('initial state - update patient severity score called', () => {
    expect(patientReducer(undefined, updatePatientPoisonSeverityScore(1, null, 'Moderate'))).toMatchSnapshot();
  });
  it('defined state - update patient severity score called', () => {
    expect(patientReducer({'poisonSeverityScore': [null, 'Moderate']}, updatePatientCategory(1, 'Moderate', 'Minimal'))).toMatchSnapshot();
  });
  it('initial state - update patient suburb called', () => {
    expect(patientReducer(undefined, updatePatientSuburb(1, null, 'Perth'))).toMatchSnapshot();
  });
  it('defined state - update patient suburb called', () => {
    expect(patientReducer({'suburb': [null, 'Perth']}, updatePatientSuburb(1, 'Perth', 'Sydney'))).toMatchSnapshot();
  });
  it('initial state - update patient postcode called', () => {
    expect(patientReducer(undefined, updatePatientPostcode(1, null, '6000'))).toMatchSnapshot();
  });
  it('defined state - update patient postcode called', () => {
    expect(patientReducer({'postcode': [null, '6000']}, updatePatientPostcode(1, '6000', '6001'))).toMatchSnapshot();
  });
  it('initial state - update patient pregnant - lactating called', () => {
    expect(patientReducer(undefined, updatePatientPregnantLactating(1, null, 'No'))).toMatchSnapshot();
  });
  it('defined state - update patient pregnant - lactating called', () => {
    expect(patientReducer({'pregnantLactating': [null, 'No']}, updatePatientPregnantLactating(1, 'No', 'Yes'))).toMatchSnapshot();
  });
  it('initial state - update patient pregnant - status called', () => {
    expect(patientReducer(undefined, updatePatientPregnantStatus(1, null, 'No'))).toMatchSnapshot();
  });
  it('defined state - update patient pregnant - status called', () => {
    expect(patientReducer({'pregnantStatus': [null, 'No']}, updatePatientPregnantStatus(1, 'No', 'Yes'))).toMatchSnapshot();
  });
  it('initial state - update patient pregnant - trimester called', () => {
    expect(patientReducer(undefined, updatePatientPregnantTrimester(1, null, '1'))).toMatchSnapshot();
  });
  it('defined state - update patient pregnant - trimester called', () => {
    expect(patientReducer({'pregnantTrimester': [null, '1']}, updatePatientPregnantTrimester(1, '1', '2'))).toMatchSnapshot();
  });
  it('initial state - update patient pregnant - trimesterUnknown called', () => {
    expect(patientReducer(undefined, updatePatientPregnantTrimesterUnknown(1, null, 'true'))).toMatchSnapshot();
  });
  it('defined state - update patient pregnant - trimesterUnknown called', () => {
    expect(patientReducer({'pregnantTrimesterUnknown': [null, 'true']}, updatePatientPregnantTrimesterUnknown(1, 'true', 'false'))).toMatchSnapshot();
  });
  it('initial state - update patient riskAssessment called', () => {
    expect(patientReducer(undefined, updatePatientRiskAssessment(1, null, 'No Risk'))).toMatchSnapshot();
  });
  it('defined state - update patient riskAssessment called', () => {
    expect(patientReducer({'riskAssessment': [null, 'No Risk']}, updatePatientRiskAssessment(1, 'No Risk', 'Minimal Risk'))).toMatchSnapshot();
  });
  it('initial state - update patient sex called', () => {
    expect(patientReducer(undefined, updatePatientSex(1, null, 'female'))).toMatchSnapshot();
  });
  it('defined state - update patient sex called', () => {
    expect(patientReducer({'gender': [null, 'female']}, updatePatientSex(1, 'female', 'male'))).toMatchSnapshot();
  });
  it('initial state - update patient weight called', () => {
    expect(patientReducer(undefined, updatePatientWeight(1, null, '1', null, 'kg'))).toMatchSnapshot();
  });
  it('defined state - update patient weight called', () => {
    expect(patientReducer({'weight': [null, '800'], 'weightUnits': [null, 'g']}, updatePatientWeight(1, '800', '1', 'g', 'kg'))).toMatchSnapshot();
  });
});
