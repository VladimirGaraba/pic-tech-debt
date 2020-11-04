/* eslint-disable */

import caseListSearchReducer from '../../reducers/caseListSearch';

import {
  updateCaseListSearchCallerLocation,
  updateCaseListSearchCallerOrganisation,
  updateCaseListSearchCentreName,
  updateCaseListSearchFilter,
  updateCaseListSearchName,
  updateCaseListSearchPostcode,
  updateCaseListSearchSex,
  updateCaseListSearchTime,
} from '../../actions';

describe('caseListSearchReducer', () => {
  it('returns the initial state', () => {
    expect(caseListSearchReducer(undefined, {})).toMatchSnapshot();
  });
  it('update caller location', () => {
    expect(caseListSearchReducer({}, updateCaseListSearchCallerLocation('Home'))).toMatchSnapshot();
  });
  it('update caller organisation', () => {
    expect(caseListSearchReducer({}, updateCaseListSearchCallerOrganisation('Hospital'))).toMatchSnapshot();
  });
  it('update centre name', () => {
    expect(caseListSearchReducer({}, updateCaseListSearchCentreName('Panadol'))).toMatchSnapshot();
  });
  it('update filter', () => {
    expect(caseListSearchReducer({}, updateCaseListSearchFilter('all'))).toMatchSnapshot();
  });
  it('update name', () => {
    expect(caseListSearchReducer({}, updateCaseListSearchName('Smith'))).toMatchSnapshot();
  });
  it('update postcode', () => {
    expect(caseListSearchReducer({}, updateCaseListSearchPostcode(8000))).toMatchSnapshot();
  });
  it('update sex', () => {
    expect(caseListSearchReducer({}, updateCaseListSearchSex('male'))).toMatchSnapshot();
  });
  it('update time', () => {
    expect(caseListSearchReducer({}, updateCaseListSearchTime('2018'))).toMatchSnapshot();
  });
});
