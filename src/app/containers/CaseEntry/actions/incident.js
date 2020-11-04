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
  ADD_INCIDENT,
  LINK_CASE_INCIDENT,
  UNLINK_CASE_INCIDENT,
  UPDATE_INCIDENT_NAME,
} from '../constants';


export const addIncident = (spi, prefix, name, caseId) => ({
  type: ADD_INCIDENT,
  incidentId: generateUuid(),
  spi,
  prefix,
  name,
  caseId,
});

export const linkCaseIncident = (caseId, incidentId) => ({
  type: LINK_CASE_INCIDENT,
  caseId,
  incidentId,
});

export const unlinkCaseIncident = (caseId, incidentId) => ({
  type: UNLINK_CASE_INCIDENT,
  caseId,
  incidentId,
});

export const updateIncidentName = (incidentId, name) => ({
  type: UPDATE_INCIDENT_NAME,
  incidentId,
  name,
});
