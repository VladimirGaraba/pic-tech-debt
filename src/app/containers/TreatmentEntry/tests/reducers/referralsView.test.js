/* eslint-disable */

import ReferralsViewReducer from '../../reducers/referralsView';

import {
  resetReferralsView,
  updateReferralsViewReferee,
  updateReferralsViewRefereeSite,
  updateReferralsViewSpecialty,
} from '../../actions/case';

describe('ReferralsViewReducer', () => {
  it('returns the initial state', () => {
    expect(ReferralsViewReducer(undefined, {})).toMatchSnapshot();
  });
  it('reset referrals view', () => {
    expect(ReferralsViewReducer({'referee': 'Test', 'specialty': 'Test', 'refereeSite': 1}, resetReferralsView())).toMatchSnapshot();
  });
  it('update referrals view referee', () => {
    expect(ReferralsViewReducer({'referee': 'Test', 'specialty': 'Test', 'refereeSite': 1}, updateReferralsViewReferee('Test Referee'))).toMatchSnapshot();
  });
  it('update referrals view referee site', () => {
    expect(ReferralsViewReducer({'referee': 'Test', 'specialty': 'Test', 'refereeSite': 1}, updateReferralsViewRefereeSite('Test Referee Site'))).toMatchSnapshot();
  });
  it('update referrals view specialty', () => {
    expect(ReferralsViewReducer({'referee': 'Test', 'specialty': 'Test', 'refereeSite': 1}, updateReferralsViewSpecialty('Test Specialty'))).toMatchSnapshot();
  });
});
