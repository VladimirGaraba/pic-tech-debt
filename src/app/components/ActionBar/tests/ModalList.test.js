import React from 'react';

import { ModalList } from '../ModalList';

jest.mock('moment', () => () => ({ format: () => '1234567890' }));

describe('ModalList', () => {
  const props = {
    doSearch: jest.fn(),
    intl: {},
    modalProps: {},
    results: [],
    updateSelected: jest.fn(),
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<ModalList {...props} />);
  });

  it('renders the empty list', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the populated list', () => {
    wrapper.setState({ items: [
      {
        id: 1,
        type: 'case',
        status: 'open',
        topic: 'Topic',
        category: 'Adult',
        name: 'Name',
      },
    ] });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the populated list with the selected item highlighted', () => {
    wrapper.setProps({ modalProps: { selected: 1 } });
    expect(wrapper).toMatchSnapshot();
  });
});
