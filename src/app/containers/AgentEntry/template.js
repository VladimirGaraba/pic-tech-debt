/* eslint-disable no-nested-ternary */

import { connect } from 'react-redux';
import _find from 'lodash/find';
import _isObject from 'lodash/isObject';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';
import moment from 'moment/moment';

import { selectVars, makeSelectSPI, makeSelectCurrentTemplate, makeSelectEditingTemplate } from 'containers/App/selectors';

import AgentView from 'components/AgentView';

import {
    updateTemplateAgentInterlocutorAgentName,
    updateTemplateAgentCategory,
    updateTemplateAgentUseType,
    updateTemplateAgentEUPCS,
    updateTemplateAgentIntendedUseGiven,
    updateTemplateAgentIsPatientsOwnMedication,
    updateTemplateAgentQuantity,
    updateTemplateAgentTimeOfExposure,
    updateTemplateAgentDuration,
    updateTemplateAgentTypeOfExposure,
    updateTemplateAgentRouteOfExposure,
    addTemplateAgentCentreAgent,
    updateTemplateAgentCentreAgent,
    removeTemplateAgentCentreAgent,

    deleteTemplateAgent,
} from './actions/template';

import {
  setAgentTab,
} from './actions/case';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state, ownProps) => {
    const vars = selectVars(state);
    const { agentId } = ownProps;
    const { currentTemplateId, editingTemplateId } = vars;
    const currentTemplate = !_isEmpty(editingTemplateId) ? makeSelectEditingTemplate()(state) : makeSelectCurrentTemplate()(state);

    const caseType = currentTemplate.type;
    const agent = _find(currentTemplate.agents, { id: agentId });
    const interlocutorAgentName = (agent) ? agent.name : '';
    let centreAgents = (agent) ? agent.centreAgents : [];
    centreAgents = centreAgents.map((o, i) => { const newO = o; newO.id = i + 1; return newO; });
    const agentCategory = (agent) ? agent.category : '';
    const intendedUseGiven = (agent) ? agent.intendedUseGiven : '';
    const isPatientsOwnMedication = (agent) ? agent.isPatientsOwnMedication : false;
    const useType = (agent) ? agent.type : '';
    const eupcs = (agent && agent.eupcs) ? agent.eupcs : '';
    const quantity = (agent && agent.dosage) ? agent.dosage.quantity : '';
    const quantityUnits = (agent && agent.dosage) ? agent.dosage.units : '';
    const quantityUnknown = (agent && agent.dosage && agent.dosage.unknown !== '') ? agent.dosage.unknown : false;
    const timeOfExposure = (agent && agent.exposure && moment(agent.exposure.timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ').isValid()) ? moment(agent.exposure.timestamp).format('YYYY-MM-DD HH:mm') : '';
    const duration = (agent && agent.exposure) ? agent.exposure.duration : '';
    const durationUnits = (agent && agent.exposure) ? agent.exposure.durationUnits : '';
    const durationUnknown = (agent && agent.exposure && agent.exposure.durationUnknown !== '') ? agent.exposure.durationUnknown : false;
    const typeOfExposure = (agent && agent.exposure) ? agent.exposure.type : '';
    const routeOfExposure = (agent && agent.exposure) ? (_isArray(agent.exposure.route) ? agent.exposure.route : [agent.exposure.route]) : [];

    return {
      currentTemplateId,
      editingTemplateId,

      caseType,

      interlocutorAgentName,
      centreAgents,
      agentCategory,
      intendedUseGiven,
      isPatientsOwnMedication,
      useType,
      eupcs,
      quantity,
      quantityUnits,
      quantityUnknown,
      timeOfExposure,
      duration,
      durationUnits,
      durationUnknown,
      typeOfExposure,
      routeOfExposure,

      userSPI: selectSPI(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateInterlocutorAgentName: (old, name) => {
    dispatch(updateTemplateAgentInterlocutorAgentName(ownProps.recordId, ownProps.agentId, old, name));
  },
  updateAgentCategory: (old, category) => {
    dispatch(updateTemplateAgentCategory(ownProps.recordId, ownProps.agentId, old, category));
  },
  updateIntendedUseGiven: (old, intendedUseGiven) => {
    dispatch(updateTemplateAgentIntendedUseGiven(ownProps.recordId, ownProps.agentId, old, intendedUseGiven));
  },
  updateIsPatientsOwnMedication: (old, isPatientsOwnMedication) => {
    dispatch(updateTemplateAgentIsPatientsOwnMedication(ownProps.recordId, ownProps.agentId, old, isPatientsOwnMedication));
  },
  updateType: (old, type) => {
    dispatch(updateTemplateAgentUseType(ownProps.recordId, ownProps.agentId, old, type));
  },
  updateEUPCS: (old, eupcs) => {
    dispatch(updateTemplateAgentEUPCS(ownProps.recordId, ownProps.agentId, old, eupcs));
  },
  updateQuantity: (oldQuantity, quantity, oldQuantityUnits, quantityUnits, oldQuantityUnknown, quantityUnknown) => {
    let newQuantity = quantity;
    let newQuantityUnits = quantityUnits;
    let newQuantityUnknown = quantityUnknown;
    if (oldQuantityUnknown !== newQuantityUnknown && newQuantityUnknown === true) {
      newQuantity = '';
      newQuantityUnits = '';
    } else if (_isEmpty(newQuantity) || _isEmpty(newQuantityUnits)) {
      newQuantityUnknown = false;
    }
    dispatch(updateTemplateAgentQuantity(ownProps.recordId, ownProps.agentId, oldQuantity, newQuantity, oldQuantityUnits, newQuantityUnits, oldQuantityUnknown, newQuantityUnknown));
  },
  updateTimeOfExposure: (oldTimeOfExposure, timeSinceExposure, timeSinceExposureUnits) => {
    let newTimeSinceExposureUnits = timeSinceExposureUnits;
    let newTimeSinceExposure = timeSinceExposure;
    if (newTimeSinceExposureUnits) {
        // https://momentjs.com/docs/#/manipulating/subtract/
      switch (newTimeSinceExposureUnits) {
        case 'Days':
          newTimeSinceExposureUnits = 'Hours';
          newTimeSinceExposure = parseFloat(newTimeSinceExposure) * 24;
          break;
        case 'Months':
          newTimeSinceExposureUnits = 'Days';
          newTimeSinceExposure = parseFloat(newTimeSinceExposure) * 28;
          break;
        default:
          break;
      }
      const timeOfExposure = moment().subtract(newTimeSinceExposure, newTimeSinceExposureUnits.toLowerCase()).toISOString();
      dispatch(updateTemplateAgentTimeOfExposure(ownProps.recordId, ownProps.agentId, oldTimeOfExposure, timeOfExposure));
    }
  },
  updateDuration: (oldDuration, duration, oldDurationUnits, durationUnits, oldDurationUnknown, durationUnknown) => {
    let newDuration = duration;
    let newDurationUnits = durationUnits;
    let newDurationUnknown = durationUnknown;
    if (oldDurationUnknown !== newDurationUnknown && newDurationUnknown === true) {
      newDuration = '';
      newDurationUnits = '';
    } else if (_isEmpty(newDuration) || _isEmpty(newDurationUnits)) {
      newDurationUnknown = false;
    }
    dispatch(updateTemplateAgentDuration(ownProps.recordId, ownProps.agentId, oldDuration, newDuration, oldDurationUnits, newDurationUnits, oldDurationUnknown, newDurationUnknown));
  },
  updateTypeOfExposure: (old, typeOfExposure) => {
    dispatch(updateTemplateAgentTypeOfExposure(ownProps.recordId, ownProps.agentId, old, typeOfExposure));
  },
  updateRouteOfExposure: (old, routeOfExposure) => {
    dispatch(updateTemplateAgentRouteOfExposure(ownProps.recordId, ownProps.agentId, old, routeOfExposure));
  },
  addCentreAgent: (row) => {
    let name;
    let url;
    if (_isObject(row.name)) {
      name = row.name.name;
      url = row.name.url;
    } else {
      name = row.name;
      url = '';
    }
    dispatch(addTemplateAgentCentreAgent(ownProps.recordId, ownProps.agentId, name, url, row.quantity, row.units));
  },
  updateCentreAgent: (row, cellName, cellValue) => {
    const newRow = row;
    if (cellName === 'name') {
      if (_isObject(cellValue) && newRow.name === cellValue.name) {
        return;
      } else if (newRow.name === cellValue) {
        return;
      }
    }
    dispatch(updateTemplateAgentCentreAgent(ownProps.recordId, ownProps.agentId, newRow.id - 1, newRow.name, newRow.url, newRow.quantity, newRow.units)); // Enable saving of original row value first
    if (cellName === 'name') {
      if (_isObject(cellValue)) {
        newRow.name = cellValue.name;
        newRow.url = cellValue.url;
      } else {
        newRow.name = cellValue;
        newRow.url = '';
      }
    } else {
      newRow[cellName] = cellValue;
    }
    dispatch(updateTemplateAgentCentreAgent(ownProps.recordId, ownProps.agentId, newRow.id - 1, newRow.name, newRow.url, newRow.quantity, newRow.units));
  },
  removeCentreAgent: (rows, fullrows) => {
    dispatch(removeTemplateAgentCentreAgent(ownProps.recordId, ownProps.agentId, rows[0] - 1, fullrows[0].name));
  },
  deleteAgent: (agentName) => {
    dispatch(setAgentTab(0));
    dispatch(deleteTemplateAgent(ownProps.recordId, ownProps.agentId, agentName));
  },
});

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(AgentView);
