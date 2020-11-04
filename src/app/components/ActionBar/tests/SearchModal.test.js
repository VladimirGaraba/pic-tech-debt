import React from 'react';

import { SearchModal } from '../SearchModal';

describe('SearchModal', () => {
  const props = {
    callRecordId: '',
    displayCase: jest.fn(),
    doSearch: jest.fn(),
    modalProps: {},
    results: [],
    toggleModal: jest.fn(),
    updateModalSelected: jest.fn(),
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<SearchModal {...props} />);
  });

  it('renders the default modal', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
