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
  updatePatientPlaceId,
  updatePatientAddress1,
  updatePatientAddress2,
  updatePatientSuburb,
  updatePatientState,
  updatePatientPostcode,
  updatePatientCountry,
  updatePatientISOCountry,
  updatePatientTelephone,
  updatePatientGeometry,
  updatePatientPregnantLactating,
  updatePatientPregnantStatus,
  updatePatientPregnantTrimester,
  updatePatientPregnantTrimesterUnknown,
  updatePatientRiskAssessment,
  updatePatientSex,
  updatePatientWeight,
} from '../../actions/case';

describe('Patient action creators', () => {
  const appKey = { id: 'appKeyId', key: 'appKey' };
  it('replacePatientMedicalRecordNumber', () => {
    expect(replacePatientMedicalRecordNumber(1, 'mrn', appKey)).toMatchSnapshot();
  });
  it('replacePatientName', () => {
    expect(replacePatientName(1, 'Patient Name', appKey)).toMatchSnapshot();
  });
  it('updatePatientAge', () => {
    expect(updatePatientAge(1, 10, 20, 'months', 'years')).toMatchSnapshot();
  });
  it('updatePatientAgeGroup', () => {
    expect(updatePatientAgeGroup(1, 'months', 'years')).toMatchSnapshot();
  });
  it('updatePatientAgeYears', () => {
    expect(updatePatientAgeYears(1, '', '0.75')).toMatchSnapshot();
  });
  it('updatePatientAnimalType', () => {
    expect(updatePatientAnimalType(1, 'dog', 'bird')).toMatchSnapshot();
  });
  it('updatePatientCategory', () => {
    expect(updatePatientCategory(1, 'animal', 'human')).toMatchSnapshot();
  });
  it('updatePatientCircumstance', () => {
    expect(updatePatientCircumstance(1, 'Old Circumstance', 'New Circumstance')).toMatchSnapshot();
  });
  it('updatePatientLocation', () => {
    expect(updatePatientLocation(1, 'Old Location', 'New Location')).toMatchSnapshot();
  });
  it('updatePatientMedicalRecordNumber', () => {
    expect(updatePatientMedicalRecordNumber(1, '1234', '5678')).toMatchSnapshot();
  });
  it('updatePatientName', () => {
    expect(updatePatientName(1, 'Old Name', 'New Name')).toMatchSnapshot();
  });
  it('updatePatientOccupation', () => {
    expect(updatePatientOccupation(1, 'Old Occupation', 'New Occupation')).toMatchSnapshot();
  });
  it('updatePatientPoisonSeverityScore', () => {
    expect(updatePatientPoisonSeverityScore(1, 'Minimal', 'Minor')).toMatchSnapshot();
  });
  it('updatePatientPlaceId', () => {
    expect(updatePatientPlaceId(1, 'Old Place Id', 'New Place Id')).toMatchSnapshot();
  });
  it('updatePatientAddress1', () => {
    expect(updatePatientAddress1(1, 'Old Address1', 'New Address 1')).toMatchSnapshot();
  });
  it('updatePatientAddress2', () => {
    expect(updatePatientAddress2(1, 'Old Address1', 'New Address 1')).toMatchSnapshot();
  });
  it('updatePatientSuburb', () => {
    expect(updatePatientSuburb(1, 'Perth', 'Sydney')).toMatchSnapshot();
  });
  it('updatePatientState', () => {
    expect(updatePatientState(1, 'WA', 'NSW')).toMatchSnapshot();
  });
  it('updatePatientPostcode', () => {
    expect(updatePatientPostcode(1, '6000', '3000')).toMatchSnapshot();
  });
  it('updatePatientCountry', () => {
    expect(updatePatientCountry(1, 'Australia', 'New Zealand')).toMatchSnapshot();
  });
  it('updatePatientISOCountry', () => {
    expect(updatePatientISOCountry(1, 'AU', 'NZ')).toMatchSnapshot();
  });
  it('updatePatientTelephone', () => {
    expect(updatePatientTelephone(1, '123456', '56789')).toMatchSnapshot();
  });
  it('updatePatientGeometry', () => {
    expect(updatePatientGeometry(1, {}, {})).toMatchSnapshot();
  });
  it('updatePatientPregnantLactating', () => {
    expect(updatePatientPregnantLactating(1, 'No', 'Yes')).toMatchSnapshot();
  });
  it('updatePatientPregnantStatus', () => {
    expect(updatePatientPregnantStatus(1, 'No', 'Yes')).toMatchSnapshot();
  });
  it('updatePatientPregnantTrimester', () => {
    expect(updatePatientPregnantTrimester(1, '1', '2')).toMatchSnapshot();
  });
  it('updatePatientPregnantTrimesterUnknown', () => {
    expect(updatePatientPregnantTrimesterUnknown(1, false, true)).toMatchSnapshot();
  });
  it('updatePatientRiskAssessment', () => {
    expect(updatePatientRiskAssessment(1, 'Old Assessment', 'New Assessment')).toMatchSnapshot();
  });
  it('updatePatientSex', () => {
    expect(updatePatientSex(1, 'male', 'female')).toMatchSnapshot();
  });
  it('updatePatientWeight', () => {
    expect(updatePatientWeight(1, '80', '83', 'kg', 'kg')).toMatchSnapshot();
  });
});
