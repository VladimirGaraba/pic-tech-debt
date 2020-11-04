/* eslint-disable */

import agentViewReducer from '../../reducers/agentView';

import {
  hideAgentModal,
  resetAgentView,
  showAgentModal,
} from '../../actions/case';

describe('agentViewReducer', () => {
  it('returns the initial state', () => {
    expect(agentViewReducer(undefined, {})).toMatchSnapshot();
  });
  it('hide agent modal', () => {
    expect(agentViewReducer({}, hideAgentModal())).toMatchSnapshot();
  });
  it('reset agent view', () => {
    expect(agentViewReducer({}, resetAgentView())).toMatchSnapshot();
  });
  it('show agent modal', () => {
    expect(agentViewReducer({}, showAgentModal(0))).toMatchSnapshot();
  });
});
