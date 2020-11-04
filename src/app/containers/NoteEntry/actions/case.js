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
  SAVE_NOTE,
  UPDATE_NOTE_CONTENT,
  UPDATE_NOTE_CONTEXT,
  UPDATE_NOTE_SUBCONTEXT,
  UPDATE_NOTE_TITLE,
  ADD_NOTE_ATTACHMENTS,
  REMOVE_NOTE_ATTACHMENT,
} from '../constants';

export const linkNote = (id, noteId) => ({
  type: SAVE_NOTE,
  noteId,
});

export const saveNote = (id, noteId, context, subcontext, title, content, attachments, spi) => ({
  type: SAVE_NOTE,
  id,
  noteId,
  context,
  subcontext,
  title,
  content,
  attachments,
  spi,
});

export const updateNoteContent = (id, noteId, content) => ({
  type: UPDATE_NOTE_CONTENT,
  id,
  noteId,
  content,
});

export const updateNoteContext = (id, noteId, context) => ({
  type: UPDATE_NOTE_CONTEXT,
  id,
  noteId,
  context,
});

export const addNoteAttachments = (id, noteId, attachments) => ({
  type: ADD_NOTE_ATTACHMENTS,
  id,
  noteId,
  attachments,
});

export const removeNoteAttachment = (id, noteId, index, name) => ({
  type: REMOVE_NOTE_ATTACHMENT,
  id,
  noteId,
  index,
  name,
});

export const updateNoteSubcontext = (id, noteId, subcontext) => ({
  type: UPDATE_NOTE_SUBCONTEXT,
  id,
  noteId,
  subcontext,
});

export const updateNoteTitle = (id, noteId, title) => ({
  type: UPDATE_NOTE_TITLE,
  id,
  noteId,
  title,
});
