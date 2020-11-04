/* eslint-disable */

import {
  addCallRecord,
  addCase,
  endCall,
  resetAgentViewCentreName,
  updateAgentViewCentreName,
  updateApplicationKeyId,
  updateCaseOutcome,
  updateCaseStatus,
  updateCaseTopic,
  updateCaseType,
} from '../actions/case';

import {
  updateTemplateOutcome,
  updateTemplateTopic,
} from '../actions/template';

describe('App Actions', () => {
  const mockedDate = new Date(2018, 2, 4, 4, 59, 13, 805);
  global.Date = jest.fn(() => mockedDate);
  describe('App action creators', () => {
    it('addCallRecord', () => {
      const action = addCallRecord(1, { name: 'Test SPI' });
      action.commsNoteId = 'de6d38464f8ee145f0731aca7faa24f78d07e25f';
      expect(action).toMatchSnapshot();
    });
    it('addCase', () => {
      const action = addCase({ name: 'Test SPI' }, 'WAPIC', {id: 'appKeyId', key: 'appKey'});
      action.id = '481966f3ebcc4cef9a26ad178dd3e4cfce6e9aef';
      action.commsNoteId = 'de6d38464f8ee145f0731aca7faa24f78d07e25f';
      expect(action).toMatchSnapshot();
    });
    it('endCall', () => {
      expect(endCall()).toMatchSnapshot();
    });
    it('resetAgentViewCentreName', () => {
      expect(resetAgentViewCentreName()).toMatchSnapshot();
    });
    it('updateAgentViewCentreName', () => {
      expect(updateAgentViewCentreName('Test name')).toMatchSnapshot();
    });
    it('updateApplicationKeyId', () => {
      expect(updateApplicationKeyId(1, {id: 'appKeyId', key: 'appKey'})).toMatchSnapshot();
    });
    it('updateCaseOutcome', () => {
      expect(updateCaseOutcome(1, 'Old Outcome', 'New Outcome')).toMatchSnapshot();
    });
    it('updateCaseStatus', () => {
      expect(updateCaseStatus(1, 'open', { name: 'Test SPI' }, false)).toMatchSnapshot();
    });
    it('updateCaseTopic', () => {
      expect(updateCaseTopic(1, 'Old Topic', 'New Topic')).toMatchSnapshot();
    });
    it('updateCaseType', () => {
      expect(updateCaseType(1, 'hoax')).toMatchSnapshot();
    });
    it('updateTemplateOutcome', () => {
      expect(updateTemplateOutcome(1, 'Old Outcome', 'New Outcome')).toMatchSnapshot();
    });
    it('updateTemplateTopic', () => {
      expect(updateTemplateTopic(1, 'Old Topic', 'New Topic')).toMatchSnapshot();
    });
  });
});
