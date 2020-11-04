/* eslint-disable */

import varsReducer from '../../reducers/vars';

import {
  setAgentTab
} from 'containers/AgentEntry/actions/case';

import {
  addCallRecord,
  addCase,
  endCall,
  resetAgentViewCentreName,
  updateAgentViewCentreName,
} from 'containers/CaseEntry/actions/case';

import {
  addTemplate,
  deleteTemplate,
  editTemplate,
  saveTemplate,
  updateTemplateMacro,
} from 'containers/CaseEntry/actions/template';

import {
  changeForm,
  clearError,
  displayRecord,
  displayTemplate,
  requestError,
  sendingRequest,
  setAuthState,
  setTab,
  setUiModeDefault,
  setUiModeEditTemplate,
  storeKey,
  swUpdated,
  updateToxicologySource,
  syncingPouch,
} from '../../actions';

describe('varsReducer', () => {
  const mockedDate = new Date(2018, 2, 4, 4, 59, 13, 805);
  global.Date = jest.fn(() => mockedDate);

  const spi = { 'name': 'Test SPI', siteId: 8 };
  const appKey = {id: 'keyId', key: 'key'};
  it('returns the initial state', () => {
    expect(varsReducer(undefined, {})).toMatchSnapshot();
  });
  it('add call record', () => {
    expect(varsReducer({}, addCallRecord(1, spi, appKey))).toMatchSnapshot();
  });
  it('add case', () => {
    const action = addCase(spi, 'TEST', appKey);
    action.id = 'b72540f9163ef35a05213611e012f2bdf8ccefb3';
    expect(varsReducer({}, action)).toMatchSnapshot();
  });
  it('add template', () => {
    const action = addTemplate(spi, 'TEST');
    action.commsNoteId = 'b72540f9163ef35a05213611e012f2bdf8ccefb3';
    action.templateId = 'a72540f9163ef35a05213611e012f2bdf8ccefb3';
    expect(varsReducer({}, action)).toMatchSnapshot();
  });
  it('change form', () => {
    expect(varsReducer({}, changeForm({'username': 'New form user', 'password': 'New form password'}))).toMatchSnapshot();
  });
  it('clear error', () => {
    expect(varsReducer({}, clearError())).toMatchSnapshot();
  });
  it('delete template', () => {
    const action = deleteTemplate('macro');
    expect(varsReducer({}, action)).toMatchSnapshot();
  });
  it('display record', () => {
    expect(varsReducer({}, displayRecord(1))).toMatchSnapshot();
  });
  it('display template', () => {
    expect(varsReducer({}, displayTemplate(2))).toMatchSnapshot();
  });
  it('edit template', () => {
    const action = editTemplate('macro', {_id: 'a72540f9163ef35a05213611e012f2bdf8ccefb3'}, spi);
    action.commsNoteId = 'c72540f9163ef35a05213611e012f2bdf8ccefb3';
    expect(varsReducer({}, action)).toMatchSnapshot();
  });
  it('end call', () => {
    expect(varsReducer({}, endCall())).toMatchSnapshot();
  });
  it('request error', () => {
    expect(varsReducer({}, requestError({'name': 'Test error'}))).toMatchSnapshot();
  });
  it('reset agent view centre name', () => {
    expect(varsReducer({}, resetAgentViewCentreName())).toMatchSnapshot();
  });
  it('save template', () => {
    expect(varsReducer({}, saveTemplate('macro', {}))).toMatchSnapshot();
  });
  it('sending request', () => {
    expect(varsReducer({}, sendingRequest(false))).toMatchSnapshot();
  });
  it('set auth state', () => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vcGljLmxvY2FsL2FwaS92MS9hdXRoL3JlZnJlc2giLCJpYXQiOjE1NTM3NDEzMTgsImV4cCI6MTU1Mzc1MjEyNCwibmJmIjoxNTUzNzQ4NTI0LCJqdGkiOiJLRmtQMUNsOEpIVVlPanlWIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIiwibmFtZSI6IkFkbWluIiwicm9sZXMiOlsiYWRtaW5pc3RyYXRvciJdLCJhYmlsaXRpZXMiOlsibWFuYWdlIHVzZXJzIiwibWFuYWdlIHNpdGVzIiwidmlldyBkYXRhIGFuYWx5dGljcyIsInZpZXcgZGFzaGJvYXJkIiwidmlldyBjYWxsIHJlY29yZHMiLCJtYW5hZ2Ugc2l0ZSIsInZpZXcgZGVsZXRlZCBmaWxlcyIsImFkbWluaXN0cmF0ZSB1c2VycyIsImFkbWluaXN0cmF0ZSBzaXRlcyIsImNyZWF0ZSBjYWxsIGZpbGVzIiwiYWRkIGNhbGwgcmVjb3JkcyIsImFkZCBjYWxsIG5vdGVzIiwibWFuYWdlIGluY2lkZW50cyIsIm1hbmFnZSB0ZW1wbGF0ZXMiXSwib3JnIjoiV0EgUG9pc29ucyBJbmZvcm1hdGlvbiBDZW50cmUiLCJqb2IiOiJzcGkiLCJwaG9uZSI6IigwOCkgOTk5OSA5OTkwIiwib3JnX3N0cmVldCI6Ikhvc3BpdGFsIEF2ZSIsIm9yZ19zdWJ1cmIiOiJOZWRsYW5kcyIsIm9yZ19zdGF0ZSI6IldBIiwib3JnX3Bvc3Rjb2RlIjoiNjAwOSIsIm9yZ19jb3VudHJ5IjoiQVUiLCJzaXRlX2lkIjo4LCJzaXRlX3Nob3J0Y29kZSI6IkRFViIsInRoZW1lIjoiYm9vdHN0cmFwIiwiYXBwbGljYXRpb25fa2V5X2lkIjoiNEE1NDYiLCJhcHBsaWNhdGlvbl9rZXkiOiIzMnFyZE5VdVJNb1ExeDc1V1lKQXlIbDdqbFRIeTVHOCJ9.RNZbWqPFoee9ONwyHo8JAauASY17UxJXtfH-ZKoKnsc';
    expect(varsReducer({}, setAuthState(true, token))).toMatchSnapshot();
  });
  it('set agent tab', () => {
    expect(varsReducer({}, setAgentTab(2))).toMatchSnapshot();
  });
  it('set tab', () => {
    expect(varsReducer({}, setTab(1))).toMatchSnapshot();
  });
  it('set ui mode default', () => {
    expect(varsReducer({}, setUiModeDefault())).toMatchSnapshot();
  });
  it('set ui mode edit template', () => {
    expect(varsReducer({}, setUiModeEditTemplate())).toMatchSnapshot();
  });
  it('sw updated', () => {
    expect(varsReducer({}, swUpdated())).toMatchSnapshot();
  });
  it('store key', () => {
    expect(varsReducer({}, storeKey(appKey.id, appKey.key))).toMatchSnapshot();
  });
  it('syncing pouch', () => {
    expect(varsReducer({}, syncingPouch(false))).toMatchSnapshot();
  });
  it('toxicology source updated', () => {
    expect(varsReducer({}, updateToxicologySource('PoisinDex'))).toMatchSnapshot();
  });
  it('update agent view centre name', () => {
    expect(varsReducer({}, updateAgentViewCentreName('Test name'))).toMatchSnapshot();
  });
  it('update template macro', () => {
    expect(varsReducer({}, updateTemplateMacro('a72540f9163ef35a05213611e012f2bdf8ccefb3', 'old', 'macro'))).toMatchSnapshot();
  });
});
