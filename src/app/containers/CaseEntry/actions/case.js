/*
 * Case Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { generateUuid } from 'utils/helpers';

import {
  ADD_CALL_RECORD,
  ADD_CASE,
  END_CALL_RECORD,
  RESET_AGENT_VIEW_CENTRE_NAME,
  UPDATE_AGENT_VIEW_CENTRE_NAME,
  UPDATE_APPLICATION_KEY_ID,
  UPDATE_CASE_OUTCOME,
  UPDATE_CASE_STATUS,
  UPDATE_CASE_TOPIC,
  UPDATE_CASE_TYPE,
} from '../constants';

export const addCallRecord = (id, spi, appKey) => ({
  type: ADD_CALL_RECORD,
  id,
  commsNoteId: generateUuid(),
  spi,
  appKey,
});

export const addCase = (spi, prefix, appKey) => ({
  type: ADD_CASE,
  id: generateUuid(),
  commsNoteId: generateUuid(),
  spi,
  prefix,
  appKey,
});

export const endCall = (caseId) => ({
  type: END_CALL_RECORD,
  caseId,
});

export const resetAgentViewCentreName = () => ({
  type: RESET_AGENT_VIEW_CENTRE_NAME,
});

export const updateAgentViewCentreName = (agentViewCentreName) => ({
  type: UPDATE_AGENT_VIEW_CENTRE_NAME,
  agentViewCentreName,
});

export const updateApplicationKeyId = (id, appKey) => ({
  type: UPDATE_APPLICATION_KEY_ID,
  id,
  appKey,
});

export const updateCaseOutcome = (id, old, outcome) => ({
  type: UPDATE_CASE_OUTCOME,
  id,
  old,
  outcome,
});

export const updateCaseStatus = (id, status, spi, immediate = false) => ({
  type: UPDATE_CASE_STATUS,
  id,
  status,
  spi,
  immediate,
});

export const updateCaseTopic = (id, old, topic) => ({
  type: UPDATE_CASE_TOPIC,
  id,
  old,
  topic,
});

export const updateCaseType = (id, caseType) => ({
  type: UPDATE_CASE_TYPE,
  id,
  caseType,
});
