/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
  BATCH_INSERT_DOCUMENT,
  CHANGE_FORM,
  CLEAR_ERROR,
  DELETE_DOCUMENT,
  DISPLAY_RECORD,
  DISPLAY_TEMPLATE,
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
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export const batchInsertDocument = (documents) => ({
  type: BATCH_INSERT_DOCUMENT,
  documents,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const deleteDocument = (id) => ({
  type: DELETE_DOCUMENT,
  id,
});

export const executeSearch = (context, criteria) => ({
  type: EXECUTE_SEARCH,
  context,
  criteria,
});

export const insertDocument = (document) => ({
  type: INSERT_DOCUMENT,
  document,
});

export const initSiteConfig = (configId, siteId) => ({
  type: INIT_SITE_CONFIG,
  configId,
  siteId,
});

/**
 * Tells the app we want to log out a user
 */
export const logout = () => ({
  type: LOGOUT,
});

export const displayRecord = (id) => ({
  type: DISPLAY_RECORD,
  id,
});

export const displayTemplate = (templateId) => ({
  type: DISPLAY_TEMPLATE,
  templateId,
});

export const setTab = (tab) => ({
  type: SET_TAB,
  tab,
});

export const setUiModeDefault = () => ({
  type: SET_UI_MODE_DEFAULT,
});

export const setUiModeEditTemplate = () => ({
  type: SET_UI_MODE_EDIT_TEMPLATES,
});

export const storeKey = (appKeyId, appKey) => ({
  type: STORE_KEY,
  appKeyId,
  appKey,
});

export const swUpdated = () => ({
  type: SW_UPDATED,
});

export const updateToxicologySource = (toxicologySource) => ({
  type: UPDATE_TOXICOLOGY_SOURCE,
  toxicologySource,
});

export const syncingPouch = (syncing) => ({
  type: SYNCING_POUCH,
  syncing,
});

export const updateActionBarSearchResults = (results) => ({
  type: UPDATE_ACTION_BAR_SEARCH_RESULTS,
  results,
});

export const updateDocument = (document) => ({
  type: UPDATE_DOCUMENT,
  document,
});

export const updateCaseListSearchResults = (results) => ({
  type: UPDATE_CASE_LIST_SEARCH_RESULTS,
  results,
});

export const updateNewRecordSearchResults = (results) => ({
  type: UPDATE_NEW_RECORD_SEARCH_RESULTS,
  results,
});

// Authentication

/**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
export const changeForm = (newFormState) => ({
  type: CHANGE_FORM,
  newFormState,
});

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export const setAuthState = (newAuthState, token) => ({
  type: SET_AUTH,
  newAuthState,
  token,
});

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
export const sendingRequest = (sending) => ({
  type: SENDING_REQUEST,
  sending,
});

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
export const loginRequest = (data) => ({
  type: LOGIN_REQUEST,
  data,
});

/**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.username The username of the user to register
 * @param  {string} data.password The password of the user to register
 */
export const registerRequest = (data) => ({
  type: REGISTER_REQUEST,
  data,
});

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
export const requestError = (error) => ({
  type: REQUEST_ERROR,
  error,
});

/**
 * Store the template macro name in progress
 * @param {string} macro
 */
export const updateMacro = (macro) => ({
  type: UPDATE_MACRO,
  macro,
});

export const lookupMacroTemplate = (macro) => ({
  type: LOOKUP_MACRO,
  macro,
});
