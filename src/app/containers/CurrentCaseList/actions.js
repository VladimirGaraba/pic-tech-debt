import {
  UPDATE_CASE_LIST_SEARCH_CALLER_LOCATION,
  UPDATE_CASE_LIST_SEARCH_CALLER_ORGANISATION,
  UPDATE_CASE_LIST_SEARCH_CENTRE_NAME,
  UPDATE_CASE_LIST_SEARCH_FILTER,
  UPDATE_CASE_LIST_SEARCH_ID,
  UPDATE_CASE_LIST_SEARCH_NAME,
  UPDATE_CASE_LIST_SEARCH_POSTCODE,
  UPDATE_CASE_LIST_SEARCH_SEX,
  UPDATE_CASE_LIST_SEARCH_TIME,
  TOGGLE_INCIDENT_MODAL,
  UPDATE_INCIDENT_MODAL_NAME,
  UPDATE_INCIDENT_MODAL_SELECTED,
} from './constants';

export const updateCaseListSearchCallerLocation = (callerLocation) => ({
  type: UPDATE_CASE_LIST_SEARCH_CALLER_LOCATION,
  callerLocation,
});
export const updateCaseListSearchCallerOrganisation = (callerOrganisation) => ({
  type: UPDATE_CASE_LIST_SEARCH_CALLER_ORGANISATION,
  callerOrganisation,
});
export const updateCaseListSearchCentreName = (centreName) => ({
  type: UPDATE_CASE_LIST_SEARCH_CENTRE_NAME,
  centreName,
});
export const updateCaseListSearchFilter = (filter) => ({
  type: UPDATE_CASE_LIST_SEARCH_FILTER,
  filter,
});
export const updateCaseListSearchId = (naturalId) => ({
  type: UPDATE_CASE_LIST_SEARCH_ID,
  naturalId,
});
export const updateCaseListSearchName = (name) => ({
  type: UPDATE_CASE_LIST_SEARCH_NAME,
  name,
});
export const updateCaseListSearchSex = (sex) => ({
  type: UPDATE_CASE_LIST_SEARCH_SEX,
  sex,
});
export const updateCaseListSearchPostcode = (postcode) => ({
  type: UPDATE_CASE_LIST_SEARCH_POSTCODE,
  postcode,
});
export const updateCaseListSearchTime = (time) => ({
  type: UPDATE_CASE_LIST_SEARCH_TIME,
  time,
});
export const toggleIncidentModal = (linkCaseId) => ({
  type: TOGGLE_INCIDENT_MODAL,
  linkCaseId,
});
export const updateIncidentModalName = (name) => ({
  type: UPDATE_INCIDENT_MODAL_NAME,
  name,
});
export const updateIncidentModalSelected = (selectedId) => ({
  type: UPDATE_INCIDENT_MODAL_SELECTED,
  selectedId,
});
