/* eslint-disable */

import ReferralsReducer from '../../reducers/referrals';

import {
  updateReferrals,
} from '../../actions/case';

describe('ReferralsReducer', () => {
  it('returns the initial state', () => {
    expect(ReferralsReducer(undefined, {})).toMatchSnapshot();
  });
  it('update referrals', () => {
    var mockedDate = new Date(2018, 3, 7, 17, 8);
    global.Date = jest.fn(() => mockedDate);
    expect(ReferralsReducer([], updateReferrals(1, 'Test Referee', 'Test Specialty', 2))).toMatchSnapshot();
  });
});
