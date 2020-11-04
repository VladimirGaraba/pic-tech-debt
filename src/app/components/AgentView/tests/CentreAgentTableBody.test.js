import React from 'react';

import { CentreAgentTableBody } from '../CentreAgentTableBody';

describe('CentreAgentTableBody', () => {
  const props = {
    columns: [],
    ignoreEditable: false,
    validateState: {},
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<CentreAgentTableBody {...props} />);
  });

  it('renders the empty table', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the populated table', () => {
    wrapper.setProps({
      columns: [{
        name: 'Column Name',
        field: 'fieldName',
        editable: {
          placeholder: 'Placeholder Text',
          defaultValue: 'Default Value',
        },
        format: '',
        autoValue: false,
        hiddenOnInsert: false,
        customInsertEditor: {
          getElement: jest.fn(),
        },
      }],
    });
    expect(wrapper).toMatchSnapshot();
  });
});
