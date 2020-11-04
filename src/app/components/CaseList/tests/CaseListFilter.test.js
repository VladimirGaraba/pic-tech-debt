import React from 'react';

import { CaseListFilter } from '../CaseListFilter';

describe('CaseListFilter', () => {
  const props = {
    currentlySyncing: false,
    doSearch: jest.fn(),
    intl: {},
    search: {},
    updateSearchCallerLocation: jest.fn(),
    updateSearchCallerOrganisation: jest.fn(),
    updateSearchCentreName: jest.fn(),
    updateSearchFilter: jest.fn(),
    updateSearchId: jest.fn(),
    updateSearchName: jest.fn(),
    updateSearchPostcode: jest.fn(),
    updateSearchSex: jest.fn(),
    updateSearchTime: jest.fn(),
    userSPI: {},
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<CaseListFilter {...props} />);
  });

  it('renders the case list filter form', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
