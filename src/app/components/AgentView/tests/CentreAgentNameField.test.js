import React from 'react';

import { CentreAgentNameField } from '../CentreAgentNameField';

describe('CentreAgentNameField', () => {
  const props = {
    defaultValue: '',
    onUpdate: jest.fn(),
    tableRef: {},
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<CentreAgentNameField {...props} />);
  });

  it('renders the typeahead field', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
