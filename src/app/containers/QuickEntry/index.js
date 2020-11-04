import moment from 'moment/moment';
import aes256 from 'aes256';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _isUndefined from 'lodash/isUndefined';

import { connect } from 'react-redux';

import {
  updateCaseTopic,
  updateCaseType,
} from 'containers/CaseEntry/actions/case';

import {
  lookupMacroTemplate,
  updateDocument,
} from 'containers/App/actions';

import {
  addAgent,
  resetQuickView,
  updateQuickViewAgentDuration,
  updateQuickViewAgentDurationUnits,
  updateQuickViewAgentDurationUnknown,
  updateQuickViewAgentName,
  updateQuickViewAgentQuantity,
  updateQuickViewAgentQuantityUnits,
  updateQuickViewAgentQuantityUnknown,
  updateQuickViewAgentRouteOfExposure,
  updateQuickViewAgentTimeOfExposure,
  updateQuickViewAgentTypeOfExposure,
} from 'containers/AgentEntry/actions/case';

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
} from 'containers/InterlocutorEntry/actions';

import {
  updatePatientAddress1,
  updatePatientAge,
  updatePatientAgeGroup,
  updatePatientAgeYears,
  updatePatientAnimalType,
  updatePatientCategory,
  updatePatientCircumstance,
  updatePatientCountry,
  updatePatientGeometry,
  updatePatientISOCountry,
  updatePatientLocation,
  updatePatientLocationName,
  updatePatientName,
  updatePatientPlaceId,
  updatePatientPoisonSeverityScore,
  updatePatientPostcode,
  updatePatientRiskAssessment,
  updatePatientSex,
  updatePatientState,
  updatePatientSuburb,
  updatePatientTelephone,
  updatePatientWeight,
} from 'containers/PatientEntry/actions/case';

import {
  updateClinicalFeaturesDescriptors,
} from 'containers/ClinicalFeaturesEntry/actions/case';

import { makeSelectAppKey, makeSelectCurrentCase, makeSelectSPIFull, selectTemplates, selectVars } from 'containers/App/selectors';

import QuickView from 'components/QuickView';

import {
  executeMacro,
  generateUuid,
  parseGoogleAddressComponent,
  updateAgeGroup as _updateAgeGroup,
  updateAgeYears as _updateAgeYears,
} from 'utils/helpers';

