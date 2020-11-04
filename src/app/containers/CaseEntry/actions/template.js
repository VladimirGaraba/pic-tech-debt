/*
 * App Actions
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
  ADD_TEMPLATE,
  DELETE_TEMPLATE,
  EDIT_TEMPLATE,
  SAVE_TEMPLATE,
  UPDATE_TEMPLATE_OUTCOME,
  UPDATE_TEMPLATE_CASE_TYPE,
  UPDATE_TEMPLATE_MACRO,
  UPDATE_TEMPLATE_TOPIC,
} from '../constants';

export const addTemplate = (spi, prefix) => ({
  type: ADD_TEMPLATE,
  commsNoteId: generateUuid(),
  prefix,
  spi,
  templateId: generateUuid(),
});

export const deleteTemplate = (macro) => ({
  type: DELETE_TEMPLATE,
  macro,
});

export const editTemplate = (macro, template, spi) => ({
  type: EDIT_TEMPLATE,
  commsNoteId: generateUuid(),
  macro,
  templateId: template._id, // eslint-disable-line no-underscore-dangle
  template,
  spi,
});

export const saveTemplate = (macro, template) => ({
  type: SAVE_TEMPLATE,
  macro,
  template,
});

export const updateTemplateCaseType = (templateId, old, caseType) => ({
  type: UPDATE_TEMPLATE_CASE_TYPE,
  templateId,
  old,
  caseType,
});

export const updateTemplateOutcome = (templateId, old, outcome) => ({
  type: UPDATE_TEMPLATE_OUTCOME,
  templateId,
  old,
  outcome,
});

export const updateTemplateTopic = (templateId, old, topic) => ({
  type: UPDATE_TEMPLATE_TOPIC,
  templateId,
  old,
  topic,
});

export const updateTemplateMacro = (templateId, old, macro) => ({
  type: UPDATE_TEMPLATE_MACRO,
  templateId,
  old,
  macro,
});
