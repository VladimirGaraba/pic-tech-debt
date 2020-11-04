import {
  UPDATE_TEMPLATE_REFERRALS,
  UPDATE_TEMPLATE_TREATMENTS,
} from '../constants';

export const updateTemplateReferrals = (templateId, referee, specialty, refereeSite) => ({
  type: UPDATE_TEMPLATE_REFERRALS,
  templateId,
  referee,
  specialty,
  refereeSite,
});

export const updateTemplateTreatments = (templateId, noteId, disposition, treatments, spi) => ({
  type: UPDATE_TEMPLATE_TREATMENTS,
  templateId,
  noteId,
  disposition,
  treatments,
  spi,
});
