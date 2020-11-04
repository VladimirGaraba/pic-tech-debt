import React from 'react';

import { EDITTEMPLATE_UIMODE } from 'containers/App/constants';

import { PatientView } from '../index';

describe('PatientView', () => {
  const props = {
    age: '',
    ageGroup: '',
    ageUnits: '',
    ageYears: '',
    animalType: '',
    category: '',
    circumstance: '',
    currentCase: {},
    executeMacro: jest.fn(),
    geometry: {},
    interlocutorCity: '',
    interlocutorGeometry: {},
    interlocutorPostcode: '',
    intl: {},
    isValidMacro: false,
    location: '',
    lookupMacroTemplate: jest.fn(),
    macro: '',
    medicalRecordNumber: '',
    name: '',
    occupation: '',
    orgCountry: '',
    poisonSeverityScore: '',
    postcode: '',
    pregnantLactating: '',
    pregnantStatus: '',
    pregnantTrimester: '',
    riskAssessment: '',
    sex: '',
    suburb: '',
    template: {},
    topic: '',
    updateAge: jest.fn(),
    updateAgeGroup: jest.fn(),
    updateAnimalType: jest.fn(),
    updateCaseTopic: jest.fn(),
    updateCategory: jest.fn(),
    updateCircumstance: jest.fn(),
    updateGeometry: jest.fn(),
    updateLocation: jest.fn(),
    updateLocationFromLookup: jest.fn(),
    updateMedicalRecordNumber: jest.fn(),
    updateName: jest.fn(),
    updateOccupation: jest.fn(),
    updatePoisonSeverityScore: jest.fn(),
    updatePostcode: jest.fn(),
    updatePregnantLactating: jest.fn(),
    updatePregnantStatus: jest.fn(),
    updatePregnantTrimester: jest.fn(),
    updateRiskAssessment: jest.fn(),
    updateSex: jest.fn(),
    updateSuburb: jest.fn(),
    updateTemplateMacro: jest.fn(),
    updateWeight: jest.fn(),
    weight: '',
    weightUnits: '',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<PatientView {...props} />);
  });

  it('renders the unpopulated patient tab', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Animal Type field for non-human patients', () => {
    wrapper.setProps({ category: 'animal' });
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render the Age, Circumstance, Occupation, MRN or Risk fields for non-human patients', () => {
    wrapper.setProps({ category: 'animal' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Pregnancy fields for female patients', () => {
    wrapper.setProps({ sex: 'female' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the macro field for template mode', () => {
    wrapper = global.shallowWithIntl(<PatientView {...props} />, { context: { uiMode: EDITTEMPLATE_UIMODE } });
    expect(wrapper).toMatchSnapshot();
  });
});
