/* eslint-disable */

import searchResultsReducer from '../../reducers/searchResults';

import {
  logout,
  updateActionBarSearchResults,
  updateCaseListSearchResults,
  updateNewRecordSearchResults,
} from '../../actions';

describe('searchResultsReducer', () => {
  it('returns the initial state', () => {
    expect(searchResultsReducer(undefined, {})).toMatchSnapshot();
  });
  it('logout', () => {
    expect(searchResultsReducer({}, logout())).toMatchSnapshot();
  });
  it('update action bar search', () => {
    expect(searchResultsReducer({}, updateActionBarSearchResults(['Test data']))).toMatchSnapshot();
  });
  it('update case list search', () => {
    expect(searchResultsReducer({}, updateCaseListSearchResults(['Test data']))).toMatchSnapshot();
  });
  it('update new record search', () => {
    expect(searchResultsReducer({}, updateNewRecordSearchResults(['Test data']))).toMatchSnapshot();
  });
});
