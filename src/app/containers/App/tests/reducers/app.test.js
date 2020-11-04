/* eslint-disable */

import casesReducer from 'containers/CaseEntry/reducers/cases';

import {
  batchInsertDocument,
  deleteDocument,
  displayRecord,
  insertDocument,
  updateDocument,
} from '../../actions';

describe('casesReducer', () => {
  var mockedDate = new Date(2018, 3, 7, 17, 8);
  global.Date = jest.fn(() => mockedDate);
  it('returns the initial state', () => {
    expect(casesReducer(undefined, {})).toMatchSnapshot();
  });
  it('batch insert case', () => {
    expect(casesReducer({}, batchInsertDocument([{'_id': 'Test Case 1'}, {'_id': 'Test Case 2'}]))).toMatchSnapshot();
  });
  it('delete case', () => {
    expect(casesReducer({'Test Case': {}}, deleteDocument('Test Case'))).toMatchSnapshot();
  });
  it('display record', () => {
    expect(casesReducer({'Test Case': {}}, displayRecord('Test Case'))).toMatchSnapshot();
  });
  it('insert case', () => {
    expect(casesReducer({}, insertDocument({'_id': 'Test Case'}))).toMatchSnapshot();
  });
  it('update case', () => {
    expect(casesReducer({'Test Case': {}}, updateDocument({'_id': 'Test Case', 'siteCreated': 2}))).toMatchSnapshot();
  });
});
