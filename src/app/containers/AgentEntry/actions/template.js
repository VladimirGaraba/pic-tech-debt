import { generateUuid } from 'utils/helpers';

import {
  ADD_TEMPLATE_AGENT,
  ADD_TEMPLATE_AGENT_CENTRE_AGENT,
  DELETE_TEMPLATE_AGENT,
  REMOVE_TEMPLATE_AGENT_CENTRE_AGENT,
  UPDATE_TEMPLATE_AGENT_CATEGORY,
  UPDATE_TEMPLATE_AGENT_CENTRE_AGENT,
  UPDATE_TEMPLATE_AGENT_DURATION,
  UPDATE_TEMPLATE_AGENT_EUPCS,
  UPDATE_TEMPLATE_AGENT_INTENDED_USE_GIVEN,
  UPDATE_TEMPLATE_AGENT_INTERLOCUTOR_AGENT_NAME,
  UPDATE_TEMPLATE_AGENT_IS_PATIENTS_OWN_MEDICATION,
  UPDATE_TEMPLATE_AGENT_QUANTITY,
  UPDATE_TEMPLATE_AGENT_ROUTE_OF_EXPOSURE,
  UPDATE_TEMPLATE_AGENT_TIME_OF_EXPOSURE,
  UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE,
  UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE_UNITS,
  UPDATE_TEMPLATE_AGENT_TYPE_OF_EXPOSURE,
  UPDATE_TEMPLATE_AGENT_USE_TYPE,
} from '../constants';

export const addTemplateAgent = (templateId, interlocutorAgentName = '', quantity = '', quantityUnits = '', quantityUnknown = false, timestamp = '', duration = '', durationUnits = '', durationUnknown = false, typeOfExposure = '', routeOfExposure = [], uuid) => ({
  type: ADD_TEMPLATE_AGENT,
  templateId,
  agentId: uuid || generateUuid(),
  interlocutorAgentName,
  quantity,
  quantityUnits,
  quantityUnknown,
  timestamp,
  duration,
  durationUnits,
  durationUnknown,
  typeOfExposure,
  routeOfExposure,
});

export const addTemplateAgentCentreAgent = (templateId, agentId, name, url, quantity, units) => ({
  type: ADD_TEMPLATE_AGENT_CENTRE_AGENT,
  templateId,
  agentId,
  name,
  url,
  quantity,
  units,
});

export const deleteTemplateAgent = (templateId, agentId, agentName) => ({
  type: DELETE_TEMPLATE_AGENT,
  templateId,
  agentId,
  agentName,
});

export const removeTemplateAgentCentreAgent = (templateId, agentId, index, name) => ({
  type: REMOVE_TEMPLATE_AGENT_CENTRE_AGENT,
  templateId,
  agentId,
  index,
  name,
});

export const updateTemplateAgentCategory = (templateId, agentId, old, category) => ({
  type: UPDATE_TEMPLATE_AGENT_CATEGORY,
  templateId,
  agentId,
  old,
  category,
});

export const updateTemplateAgentCentreAgent = (templateId, agentId, index, name, url, quantity, units) => ({
  type: UPDATE_TEMPLATE_AGENT_CENTRE_AGENT,
  templateId,
  agentId,
  index,
  name,
  url,
  quantity,
  units,
});

export const updateTemplateAgentDuration = (templateId, agentId, oldDuration, duration, oldDurationUnits, durationUnits, oldDurationUnknown, durationUnknown) => ({
  type: UPDATE_TEMPLATE_AGENT_DURATION,
  templateId,
  agentId,
  oldDuration: '',
  duration,
  oldDurationUnits: '',
  durationUnits,
  oldDurationUnknown: false,
  durationUnknown,
});

export const updateTemplateAgentEUPCS = (templateId, agentId, old, eupcs) => ({
  type: UPDATE_TEMPLATE_AGENT_EUPCS,
  templateId,
  agentId,
  old,
  eupcs,
});

export const updateTemplateAgentIntendedUseGiven = (templateId, agentId, old, intendedUseGiven) => ({
  type: UPDATE_TEMPLATE_AGENT_INTENDED_USE_GIVEN,
  templateId,
  agentId,
  old,
  intendedUseGiven,
});

export const updateTemplateAgentInterlocutorAgentName = (templateId, agentId, interlocutorAgentName) => ({
  type: UPDATE_TEMPLATE_AGENT_INTERLOCUTOR_AGENT_NAME,
  templateId,
  agentId,
  interlocutorAgentName,
});

export const updateTemplateAgentIsPatientsOwnMedication = (templateId, agentId, old, isPatientsOwnMedication) => ({
  type: UPDATE_TEMPLATE_AGENT_IS_PATIENTS_OWN_MEDICATION,
  templateId,
  agentId,
  old,
  isPatientsOwnMedication,
});

export const updateTemplateAgentQuantity = (templateId, agentId, oldQuantity, quantity, oldQuantityUnits, quantityUnits, oldQuantityUnknown, quantityUnknown) => ({
  type: UPDATE_TEMPLATE_AGENT_QUANTITY,
  templateId,
  agentId,
  oldQuantity: '',
  quantity,
  oldQuantityUnits: '',
  quantityUnits,
  oldQuantityUnknown: false,
  quantityUnknown,
});

export const updateTemplateAgentRouteOfExposure = (templateId, agentId, old, routeOfExposure) => ({
  type: UPDATE_TEMPLATE_AGENT_ROUTE_OF_EXPOSURE,
  templateId,
  agentId,
  old,
  routeOfExposure,
});

export const updateTemplateAgentTimeOfExposure = (templateId, agentId, oldTimeOfExposure, timeOfExposure) => ({
  type: UPDATE_TEMPLATE_AGENT_TIME_OF_EXPOSURE,
  templateId,
  agentId,
  oldTimeOfExposure: '',
  timeOfExposure,
});

export const updateTemplateAgentTimeSinceExposure = (templateId, agentId, old, timeSinceExposure) => ({
  type: UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE,
  templateId,
  agentId,
  old,
  timeSinceExposure,
});

export const updateTemplateAgentTimeSinceExposureUnits = (templateId, agentId, old, timeSinceExposureUnits) => ({
  type: UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE_UNITS,
  templateId,
  agentId,
  old,
  timeSinceExposureUnits,
});

export const updateTemplateAgentTypeOfExposure = (templateId, agentId, old, typeOfExposure) => ({
  type: UPDATE_TEMPLATE_AGENT_TYPE_OF_EXPOSURE,
  templateId,
  agentId,
  old,
  typeOfExposure,
});

export const updateTemplateAgentUseType = (templateId, agentId, old, useType) => ({
  type: UPDATE_TEMPLATE_AGENT_USE_TYPE,
  templateId,
  agentId,
  old,
  useType,
});
