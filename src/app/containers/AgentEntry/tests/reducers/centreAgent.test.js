/* eslint-disable */

import agentsReducer from '../../reducers/centreAgent';

import {
  addAgentCentreAgent,
  updateAgentCentreAgent,
} from '../../actions/case';

describe('agentsReducer', () => {
  it('returns the initial state', () => {
    expect(agentsReducer(undefined, {})).toMatchSnapshot();
  });
  it('add agent centre agent', () => {
    expect(agentsReducer({}, addAgentCentreAgent(1, 1, 'Test Agent', '', '1', 'mg'))).toMatchSnapshot();
  });
  it('update agent centre agent', () => {
    expect(agentsReducer({}, updateAgentCentreAgent(1, 1, 1, 'Test Agent', 'Test URL', '1', 'mg'))).toMatchSnapshot();
  });
});
