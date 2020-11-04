/* eslint-disable */

import investigationsViewRequestReducer from '../../reducers/investigationsViewRequest';

import {
  resetInvestigationsViewRequest,
  updateInvestigationsViewRequest,
} from '../../actions/case';

describe('investigationsViewRequestReducer', () => {
  it('returns the initial state', () => {
    expect(investigationsViewRequestReducer(undefined, {})).toMatchSnapshot();
  });
  it('reset investigations view', () => {
    expect(investigationsViewRequestReducer({'content': 'Test content'}, resetInvestigationsViewRequest())).toMatchSnapshot();
  });
  it('update investigations view request', () => {
    expect(investigationsViewRequestReducer({}, updateInvestigationsViewRequest('Test Content'))).toMatchSnapshot();
  });
});
