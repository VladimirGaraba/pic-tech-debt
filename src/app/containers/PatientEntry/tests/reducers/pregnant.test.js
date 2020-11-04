/* eslint-disable */

import PregnantReducer from '../../reducers/pregnant';

import {
  updatePatientPregnantLactating,
  updatePatientPregnantStatus,
  updatePatientPregnantTrimester,
  updatePatientPregnantTrimesterUnknown,
} from '../../actions/case';

describe('PregnantReducer', () => {
  it('returns the initial state', () => {
    expect(PregnantReducer(undefined, {})).toMatchSnapshot();
  });
  it('update lactating', () => {
    expect(PregnantReducer({}, updatePatientPregnantLactating(1, false, true))).toMatchSnapshot();
  });
  it('update status', () => {
    expect(PregnantReducer({}, updatePatientPregnantStatus(1, 'Old Status', 'New Status'))).toMatchSnapshot();
  });
  it('update trimester', () => {
    expect(PregnantReducer({}, updatePatientPregnantTrimester(1, 1, 2))).toMatchSnapshot();
  });
  it('update trimesterUnknown', () => {
    expect(PregnantReducer({}, updatePatientPregnantTrimesterUnknown(1, true, false))).toMatchSnapshot();
  });
});
