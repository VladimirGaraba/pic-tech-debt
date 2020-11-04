/* eslint-disable */

import casesReducer from 'containers/CaseEntry/reducers/cases';

import {
  addCallRecord,
  addCase,
  updateApplicationKeyId,
  updateCaseOutcome,
  updateCaseStatus,
  updateCaseTopic,
  updateCaseType,
} from '../../actions/case';

import {
  saveNote,
} from 'containers/NoteEntry/actions/case';

describe('casesReducer', () => {
  var mockedDate = new Date(2018, 3, 7, 17, 8);
  global.Date = jest.fn(() => mockedDate);
  it('returns the initial state', () => {
    expect(casesReducer(undefined, {})).toMatchSnapshot();
  });
  it('add call record', () => {
    const action = addCallRecord('Test Case', {'name': 'Test SPI'});
    action.commsNoteId = 'de6d38464f8ee145f0731aca7faa24f78d07e25f';
    expect(casesReducer({}, action)).toMatchSnapshot();
  });
  it('add case', () => {
    const action = addCase({'name': 'Test SPI', 'siteId': 2, 'roles': ['SPI']}, 'WAPIC', {id: 'appKeyId', key: 'appKey'});
    action.id = '5ead68d0e8d5d48b3262b58478763e2f20c61f15';
    action.commsNoteId = 'de6d38464f8ee145f0731aca7faa24f78d07e25f';
    expect(casesReducer({}, action)).toMatchSnapshot();
  });
  it('save note', () => {
    expect(casesReducer({'Test Case': {'_attachments': {}}}, saveNote('Test Case', 'Test Note', 'Test Context', 'Test Subcontext', 'Test Title', 'Test Content', [{}], {'name': 'Test SPI'}))).toMatchSnapshot();
  });
  it('update application key id', () => {
    expect(casesReducer({'Test Case': {}}, updateApplicationKeyId('Test Case', { id: 'appKeyId', key: 'appKey' }))).toMatchSnapshot();
  });
  it('update case outcome', () => {
    expect(casesReducer({'Test Case': {}}, updateCaseOutcome('Test Case', 'Old Outcome', 'New Outcome'))).toMatchSnapshot();
  });
  it('update case status', () => {
    expect(casesReducer({'Test Case': {}}, updateCaseStatus('Test Case', 'open', {'name': 'Test SPI'}, false))).toMatchSnapshot();
  });
  it('update case topic', () => {
    expect(casesReducer({'Test Case': {}}, updateCaseTopic('Test Case', 'Old Topic', 'New Topic'))).toMatchSnapshot();
  });
  it('update case type', () => {
    expect(casesReducer({'Test Case': {'type': 'case'}}, updateCaseType('Test Case', 'hoax'))).toMatchSnapshot();
  });
});
