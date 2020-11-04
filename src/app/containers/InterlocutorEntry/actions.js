import {
  ADD_COMMUNICATION,
  REPLACE_COMMUNICATIONS,
  SET_PAST_TREATMENT_HISTORY,
  SET_PAST_FEATURES_HISTORY,
  UPDATE_COMMUNICATION_STATUS,
  UPDATE_INTERLOCUTOR_NAME,
  UPDATE_INTERLOCUTOR_MEDIUM,
  UPDATE_INTERLOCUTOR_MEDIUM_DETAIL,
  UPDATE_INTERLOCUTOR_DIRECTION,
  UPDATE_INTERLOCUTOR_CATEGORY,
  UPDATE_INTERLOCUTOR_CONTACT_DETAIL,
  UPDATE_INTERLOCUTOR_PLACEID,
  UPDATE_INTERLOCUTOR_LOCATION,
  UPDATE_INTERLOCUTOR_ORGANISATION,
  UPDATE_INTERLOCUTOR_ADDRESS1,
  UPDATE_INTERLOCUTOR_ADDRESS2,
  UPDATE_INTERLOCUTOR_CITY,
  UPDATE_INTERLOCUTOR_STATE,
  UPDATE_INTERLOCUTOR_POSTCODE,
  UPDATE_INTERLOCUTOR_COUNTRY,
  UPDATE_INTERLOCUTOR_ISOCOUNTRY,
  UPDATE_INTERLOCUTOR_TELEPHONE,
  UPDATE_INTERLOCUTOR_GEOMETRY,
} from './constants';

export const addCommunication = (id, spi) => ({
  type: ADD_COMMUNICATION,
  id,
  spi,
});

export const replaceCommunications = (id, communications) => ({
  type: REPLACE_COMMUNICATIONS,
  id,
  communications,
});

export const setPastFeaturesHistory = (pastFeatures) => ({
  type: SET_PAST_FEATURES_HISTORY,
  pastFeatures,
});

export const setPastTreatmentHistory = (pastTreatments) => ({
  type: SET_PAST_TREATMENT_HISTORY,
  pastTreatments,
});

export const updateCommunicationStatus = (id, status, immediate = false) => ({
  type: UPDATE_COMMUNICATION_STATUS,
  id,
  status,
  immediate,
});

export const updateInterlocutorName = (id, name, appKey) => ({
  type: UPDATE_INTERLOCUTOR_NAME,
  id,
  name,
  appKey,
});

export const updateInterlocutorMedium = (id, medium) => ({
  type: UPDATE_INTERLOCUTOR_MEDIUM,
  id,
  medium,
});

export const updateInterlocutorMediumDetail = (id, detail, appKey) => ({
  type: UPDATE_INTERLOCUTOR_MEDIUM_DETAIL,
  id,
  detail,
  appKey,
});

export const updateInterlocutorCategory = (id, category) => ({
  type: UPDATE_INTERLOCUTOR_CATEGORY,
  id,
  category,
});

export const updateInterlocutorContactDetail = (id, contact) => ({
  type: UPDATE_INTERLOCUTOR_CONTACT_DETAIL,
  id,
  contact,
});

export const updateInterlocutorPlaceId = (id, placeId) => ({
  type: UPDATE_INTERLOCUTOR_PLACEID,
  id,
  placeId,
});

export const updateInterlocutorLocation = (id, old, location) => ({
  type: UPDATE_INTERLOCUTOR_LOCATION,
  id,
  old,
  location,
});

export const updateInterlocutorDirection = (id, direction) => ({
  type: UPDATE_INTERLOCUTOR_DIRECTION,
  id,
  direction,
});

export const updateInterlocutorOrganisation = (id, organisation) => ({
  type: UPDATE_INTERLOCUTOR_ORGANISATION,
  id,
  organisation,
});

export const updateInterlocutorAddress1 = (id, address1) => ({
  type: UPDATE_INTERLOCUTOR_ADDRESS1,
  id,
  address1,
});

export const updateInterlocutorAddress2 = (id, address2) => ({
  type: UPDATE_INTERLOCUTOR_ADDRESS2,
  id,
  address2,
});

export const updateInterlocutorCity = (id, city) => ({
  type: UPDATE_INTERLOCUTOR_CITY,
  id,
  city,
});

export const updateInterlocutorState = (id, state) => ({
  type: UPDATE_INTERLOCUTOR_STATE,
  id,
  state,
});

export const updateInterlocutorPostcode = (id, postcode) => ({
  type: UPDATE_INTERLOCUTOR_POSTCODE,
  id,
  postcode,
});

export const updateInterlocutorCountry = (id, country) => ({
  type: UPDATE_INTERLOCUTOR_COUNTRY,
  id,
  country,
});

export const updateInterlocutorISOCountry = (id, isoCountry) => ({
  type: UPDATE_INTERLOCUTOR_ISOCOUNTRY,
  id,
  isoCountry,
});

export const updateInterlocutorTelephone = (id, telephone) => ({
  type: UPDATE_INTERLOCUTOR_TELEPHONE,
  id,
  telephone,
});

export const updateInterlocutorGeometry = (id, geometry) => ({
  type: UPDATE_INTERLOCUTOR_GEOMETRY,
  id,
  geometry,
});
