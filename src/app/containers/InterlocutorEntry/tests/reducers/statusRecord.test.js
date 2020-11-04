/* eslint-disable */

import statusRecordReducer from '../../reducers/communicationRecord';

describe('statusRecordReducer', () => {
  var mockedDate = new Date(2018, 3, 29, 7, 26, 26, 735);
  global.Date = jest.fn(() => mockedDate);
  it('returns the initial state', () => {
    expect(statusRecordReducer(undefined, {})).toMatchSnapshot();
  });
});
