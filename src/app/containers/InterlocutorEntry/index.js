import { connect } from 'react-redux';
import aes256 from 'aes256';
import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';

import InterlocutorView from 'components/InterlocutorView';

import { parseGoogleAddressComponent } from 'utils/helpers';

import { makeSelectAppKey, makeSelectCurrentCase, makeSelectSPIFull, selectVars } from 'containers/App/selectors';

import {
  updateInterlocutorName,
  updateInterlocutorMedium,
  updateInterlocutorMediumDetail,
  updateInterlocutorDirection,
  updateInterlocutorCategory,
  updateInterlocutorContactDetail,
  updateInterlocutorPlaceId,
  updateInterlocutorLocation,
  updateInterlocutorOrganisation,
  updateInterlocutorAddress1,
  updateInterlocutorAddress2,
  updateInterlocutorCity,
  updateInterlocutorState,
  updateInterlocutorPostcode,
  updateInterlocutorCountry,
  updateInterlocutorISOCountry,
  updateInterlocutorTelephone,
  updateInterlocutorGeometry,
} from './actions';

const makeMapStateToProps = () => {
  const selectSPIFull = makeSelectSPIFull();
  const selectAppKey = makeSelectAppKey();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const { currentRecordId, callRecordId } = vars;
    const currentCase = makeSelectCurrentCase()(state);
    const appKey = selectAppKey(state);

    let currentComms;
    if (currentCase.communications && currentCase.communications.length > 0) {
      currentComms = currentCase.communications[currentCase.communications.length - 1];
    }

    const medium = currentComms && currentComms.medium ? currentComms.medium.type : '';
    let mediumDetail;
    if (!_isEmpty(currentCase.appKeyId)) {
      mediumDetail = (currentComms && currentComms.medium && !_isEmpty(currentComms.medium.detailEnc)) ? aes256.decrypt(appKey.key, currentComms.medium.detailEnc) : '';
    } else {
      mediumDetail = (currentComms && currentComms.medium && currentComms.medium.detail) ? currentComms.medium.detail : '';
    }
    const direction = currentComms ? currentComms.direction : '';

    const interlocutor = currentComms && currentComms.interlocutor ? currentComms.interlocutor : null;
    let name;
    if (!_isEmpty(currentCase.appKeyId)) {
      name = (interlocutor && !_isEmpty(interlocutor.nameEnc)) ? aes256.decrypt(appKey.key, interlocutor.nameEnc) : '';
    } else {
      name = (interlocutor && interlocutor.name) ? interlocutor.name : '';
    }
    const category = (interlocutor && interlocutor.category) ? interlocutor.category : '';
    const contact = (interlocutor && interlocutor.contact) ? interlocutor.contact : '';
    const organisation = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.name : '';
    const location = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.location : '';
    const address1 = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.address1 : '';
    const address2 = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.address2 : '';
    const city = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.city : '';
    const interlocutorState = (interlocutor && interlocutor.organisation && interlocutor.organisation.state) ? interlocutor.organisation.state : '';
    const postcode = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.postcode : '';
    const country = (interlocutor && interlocutor.organisation && interlocutor.organisation.country) ? interlocutor.organisation.country : '';
    const telephone = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.telephone : '';

    return {
      currentRecordId,
      callRecordId,

      medium,
      mediumDetail,
      direction,
      name,
      category,
      contact,
      location,
      organisation,
      address1,
      address2,
      city,
      state: interlocutorState,
      postcode,
      country,
      telephone,
      userSPIFull: selectSPIFull(state),
      orgCountry: vars.jwtClaims.org_country ? vars.jwtClaims.org_country : '',
      appKey,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateName: (name, appKey) => {
    dispatch(updateInterlocutorName(ownProps.recordId, name, appKey));
  },
  updateMedium: (medium) => {
    dispatch(updateInterlocutorMedium(ownProps.recordId, medium));
  },
  updateMediumDetail: (detail, appKey) => {
    dispatch(updateInterlocutorMediumDetail(ownProps.recordId, detail, appKey));
  },
  updateDirection: (direction) => {
    dispatch(updateInterlocutorDirection(ownProps.recordId, direction));
  },
  updateCategory: (category) => {
    dispatch(updateInterlocutorCategory(ownProps.recordId, category));
  },
  updateContactDetail: (contact) => {
    dispatch(updateInterlocutorContactDetail(ownProps.recordId, contact));
  },
  updateLocation: (old, location) => {
    dispatch(updateInterlocutorLocation(ownProps.recordId, old, location));
  },
  updateOrganisation: (suggest, data) => {
    if (suggest) {
      if (typeof suggest === 'string' || suggest instanceof String) {
        dispatch(updateInterlocutorOrganisation(ownProps.recordId, suggest));
      } else {
        const map = new google.maps.Map(document.createElement('div')); // eslint-disable-line no-undef
        const placesService = new google.maps.places.PlacesService(map); // eslint-disable-line no-undef

        try {
          placesService.getDetails({ placeId: suggest.placeId }, (place) => {
            const address = parseGoogleAddressComponent(place.address_components);
            dispatch(updateInterlocutorPlaceId(ownProps.recordId, !_isUndefined(suggest.placeId) ? suggest.placeId : ''));
            dispatch(updateInterlocutorOrganisation(ownProps.recordId, place.name));
            dispatch(updateInterlocutorAddress1(ownProps.recordId, !_isUndefined(address.street) ? address.street : ''));
            dispatch(updateInterlocutorCity(ownProps.recordId, !_isUndefined(address.city) ? address.city : ''));
            dispatch(updateInterlocutorState(ownProps.recordId, !_isUndefined(address.state) ? address.state : ''));
            dispatch(updateInterlocutorCountry(ownProps.recordId, !_isUndefined(address.country) ? address.country : ''));
            dispatch(updateInterlocutorISOCountry(ownProps.recordId, !_isUndefined(address.isoCountry) ? address.isoCountry : ''));
            dispatch(updateInterlocutorPostcode(ownProps.recordId, !_isUndefined(address.zip) ? address.zip : ''));
            dispatch(updateInterlocutorTelephone(ownProps.recordId, !_isUndefined(place.formatted_phone_number) ? place.formatted_phone_number : ''));
            dispatch(updateInterlocutorGeometry(ownProps.recordId, { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }));
          });
        } catch (e) {
          // No action
        }
      }
    } else if (data) {
      dispatch(updateInterlocutorPlaceId(ownProps.recordId, !_isUndefined(data.placeId) ? data.placeId : ''));
      dispatch(updateInterlocutorOrganisation(ownProps.recordId, !_isUndefined(data.name) ? data.name : ''));
      dispatch(updateInterlocutorAddress1(ownProps.recordId, !_isUndefined(data.address1) ? data.address1 : ''));
      dispatch(updateInterlocutorCity(ownProps.recordId, !_isUndefined(data.city) ? data.city : ''));
      dispatch(updateInterlocutorState(ownProps.recordId, !_isUndefined(data.state) ? data.state : ''));
      dispatch(updateInterlocutorCountry(ownProps.recordId, !_isUndefined(data.country) ? data.country : ''));
      dispatch(updateInterlocutorISOCountry(ownProps.recordId, !_isUndefined(data.isoCountry) ? data.isoCountry : ''));
      dispatch(updateInterlocutorPostcode(ownProps.recordId, !_isUndefined(data.postcode) ? data.postcode : ''));
      dispatch(updateInterlocutorTelephone(ownProps.recordId, !_isUndefined(data.telephone) ? data.telephone : ''));
      dispatch(updateInterlocutorGeometry(ownProps.recordId, !_isUndefined(data.geometry) ? data.geometry : {}));
    }
  },
  updateAddress1: (address1) => {
    dispatch(updateInterlocutorAddress1(ownProps.recordId, address1));
  },
  updateAddress2: (address2) => {
    dispatch(updateInterlocutorAddress2(ownProps.recordId, address2));
  },
  updateCity: (city) => {
    dispatch(updateInterlocutorCity(ownProps.recordId, city));
  },
  updateState: (state) => {
    dispatch(updateInterlocutorState(ownProps.recordId, state));
  },
  updatePostcode: (postcode) => {
    dispatch(updateInterlocutorPostcode(ownProps.recordId, postcode));
  },
  updateCountry: (country) => {
    dispatch(updateInterlocutorCountry(ownProps.recordId, country));
  },
  updateTelephone: (telephone) => {
    dispatch(updateInterlocutorTelephone(ownProps.recordId, telephone));
  },
});

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(InterlocutorView);
