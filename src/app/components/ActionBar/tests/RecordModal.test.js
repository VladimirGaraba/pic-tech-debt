import React from 'react';

import { RecordModal } from '../RecordModal';

describe('RecordModal', () => {
  const props = {
    addCase: jest.fn(),
    doSearch: jest.fn(),
    intl: { formatDate: jest.fn() },
    modalProps: {},
    openFile: jest.fn(),
    results: [],
    site: {},
    startCall: jest.fn(),
    toggleModal: jest.fn(),
    updateModalSelected: jest.fn(),
    userSPI: { abilities: ['create call files'] },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = global.shallowWithIntl(<RecordModal {...props} />);
  });

  it('renders the default modal', () => {
    wrapper.setState({ btn: 'addCase' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the modal with the record tab activated', () => {
    wrapper.setState({ btn: 'startCall' });
    expect(wrapper).toMatchSnapshot();
  });

  it('omits the new record tab for those without the "create call files" ability', () => {
    wrapper.setState({ btn: 'addCase' });
    wrapper.setProps({ userSPI: { abilities: [] } });
    expect(wrapper).toMatchSnapshot();
  });
});
