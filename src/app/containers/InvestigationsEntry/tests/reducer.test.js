/* eslint-disable */

import InvestigationsReducer from '../reducer';

import {
  updateInvestigationsRequests,
  updateInvestigationsResults,
} from '../actions/case';

describe('InvestigationsReducer', () => {
  it('returns the initial state', () => {
    expect(InvestigationsReducer(undefined, {})).toMatchSnapshot();
  });
  it('update requests', () => {
    expect(InvestigationsReducer([], updateInvestigationsRequests(1, 0, 1))).toMatchSnapshot();
  });
  it('update results', () => {
    expect(InvestigationsReducer([{'results': []}], updateInvestigationsResults(1, 0, 4))).toMatchSnapshot();
  });
});
