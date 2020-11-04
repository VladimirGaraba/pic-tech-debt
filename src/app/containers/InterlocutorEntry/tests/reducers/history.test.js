/* eslint-disable */

import historyReducer from '../../reducers/history';

describe('historyReducer', () => {
  var mockedDate = new Date(2018, 3, 29, 6, 22, 20, 817);
  global.Date = jest.fn(() => mockedDate);
  it('returns the initial state', () => {
    expect(historyReducer(undefined, {})).toMatchSnapshot();
  });
});
