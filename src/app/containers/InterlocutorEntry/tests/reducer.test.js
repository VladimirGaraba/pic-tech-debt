/* eslint-disable */

import {
  addCallRecord,
  addCase,
  updateCaseStatus,
} from 'containers/CaseEntry/actions/case';

import InterlocutorEntryReducer from '../reducer';
import {
  replaceCommunications,
  addCommunication,
} from '../actions';

describe('InterlocutorEntryReducer', () => {
  var mockedDate = new Date(2018, 2, 4, 4, 59, 13, 805);
  global.Date = jest.fn(() => mockedDate);
  it('returns the initial state', () => {
    expect(InterlocutorEntryReducer(undefined, {})).toMatchSnapshot();
  });
  it('adds a communication record', () => {
    expect(InterlocutorEntryReducer({}, addCommunication(1, { user: 'test' }))).toMatchSnapshot();
  });
  it('adds a call record', () => {
    const action = addCallRecord(1, { user: 'test' });
    action.commsNoteId = 'de6d38464f8ee145f0731aca7faa24f78d07e25f';
    expect(InterlocutorEntryReducer({}, action)).toMatchSnapshot();
  });
  it('adds a case', () => {
    const action = addCase({ user: 'test' });
    action.commsNoteId = 'de6d38464f8ee145f0731aca7faa24f78d07e25f';
    expect(InterlocutorEntryReducer({}, action)).toMatchSnapshot();
  });
  it('replaces communication records', () => {
    expect(InterlocutorEntryReducer({}, replaceCommunications(1, [{}, {}]))).toMatchSnapshot();
  });
  it('update case status', () => {
    expect(InterlocutorEntryReducer({}, updateCaseStatus(1, 'open', { user: 'test' }, false))).toMatchSnapshot();
  });
});
