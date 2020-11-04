import React from 'react';

import { CentreAgentSummary } from '../CentreAgentSummary';

describe('CentreAgentSummary', () => {
  const props = {
    agents: [],
    patientWeight: '10',
    patientWeightUnits: 'kg',
    toxicologySource: '',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<CentreAgentSummary {...props} />);
  });

  it('renders the empty summary', () => {
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
