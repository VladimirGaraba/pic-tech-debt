import {
  TOGGLE_NEW_CALL_MODAL,
  UPDATE_NEW_CALL_MODAL_CALLER_LOCATION,
  UPDATE_NEW_CALL_MODAL_CALLER_ORGANISATION,
  UPDATE_NEW_CALL_MODAL_CENTRE_NAME,
  UPDATE_NEW_CALL_MODAL_FILTER,
  UPDATE_NEW_CALL_MODAL_ID,
  UPDATE_NEW_CALL_MODAL_NAME,
  UPDATE_NEW_CALL_MODAL_SELECTED,
  UPDATE_NEW_CALL_MODAL_SEX,
  UPDATE_NEW_CALL_MODAL_POSTCODE,
  UPDATE_NEW_CALL_MODAL_TIME,
} from './constants';

export const toggleNewCallModal = () => ({
  type: TOGGLE_NEW_CALL_MODAL,
});

export const updateNewCallModalCallerLocation = (callerLocation) => ({
  type: UPDATE_NEW_CALL_MODAL_CALLER_LOCATION,
  callerLocation,
});

export const updateNewCallModalCallerOrganisation = (callerOrganisation) => ({
  type: UPDATE_NEW_CALL_MODAL_CALLER_ORGANISATION,
  callerOrganisation,
});

export const updateNewCallModalCentreName = (centreName) => ({
  type: UPDATE_NEW_CALL_MODAL_CENTRE_NAME,
  centreName,
});

export const updateNewCallModalFilter = (filter) => ({
  type: UPDATE_NEW_CALL_MODAL_FILTER,
  filter,
});

export const updateNewCallModalId = (naturalId) => ({
  type: UPDATE_NEW_CALL_MODAL_ID,
  naturalId,
});

export const updateNewCallModalName = (name) => ({
  type: UPDATE_NEW_CALL_MODAL_NAME,
  name,
});

export const updateNewCallModalPostcode = (postcode) => ({
  type: UPDATE_NEW_CALL_MODAL_POSTCODE,
  postcode,
});

export const updateNewCallModalSelected = (id) => ({
  type: UPDATE_NEW_CALL_MODAL_SELECTED,
  selected: id,
});

export const updateNewCallModalSex = (sex) => ({
  type: UPDATE_NEW_CALL_MODAL_SEX,
  sex,
});

export const updateNewCallModalTime = (time) => ({
  type: UPDATE_NEW_CALL_MODAL_TIME,
  time,
});
