import {
  BATCH_INSERT_DOCUMENT,
  CHANGE_FORM,
  CLEAR_ERROR,
  DEFAULT_LOCALE,
  DEFAULT_UIMODE,
  DELETE_DOCUMENT,
  DISPLAY_RECORD,
  DISPLAY_TEMPLATE,
  EDITTEMPLATE_UIMODE,
  EXECUTE_SEARCH,
  INIT_SITE_CONFIG,
  INSERT_DOCUMENT,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_REPOS_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT,
  LOOKUP_MACRO,
  REGISTER_REQUEST,
  REQUEST_ERROR,
  SENDING_REQUEST,
  SET_AUTH,
  SET_TAB,
  SET_UI_MODE_DEFAULT,
  SET_UI_MODE_EDIT_TEMPLATES,
  STORE_KEY,
  SW_UPDATED,
  SYNCING_POUCH,
  UPDATE_ACTION_BAR_SEARCH_RESULTS,
  UPDATE_CASE_LIST_SEARCH_RESULTS,
  UPDATE_DOCUMENT,
  UPDATE_MACRO,
  UPDATE_NEW_RECORD_SEARCH_RESULTS,
  UPDATE_TOXICOLOGY_SOURCE,
} from '../constants';

describe('App action constants', () => {
  it('LOAD_REPOS', () => {
    expect(LOAD_REPOS).toMatchSnapshot();
  });
  it('LOAD_REPOS_SUCCESS', () => {
    expect(LOAD_REPOS_SUCCESS).toMatchSnapshot();
  });
  it('LOAD_REPOS_ERROR', () => {
    expect(LOAD_REPOS_ERROR).toMatchSnapshot();
  });
  it('BATCH_INSERT_DOCUMENT', () => {
    expect(BATCH_INSERT_DOCUMENT).toMatchSnapshot();
  });
  it('CHANGE_FORM', () => {
    expect(CHANGE_FORM).toMatchSnapshot();
  });
  it('CLEAR_ERROR', () => {
    expect(CLEAR_ERROR).toMatchSnapshot();
  });
  it('DEFAULT_LOCALE', () => {
    expect(DEFAULT_LOCALE).toMatchSnapshot();
  });
  it('DEFAULT_UIMODE', () => {
    expect(DEFAULT_UIMODE).toMatchSnapshot();
  });
  it('DELETE_DOCUMENT', () => {
    expect(DELETE_DOCUMENT).toMatchSnapshot();
  });
  it('DISPLAY_RECORD', () => {
    expect(DISPLAY_RECORD).toMatchSnapshot();
  });
  it('DISPLAY_TEMPLATE', () => {
    expect(DISPLAY_TEMPLATE).toMatchSnapshot();
  });
  it('EDITTEMPLATE_UIMODE', () => {
    expect(EDITTEMPLATE_UIMODE).toMatchSnapshot();
  });
  it('EXECUTE_SEARCH', () => {
    expect(EXECUTE_SEARCH).toMatchSnapshot();
  });
  it('INIT_SITE_CONFIG', () => {
    expect(INIT_SITE_CONFIG).toMatchSnapshot();
  });
  it('INSERT_DOCUMENT', () => {
    expect(INSERT_DOCUMENT).toMatchSnapshot();
  });
  it('LOGIN_REQUEST', () => {
    expect(LOGIN_REQUEST).toMatchSnapshot();
  });
  it('LOGOUT', () => {
    expect(LOGOUT).toMatchSnapshot();
  });
  it('LOOKUP_MACRO', () => {
    expect(LOOKUP_MACRO).toMatchSnapshot();
  });
  it('REGISTER_REQUEST', () => {
    expect(REGISTER_REQUEST).toMatchSnapshot();
  });
  it('REQUEST_ERROR', () => {
    expect(REQUEST_ERROR).toMatchSnapshot();
  });
  it('SENDING_REQUEST', () => {
    expect(SENDING_REQUEST).toMatchSnapshot();
  });
  it('SET_AUTH', () => {
    expect(SET_AUTH).toMatchSnapshot();
  });
  it('SET_TAB', () => {
    expect(SET_TAB).toMatchSnapshot();
  });
  it('SET_UI_MODE_DEFAULT', () => {
    expect(SET_UI_MODE_DEFAULT).toMatchSnapshot();
  });
  it('SET_UI_MODE_EDIT_TEMPLATES', () => {
    expect(SET_UI_MODE_EDIT_TEMPLATES).toMatchSnapshot();
  });
  it('STORE_KEY', () => {
    expect(STORE_KEY).toMatchSnapshot();
  });
  it('SW_UPDATED', () => {
    expect(SW_UPDATED).toMatchSnapshot();
  });
  it('SYNCING_POUCH', () => {
    expect(SYNCING_POUCH).toMatchSnapshot();
  });
  it('UPDATE_ACTION_BAR_SEARCH_RESULTS', () => {
    expect(UPDATE_ACTION_BAR_SEARCH_RESULTS).toMatchSnapshot();
  });
  it('UPDATE_CASE_LIST_SEARCH_RESULTS', () => {
    expect(UPDATE_CASE_LIST_SEARCH_RESULTS).toMatchSnapshot();
  });
  it('UPDATE_DOCUMENT', () => {
    expect(UPDATE_DOCUMENT).toMatchSnapshot();
  });
  it('UPDATE_MACRO', () => {
    expect(UPDATE_MACRO).toMatchSnapshot();
  });
  it('UPDATE_TOXICOLOGY_SOURCE', () => {
    expect(UPDATE_TOXICOLOGY_SOURCE).toMatchSnapshot();
  });
  it('UPDATE_NEW_RECORD_SEARCH_RESULTS', () => {
    expect(UPDATE_NEW_RECORD_SEARCH_RESULTS).toMatchSnapshot();
  });
});
