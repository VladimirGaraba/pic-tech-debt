import { connect } from 'react-redux';
import aes256 from 'aes256';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';

import { makeSelectAppKey, makeSelectCurrentCaseId, makeSelectCurrentCase, makeSelectEditingTemplate, makeSelectCurrentTemplate, makeSelectToxicologySource, selectVars, selectIncident } from 'containers/App/selectors';

import { EDITTEMPLATE_UIMODE } from 'containers/App/constants';

import OverviewView from 'components/OverviewView';

const mapStateToProps = (state) => {
  const vars = selectVars(state);
  let currentRecordId;
  let currentCase;
  if (vars.uiMode === EDITTEMPLATE_UIMODE) {
    if (!_isEmpty(vars.editingTemplateId)) {
      currentRecordId = vars.editingTemplateId;
      currentCase = makeSelectEditingTemplate()(state);
    } else {
      currentRecordId = vars.currentTemplateId;
      currentCase = makeSelectCurrentTemplate()(state);
    }
  } else {
    currentRecordId = makeSelectCurrentCaseId()(state);
    currentCase = makeSelectCurrentCase()(state);
  }
  const appKey = makeSelectAppKey()(state);

  const toxicologySource = makeSelectToxicologySource()(state);

  const naturalId = currentCase.naturalId ? currentCase.naturalId : undefined;
  const incidentId = !_isEmpty(currentCase.incidentId) ? selectIncident(state, currentCase.incidentId).naturalId : undefined;
  const type = currentCase.type;
  const status = currentCase.status;
  const topic = currentCase.topic ? currentCase.topic : '';
  const outcome = currentCase.outcome ? currentCase.outcome : '';
  const timestamp = currentCase.timestamp;
  const { notes, patient } = currentCase;
  let patientName;
  if (!_isEmpty(currentCase.appKeyId)) {
    patientName = (patient && !_isEmpty(patient.nameEnc)) ? aes256.decrypt(appKey.key, patient.nameEnc) : '';
  } else {
    patientName = (patient && patient.name) ? patient.name : '';
  }
  const patientGender = (patient && patient.gender) ? patient.gender : '';
  let patientAge;
  let patientAgeUnits;
  if (patient && patient.ageYears) {
    patientAge = patient.ageYears;
    patientAgeUnits = 'years';
  } else if (patient && patient.age) {
    patientAge = patient.age;
    if (patient && patient.ageUnits) {
      patientAgeUnits = patient.ageUnits;
    } else {
      patientAgeUnits = '';
    }
  }
  const patientAgeGroup = (patient && patient.ageGroup) ? patient.ageGroup : '';
  const patientCategory = (patient && patient.category) ? patient.category : undefined;
  let patientMedicalRecordNumber;
  if (!_isEmpty(currentCase.appKeyId)) {
    patientMedicalRecordNumber = (patient && !_isEmpty(patient.medicalRecordNumberEnc)) ? aes256.decrypt(appKey.key, patient.medicalRecordNumberEnc) : '';
  } else {
    patientMedicalRecordNumber = (patient && patient.medicalRecordNumber) ? patient.medicalRecordNumber : '';
  }
  let patientPostcode;
  if (patient && patient.locality && patient.locality.postcode) {
    patientPostcode = patient.locality.postcode;
  } else if (patient && patient.postcode) {
    patientPostcode = patient.postcode;
  } else {
    patientPostcode = '';
  }
  const patientWeight = (patient && patient.weight) ? patient.weight : '';
  const patientWeightUnits = (patient && patient.weightUnits) ? patient.weightUnits : '';
  const pregnantStatus = (patient && patient.pregnant && patient.pregnant.status) ? patient.pregnant.status : 'unknown';
  const patientCircumstance = (patient && patient.circumstance) ? patient.circumstance : '';
  let patientLocation;
  if (patient && patient.locality && patient.locality.location) {
    patientLocation = patient.locality.location;
  } else if (patient && patient.location) {
    patientLocation = patient.location;
  } else {
    patientLocation = '';
  }
  const riskAssessment = (patient) ? patient.riskAssessment : '';
  const poisonSeverityScore = (patient) ? patient.poisonSeverityScore : '';
  const agents = (currentCase.agents) ? currentCase.agents : [];
  const features = (currentCase.features) ? currentCase.features : [];
  const treatments = (currentCase.treatments) ? currentCase.treatments : [];
  const investigations = (currentCase.investigations) ? currentCase.investigations : [];
  const communications = (currentCase.communications) ? _filter(currentCase.communications, (o) => !o.deleted) : [];
  if (!_isEmpty(currentCase.appKeyId)) {
    communications.map((c, i) => { // eslint-disable-line
      if (c.interlocutor && !_isEmpty(c.interlocutor.nameEnc)) {
        communications[i].interlocutor.name = aes256.decrypt(appKey.key, c.interlocutor.nameEnc);
      }
      if (c.medium && !_isEmpty(c.medium.detailEnc)) {
        communications[i].medium.detail = aes256.decrypt(appKey.key, c.medium.detailEnc);
      }
    });
  }

  let pregnantTrimester;
  let pregnantLactating;

  if (pregnantStatus === 'yes') {
    if (patient && patient.pregnant) {
      pregnantTrimester = (patient.pregnant.trimester) ? patient.pregnant.trimester : 'unknown';
      pregnantLactating = (patient.pregnant.lactating) ? patient.pregnant.lactating : 'unknown';
    } else {
      pregnantTrimester = pregnantLactating = 'unknown';
    }
  } else {
    pregnantTrimester = pregnantLactating = 'NA';
  }

  return {
    currentRecordId,
    naturalId,
    incidentId,
    type,
    status,
    topic,
    outcome,
    timestamp,
    patientName,
    patientGender,
    patientAge,
    patientAgeUnits,
    patientAgeGroup,
    patientCategory,
    patientMedicalRecordNumber,
    patientPostcode,
    patientWeight,
    patientWeightUnits,
    pregnantStatus,
    pregnantTrimester,
    pregnantLactating,
    riskAssessment,
    poisonSeverityScore,
    patientCircumstance,
    patientLocation,
    agents,
    features,
    treatments,
    investigations,
    communications,
    notes,
    toxicologySource,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewView);
