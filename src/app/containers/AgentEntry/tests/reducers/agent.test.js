/* eslint-disable */

import agentRecordReducer from '../../reducers/agent';

import {
  addAgent,
  addAgentCentreAgent,
  removeAgentCentreAgent,
  updateAgentCategory,
  updateAgentCentreAgent,
  updateAgentDuration,
  updateAgentEUPCS,
  updateAgentIntendedUseGiven,
  updateAgentInterlocutorAgentName,
  updateAgentIsPatientsOwnMedication,
  updateAgentUseType,
  updateQuickViewAgentName,
} from '../../actions/case';

describe('agentRecordReducer', () => {
  it('returns the initial state', () => {
    expect(agentRecordReducer(undefined, {})).toMatchSnapshot();
  });
  it('add agent', () => {
    expect(agentRecordReducer({'id': 1}, addAgent(2, 'Test Agent', '1', 'mg', false, '2018-04-14 14:25:00', '1', 'hour', false, 'Test Exposure Type', 'Ingested', '123456'))).toMatchSnapshot();
  });
  it('add agent centre agent', () => {
    expect(agentRecordReducer({'id': 1}, addAgentCentreAgent(1, 1, 'Test Agent', '', '1', 'mg'))).toMatchSnapshot();
  });
  it('remove agent centre agent', () => {
    expect(agentRecordReducer({'id': 1}, removeAgentCentreAgent(1, 1, 1, 'Test Agent'))).toMatchSnapshot();
  });
  it('update agent category', () => {
    expect(agentRecordReducer({'id': 1}, updateAgentCategory(1, 1, 'Old Category', 'New Category'))).toMatchSnapshot();
  });
  it('update agent centre agent', () => {
    expect(agentRecordReducer({'id': 1}, updateAgentCentreAgent(1, 1, 1, 'Test Agent', 'Test URL', '1', 'mg'))).toMatchSnapshot();
  });
  it('update agent eupcs', () => {
    expect(agentRecordReducer({'id': 1}, updateAgentEUPCS(1, 1, 1, '1', '2', 'Old EUPCS', 'New EUPCS'))).toMatchSnapshot();
  });
  it('update agent intended use given', () => {
    expect(agentRecordReducer({'id': 1}, updateAgentIntendedUseGiven(1, 1, 'Old Agent Name', 'New Agent Name'))).toMatchSnapshot();
  });
  it('update agent interlocutor agent name', () => {
    expect(agentRecordReducer({'id': 1}, updateAgentInterlocutorAgentName(1, 1, 'Old Agent Name', 'New Agent Name'))).toMatchSnapshot();
  });
  it('update agent is patients own medication', () => {
    expect(agentRecordReducer({'id': 1}, updateAgentIsPatientsOwnMedication(1, 1, '', "Patient's own medication"))).toMatchSnapshot();
  });
  it('update agent use type', () => {
    expect(agentRecordReducer({'id': 1, 'type': ['Old Type']}, updateAgentUseType(1, 1, ['Old Use Type'], ['New Use Type']))).toMatchSnapshot();
  });
  it('update quick view agent name', () => {
    expect(agentRecordReducer({'id': 1, 'name': 'Old Name'}, updateQuickViewAgentName([{}]))).toMatchSnapshot();
  });
});
