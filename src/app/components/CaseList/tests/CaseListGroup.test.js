import React from 'react';

import { CaseListGroup } from '../CaseListGroup';

describe('CaseListGroup', () => {
  jest.mock('moment', () => () => ({ format: () => '2018–01–30T12:34:56+00:00' }));

  const props = {
    parent: undefined,
    children: undefined,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<CaseListGroup {...props} />);
  });

  it('renders the group wrapper', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
