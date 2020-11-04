import { connect } from 'react-redux';
import aes256 from 'aes256';
import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';

import { makeSelectAppKey, makeSelectCurrentCase, makeSelectSPI, selectVars, selectTemplates } from 'containers/App/selectors';

import PatientView from 'components/PatientView';

import {
  executeMacro,
  parseGoogleAddressComponent,
  updateAgeGroup as _updateAgeGroup,
  updateAgeYears as _updateAgeYears,
} from 'utils/helpers';

import {
  lookupMacroTemplate,
  updateDocument,
} from 'containers/App/actions';

import {
  updateCaseTopic,
} from 'containers/CaseEntry/actions/case';

import {
  updatePatientAge,
  updatePatientAgeGroup,
  updatePatientAgeYears,
  updatePatientAnimalType,
  updatePatientCategory,
  updatePatientCircumstance,
  updatePatientLocation,
  updatePatientMedicalRecordNumber,
  updatePatientName,
  updatePatientOccupation,
  updatePatientPoisonSeverityScore,
  updatePatientAddress1,
  updatePatientSuburb,
  updatePatientCountry,
  updatePatientISOCountry,
  updatePatientGeometry,
  updatePatientLocationName,
  updatePatientPlaceId,
  updatePatientPostcode,
  updatePatientState,
  updatePatientTelephone,
  updatePatientPregnantLactating,
  updatePatientPregnantStatus,
  updatePatientPregnantTrimester,
  updatePatientPregnantTrimesterUnknown,
  updatePatientRiskAssessment,
  updatePatientSex,
  updatePatientWeight,
} from './actions/case';

