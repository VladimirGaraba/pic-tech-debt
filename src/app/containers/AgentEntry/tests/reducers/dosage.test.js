/* eslint-disable */

import dosageReducer from '../../reducers/dosage';

import {
  addAgent,
  updateAgentQuantity,
  updateQuickViewAgentQuantity,
  updateQuickViewAgentQuantityUnits,
  updateQuickViewAgentQuantityUnknown,
} from '../../actions/case';

describe('dosageReducer', () => {
  it('returns the initial state', () => {
    expect(dosageReducer(undefined, {})).toMatchSnapshot();
  });
  it('add agent', () => {
    expect(dosageReducer({}, addAgent(2, 'Test Agent', '1', 'mg', false, '2018-04-14 14:25:00', '1', 'hour', false, 'Test Exposure Type', 'Ingested', '123456'))).toMatchSnapshot();
  });
  it('update agent quantity', () => {
    expect(dosageReducer({}, updateAgentQuantity(1, 1, '1', '2', 'mg', 'g', false, false))).toMatchSnapshot();
  });
  it('update quick view agent quantity', () => {
    expect(dosageReducer({}, updateQuickViewAgentQuantity(10))).toMatchSnapshot();
  });
  it('update quick view agent quantity units', () => {
    expect(dosageReducer({}, updateQuickViewAgentQuantityUnits('kg'))).toMatchSnapshot();
  });
  it('update quick view agent quantity unknown', () => {
    expect(dosageReducer({}, updateQuickViewAgentQuantityUnknown(true))).toMatchSnapshot();
  });
});
