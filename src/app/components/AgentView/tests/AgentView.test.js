import React from 'react';

import { AgentView } from '../index';

describe('AgentView', () => {
  const props = {
    addCentreAgent: jest.fn(),
    agentCategory: '',
    caseType: '',
    centreAgents: [],
    deleteAgent: jest.fn(),
    duration: '',
    durationUnits: '',
    durationUnknown: false,
    eupcs: '',
    intendedUseGiven: '',
    interlocutorAgentName: '',
    isPatientsOwnMedication: false,
    quantity: '',
    quantityUnits: '',
    quantityUnknown: false,
    removeCentreAgent: jest.fn(),
    routeOfExposure: [],
    timeOfExposure: '',
    typeOfExposure: '',
    updateAgentCategory: jest.fn(),
    updateCentreAgent: jest.fn(),
    updateDuration: jest.fn(),
    updateEUPCS: jest.fn(),
    updateIntendedUseGiven: jest.fn(),
    updateInterlocutorAgentName: jest.fn(),
    updateIsPatientsOwnMedication: jest.fn(),
    updateQuantity: jest.fn(),
    updateRouteOfExposure: jest.fn(),
    updateTimeOfExposure: jest.fn(),
    updateType: jest.fn(),
    updateTypeOfExposure: jest.fn(),
    useType: [],
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<AgentView {...props} />);
  });

  it('renders the unpopulated agent tab', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render the exposure section for inquiries', () => {
    wrapper.setProps({ caseType: 'inquiry' });
    expect(wrapper).toMatchSnapshot();
  });
});
