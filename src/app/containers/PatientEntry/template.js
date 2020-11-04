import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';

import { makeSelectCurrentTemplate, makeSelectEditingTemplate, makeSelectSPI, selectVars, selectTemplates } from 'containers/App/selectors';

import PatientView from 'components/PatientView';

import {
  isValidMacro,
  parseGoogleAddressComponent,
  updateAgeGroup as _updateAgeGroup,
  updateAgeYears as _updateAgeYears,
} from 'utils/helpers';

import {
  lookupMacroTemplate,
} from 'containers/App/actions';

import {
  updateTemplateMacro,
  updateTemplateTopic,
} from 'containers/CaseEntry/actions/template';

import {
  updateTemplatePatientAge,
  updateTemplatePatientAgeGroup,
  updateTemplatePatientAgeYears,
  updateTemplatePatientAnimalType,
  updateTemplatePatientCategory,
  updateTemplatePatientCircumstance,
  updateTemplatePatientLocation,
  updateTemplatePatientMedicalRecordNumber,
  updateTemplatePatientName,
  updateTemplatePatientOccupation,
  updateTemplatePatientPoisonSeverityScore,
  updateTemplatePatientPlaceId,
  updateTemplatePatientLocationName,
  updateTemplatePatientAddress1,
  updateTemplatePatientSuburb,
  updateTemplatePatientState,
  updateTemplatePatientPostcode,
  updateTemplatePatientCountry,
  updateTemplatePatientISOCountry,
  updateTemplatePatientTelephone,
  updateTemplatePatientGeometry,
  updateTemplatePatientPregnantLactating,
  updateTemplatePatientPregnantStatus,
  updateTemplatePatientPregnantTrimester,
  updateTemplatePatientPregnantTrimesterUnknown,
  updateTemplatePatientRiskAssessment,
  updateTemplatePatientSex,
  updateTemplatePatientWeight,
} from './actions/template';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const templates = selectTemplates(state);
    const { editingTemplateId, currentTemplateId } = vars;
    const currentTemplate = !_isEmpty(editingTemplateId) ? makeSelectEditingTemplate()(state) : makeSelectCurrentTemplate()(state);

    const topic = currentTemplate.topic ? currentTemplate.topic : '';
    const macro = vars.editingTemplateMacro.current ? vars.editingTemplateMacro.current : '';

    const patient = currentTemplate.patient;
    const name = (patient && patient.name) ? patient.name : '';
    const category = (patient && patient.category) ? patient.category : '';
    const animalType = (patient && patient.animalType) ? patient.animalType : '';
    const sex = (patient && patient.gender) ? patient.gender : '';
    const age = (patient && patient.age) ? patient.age : '';
    const ageUnits = (patient && patient.ageUnits) ? patient.ageUnits : '';
    const ageGroup = (patient && patient.ageGroup) ? patient.ageGroup : '';
    const ageYears = (patient && patient.ageYears) ? patient.ageYears : '';
    const weight = (patient && patient.weight) ? patient.weight : '';
    const weightUnits = (patient && patient.weightUnits) ? patient.weightUnits : '';
    const occupation = (patient && patient.occupation) ? patient.occupation : '';
    const circumstance = (patient && patient.circumstance) ? patient.circumstance : '';
    const location = (patient && patient.locality && patient.locality.location) ? patient.locality.location : '';
    const placeId = (patient && patient.locality && patient.locality.placeId) ? patient.locality.placeId : '';
    const locationName = (patient && patient.locality && patient.locality.name) ? patient.locality.name : '';
    const address1 = (patient && patient.locality && patient.locality.address1) ? patient.locality.address1 : '';
    const suburb = (patient && patient.locality && patient.locality.city) ? patient.locality.city : '';
    const patientState = (patient && patient.locality && patient.locality.state) ? patient.locality.state : '';
    const postcode = (patient && patient.locality && patient.locality.postcode) ? patient.locality.postcode : '';
    const country = (patient && patient.locality && patient.locality.country) ? patient.locality.country : '';
    const isoCountry = (patient && patient.locality && patient.locality.isoCountry) ? patient.locality.isoCountry : '';
    const telephone = (patient && patient.locality && patient.locality.telephone) ? patient.locality.telephone : '';
    const geometry = (patient && patient.locality && patient.locality.geometry) ? patient.locality.geometry : {};
    const medicalRecordNumber = (patient && patient.medicalRecordNumber) ? patient.medicalRecordNumber : '';
    const pregnantStatus = (patient && patient.pregnant && patient.pregnant.status) ? patient.pregnant.status : 'unknown';
    const pregnantTrimester = (patient && patient.pregnant && patient.pregnant.trimester) ? patient.pregnant.trimester : 'unknown';
    const pregnantTrimesterUnknown = (patient && patient.pregnant) ? patient.pregnant.trimesterUnknown : false;
    const pregnantLactating = (patient && patient.pregnant && patient.pregnant.lactating) ? patient.pregnant.lactating : 'unknown';
    const riskAssessment = (patient) ? patient.riskAssessment : '';
    const poisonSeverityScore = (patient) ? patient.poisonSeverityScore : '';

    return {
      currentTemplateId,
      editingTemplateId,

      topic,
      macro,
      isValidMacro: isValidMacro(vars.uiMode, vars.editingTemplateMacro.initial, vars.editingTemplateMacro.current, templates),

      name,
      category,
      animalType,
      sex,
      age,
      ageUnits,
      ageGroup,
      ageYears,
      weight,
      weightUnits,

      circumstance,
      location,
      placeId,
      locationName,
      address1,
      suburb,
      state: patientState,
      postcode,
      country,
      isoCountry,
      telephone,
      geometry,

      occupation,
      medicalRecordNumber,

      pregnantStatus,
      pregnantTrimester,
      pregnantTrimesterUnknown,
      pregnantLactating,
      riskAssessment,
      poisonSeverityScore,
      orgCountry: vars.jwtClaims.org_country ? vars.jwtClaims.org_country : '',
      userSPI: selectSPI(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateCaseTopic: (old, topic) => {
    dispatch(updateTemplateTopic(ownProps.recordId, old, topic));
  },

  updateName: (old, name) => {
    dispatch(updateTemplatePatientName(ownProps.recordId, old, name));
  },
  updateCategory: (old, category) => {
    dispatch(updateTemplatePatientCategory(ownProps.recordId, old, category));
  },
  updateAnimalType: (old, animalType) => {
    dispatch(updateTemplatePatientAnimalType(ownProps.recordId, old, animalType));
  },
  updateSex: (old, sex) => {
    dispatch(updateTemplatePatientSex(ownProps.recordId, old, sex));
  },
  updateAge: (oldAge, age, oldAgeUnits, ageUnits, oldAgeGroup, oldAgeYears) => {
    dispatch(updateTemplatePatientAge(ownProps.recordId, oldAge, age, oldAgeUnits, ageUnits));
    _updateAgeGroup(age, ageUnits, oldAgeGroup, ownProps, updateTemplatePatientAgeGroup, dispatch);
    _updateAgeYears(age, ageUnits, oldAgeYears, ownProps, updateTemplatePatientAgeYears, dispatch);
  },
  updateAgeGroup: (old, ageGroup) => {
    dispatch(updateTemplatePatientAgeGroup(ownProps.recordId, old, ageGroup));
  },
  updateWeight: (oldWeight, weight, oldWeightUnits, weightUnits) => {
    dispatch(updateTemplatePatientWeight(ownProps.recordId, oldWeight, weight, oldWeightUnits, weightUnits));
  },
  updateCircumstance: (old, circumstance) => {
    dispatch(updateTemplatePatientCircumstance(ownProps.recordId, old, circumstance));
  },
  updateLocation: (old, location) => {
    dispatch(updateTemplatePatientLocation(ownProps.recordId, old, location));
  },
  updateLocality: (suggest, old, data) => {
    if (suggest) {
      const map = new google.maps.Map(document.createElement('div')); // eslint-disable-line no-undef
      const placesService = new google.maps.places.PlacesService(map); // eslint-disable-line no-undef

      try {
        placesService.getDetails({ placeId: suggest.placeId }, (place) => {
          const address = parseGoogleAddressComponent(place.address_components);
          dispatch(updateTemplatePatientPlaceId(ownProps.recordId, old.placeId, !_isUndefined(suggest.placeId) ? suggest.placeId : ''));
          dispatch(updateTemplatePatientLocationName(ownProps.recordId, old.name, place.name));
          dispatch(updateTemplatePatientAddress1(ownProps.recordId, old.address1, !_isUndefined(address.street) ? address.street : ''));
          dispatch(updateTemplatePatientSuburb(ownProps.recordId, old.suburb, !_isUndefined(address.city) ? address.city : ''));
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
  updateSuburb: (old, suburb) => {
    dispatch(updateTemplatePatientSuburb(ownProps.recordId, old, suburb));
  },
  updatePostcode: (old, postcode) => {
    dispatch(updateTemplatePatientPostcode(ownProps.recordId, old, postcode));
  },
  updateGeometry: (old, geometry) => {
    dispatch(updateTemplatePatientGeometry(ownProps.recordId, old, geometry));
  },

  updateOccupation: (old, occupation) => {
    dispatch(updateTemplatePatientOccupation(ownProps.recordId, old, occupation));
  },
  updateMedicalRecordNumber: (old, medicalRecordNumber) => {
    dispatch(updateTemplatePatientMedicalRecordNumber(ownProps.recordId, old, medicalRecordNumber));
  },
  updatePregnantStatus: (old, pregnantStatus) => {
    dispatch(updateTemplatePatientPregnantStatus(ownProps.recordId, old, pregnantStatus));
  },
  updatePregnantTrimester: (old, pregnantTrimester) => {
    dispatch(updateTemplatePatientPregnantTrimester(ownProps.recordId, old, pregnantTrimester));
  },
  updatePregnantTrimesterUnknown: (old, pregnantTrimesterUnknown) => {
    dispatch(updateTemplatePatientPregnantTrimesterUnknown(ownProps.recordId, old, pregnantTrimesterUnknown));
  },
  updatePregnantLactating: (old, pregnantLactating) => {
    dispatch(updateTemplatePatientPregnantLactating(ownProps.recordId, old, pregnantLactating));
  },
  updateRiskAssessment: (old, riskAssessment) => {
    dispatch(updateTemplatePatientRiskAssessment(ownProps.recordId, old, riskAssessment));
  },
  updatePoisonSeverityScore: (old, poisonSeverityScore) => {
    dispatch(updateTemplatePatientPoisonSeverityScore(ownProps.recordId, old, poisonSeverityScore));
  },
  lookupMacroTemplate: (macro) => {
    dispatch(lookupMacroTemplate(macro));
  },
  updateTemplateMacro: (old, macro) => {
    dispatch(updateTemplateMacro(ownProps.recordId, old, macro));
  },
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(PatientView);
