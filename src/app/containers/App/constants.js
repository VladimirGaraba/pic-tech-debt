/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_UIMODE = 'default';
export const EDITTEMPLATE_UIMODE = 'editTemplate';

export const DEFAULT_LOCALE = 'en';

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

export const BATCH_INSERT_DOCUMENT = 'pic/App/BATCH_INSERT_DOCUMENT';
export const CHANGE_FORM = 'pic/App/CHANGE_FORM';
export const CLEAR_ERROR = 'pic/App/CLEAR_ERROR';
export const DELETE_DOCUMENT = 'pic/App/DELETE_DOCUMENT';
export const DISPLAY_RECORD = 'pic/App/DISPLAY_RECORD';
export const DISPLAY_TEMPLATE = 'pic/App/DISPLAY_TEMPLATE';
export const EXECUTE_SEARCH = 'pic/App/EXECUTE_SEARCH';
export const INIT_SITE_CONFIG = 'pic/App/INIT_SITE_CONFIG';
export const INSERT_DOCUMENT = 'pic/App/INSERT_DOCUMENT';
export const LOGIN_REQUEST = 'pic/App/LOGIN_REQUEST';
export const LOGOUT = 'pic/App/LOGOUT';
export const LOOKUP_MACRO = 'pic/App/LOOKUP_MACRO';
export const REGISTER_REQUEST = 'pic/App/REGISTER_REQUEST';
export const REQUEST_ERROR = 'pic/App/REQUEST_ERROR';
export const SENDING_REQUEST = 'pic/App/SENDING_REQUEST';
export const SET_AUTH = 'pic/App/SET_AUTH';
export const SET_TAB = 'pic/App/SET_TAB';
export const SET_UI_MODE_DEFAULT = 'pic/App/SET_UI_MODE_DEFAULT';
export const SET_UI_MODE_EDIT_TEMPLATES = 'pic/App/SET_UI_MODE_EDIT_TEMPLATES';
export const STORE_KEY = 'pic/App/STORE_KEY';
export const SW_UPDATED = 'pic/App/SW_UPDATED';
export const SYNCING_POUCH = 'pic/App/SYNCING_POUCH';
export const UPDATE_ACTION_BAR_SEARCH_RESULTS = 'pic/App/UPDATE_ACTION_BAR_SEARCH_RESULTS';
export const UPDATE_CASE_LIST_SEARCH_RESULTS = 'pic/App/UPDATE_CASE_LIST_SEARCH_RESULTS';
export const UPDATE_DOCUMENT = 'pic/App/UPDATE_DOCUMENT';
export const UPDATE_MACRO = 'pic/App/UPDATE_MACRO';
export const UPDATE_NEW_RECORD_SEARCH_RESULTS = 'pic/App/UPDATE_NEW_RECORD_SEARCH_RESULTS';
export const UPDATE_TOXICOLOGY_SOURCE = 'pic/App/TOXICOLOGY_SOURCE';
