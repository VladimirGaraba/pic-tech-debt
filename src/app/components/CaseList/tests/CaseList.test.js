import React from 'react';

import { CaseList } from '../index';

jest.mock('moment', () => () => ({ format: () => '2018–01–30T12:34:56+00:00' }));

describe('CaseList', () => {
  const props = {
    callRecordId: '',
    currentCase: {},
    currentRecordId: '',
    deleteFile: jest.fn(),
    deleteRecord: jest.fn(),
    doSearch: jest.fn(),
    endCall: jest.fn(),
    onItemClick: jest.fn(),
    results: [],
    search: {},
    userSPI: {},
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<CaseList {...props} />);
  });

  it('renders the unpopulated case list', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
