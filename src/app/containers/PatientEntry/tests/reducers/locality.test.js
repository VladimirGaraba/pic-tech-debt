/* eslint-disable */

import locationReducer from '../../../CaseEntry/reducers/location';

import {
  updatePatientPlaceId,
  updatePatientAddress1,
  updatePatientAddress2,
  updatePatientSuburb,
  updatePatientCountry,
  updatePatientISOCountry,
  updatePatientGeometry,
  updatePatientLocation,
  updatePatientLocationName,
  updatePatientPostcode,
  updatePatientState,
  updatePatientTelephone,
} from '../../actions/case';

describe('locationReducer', () => {
  it('returns the initial state', () => {
    expect(locationReducer(undefined, {})).toMatchSnapshot();
  });
  it('update caller place ID', () => {
    expect(locationReducer({}, updatePatientPlaceId(1, 'Old Place Id', 'Place ID'))).toMatchSnapshot();
  });
  it('update caller address 1', () => {
    expect(locationReducer({}, updatePatientAddress1(1, 'Old Address 1', 'Address line 1'))).toMatchSnapshot();
  });
  it('update caller address 2', () => {
    expect(locationReducer({}, updatePatientAddress2(1, 'Old Address 2', 'Address line 2'))).toMatchSnapshot();
  });
  it('update caller city', () => {
    expect(locationReducer({}, updatePatientSuburb(1, 'Not Cairo', 'Cairo'))).toMatchSnapshot();
  });
  it('update caller country', () => {
    expect(locationReducer({}, updatePatientCountry(1, 'Not Slovenia', 'Slovenia'))).toMatchSnapshot();
  });
  it('update caller ISO country', () => {
    expect(locationReducer({}, updatePatientISOCountry(1, 'NZ', 'AU'))).toMatchSnapshot();
  });
  it('update caller geometry', () => {
    expect(locationReducer({}, updatePatientGeometry(1, {'lat': 2, 'lng': 2}, {'lat': 1, 'lng': -1}))).toMatchSnapshot();
  });
  it('update caller location', () => {
    expect(locationReducer({}, updatePatientLocation(1, 'Old location', 'Test location'))).toMatchSnapshot();
  });
  it('update caller organisation name', () => {
    expect(locationReducer({}, updatePatientLocationName(1, 'Old Location Name', 'New Location Name'))).toMatchSnapshot();
  });
  it('update caller postcode', () => {
    expect(locationReducer({}, updatePatientPostcode(1, '6000', '5000'))).toMatchSnapshot();
  });
  it('update caller state', () => {
    expect(locationReducer({}, updatePatientState(1, 'WA', 'NSW'))).toMatchSnapshot();
  });
  it('update caller telephone', () => {
    expect(locationReducer({}, updatePatientTelephone(1, '(03) 9000 0000', '(02) 9000 0000'))).toMatchSnapshot();
  });
});
