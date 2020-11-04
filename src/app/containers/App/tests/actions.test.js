/* eslint-disable */

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
} from '../constants';

import {
  batchInsertDocument,
  changeForm,
  clearError,
  deleteDocument,
  displayRecord,
  displayTemplate,
  executeSearch,
  initSiteConfig,
  insertDocument,
  loadRepos,
  loginRequest,
  logout,
  lookupMacroTemplate,
  registerRequest,
  repoLoadingError,
  reposLoaded,
  requestError,
  sendingRequest,
  setAuthState,
  setTab,
  setUiModeDefault,
  setUiModeEditTemplate,
  storeKey,
  swUpdated,
  syncingPouch,
  updateActionBarSearchResults,
  updateDocument,
  updateCaseListSearchResults,
  updateMacro,
  updateNewRecordSearchResults,
  updateToxicologySource,
} from '../actions';

describe('App Actions', () => {
  const mockedDate = new Date(2018, 2, 4, 4, 59, 13, 805);
  global.Date = jest.fn(() => mockedDate);

  describe('loadRepos', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_REPOS,
      };

      expect(loadRepos()).toEqual(expectedResult);
    });
  });

  describe('reposLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = ['Test'];
      const username = 'test';
      const expectedResult = {
        type: LOAD_REPOS_SUCCESS,
        repos: fixture,
        username,
      };

      expect(reposLoaded(fixture, username)).toEqual(expectedResult);
    });
  });

  describe('repoLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_REPOS_ERROR,
        error: fixture,
      };

      expect(repoLoadingError(fixture)).toEqual(expectedResult);
    });
  });
  describe('App action creators', () => {
    it('batchInsertDocument', () => {
      expect(batchInsertDocument([{ name: 'Case 1' }, { name: 'Case 2' }])).toMatchSnapshot();
    });
    it('changeForm', () => {
      expect(changeForm({ username: 'New form user', password: 'New form password' })).toMatchSnapshot();
    });
    it('clearError', () => {
      expect(clearError()).toMatchSnapshot();
    });
    it('deleteDocument', () => {
      expect(deleteDocument(1)).toMatchSnapshot();
    });
    it('displayRecord', () => {
      expect(displayRecord(1)).toMatchSnapshot();
    });
    it('displayTemplate', () => {
      expect(displayTemplate(1)).toMatchSnapshot();
    });
    it('executeSearch', () => {
      expect(executeSearch()).toMatchSnapshot();
    });
    it('initSiteConfig', () => {
      expect(initSiteConfig()).toMatchSnapshot();
    });
    it('insertDocument', () => {
      expect(insertDocument({ name: 'Case 1' })).toMatchSnapshot();
    });
    it('loginRequest', () => {
      expect(loginRequest({ name: 'Test user' })).toMatchSnapshot();
    });
    it('logout', () => {
      expect(logout()).toMatchSnapshot();
    });
    it('lookupMacroTemplate', () => {
      expect(lookupMacroTemplate('macro')).toMatchSnapshot();
    });
    it('registerRequest', () => {
      expect(registerRequest({ name: 'Test request' })).toMatchSnapshot();
    });
    it('requestError', () => {
      expect(requestError({ name: 'Test error' })).toMatchSnapshot();
    });
    it('sendingRequest', () => {
      expect(sendingRequest(true)).toMatchSnapshot();
    });
    it('setAuthState', () => {
      expect(setAuthState(false)).toMatchSnapshot();
    });
    it('setTab', () => {
      expect(setTab(1)).toMatchSnapshot();
    });
    it('setUiModeDefault', () => {
      expect(setUiModeDefault()).toMatchSnapshot();
    });
    it('setUiModeEditTemplate', () => {
      expect(setUiModeEditTemplate()).toMatchSnapshot();
    });
    it('storeKey', () => {
      expect(storeKey('appKeyId', 'appKey')).toMatchSnapshot();
    });
    it('swUpdated', () => {
      expect(swUpdated()).toMatchSnapshot();
    });
    it('updateToxicologySource', () => {
      expect(updateToxicologySource()).toMatchSnapshot();
    });
    it('syncingPouch', () => {
      expect(syncingPouch(true)).toMatchSnapshot();
    });
    it('updateActionBarSearchResults', () => {
      expect(updateActionBarSearchResults(['Test Results'])).toMatchSnapshot();
    });
    it('updateCaseListSearchResults', () => {
      expect(updateCaseListSearchResults(['Test Results'])).toMatchSnapshot();
    });
    it('updateDocument', () => {
      expect(updateDocument({ name: 'Test Case' })).toMatchSnapshot();
    });
    it('updateMacro', () => {
      expect(updateMacro('macro')).toMatchSnapshot();
    });
    it('updateNewRecordSearchResults', () => {
      expect(updateNewRecordSearchResults(['Test Results'])).toMatchSnapshot();
    });
  });
});
