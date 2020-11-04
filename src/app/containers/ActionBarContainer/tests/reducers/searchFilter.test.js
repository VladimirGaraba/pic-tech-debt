/* eslint-disable */

import searchFilterReducer from '../../reducers/searchFilter';

import {
  addCallRecord,
  addCase,
} from 'containers/CaseEntry/actions/case';

import {
  toggleNewCallModal,
  updateNewCallModalCallerLocation,
  updateNewCallModalCallerOrganisation,
  updateNewCallModalCentreName,
  updateNewCallModalFilter,
  updateNewCallModalId,
  updateNewCallModalName,
  updateNewCallModalPostcode,
  updateNewCallModalSelected,
  updateNewCallModalSex,
  updateNewCallModalTime,
} from '../../actions';


describe('searchFilterReducer', () => {
  var mockedDate = new Date(2018, 2, 4, 4, 59, 13, 805);
  global.Date = jest.fn(() => mockedDate);
  it('returns the initial state', () => {
    expect(searchFilterReducer(undefined, {})).toMatchSnapshot();
  });
  it('add case', () => {
    const action = addCase({ 'name': 'Test SPI' }, 'WAPIC');
    action.id = 'b72540f9163ef35a05213611e012f2bdf8ccefb3';
    expect(searchFilterReducer({}, action)).toMatchSnapshot();
  });
  it('add call record', () => {
    expect(searchFilterReducer({}, addCallRecord(1, { 'name': 'Test SPI' }))).toMatchSnapshot();
  });
  it('toggle new call modal', () => {
    expect(searchFilterReducer({}, toggleNewCallModal())).toMatchSnapshot();
  });
  it('update new call modal caller location', () => {
    expect(searchFilterReducer({}, updateNewCallModalCallerLocation('New location'))).toMatchSnapshot();
  });
  it('update new call modal caller organisation', () => {
    expect(searchFilterReducer({}, updateNewCallModalCallerOrganisation('New organisation'))).toMatchSnapshot();
  });
  it('update new call modal centre name', () => {
    expect(searchFilterReducer({}, updateNewCallModalCentreName('New centre name'))).toMatchSnapshot();
  });
  it('update new call modal filter', () => {
    expect(searchFilterReducer({}, updateNewCallModalFilter('New filter'))).toMatchSnapshot();
  });
  it('update new call modal id', () => {
    expect(searchFilterReducer({}, updateNewCallModalId('New ID'))).toMatchSnapshot();
  });
  it('update new call modal name', () => {
    expect(searchFilterReducer({}, updateNewCallModalName('New name'))).toMatchSnapshot();
  });
  it('update new call modal postcode', () => {
    expect(searchFilterReducer({}, updateNewCallModalPostcode('New postcode'))).toMatchSnapshot();
  });
  it('update new call modal selected', () => {
    expect(searchFilterReducer({}, updateNewCallModalSelected('New selected'))).toMatchSnapshot();
  });
  it('update new call modal sex', () => {
    expect(searchFilterReducer({}, updateNewCallModalSex('New sex'))).toMatchSnapshot();
  });
  it('update new call modal time', () => {
    expect(searchFilterReducer({}, updateNewCallModalTime('New time'))).toMatchSnapshot();
  });
});
