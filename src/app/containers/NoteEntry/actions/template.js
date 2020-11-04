/*
 * Note Actions
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

import {
  SAVE_TEMPLATE_NOTE,
  UPDATE_TEMPLATE_NOTE_CONTENT,
  UPDATE_TEMPLATE_NOTE_CONTEXT,
  UPDATE_TEMPLATE_NOTE_SUBCONTEXT,
  UPDATE_TEMPLATE_NOTE_TITLE,
  ADD_TEMPLATE_NOTE_ATTACHMENTS,
  REMOVE_TEMPLATE_NOTE_ATTACHMENT,
} from '../constants';

export const linkTemplateNote = (templateId, noteId) => ({
  type: SAVE_TEMPLATE_NOTE,
  noteId,
});

export const saveTemplateNote = (templateId, noteId, context, subcontext, title, content, attachments, spi) => ({
  type: SAVE_TEMPLATE_NOTE,
  templateId,
  noteId,
  context,
  subcontext,
  title,
  content,
  attachments,
  spi,
});

export const updateTemplateNoteContent = (templateId, noteId, content) => ({
  type: UPDATE_TEMPLATE_NOTE_CONTENT,
  templateId,
  noteId,
  content,
});

export const updateTemplateNoteContext = (templateId, noteId, context) => ({
  type: UPDATE_TEMPLATE_NOTE_CONTEXT,
  templateId,
  noteId,
  context,
});

export const addTemplateNoteAttachments = (templateId, noteId, attachments) => ({
  type: ADD_TEMPLATE_NOTE_ATTACHMENTS,
  templateId,
  noteId,
  attachments,
});

export const removeTemplateNoteAttachment = (templateId, noteId, index, name) => ({
  type: REMOVE_TEMPLATE_NOTE_ATTACHMENT,
  templateId,
  noteId,
  index,
  name,
});

export const updateTemplateNoteSubcontext = (templateId, noteId, subcontext) => ({
  type: UPDATE_TEMPLATE_NOTE_SUBCONTEXT,
  templateId,
  noteId,
  subcontext,
});

export const updateTemplateNoteTitle = (templateId, noteId, title) => ({
  type: UPDATE_TEMPLATE_NOTE_TITLE,
  templateId,
  noteId,
  title,
});
