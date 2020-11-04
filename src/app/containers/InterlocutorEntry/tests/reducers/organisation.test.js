/* eslint-disable */

import locationReducer from '../../../CaseEntry/reducers/location';

import {
  updateInterlocutorPlaceId,
  updateInterlocutorAddress1,
  updateInterlocutorAddress2,
  updateInterlocutorCity,
  updateInterlocutorCountry,
  updateInterlocutorISOCountry,
  updateInterlocutorGeometry,
  updateInterlocutorLocation,
  updateInterlocutorOrganisation,
  updateInterlocutorPostcode,
  updateInterlocutorState,
  updateInterlocutorTelephone,
} from '../../actions';

describe('locationReducer', () => {
  it('returns the initial state', () => {
    expect(locationReducer(undefined, {})).toMatchSnapshot();
  });
  it('update caller place ID', () => {
    expect(locationReducer({}, updateInterlocutorPlaceId(1, 'Place ID'))).toMatchSnapshot();
  });
  it('update caller address 1', () => {
    expect(locationReducer({}, updateInterlocutorAddress1(1, 'Address line 1'))).toMatchSnapshot();
  });
  it('update caller address 2', () => {
    expect(locationReducer({}, updateInterlocutorAddress2(1, 'Address line 2'))).toMatchSnapshot();
  });
  it('update caller city', () => {
    expect(locationReducer({}, updateInterlocutorCity(1, 'Cairo'))).toMatchSnapshot();
  });
  it('update caller country', () => {
    expect(locationReducer({}, updateInterlocutorCountry(1, 'Slovenia'))).toMatchSnapshot();
  });
  it('update caller ISO country', () => {
    expect(locationReducer({}, updateInterlocutorISOCountry(1, 'AU'))).toMatchSnapshot();
  });
  it('update caller geometry', () => {
    expect(locationReducer({}, updateInterlocutorGeometry(1, {'lat': 1, 'lng': -1}))).toMatchSnapshot();
  });
  it('update caller location', () => {
    expect(locationReducer({}, updateInterlocutorLocation(1, 'Old location', 'Test location'))).toMatchSnapshot();
  });
  it('update caller organisation name', () => {
    expect(locationReducer({}, updateInterlocutorOrganisation(1, 'Test organisation'))).toMatchSnapshot();
  });
  it('update caller postcode', () => {
    expect(locationReducer({}, updateInterlocutorPostcode(1, '5000'))).toMatchSnapshot();
  });
  it('update caller state', () => {
    expect(locationReducer({}, updateInterlocutorState(1, 'Devonshire'))).toMatchSnapshot();
  });
  it('update caller telephone', () => {
    expect(locationReducer({}, updateInterlocutorTelephone(1, '(02) 9000 0000'))).toMatchSnapshot();
  });
});