const makeMapStateToProps = () => {
  const selectCurrentCase = makeSelectCurrentCase();
  const selectSPIFull = makeSelectSPIFull();
  const selectAppKey = makeSelectAppKey();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const templates = selectTemplates(state);
    const { currentRecordId, callRecordId, quickView } = vars;
    const currentCase = selectCurrentCase(state);
    const appKey = selectAppKey(state);

    const type = currentCase.type;
    const topic = currentCase.topic ? currentCase.topic : '';
    const template = (!_isEmpty(vars.macro) && vars.macro in templates) ? templates[vars.macro] : undefined;

    let currentComms;
    if (currentCase.communications && currentCase.communications.length > 0) {
      currentComms = currentCase.communications[currentCase.communications.length - 1];
    }

    const interlocutor = currentComms && currentComms.interlocutor ? currentComms.interlocutor : undefined;
    let interlocutorName;
    if (!_isEmpty(currentCase.appKeyId)) {
      interlocutorName = (interlocutor && !_isEmpty(interlocutor.nameEnc)) ? aes256.decrypt(appKey.key, interlocutor.nameEnc) : '';
    } else {
      interlocutorName = (interlocutor && interlocutor.name) ? interlocutor.name : '';
    }
    let interlocutorMediumDetail;
    if (!_isEmpty(currentCase.appKeyId)) {
      interlocutorMediumDetail = (currentComms && currentComms.medium && !_isEmpty(currentComms.medium.detailEnc)) ? aes256.decrypt(appKey.key, currentComms.medium.detailEnc) : '';
    } else {
      interlocutorMediumDetail = (currentComms && currentComms.medium && currentComms.medium.detail) ? currentComms.medium.detail : '';
    }
    const interlocutorDirection = (currentComms && currentComms.direction) ? currentComms.direction : undefined;
    const interlocutorPostcode = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.postcode : '';
    const interlocutorCity = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.city : '';
    const interlocutorGeometry = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.geometry : '';
    const interlocutorOrganisation = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.name : '';
    const interlocutorCategory = (interlocutor && interlocutor.category) ? interlocutor.category : '';

    const patient = currentCase.patient;
    let patientName;
    if (!_isEmpty(currentCase.appKeyId)) {
      patientName = (patient && !_isEmpty(patient.nameEnc)) ? aes256.decrypt(appKey.key, patient.nameEnc) : '';
    } else {
      patientName = (patient && patient.name) ? patient.name : '';
    }
    const patientAge = (patient && patient.age) ? patient.age : '';
    const patientAgeUnits = (patient && patient.ageUnits) ? patient.ageUnits : '';
    const patientAgeGroup = (patient && patient.ageGroup) ? patient.ageGroup : '';
    const patientAgeYears = (patient && patient.ageYears) ? patient.ageYears : '';
    const patientWeight = (patient && patient.weight) ? patient.weight : '';
    const patientWeightUnits = (patient && patient.weightUnits) ? patient.weightUnits : '';
    const patientSex = (patient && patient.gender) ? patient.gender : '';
    const patientCategory = (patient && patient.category) ? patient.category : '';
    const patientAnimalType = (patient && patient.animalType) ? patient.animalType : '';
    const patientCircumstance = (patient && patient.circumstance) ? patient.circumstance : '';
    const patientLocation = (patient && patient.locality && patient.locality.location) ? patient.locality.location : '';
    const patientSuburb = (patient && patient.locality && patient.locality.suburb) ? patient.locality.suburb : '';
    const patientPostcode = (patient && patient.locality && patient.locality.postcode) ? patient.locality.postcode : '';
    const patientGeometry = (patient && patient.locality && patient.locality.geometry) ? patient.locality.geometry : {};
    const patientRiskAssessment = (patient && patient.riskAssessment) ? patient.riskAssessment : '';
    const patientPoisonSeverityScore = (patient && patient.poisonSeverityScore) ? patient.poisonSeverityScore : '';

    const currentFeatures = currentCase.features && currentCase.features.length > 0 ? currentCase.features[currentCase.features.length - 1] : {};

    const agentName = (quickView) ? quickView.name : '';
    const agentQuantity = (quickView && quickView.dosage) ? quickView.dosage.quantity : '';
    const agentQuantityUnits = (quickView && quickView.dosage) ? quickView.dosage.units : '';
    const agentQuantityUnknown = (quickView && quickView.dosage) ? quickView.dosage.unknown : false;
    const agentTimeOfExposure = (quickView && quickView.exposure && moment(quickView.exposure.timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ').isValid()) ? moment(quickView.exposure.timestamp).format('YYYY-MM-DD HH:mm') : '';
    const agentDuration = (quickView && quickView.exposure) ? quickView.exposure.duration : '';
    const agentDurationUnits = (quickView && quickView.exposure) ? quickView.exposure.durationUnits : '';
    const agentDurationUnknown = (quickView && quickView.exposure) ? quickView.exposure.durationUnknown : false;
    const agentTypeOfExposure = (quickView && quickView.exposure) ? quickView.exposure.type : '';
    const agentRouteOfExposure = (quickView && quickView.exposure) ? quickView.exposure.route : [];

    const agents = (currentCase.agents) ? currentCase.agents : {};

    const list = currentFeatures && currentFeatures.descriptors ? currentFeatures.descriptors : {};
    let featuresDescriptorList = [];
    if (!(list instanceof Array) && !_isEmpty(list)) {
      Object.keys(list).forEach((parent) => {
        featuresDescriptorList = featuresDescriptorList.concat(_map(list[parent], (el) => [parent, el].join('|')));
      });
    }

    const data = {
      callRecordId,
      currentRecordId,
      currentCase,

      type,
      topic,
      template,

      interlocutorName,
      interlocutorMediumDetail,
      interlocutorPostcode,
      interlocutorCity,
      interlocutorGeometry,
      interlocutorDirection,
      interlocutorOrganisation,
      interlocutorCategory,

      patientName,
      patientAge,
      patientAgeUnits,
      patientAgeGroup,
      patientAgeYears,
      patientWeight,
      patientWeightUnits,
      patientSex,
      patientCategory,
      patientAnimalType,

      patientCircumstance,
      patientLocation,
      patientSuburb,
      patientPostcode,
      patientGeometry,

      patientRiskAssessment,
      patientPoisonSeverityScore,

      featuresDescriptorList,

      agentName,
      agentQuantity,
      agentQuantityUnits,
      agentQuantityUnknown,
      agentTimeOfExposure,
      agentDuration,
      agentDurationUnits,
      agentDurationUnknown,
      agentTypeOfExposure,
      agentRouteOfExposure,
      agents,

      userSPIFull: selectSPIFull(state),
      orgCountry: vars.jwtClaims.org_country ? vars.jwtClaims.org_country : '',
      appKey,
    };

    return data;
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  markAsCase: () => {
    dispatch(updateCaseType(ownProps.recordId, 'case'));
  },
  markAsInquiry: () => {
    dispatch(updateCaseType(ownProps.recordId, 'inquiry'));
  },
  markAsHoax: () => {
    dispatch(updateCaseType(ownProps.recordId, 'hoax'));
  },
  updateCaseTopic: (old, topic) => {
    dispatch(updateCaseTopic(ownProps.recordId, old, topic));
  },
  updateInterlocutorName: (name, appKey) => {
    dispatch(updateInterlocutorName(ownProps.recordId, name, appKey));
  },
  updateInterlocutorMediumDetail: (detail, appKey) => {
    dispatch(updateInterlocutorMediumDetail(ownProps.recordId, detail, appKey));
  },
  updateInterlocutorPostcode: (postcode) => {
    dispatch(updateInterlocutorPostcode(ownProps.recordId, postcode));
  },
  updateInterlocutorDirection: (direction) => {
    dispatch(updateInterlocutorDirection(ownProps.recordId, direction));
  },
  updateInterlocutorOrganisation: (suggest) => {
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
        // Do nothing
      }
    }
  },

  updateInterlocutorMedium: (medium) => {
    dispatch(updateInterlocutorMedium(ownProps.recordId, medium));
  },
  updateInterlocutorCategory: (category) => {
    dispatch(updateInterlocutorCategory(ownProps.recordId, category));
  },
  updateInterlocutorContactDetail: (contact) => {
    dispatch(updateInterlocutorContactDetail(ownProps.recordId, contact));
  },
  updateInterlocutorLocation: (old, location) => {
    dispatch(updateInterlocutorLocation(ownProps.recordId, old, location));
  },
  updateInterlocutorAddress1: (address1) => {
    dispatch(updateInterlocutorAddress1(ownProps.recordId, address1));
  },
  updateInterlocutorAddress2: (address2) => {
    dispatch(updateInterlocutorAddress2(ownProps.recordId, address2));
  },
  updateInterlocutorCity: (city) => {
    dispatch(updateInterlocutorCity(ownProps.recordId, city));
  },
  updateInterlocutorState: (state) => {
    dispatch(updateInterlocutorState(ownProps.recordId, state));
  },
  updateInterlocutorCountry: (country) => {
    dispatch(updateInterlocutorCountry(ownProps.recordId, country));
  },
  updateInterlocutorTelephone: (telephone) => {
    dispatch(updateInterlocutorTelephone(ownProps.recordId, telephone));
  },

  updatePatientName: (old, name, appKey) => {
    dispatch(updatePatientName(ownProps.recordId, old, name, appKey));
  },
  updatePatientAge: (oldAge, age, oldAgeUnits, ageUnits, oldAgeGroup, oldAgeYears) => {
    dispatch(updatePatientAge(ownProps.recordId, oldAge, age, oldAgeUnits, ageUnits));
    _updateAgeGroup(age, ageUnits, oldAgeGroup, ownProps, updatePatientAgeGroup, dispatch);
    _updateAgeYears(age, ageUnits, oldAgeYears, ownProps, updatePatientAgeYears, dispatch);
  },
  updatePatientWeight: (oldWeight, weight, oldWeightUnits, weightUnits) => {
    dispatch(updatePatientWeight(ownProps.recordId, oldWeight, weight, oldWeightUnits, weightUnits));
  },
  updatePatientSex: (old, sex) => {
    dispatch(updatePatientSex(ownProps.recordId, old, sex));
  },
  updatePatientCategory: (old, category) => {
    dispatch(updatePatientCategory(ownProps.recordId, old, category));
  },
  updatePatientAnimalType: (old, animalType) => {
    dispatch(updatePatientAnimalType(ownProps.recordId, old, animalType));
  },

  updatePatientCircumstance: (old, circumstance) => {
    dispatch(updatePatientCircumstance(ownProps.recordId, old, circumstance));
  },
  updatePatientLocation: (old, location) => {
    dispatch(updatePatientLocation(ownProps.recordId, old, location));
  },
  updatePatientLocality: (suggest, old, data) => {
    if (suggest) {
      const map = new google.maps.Map(document.createElement('div')); // eslint-disable-line no-undef
      const placesService = new google.maps.places.PlacesService(map); // eslint-disable-line no-undef

      try {
        placesService.getDetails({ placeId: suggest.placeId }, (place) => {
          const address = parseGoogleAddressComponent(place.address_components);
          dispatch(updatePatientPlaceId(ownProps.recordId, old.placeId, !_isUndefined(suggest.placeId) ? suggest.placeId : ''));
          dispatch(updatePatientLocationName(ownProps.recordId, old.name, place.name));
          dispatch(updatePatientAddress1(ownProps.recordId, old.address1, !_isUndefined(address.street) ? address.street : ''));
          dispatch(updatePatientSuburb(ownProps.recordId, old.city, !_isUndefined(address.city) ? address.city : ''));
          dispatch(updatePatientState(ownProps.recordId, old.state, !_isUndefined(address.state) ? address.state : ''));
          dispatch(updatePatientCountry(ownProps.recordId, old.country, !_isUndefined(address.country) ? address.country : ''));
          dispatch(updatePatientISOCountry(ownProps.recordId, old.isoCountry, !_isUndefined(address.isoCountry) ? address.isoCountry : ''));
          dispatch(updatePatientPostcode(ownProps.recordId, old.postcode, !_isUndefined(address.zip) ? address.zip : ''));
          dispatch(updatePatientTelephone(ownProps.recordId, old.telephone, !_isUndefined(place.formatted_phone_number) ? place.formatted_phone_number : ''));
          dispatch(updatePatientGeometry(ownProps.recordId, old.geometry, { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }));
        });
      } catch (e) {
        // No action
      }
    } else if (data) {
      dispatch(updatePatientPlaceId(ownProps.recordId, old.placeId, !_isUndefined(data.placeId) ? data.placeId : ''));
      dispatch(updatePatientLocationName(ownProps.recordId, old.name, !_isUndefined(data.name) ? data.name : ''));
      dispatch(updatePatientAddress1(ownProps.recordId, old.address1, !_isUndefined(data.address1) ? data.address1 : ''));
      dispatch(updatePatientSuburb(ownProps.recordId, old.city, !_isUndefined(data.city) ? data.city : ''));
      dispatch(updatePatientState(ownProps.recordId, old.state, !_isUndefined(data.state) ? data.state : ''));
      dispatch(updatePatientCountry(ownProps.recordId, old.country, !_isUndefined(data.country) ? data.country : ''));
      dispatch(updatePatientISOCountry(ownProps.recordId, old.isoCountry, !_isUndefined(data.isoCountry) ? data.isoCountry : ''));
      dispatch(updatePatientPostcode(ownProps.recordId, old.postcode, !_isUndefined(data.postcode) ? data.postcode : ''));
      dispatch(updatePatientTelephone(ownProps.recordId, old.telephone, !_isUndefined(data.telephone) ? data.telephone : ''));
      dispatch(updatePatientGeometry(ownProps.recordId, old.geometry, !_isUndefined(data.geometry) ? data.geometry : {}));
    }
  },
  updatePatientPostcode: (old, postcode) => {
    dispatch(updatePatientPostcode(ownProps.recordId, old, postcode));
  },
  updatePatientSuburb: (old, suburb) => {
    dispatch(updatePatientSuburb(ownProps.recordId, old, suburb));
  },
  updatePatientGeometry: (old, geometry) => {
    dispatch(updatePatientGeometry(ownProps.recordId, old, geometry));
  },

  updatePatientRiskAssessment: (old, riskAssessment) => {
    dispatch(updatePatientRiskAssessment(ownProps.recordId, old, riskAssessment));
  },
  updatePatientPoisonSeverityScore: (old, poisonSeverityScore) => {
    dispatch(updatePatientPoisonSeverityScore(ownProps.recordId, old, poisonSeverityScore));
  },

  updateClinicalFeaturesDescriptorList: (descriptorList) => {
    if (typeof (descriptorList) !== 'undefined') {
      dispatch(updateClinicalFeaturesDescriptors(ownProps.recordId, getDescriptors(descriptorList)));
    }
  },

  updateAgentName: (name) => {
    dispatch(updateQuickViewAgentName(name));
  },
  updateAgentQuantity: (quantity) => {
    dispatch(updateQuickViewAgentQuantity(quantity));
  },
  updateAgentQuantityUnits: (quantityUnits) => {
    dispatch(updateQuickViewAgentQuantityUnits(quantityUnits));
  },
  updateAgentQuantityUnknown: (quantityUnknown) => {
    dispatch(updateQuickViewAgentQuantityUnknown(quantityUnknown));
  },
  updateAgentTimeOfExposure: (timeSinceExposure, timeSinceExposureUnits) => {
    let realTimeSinceExposure = timeSinceExposure;
    let realTimeSinceExposureUnits = timeSinceExposureUnits;
    if (timeSinceExposureUnits) {
      // https://momentjs.com/docs/#/manipulating/subtract/
      switch (timeSinceExposureUnits) {
        case 'Days':
          realTimeSinceExposureUnits = 'Hours';
          realTimeSinceExposure = parseFloat(timeSinceExposure) * 24;
          break;
        case 'Months':
          realTimeSinceExposureUnits = 'Days';
          realTimeSinceExposure = parseFloat(timeSinceExposure) * 28;
          break;
        default:
          break;
      }
      const timeOfExposure = moment().subtract(realTimeSinceExposure, realTimeSinceExposureUnits.toLowerCase()).toISOString();
      dispatch(updateQuickViewAgentTimeOfExposure(timeOfExposure));
    }
  },
  updateAgentDuration: (duration) => {
    dispatch(updateQuickViewAgentDuration(duration));
  },
  updateAgentDurationUnits: (durationUnits) => {
    dispatch(updateQuickViewAgentDurationUnits(durationUnits));
  },
  updateAgentDurationUnknown: (durationUnknown) => {
    dispatch(updateQuickViewAgentDurationUnknown(durationUnknown));
  },
  updateAgentTypeOfExposure: (typeOfExposure) => {
    dispatch(updateQuickViewAgentTypeOfExposure(typeOfExposure));
  },
  updateAgentRouteOfExposure: (routeOfExposure) => {
    dispatch(updateQuickViewAgentRouteOfExposure(routeOfExposure));
  },
  addAgent: (name, quantity, quantityUnits, quantityUnknown, timeOfExposure, duration, durationUnits, durationUnknown, typeOfExposure, routeOfExposure) => {
    const agentId = generateUuid();
    dispatch(addAgent(ownProps.recordId, name, quantity, quantityUnits, quantityUnknown, moment(timeOfExposure, 'YYYY-MM-DDTHH:mm:ss.SSSZ').isValid() ? moment(timeOfExposure).toISOString() : '', duration, durationUnits, durationUnknown, typeOfExposure, routeOfExposure, agentId));
    dispatch(resetQuickView());
  },
  lookupMacroTemplate: (macro) => {
    dispatch(lookupMacroTemplate(macro));
  },
  executeMacro: (document, template) => {
    const updatedDocument = executeMacro(document, template);
    dispatch(updateDocument(updatedDocument));
  },
});

function getDescriptors(descriptorList) {
  const checked = {};
  descriptorList.forEach((item) => {
    if (!checked[item.category]) {
      checked[item.category] = [];
    }
    checked[item.category].push(item.id.split('|')[1]);
  });

  return checked;
}

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(QuickView);
