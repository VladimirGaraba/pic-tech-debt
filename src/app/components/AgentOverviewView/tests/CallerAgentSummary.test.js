import React from 'react';

import { CallerAgentSummary } from '../CallerAgentSummary';

describe('CallerAgentSummary', () => {
  const props = {
    agents: [],
    breakdown: false,
    patientWeight: '10',
    patientWeightUnits: 'kg',
    toxicologySource: '',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<CallerAgentSummary {...props} />);
  });

  it('renders the empty summary', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the breakdown column when set', () => {
    wrapper.setProps({ breakdown: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the populated summary', () => {
    wrapper.setProps({ agents: [
      {
        name: 'Agent Name',
        dosage: {
          quantity: '10',
          units: 'mL',
        },
        exposure: {
          route: ['Route of Exposure'],
          type: 'Type of Exposure',
        },
        centreAgents: [{
          name: 'Centre Agent Name',
          quantity: '1',
          units: 'mL',
        }],
      },
    ] });
    expect(wrapper).toMatchSnapshot();
  });
});
