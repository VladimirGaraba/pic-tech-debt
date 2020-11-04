import React from 'react';

import { OPENED_STATE, CLOSED_STATE, REVIEWED_STATE, DELETED_STATE } from 'containers/CaseEntry/constants';

import { CaseListItem } from '../CaseListItem';

describe('CaseListItem', () => {
  const props = {
    currentRecordId: 'aaa',
    entry: {
      id: 'aaa',
      type: 'case',
      status: OPENED_STATE,
      name: 'Entry Name',
      naturalId: '0123456789abcdef',
      topic: 'Entry Topic',
      category: 'human',
    },
    expanded: false,
    handleSelectChange: jest.fn(),
    intl: {},
    onItemClick: jest.fn(),
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<CaseListItem {...props} />);
  });

  it('renders the open case', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the closed case', () => {
    wrapper.setProps({
      entry: {
        id: 'aaa',
        type: 'case',
        status: CLOSED_STATE,
        name: 'Entry Name',
        naturalId: '0123456789abcdef',
        topic: 'Entry Topic',
        category: 'human',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the reviewed case', () => {
    wrapper.setProps({
      entry: {
        id: 'aaa',
        type: 'case',
        status: REVIEWED_STATE,
        name: 'Entry Name',
        naturalId: '0123456789abcdef',
        topic: 'Entry Topic',
        category: 'human',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the deleted case', () => {
    wrapper.setProps({
      entry: {
        id: 'aaa',
        type: 'case',
        status: DELETED_STATE,
        name: 'Entry Name',
        naturalId: '0123456789abcdef',
        topic: 'Entry Topic',
        category: 'human',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the incident', () => {
    wrapper.setProps({
      entry: {
        id: 'bbb',
        type: 'incident',
        status: DELETED_STATE,
        name: 'Entry Name',
        naturalId: '0123456789abcdef',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expanded incident', () => {
    wrapper.setProps({
      entry: {
        id: 'bbb',
        type: 'incident',
        status: DELETED_STATE,
        name: 'Entry Name',
        naturalId: '0123456789abcdef',
      },
      expanded: true,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
