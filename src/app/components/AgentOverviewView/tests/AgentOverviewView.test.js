import React from 'react';

import { AgentOverviewView } from '../index';

describe('AgentOverviewView', () => {
  const props = {
    agents: [],
    patientWeight: '',
    patientWeightUnits: '',
    toxicologySource: '',
    updateToxicologySource: jest.fn(),
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<AgentOverviewView {...props} />);
  });

  it('renders the empty overview', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
