import {
  updateCaseListSearchCallerLocation,
  updateCaseListSearchCallerOrganisation,
  updateCaseListSearchCentreName,
  updateCaseListSearchFilter,
  updateCaseListSearchName,
  updateCaseListSearchPostcode,
  updateCaseListSearchSex,
  updateCaseListSearchTime,
} from '../actions';

describe('Current Case List action creators', () => {
  it('updateCaseListSearchCallerLocation', () => {
    expect(updateCaseListSearchCallerLocation('Home')).toMatchSnapshot();
  });
  it('updateCaseListSearchCallerOrganisation', () => {
    expect(updateCaseListSearchCallerOrganisation('Hospital')).toMatchSnapshot();
  });
  it('updateCaseListSearchCentreName', () => {
    expect(updateCaseListSearchCentreName('Panadol')).toMatchSnapshot();
  });
  it('updateCaseListSearchFilter', () => {
    expect(updateCaseListSearchFilter('open')).toMatchSnapshot();
  });
  it('updateCaseListSearchName', () => {
    expect(updateCaseListSearchName('Smith')).toMatchSnapshot();
  });
  it('updateCaseListSearchSex', () => {
    expect(updateCaseListSearchSex('male')).toMatchSnapshot();
  });
  it('updateCaseListSearchPostcode', () => {
    expect(updateCaseListSearchPostcode(6000)).toMatchSnapshot();
  });
  it('updateCaseListSearchTime', () => {
    expect(updateCaseListSearchTime('2018')).toMatchSnapshot();
  });
});