const makeMapStateToProps = () => {
  const selectCurrentCase = makeSelectCurrentCase();
  const selectSPI = makeSelectSPI();
  const selectAppKey = makeSelectAppKey();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const templates = selectTemplates(state);
    const { currentRecordId, callRecordId } = vars;
    const currentCase = selectCurrentCase(state);
    const appKey = selectAppKey(state);

    const currentComms = currentCase.communications[currentCase.communications.length - 1];

    const interlocutor = currentComms && currentComms.interlocutor ? currentComms.interlocutor : undefined;
    const interlocutorPlaceId = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.placeId : '';
    const interlocutorLocationName = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.name : '';
    const interlocutorAddress1 = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.address1 : '';
    const interlocutorCity = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.city : '';
    const interlocutorState = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.state : '';
    const interlocutorPostcode = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.postcode : '';
    const interlocutorCountry = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.country : '';
    const interlocutorISOCountry = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.isoCountry : '';
    const interlocutorTelephone = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.telephone : '';
    const interlocutorGeometry = (interlocutor && interlocutor.organisation) ? interlocutor.organisation.geometry : {};

    const topic = currentCase.topic ? currentCase.topic : '';
    const template = (!_isEmpty(vars.macro) && vars.macro in templates) ? templates[vars.macro] : undefined;

    const patient = currentCase.patient;
    let name;
    if (!_isEmpty(currentCase.appKeyId)) {
      name = (patient && !_isEmpty(patient.nameEnc)) ? aes256.decrypt(appKey.key, patient.nameEnc) : '';
    } else {
      name = (patient && patient.name) ? patient.name : '';
    }
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
    let medicalRecordNumber;
    if (!_isEmpty(currentCase.appKeyId)) {
      medicalRecordNumber = (patient && !_isEmpty(patient.medicalRecordNumberEnc)) ? aes256.decrypt(appKey.key, patient.medicalRecordNumberEnc) : '';
    } else {
      medicalRecordNumber = (patient && patient.name) ? patient.name : '';
    }
    const pregnantStatus = (patient && patient.pregnant && patient.pregnant.status) ? patient.pregnant.status : 'unknown';
    const pregnantTrimester = (patient && patient.pregnant && patient.pregnant.trimester) ? patient.pregnant.trimester : 'unknown';
    const pregnantTrimesterUnknown = (patient && patient.pregnant) ? patient.pregnant.trimesterUnknown : false;
    const pregnantLactating = (patient && patient.pregnant && patient.pregnant.lactating) ? patient.pregnant.lactating : 'unknown';
    const riskAssessment = (patient) ? patient.riskAssessment : '';
    const poisonSeverityScore = (patient) ? patient.poisonSeverityScore : '';

    return {
      currentRecordId,
      callRecordId,
      currentCase,

      topic,
      template,

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

      interlocutorPlaceId,
      interlocutorLocationName,
      interlocutorAddress1,
      interlocutorCity,
      interlocutorState,
      interlocutorPostcode,
      interlocutorCountry,
      interlocutorISOCountry,
      interlocutorTelephone,
      interlocutorGeometry,

      orgCountry: vars.jwtClaims.org_country ? vars.jwtClaims.org_country : '',
      userSPI: selectSPI(state),
      appKey,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateCaseTopic: (old, topic) => {
    dispatch(updateCaseTopic(ownProps.recordId, old, topic));
  },

  updateName: (old, name, appKey) => {
    dispatch(updatePatientName(ownProps.recordId, old, name, appKey));
  },
  updateCategory: (old, category) => {
    dispatch(updatePatientCategory(ownProps.recordId, old, category));
  },
  updateAnimalType: (old, animalType) => {
    dispatch(updatePatientAnimalType(ownProps.recordId, old, animalType));
  },
  updateSex: (old, sex) => {
    dispatch(updatePatientSex(ownProps.recordId, old, sex));
  },
  updateAge: (oldAge, age, oldAgeUnits, ageUnits, oldAgeGroup, oldAgeYears) => {
    dispatch(updatePatientAge(ownProps.recordId, oldAge, age, oldAgeUnits, ageUnits));
    _updateAgeGroup(age, ageUnits, oldAgeGroup, ownProps, updatePatientAgeGroup, dispatch);
    _updateAgeYears(age, ageUnits, oldAgeYears, ownProps, updatePatientAgeYears, dispatch);
  },
  updateAgeGroup: (old, ageGroup) => {
    dispatch(updatePatientAgeGroup(ownProps.recordId, old, ageGroup));
  },
  updateWeight: (oldWeight, weight, oldWeightUnits, weightUnits) => {
    dispatch(updatePatientWeight(ownProps.recordId, oldWeight, weight, oldWeightUnits, weightUnits));
  },
  updateCircumstance: (old, circumstance) => {
    dispatch(updatePatientCircumstance(ownProps.recordId, old, circumstance));
  },
  updateLocation: (old, location) => {
    dispatch(updatePatientLocation(ownProps.recordId, old, location));
  },
  updateLocality: (suggest, old, data) => {
    if (suggest) {
      const map = new google.maps.Map(document.createElement('div')); // eslint-disable-line no-undef
      const placesService = new google.maps.places.PlacesService(map); // eslint-disable-line no-undef

      try {
        placesService.getDetails({ placeId: suggest.placeId }, (place) => {
          const address = parseGoogleAddressComponent(place.address_components);
          dispatch(updatePatientPlaceId(ownProps.recordId, old.placeId, !_isUndefined(suggest.placeId) ? suggest.placeId : ''));
          dispatch(updatePatientLocationName(ownProps.recordId, old.name, place.name));
          dispatch(updatePatientAddress1(ownProps.recordId, old.address1, !_isUndefined(address.street) ? address.street : ''));
          dispatch(updatePatientSuburb(ownProps.recordId, old.suburb, !_isUndefined(address.city) ? address.city : ''));
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
  updateSuburb: (old, suburb) => {
    dispatch(updatePatientSuburb(ownProps.recordId, old, suburb));
  },
  updatePostcode: (old, postcode) => {
    dispatch(updatePatientPostcode(ownProps.recordId, old, postcode));
  },
  updateGeometry: (old, geometry) => {
    dispatch(updatePatientGeometry(ownProps.recordId, old, geometry));
  },

  updateOccupation: (old, occupation) => {
    dispatch(updatePatientOccupation(ownProps.recordId, old, occupation));
  },
  updateMedicalRecordNumber: (old, medicalRecordNumber, appKey) => {
    dispatch(updatePatientMedicalRecordNumber(ownProps.recordId, old, medicalRecordNumber, appKey));
  },
  updatePregnantStatus: (old, pregnantStatus) => {
    dispatch(updatePatientPregnantStatus(ownProps.recordId, old, pregnantStatus));
  },
  updatePregnantTrimester: (old, pregnantTrimester) => {
    dispatch(updatePatientPregnantTrimester(ownProps.recordId, old, pregnantTrimester));
  },
  updatePregnantTrimesterUnknown: (old, pregnantTrimesterUnknown) => {
    dispatch(updatePatientPregnantTrimesterUnknown(ownProps.recordId, old, pregnantTrimesterUnknown));
  },
  updatePregnantLactating: (old, pregnantLactating) => {
    dispatch(updatePatientPregnantLactating(ownProps.recordId, old, pregnantLactating));
  },
  updateRiskAssessment: (old, riskAssessment) => {
    dispatch(updatePatientRiskAssessment(ownProps.recordId, old, riskAssessment));
  },
  updatePoisonSeverityScore: (old, poisonSeverityScore) => {
    dispatch(updatePatientPoisonSeverityScore(ownProps.recordId, old, poisonSeverityScore));
  },
  lookupMacroTemplate: (macro) => {
    dispatch(lookupMacroTemplate(macro));
  },
  executeMacro: (document, template) => {
    const updatedDocument = executeMacro(document, template);
    dispatch(updateDocument(updatedDocument));
  },
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(PatientView);
