/* eslint-disable */

import mediumReducer from '../../reducers/medium';
import aes256 from 'aes256';

import {
  updateInterlocutorMedium,
  updateInterlocutorMediumDetail,
} from '../../actions';

describe('mediumReducer', () => {
  const appKey = { id: 'appKeyId', key: 'appKey' };
  it('returns the initial state', () => {
    expect(mediumReducer(undefined, {})).toMatchSnapshot();
  });
  it('update caller medium', () => {
    expect(mediumReducer({}, updateInterlocutorMedium(1, 'Email'))).toMatchSnapshot();
  });
  it('update caller medium detail', () => {
    console.log(aes256.encrypt('key',' string'));
    expect(mediumReducer({}, updateInterlocutorMediumDetail(1, 'test@testing.test', appKey))).toMatchSnapshot();
  });
});
