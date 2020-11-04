import React from 'react';

import { OPENED_STATE, CLOSED_STATE, REVIEWED_STATE, DELETED_STATE } from 'containers/CaseEntry/constants';

import { CaseContextMenu } from '../CaseContextMenu';

describe('CaseContextMenu', () => {
  const props = {
    id: 'aaa',
    item: {
      status: OPENED_STATE,
      type: 'case',
    },
    callRecordId: undefined,
    closeFile: jest.fn(),
    deleteFile: jest.fn(),
    dialog: {},
    intl: {},
    reviewFile: jest.fn(),
    openFile: jest.fn(),
    doSearch: jest.fn(),
    markAsCase: jest.fn(),
    markAsHoax: jest.fn(),
    markAsInquiry: jest.fn(),
    toggleModal: jest.fn(),
    unlinkCaseIncident: jest.fn(),
    renameIncident: jest.fn(),
    search: {},
    userSPI: {},
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<CaseContextMenu {...props} />);
  });

  it('renders the open case context menu', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the closed case context menu', () => {
    wrapper.setProps({
      item: {
        status: CLOSED_STATE,
        type: 'case',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the review case context menu', () => {
    wrapper.setProps({
      item: {
        status: REVIEWED_STATE,
        type: 'case',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the deleted case context menu', () => {
    wrapper.setProps({
      item: {
        status: DELETED_STATE,
        type: 'case',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the inquiry context menu', () => {
    wrapper.setProps({
      item: {
        status: OPENED_STATE,
        type: 'inquiry',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the hoax context menu', () => {
    wrapper.setProps({
      item: {
        status: OPENED_STATE,
        type: 'hoax',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders incident menu for cases for the "manage incidents" ability', () => {
    wrapper.setProps({ userSPI: { abilities: ['manage incidents'] } });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the incident context menu', () => {
    wrapper.setProps({
      item: {
        status: OPENED_STATE,
        type: 'incident',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the unavailable context menu', () => {
    wrapper.setProps({
      callRecordId: 'aaa',
    });
    expect(wrapper).toMatchSnapshot();
  });
});
