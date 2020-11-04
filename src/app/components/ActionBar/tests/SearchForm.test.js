import React from 'react';

import { SearchForm } from '../SearchForm';

describe('SearchForm', () => {
  const props = {
    intl: {},
    modalProps: {},
    updateModalCallerLocation: jest.fn(),
    updateModalCallerOrganisation: jest.fn(),
    updateModalCentreName: jest.fn(),
    updateModalFilter: jest.fn(),
    updateModalId: jest.fn(),
    updateModalName: jest.fn(),
    updateModalPostcode: jest.fn(),
    updateModalSex: jest.fn(),
    updateModalTime: jest.fn(),
    userSPI: {},
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<SearchForm {...props} />);
  });

  it('renders the search form', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
