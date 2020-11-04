import {
  HIDE_INVESTIGATIONS_VIEW_RESULT_MODAL,
  REMOVE_INVESTIGATIONS_VIEW_RESULT_ATTACHMENT,
  RESET_INVESTIGATIONS_VIEW_REQUEST,
  RESET_INVESTIGATIONS_VIEW_RESULT,
  SHOW_INVESTIGATIONS_VIEW_RESULT_MODAL,
  UPDATE_INVESTIGATIONS_REQUESTS,
  UPDATE_INVESTIGATIONS_RESULTS,
  UPDATE_INVESTIGATIONS_VIEW_REQUEST,
  UPDATE_INVESTIGATIONS_VIEW_RESULT_ATTACHMENTS,
  UPDATE_INVESTIGATIONS_VIEW_RESULT_DESCRIPTION,
  UPDATE_INVESTIGATIONS_VIEW_RESULT_NOTES,
} from '../constants';

export const hideInvestigationsViewResultModal = () => ({
  type: HIDE_INVESTIGATIONS_VIEW_RESULT_MODAL,
});

export const removeInvestigationsViewResultAttachment = (index) => ({
  type: REMOVE_INVESTIGATIONS_VIEW_RESULT_ATTACHMENT,
  index,
});

export const resetInvestigationsViewRequest = () => ({
  type: RESET_INVESTIGATIONS_VIEW_REQUEST,
});

export const resetInvestigationsViewResult = () => ({
  type: RESET_INVESTIGATIONS_VIEW_RESULT,
});

export const showInvestigationsViewResultModal = (requestIx) => ({
  type: SHOW_INVESTIGATIONS_VIEW_RESULT_MODAL,
  requestIx,
});

export const updateInvestigationsRequests = (id, requestIx, noteId) => ({
  type: UPDATE_INVESTIGATIONS_REQUESTS,
  id,
  requestIx,
  noteId,
});

export const updateInvestigationsResults = (id, requestIx, noteId) => ({
  type: UPDATE_INVESTIGATIONS_RESULTS,
  id,
  requestIx,
  noteId,
});

export const updateInvestigationsViewRequest = (content) => ({
  type: UPDATE_INVESTIGATIONS_VIEW_REQUEST,
  content,
});

export const updateInvestigationsViewResultAttachments = (attachments) => ({
  type: UPDATE_INVESTIGATIONS_VIEW_RESULT_ATTACHMENTS,
  attachments,
});

export const updateInvestigationsViewResultDescription = (description) => ({
  type: UPDATE_INVESTIGATIONS_VIEW_RESULT_DESCRIPTION,
  description,
});

export const updateInvestigationsViewResultNotes = (content) => ({
  type: UPDATE_INVESTIGATIONS_VIEW_RESULT_NOTES,
  content,
});
