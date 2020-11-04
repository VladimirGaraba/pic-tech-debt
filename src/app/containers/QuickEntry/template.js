import moment from 'moment/moment';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _isUndefined from 'lodash/isUndefined';

import { connect } from 'react-redux';

import {
  updateTemplateCaseType,
  updateTemplateMacro,
  updateTemplateTopic,
} from 'containers/CaseEntry/actions/template';

import {
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
  addTemplateAgent,
} from 'containers/AgentEntry/actions/template';

import {
  updateTemplatePatientAddress1,
  updateTemplatePatientAge,
  updateTemplatePatientAgeGroup,
  updateTemplatePatientAgeYears,
  updateTemplatePatientAnimalType,
  updateTemplatePatientCategory,
  updateTemplatePatientCircumstance,
  updateTemplatePatientCountry,
  updateTemplatePatientGeometry,
  updateTemplatePatientISOCountry,
  updateTemplatePatientLocation,
  updateTemplatePatientLocationName,
  updateTemplatePatientName,
  updateTemplatePatientPlaceId,
  updateTemplatePatientPoisonSeverityScore,
  updateTemplatePatientPostcode,
  updateTemplatePatientRiskAssessment,
  updateTemplatePatientSex,
  updateTemplatePatientState,
  updateTemplatePatientSuburb,
  updateTemplatePatientTelephone,
  updateTemplatePatientWeight,
} from 'containers/PatientEntry/actions/template';

import {
  updateTemplateClinicalFeaturesDescriptors,
} from 'containers/ClinicalFeaturesEntry/actions/template';

import { makeSelectCurrentTemplate, makeSelectEditingTemplate, makeSelectSPIFull, selectVars, selectTemplates } from 'containers/App/selectors';

import QuickView from 'components/QuickView';

import {
  isValidMacro,
  generateUuid,
  parseGoogleAddressComponent,
  updateAgeGroup as _updateAgeGroup,
  updateAgeYears as _updateAgeYears,
} from 'utils/helpers';

