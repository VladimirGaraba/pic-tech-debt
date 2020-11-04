
import React from 'react';

import { IncidentModal } from '../IncidentModal';

jest.mock('moment', () => () => ({ format: () => '2018–01–30T12:34:56+00:00' }));

describe('IncidentModal', () => {
  const props = {
    addIncident: jest.fn(),
    currentRecordId: '',
    doSearch: jest.fn(),
    incidentModal: {},
    incidents: [],
    linkCaseIncident: jest.fn(),
    search: {},
    site: {},
    toggleModal: jest.fn(),
    updateModalName: jest.fn(),
    updateModalSelected: jest.fn(),
    userSPI: {},
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<IncidentModal {...props} />);
  });

  it('renders the incident modal', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the add incident tab for the "manage incidents" ability', () => {
    wrapper.setProps({ userSPI: { abilities: ['manage incidents'] } });
    expect(wrapper).toMatchSnapshot();
  });
});
