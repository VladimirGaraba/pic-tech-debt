import {
  RESET_REFERRALS_VIEW,
  RESET_TREATMENTS_VIEW,
  UPDATE_REFERRALS,
  UPDATE_REFERRALS_VIEW_REFEREE,
  UPDATE_REFERRALS_VIEW_REFEREE_SITE,
  UPDATE_REFERRALS_VIEW_SPECIALTY,
  UPDATE_TREATMENTS,
  UPDATE_TREATMENTS_VIEW_CONTENT,
  UPDATE_TREATMENTS_VIEW_DISPOSITION,
  UPDATE_TREATMENTS_VIEW_TREATMENTS,
} from '../constants';

export const resetReferralsView = () => ({
  type: RESET_REFERRALS_VIEW,
});

export const resetTreatmentsView = () => ({
  type: RESET_TREATMENTS_VIEW,
});

export const updateReferrals = (id, referee, specialty, refereeSite) => ({
  type: UPDATE_REFERRALS,
  id,
  referee,
  specialty,
  refereeSite: Number(refereeSite),
});

export const updateReferralsViewReferee = (referee) => ({
  type: UPDATE_REFERRALS_VIEW_REFEREE,
  referee,
});

export const updateReferralsViewRefereeSite = (refereeSite) => ({
  type: UPDATE_REFERRALS_VIEW_REFEREE_SITE,
  refereeSite,
});

export const updateReferralsViewSpecialty = (specialty) => ({
  type: UPDATE_REFERRALS_VIEW_SPECIALTY,
  specialty,
});

export const updateTreatments = (id, noteId, disposition, treatments, spi) => ({
  type: UPDATE_TREATMENTS,
  id,
  noteId,
  disposition,
  treatments,
  spi,
});

export const updateTreatmentsViewContent = (content) => ({
  type: UPDATE_TREATMENTS_VIEW_CONTENT,
  content,
});

export const updateTreatmentsViewDisposition = (disposition) => ({
  type: UPDATE_TREATMENTS_VIEW_DISPOSITION,
  disposition,
});

export const updateTreatmentsViewTreatments = (treatmentList) => ({
  type: UPDATE_TREATMENTS_VIEW_TREATMENTS,
  treatmentList,
});
