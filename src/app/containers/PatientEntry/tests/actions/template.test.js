import {
  updateTemplatePatientAge,
  updateTemplatePatientAgeGroup,
  updateTemplatePatientAgeYears,
  updateTemplatePatientAnimalType,
  updateTemplatePatientCategory,
  updateTemplatePatientCircumstance,
  updateTemplatePatientLocation,
  updateTemplatePatientMedicalRecordNumber,
  updateTemplatePatientName,
  updateTemplatePatientOccupation,
  updateTemplatePatientPoisonSeverityScore,
  updateTemplatePatientPlaceId,
  updateTemplatePatientAddress1,
  updateTemplatePatientAddress2,
  updateTemplatePatientSuburb,
  updateTemplatePatientState,
  updateTemplatePatientPostcode,
  updateTemplatePatientCountry,
  updateTemplatePatientISOCountry,
  updateTemplatePatientTelephone,
  updateTemplatePatientGeometry,
  updateTemplatePatientPregnantLactating,
  updateTemplatePatientPregnantStatus,
  updateTemplatePatientPregnantTrimester,
  updateTemplatePatientPregnantTrimesterUnknown,
  updateTemplatePatientRiskAssessment,
  updateTemplatePatientSex,
  updateTemplatePatientWeight,
} from '../../actions/template';

describe('Patient action creators', () => {
  it('updateTemplatePatientAge', () => {
    expect(updateTemplatePatientAge(1, 10, 20, 'months', 'years')).toMatchSnapshot();
  });
  it('updateTemplatePatientAgeGroup', () => {
    expect(updateTemplatePatientAgeGroup(1, 'months', 'years')).toMatchSnapshot();
  });
  it('updateTemplatePatientAgeYears', () => {
    expect(updateTemplatePatientAgeYears(1, '', '0.75')).toMatchSnapshot();
  });
  it('updateTemplatePatientAnimalType', () => {
    expect(updateTemplatePatientAnimalType(1, 'dog', 'bird')).toMatchSnapshot();
  });
  it('updateTemplatePatientCategory', () => {
    expect(updateTemplatePatientCategory(1, 'animal', 'human')).toMatchSnapshot();
  });
  it('updateTemplatePatientCircumstance', () => {
    expect(updateTemplatePatientCircumstance(1, 'Old Circumstance', 'New Circumstance')).toMatchSnapshot();
  });
  it('updateTemplatePatientLocation', () => {
    expect(updateTemplatePatientLocation(1, 'Old Location', 'New Location')).toMatchSnapshot();
  });
  it('updateTemplatePatientMedicalRecordNumber', () => {
    expect(updateTemplatePatientMedicalRecordNumber(1, '1234', '5678')).toMatchSnapshot();
  });
  it('updateTemplatePatientName', () => {
    expect(updateTemplatePatientName(1, 'Old Name', 'New Name')).toMatchSnapshot();
  });
  it('updateTemplatePatientOccupation', () => {
    expect(updateTemplatePatientOccupation(1, 'Old Occupation', 'New Occupation')).toMatchSnapshot();
  });
  it('updateTemplatePatientPoisonSeverityScore', () => {
    expect(updateTemplatePatientPoisonSeverityScore(1, 'Minimal', 'Minor')).toMatchSnapshot();
  });
  it('updateTemplatePatientPlaceId', () => {
    expect(updateTemplatePatientPlaceId(1, 'Old Place Id', 'New Place Id')).toMatchSnapshot();
  });
  it('updateTemplatePatientAddress1', () => {
    expect(updateTemplatePatientAddress1(1, 'Old Address1', 'New Address 1')).toMatchSnapshot();
  });
  it('updateTemplatePatientAddress2', () => {
    expect(updateTemplatePatientAddress2(1, 'Old Address1', 'New Address 1')).toMatchSnapshot();
  });
  it('updateTemplatePatientSuburb', () => {
    expect(updateTemplatePatientSuburb(1, 'Perth', 'Sydney')).toMatchSnapshot();
  });
  it('updateTemplatePatientState', () => {
    expect(updateTemplatePatientState(1, 'WA', 'NSW')).toMatchSnapshot();
  });
  it('updateTemplatePatientPostcode', () => {
    expect(updateTemplatePatientPostcode(1, '6000', '3000')).toMatchSnapshot();
  });
  it('updateTemplatePatientCountry', () => {
    expect(updateTemplatePatientCountry(1, 'Australia', 'New Zealand')).toMatchSnapshot();
  });
  it('updateTemplatePatientISOCountry', () => {
    expect(updateTemplatePatientISOCountry(1, 'AU', 'NZ')).toMatchSnapshot();
  });
  it('updateTemplatePatientTelephone', () => {
    expect(updateTemplatePatientTelephone(1, '123456', '56789')).toMatchSnapshot();
  });
  it('updateTemplatePatientGeometry', () => {
    expect(updateTemplatePatientGeometry(1, {}, {})).toMatchSnapshot();
  });
  it('updateTemplatePatientPregnantLactating', () => {
    expect(updateTemplatePatientPregnantLactating(1, 'No', 'Yes')).toMatchSnapshot();
  });
  it('updateTemplatePatientPregnantStatus', () => {
    expect(updateTemplatePatientPregnantStatus(1, 'No', 'Yes')).toMatchSnapshot();
  });
  it('updateTemplatePatientPregnantTrimester', () => {
    expect(updateTemplatePatientPregnantTrimester(1, '1', '2')).toMatchSnapshot();
  });
  it('updateTemplatePatientPregnantTrimesterUnknown', () => {
    expect(updateTemplatePatientPregnantTrimesterUnknown(1, false, true)).toMatchSnapshot();
  });
  it('updateTemplatePatientRiskAssessment', () => {
    expect(updateTemplatePatientRiskAssessment(1, 'Old Assessment', 'New Assessment')).toMatchSnapshot();
  });
  it('updateTemplatePatientSex', () => {
    expect(updateTemplatePatientSex(1, 'male', 'female')).toMatchSnapshot();
  });
  it('updateTemplatePatientWeight', () => {
    expect(updateTemplatePatientWeight(1, '80', '83', 'kg', 'kg')).toMatchSnapshot();
  });
});
