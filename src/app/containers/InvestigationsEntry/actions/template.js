import {
  UPDATE_TEMPLATE_INVESTIGATIONS_REQUESTS,
  UPDATE_TEMPLATE_INVESTIGATIONS_RESULTS,
} from '../constants';

export const updateTemplateInvestigationsRequests = (templateId, requestIx, noteId) => ({
  type: UPDATE_TEMPLATE_INVESTIGATIONS_REQUESTS,
  templateId,
  requestIx,
  noteId,
});

export const updateTemplateInvestigationsResults = (templateId, requestIx, noteId) => ({
  type: UPDATE_TEMPLATE_INVESTIGATIONS_RESULTS,
  templateId,
  requestIx,
  noteId,
});
