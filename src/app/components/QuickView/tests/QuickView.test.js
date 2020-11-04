import React from 'react';

import { EDITTEMPLATE_UIMODE } from 'containers/App/constants';

import { QuickView } from '../index';

describe('QuickView', () => {
  const props = {
    addAgent: jest.fn(),
    agentDuration: '',
    agentDurationUnits: '',
    agentDurationUnknown: false,
    agentName: '',
    agentQuantity: '',
    agentQuantityUnits: '',
    agentQuantityUnknown: false,
    agentRouteOfExposure: [],
    agentTimeOfExposure: '',
    agentTypeOfExposure: '',
    agents: [],
    currentCase: {},
    executeMacro: jest.fn(),
    features: [],
    featuresDescriptorList: [],
    interlocutorCategory: '',
    interlocutorDirection: '',
    interlocutorMediumDetail: '',
    interlocutorName: '',
    interlocutorOrganisation: '',
    interlocutorPostcode: '',
    interlocutorCity: '',
    interlocutorGeometry: {},
    intl: {},
    isValidMacro: false,
    lookupMacroTemplate: jest.fn(),
    macro: '',
    markAsCase: jest.fn(),
    markAsHoax: jest.fn(),
    markAsInquiry: jest.fn(),
    orgCountry: '',
    patientAge: '',
    patientAgeGroup: '',
    patientAgeUnits: '',
    patientAnimalType: '',
    patientCategory: '',
    patientCircumstance: '',
    patientGeometry: {},
    patientLocation: '',
    patientName: '',
    patientPoisonSeverityScore: '',
    patientPostcode: '',
    patientRiskAssessment: '',
    patientSex: '',
    patientSuburb: '',
    patientWeight: '',
    patientWeightUnits: '',
    template: {},
    topic: '',
    type: '',
    updateAgentDuration: jest.fn(),
    updateAgentDurationUnits: jest.fn(),
    updateAgentDurationUnknown: jest.fn(),
    updateAgentName: jest.fn(),
    updateAgentQuantity: jest.fn(),
    updateAgentQuantityUnits: jest.fn(),
    updateAgentQuantityUnknown: jest.fn(),
    updateAgentRouteOfExposure: jest.fn(),
    updateAgentTimeOfExposure: jest.fn(),
    updateAgentTypeOfExposure: jest.fn(),
    updateCaseTopic: jest.fn(),
    updateClinicalFeaturesDescriptorList: jest.fn(),
    updateInterlocutorAddress1: jest.fn(),
    updateInterlocutorCategory: jest.fn(),
    updateInterlocutorCity: jest.fn(),
    updateInterlocutorDirection: jest.fn(),
    updateInterlocutorMediumDetail: jest.fn(),
    updateInterlocutorName: jest.fn(),
    updateInterlocutorOrganisation: jest.fn(),
    updateInterlocutorPostcode: jest.fn(),
    updateInterlocutorState: jest.fn(),
    updateInterlocutorTelephone: jest.fn(),
    updatePatientAge: jest.fn(),
    updatePatientAnimalType: jest.fn(),
    updatePatientCategory: jest.fn(),
    updatePatientCircumstance: jest.fn(),
    updatePatientGeometry: jest.fn(),
    updatePatientLocality: jest.fn(),
    updatePatientLocation: jest.fn(),
    updatePatientName: jest.fn(),
    updatePatientPoisonSeverityScore: jest.fn(),
    updatePatientPostcode: jest.fn(),
    updatePatientRiskAssessment: jest.fn(),
    updatePatientSex: jest.fn(),
    updatePatientSuburb: jest.fn(),
    updatePatientWeight: jest.fn(),
    updateTemplateMacro: jest.fn(),
    userSPIFull: {},
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<QuickView {...props} />);
  });

  it('renders the unpopulated quick view tab', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Animal Type field for non-human patients', () => {
    wrapper.setProps({ patientCategory: 'animal' });
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render the Age, Circumstance or Risk fields for non-human patients', () => {
    wrapper.setProps({ patientCategory: 'animal' });
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render the agent quantity or exposure section for inquiries', () => {
    wrapper.setProps({ type: 'inquiry' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the macro field for template mode', () => {
    wrapper = global.shallowWithIntl(<QuickView {...props} />, { context: { uiMode: EDITTEMPLATE_UIMODE } });
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render the caller section for template mode', () => {
    wrapper = global.shallowWithIntl(<QuickView {...props} />, { context: { uiMode: EDITTEMPLATE_UIMODE } });
    expect(wrapper).toMatchSnapshot();
  });
});