const makeMapStateToProps = () => {
  const selectSPIFull = makeSelectSPIFull();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const templates = selectTemplates(state);
    const { quickView, currentTemplateId, editingTemplateId } = vars;
    const currentTemplate = !_isEmpty(editingTemplateId) ? makeSelectEditingTemplate()(state) : makeSelectCurrentTemplate()(state);
    const macro = vars.editingTemplateMacro.current ? vars.editingTemplateMacro.current : '';

    const type = currentTemplate.type;
    const topic = currentTemplate.topic ? currentTemplate.topic : '';

    const patient = currentTemplate.patient;
    const patientName = (patient && patient.name) ? patient.name : '';
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

    const currentFeatures = currentTemplate.features && currentTemplate.features.length > 0 ? currentTemplate.features[currentTemplate.features.length - 1] : {};

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

    const agents = (currentTemplate.agents) ? currentTemplate.agents : {};

    const list = currentFeatures && currentFeatures.descriptors ? currentFeatures.descriptors : {};
    let featuresDescriptorList = [];
    if (!(list instanceof Array) && !_isEmpty(list)) {
      Object.keys(list).forEach((parent) => {
        featuresDescriptorList = featuresDescriptorList.concat(_map(list[parent], (el) => [parent, el].join('|')));
      });
    }

    const data = {
      currentTemplateId,
      editingTemplateId,

      currentRecordId: currentTemplateId,

      type,
      topic,
      macro,
      isValidMacro: isValidMacro(vars.uiMode, vars.editingTemplateMacro.initial, vars.editingTemplateMacro.current, templates),

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
    };

    return data;
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  markAsCase: () => {
    dispatch(updateTemplateCaseType(ownProps.recordId, 'case'));
  },
  markAsInquiry: () => {
    dispatch(updateTemplateCaseType(ownProps.recordId, 'inquiry'));
  },
  markAsHoax: () => {
    dispatch(updateTemplateCaseType(ownProps.recordId, 'hoax'));
  },
  updateCaseTopic: (old, topic) => {
    dispatch(updateTemplateTopic(ownProps.recordId, old, topic));
  },

  updatePatientName: (old, name, appKey) => {
    dispatch(updateTemplatePatientName(ownProps.recordId, old, name, appKey));
  },
  updatePatientAge: (oldAge, age, oldAgeUnits, ageUnits, oldAgeGroup, oldAgeYears) => {
    dispatch(updateTemplatePatientAge(ownProps.recordId, oldAge, age, oldAgeUnits, ageUnits));
    _updateAgeGroup(age, ageUnits, oldAgeGroup, ownProps, updateTemplatePatientAgeGroup, dispatch);
    _updateAgeYears(age, ageUnits, oldAgeYears, ownProps, updateTemplatePatientAgeYears, dispatch);
  },
  updatePatientWeight: (oldWeight, weight, oldWeightUnits, weightUnits) => {
    dispatch(updateTemplatePatientWeight(ownProps.recordId, oldWeight, weight, oldWeightUnits, weightUnits));
  },
  updatePatientSex: (old, sex) => {
    dispatch(updateTemplatePatientSex(ownProps.recordId, old, sex));
  },
  updatePatientCategory: (old, category) => {
    dispatch(updateTemplatePatientCategory(ownProps.recordId, old, category));
  },
  updatePatientAnimalType: (old, animalType) => {
    dispatch(updateTemplatePatientAnimalType(ownProps.recordId, old, animalType));
  },

  updatePatientCircumstance: (old, circumstance) => {
    dispatch(updateTemplatePatientCircumstance(ownProps.recordId, old, circumstance));
  },
  updatePatientLocation: (old, location) => {
    dispatch(updateTemplatePatientLocation(ownProps.recordId, old, location));
  },
  updatePatientLocality: (suggest, old, data) => {
    if (suggest) {
      const map = new google.maps.Map(document.createElement('div')); // eslint-disable-line no-undef
      const placesService = new google.maps.places.PlacesService(map); // eslint-disable-line no-undef

      try {
        placesService.getDetails({ placeId: suggest.placeId }, (place) => {
          const address = parseGoogleAddressComponent(place.address_components);
          dispatch(updateTemplatePatientPlaceId(ownProps.recordId, old.placeId, !_isUndefined(suggest.placeId) ? suggest.placeId : ''));
          dispatch(updateTemplatePatientLocationName(ownProps.recordId, old.name, place.name));
          dispatch(updateTemplatePatientAddress1(ownProps.recordId, old.address1, !_isUndefined(address.street) ? address.street : ''));
          dispatch(updateTemplatePatientSuburb(ownProps.recordId, old.city, !_isUndefined(address.city) ? address.city : ''));
          dispatch(updateTemplatePatientState(ownProps.recordId, old.state, !_isUndefined(address.state) ? address.state : ''));
          dispatch(updateTemplatePatientCountry(ownProps.recordId, old.country, !_isUndefined(address.country) ? address.country : ''));
          dispatch(updateTemplatePatientISOCountry(ownProps.recordId, old.isoCountry, !_isUndefined(address.isoCountry) ? address.isoCountry : ''));
          dispatch(updateTemplatePatientPostcode(ownProps.recordId, old.postcode, !_isUndefined(address.zip) ? address.zip : ''));
          dispatch(updateTemplatePatientTelephone(ownProps.recordId, old.telephone, !_isUndefined(place.formatted_phone_number) ? place.formatted_phone_number : ''));
          dispatch(updateTemplatePatientGeometry(ownProps.recordId, old.geometry, { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }));
        });
      } catch (e) {
        // No action
      }
    } else if (data) {
      dispatch(updateTemplatePatientPlaceId(ownProps.recordId, old.placeId, !_isUndefined(data.placeId) ? data.placeId : ''));
      dispatch(updateTemplatePatientLocationName(ownProps.recordId, old.name, !_isUndefined(data.name) ? data.name : ''));
      dispatch(updateTemplatePatientAddress1(ownProps.recordId, old.address1, !_isUndefined(data.address1) ? data.address1 : ''));
      dispatch(updateTemplatePatientSuburb(ownProps.recordId, old.city, !_isUndefined(data.city) ? data.city : ''));
      dispatch(updateTemplatePatientState(ownProps.recordId, old.state, !_isUndefined(data.state) ? data.state : ''));
      dispatch(updateTemplatePatientCountry(ownProps.recordId, old.country, !_isUndefined(data.country) ? data.country : ''));
      dispatch(updateTemplatePatientISOCountry(ownProps.recordId, old.isoCountry, !_isUndefined(data.isoCountry) ? data.isoCountry : ''));
      dispatch(updateTemplatePatientPostcode(ownProps.recordId, old.postcode, !_isUndefined(data.postcode) ? data.postcode : ''));
      dispatch(updateTemplatePatientTelephone(ownProps.recordId, old.telephone, !_isUndefined(data.telephone) ? data.telephone : ''));
      dispatch(updateTemplatePatientGeometry(ownProps.recordId, old.geometry, !_isUndefined(data.geometry) ? data.geometry : {}));
    }
  },
  updatePatientPostcode: (old, postcode) => {
    dispatch(updateTemplatePatientPostcode(ownProps.recordId, old, postcode));
  },
  updatePatientSuburb: (old, suburb) => {
    dispatch(updateTemplatePatientSuburb(ownProps.recordId, old, suburb));
  },
  updatePatientGeometry: (old, geometry) => {
    dispatch(updateTemplatePatientGeometry(ownProps.recordId, old, geometry));
  },

  updatePatientRiskAssessment: (old, riskAssessment) => {
    dispatch(updateTemplatePatientRiskAssessment(ownProps.recordId, old, riskAssessment));
  },
  updatePatientPoisonSeverityScore: (old, poisonSeverityScore) => {
    dispatch(updateTemplatePatientPoisonSeverityScore(ownProps.recordId, old, poisonSeverityScore));
  },

  updateClinicalFeaturesDescriptorList: (descriptorList) => {
    if (typeof (descriptorList) !== 'undefined') {
      dispatch(updateTemplateClinicalFeaturesDescriptors(ownProps.recordId, getDescriptors(descriptorList)));
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
    dispatch(addTemplateAgent(ownProps.recordId, name, quantity, quantityUnits, quantityUnknown, moment(timeOfExposure, 'YYYY-MM-DDTHH:mm:ss.SSSZ').isValid() ? moment(timeOfExposure).toISOString() : '', duration, durationUnits, durationUnknown, typeOfExposure, routeOfExposure, agentId));
    dispatch(resetQuickView());
  },
  updateTemplateMacro: (old, macro) => {
    dispatch(updateTemplateMacro(ownProps.recordId, old, macro));
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
