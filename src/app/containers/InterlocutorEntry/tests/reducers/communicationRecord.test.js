/* eslint-disable */

import communcationRecordReducer from '../../reducers/communicationRecord';

import {
  updateCommunicationStatus,
  updateInterlocutorDirection,
} from '../../actions';

describe('communcationRecordReducer', () => {
  var mockedDate = new Date(2018, 3, 29, 7, 26, 26, 735);
  global.Date = jest.fn(() => mockedDate);
  it('returns the initial state', () => {
    expect(communcationRecordReducer(undefined, {})).toMatchSnapshot();
  });
  it('update communcation status', () => {
    expect(communcationRecordReducer({}, updateCommunicationStatus(1, 'open', false))).toMatchSnapshot();
  });
  it('update interlocutor direction', () => {
    expect(communcationRecordReducer({}, updateInterlocutorDirection(1, 'outbound'))).toMatchSnapshot();
  });
});
