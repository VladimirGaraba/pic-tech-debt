/* eslint-disable */

import agentsReducer from '../reducer';

import {
  addAgent,
  deleteAgent,
} from '../actions/case';

describe('agentsReducer', () => {
  it('returns the initial state', () => {
    expect(agentsReducer(undefined, {})).toMatchSnapshot();
  });
  it('add agent', () => {
    expect(agentsReducer([{'id': 1}], addAgent(2, 'Test Agent', '1', 'mg', false, '2018-04-14 14:25:00', '1', 'hour', false, 'Test Exposure Type', 'Ingested', '123456'))).toMatchSnapshot();
  });
  it('delete agent', () => {
    expect(agentsReducer([{'id': 1}], deleteAgent(1, 1, 'Test Agent'))).toMatchSnapshot();
  });
});
