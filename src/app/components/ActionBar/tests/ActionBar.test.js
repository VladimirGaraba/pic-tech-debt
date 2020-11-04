import React from 'react';

import { DEFAULT_UIMODE, EDITTEMPLATE_UIMODE } from 'containers/App/constants';

import { ActionBar } from '../index';

describe('ActionBar', () => {
  const props = {
    addTemplate: jest.fn(),
    callRecordId: '',
    caseListSearch: {},
    currentCase: {},
    currentTemplateId: '',
    deleteFile: jest.fn(),
    deleteRecord: jest.fn(),
    editingTemplate: {},
    editingTemplateId: '',
    endCall: jest.fn(),
    macro: {},
    isValidMacro: false,
    logout: jest.fn(),
    saveTemplate: jest.fn(),
    setUiModeDefault: jest.fn(),
    setUiModeEditTemplate: jest.fn(),
    showModal: false,
    site: {},
    toggleModal: jest.fn(),
    userSPI: {},
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<ActionBar {...props} />, { context: { uiMode: DEFAULT_UIMODE } });
  });

  it('renders the common actions', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the dashboard link for the "view dashboard" ability', () => {
    wrapper.setProps({ userSPI: { abilities: ['view dashboard'] } });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the analytics link for the "view data analytics" ability', () => {
    wrapper.setProps({ userSPI: { abilities: ['view data analytics'] } });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the template UI mode toggle link for the "manage templates" ability', () => {
    wrapper.setProps({ userSPI: { abilities: ['manage templates'] } });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the search modal in search mode', () => {
    wrapper.setProps({ showModal: true });
    wrapper.setState({ modalMode: 'search' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the record modal in record mode', () => {
    wrapper.setProps({ showModal: true });
    wrapper.setState({ modalMode: 'record' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the edit template mode', () => {
    wrapper.setProps({ userSPI: { abilities: ['manage templates'] } });
    wrapper.setContext({ uiMode: EDITTEMPLATE_UIMODE });
    expect(wrapper).toMatchSnapshot();
  });
});
