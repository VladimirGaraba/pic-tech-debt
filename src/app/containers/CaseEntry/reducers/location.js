import { combineReducers } from 'redux';

import {
  UPDATE_INTERLOCUTOR_PLACEID,
  UPDATE_INTERLOCUTOR_ADDRESS1,
  UPDATE_INTERLOCUTOR_ADDRESS2,
  UPDATE_INTERLOCUTOR_CITY,
  UPDATE_INTERLOCUTOR_ISOCOUNTRY,
  UPDATE_INTERLOCUTOR_COUNTRY,
  UPDATE_INTERLOCUTOR_GEOMETRY,
  UPDATE_INTERLOCUTOR_LOCATION,
  UPDATE_INTERLOCUTOR_ORGANISATION,
  UPDATE_INTERLOCUTOR_POSTCODE,
  UPDATE_INTERLOCUTOR_STATE,
  UPDATE_INTERLOCUTOR_TELEPHONE,
} from 'containers/InterlocutorEntry/constants';

import {
  UPDATE_PATIENT_PLACEID,
  UPDATE_PATIENT_ADDRESS1,
  UPDATE_PATIENT_ADDRESS2,
  UPDATE_PATIENT_SUBURB,
  UPDATE_PATIENT_ISOCOUNTRY,
  UPDATE_PATIENT_COUNTRY,
  UPDATE_PATIENT_GEOMETRY,
  UPDATE_PATIENT_LOCATION,
  UPDATE_PATIENT_LOCATION_NAME,
  UPDATE_PATIENT_POSTCODE,
  UPDATE_PATIENT_STATE,
  UPDATE_PATIENT_TELEPHONE,
  UPDATE_TEMPLATE_PATIENT_PLACEID,
  UPDATE_TEMPLATE_PATIENT_ADDRESS1,
  UPDATE_TEMPLATE_PATIENT_ADDRESS2,
  UPDATE_TEMPLATE_PATIENT_SUBURB,
  UPDATE_TEMPLATE_PATIENT_ISOCOUNTRY,
  UPDATE_TEMPLATE_PATIENT_COUNTRY,
  UPDATE_TEMPLATE_PATIENT_GEOMETRY,
  UPDATE_TEMPLATE_PATIENT_LOCATION,
  UPDATE_TEMPLATE_PATIENT_LOCATION_NAME,
  UPDATE_TEMPLATE_PATIENT_POSTCODE,
  UPDATE_TEMPLATE_PATIENT_STATE,
  UPDATE_TEMPLATE_PATIENT_TELEPHONE,
} from 'containers/PatientEntry/constants';

const placeId = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_PLACEID:
    case UPDATE_PATIENT_PLACEID:
    case UPDATE_TEMPLATE_PATIENT_PLACEID:
      return action.placeId;
    default:
      return state;
  }
};

const address1 = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_ADDRESS1:
    case UPDATE_PATIENT_ADDRESS1:
    case UPDATE_TEMPLATE_PATIENT_ADDRESS1:
      return action.address1;
    default:
      return state;
  }
};

const address2 = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_ADDRESS2:
    case UPDATE_PATIENT_ADDRESS2:
    case UPDATE_TEMPLATE_PATIENT_ADDRESS2:
      return action.address2;
    default:
      return state;
  }
};

const city = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_CITY:
      return action.city;
    case UPDATE_PATIENT_SUBURB:
    case UPDATE_TEMPLATE_PATIENT_SUBURB:
      return action.suburb;
    default:
      return state;
  }
};

const country = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_COUNTRY:
    case UPDATE_PATIENT_COUNTRY:
    case UPDATE_TEMPLATE_PATIENT_COUNTRY:
      return action.country;
    default:
      return state;
  }
};

const isoCountry = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_ISOCOUNTRY:
    case UPDATE_PATIENT_ISOCOUNTRY:
    case UPDATE_TEMPLATE_PATIENT_ISOCOUNTRY:
      return action.isoCountry;
    default:
      return state;
  }
};

const geometry = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_GEOMETRY:
    case UPDATE_PATIENT_GEOMETRY:
    case UPDATE_TEMPLATE_PATIENT_GEOMETRY:
      return action.geometry ? { ...action.geometry } : {};
    default:
      return state;
  }
};

const location = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_LOCATION:
    case UPDATE_PATIENT_LOCATION:
    case UPDATE_TEMPLATE_PATIENT_LOCATION:
      return action.location;
    default:
      return state;
  }
};

const name = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_ORGANISATION:
      return action.organisation;
    case UPDATE_PATIENT_LOCATION_NAME:
    case UPDATE_TEMPLATE_PATIENT_LOCATION_NAME:
      return action.locationName;
    default:
      return state;
  }
};

const postcode = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_POSTCODE:
    case UPDATE_PATIENT_POSTCODE:
    case UPDATE_TEMPLATE_PATIENT_POSTCODE:
      return action.postcode;
    default:
      return state;
  }
};

const stateReducer = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_STATE:
    case UPDATE_PATIENT_STATE:
    case UPDATE_TEMPLATE_PATIENT_STATE:
      return action.state;
    default:
      return state;
  }
};

const telephone = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_TELEPHONE:
    case UPDATE_PATIENT_TELEPHONE:
    case UPDATE_TEMPLATE_PATIENT_TELEPHONE:
      return action.telephone ? action.telephone : '';
    default:
      return state;
  }
};

const locationReducer = combineReducers({
  placeId,
  address1,
  address2,
  city,
  isoCountry,
  country,
  geometry,
  location,
  name,
  postcode,
  state: stateReducer,
  telephone,
});
export default locationReducer;
