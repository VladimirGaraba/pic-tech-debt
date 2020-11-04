/* eslint-disable */

import interlocutorReducer from '../../reducers/communicationRecord';

import {
  updateInterlocutorCategory,
  updateInterlocutorContactDetail,
  updateInterlocutorName
} from '../../actions';

describe('interlocutorReducer', () => {
  var mockedDate = new Date(2018, 3, 29, 7, 26, 32, 890);
  const appKey = { id: 'appKeyId', key: 'appKey' };
  global.Date = jest.fn(() => mockedDate);
  it('returns the initial state', () => {
    expect(interlocutorReducer(undefined, {})).toMatchSnapshot();
  });
  it('update caller category', () => {
    expect(interlocutorReducer({}, updateInterlocutorCategory(1, 'Self'))).toMatchSnapshot();
  });
  it('update caller contact detail', () => {
    expect(interlocutorReducer({}, updateInterlocutorContactDetail(1, '(08) 9800 0000'))).toMatchSnapshot();
  });
  it('update caller name', () => {
    expect(interlocutorReducer({}, updateInterlocutorName(1, 'Test name', appKey))).toMatchSnapshot();
  });
});
