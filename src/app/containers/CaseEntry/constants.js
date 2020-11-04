/*
 * Case Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CLOSED_STATE = 'pending';
export const DELETED_STATE = 'deleted';
export const OPENED_STATE = 'open';
export const REVIEWED_STATE = 'closed';

export const ADD_CALL_RECORD = 'pic/CaseEntry/ADD_CALL_RECORD';
export const ADD_CASE = 'pic/CaseEntry/ADD_CASE';
export const ADD_INCIDENT = 'pic/CaseEntry/ADD_INCIDENT';
export const ADD_TEMPLATE = 'pic/CaseEntry/ADD_TEMPLATE';
export const DELETE_TEMPLATE = 'pic/CaseEntry/DELETE_TEMPLATE';
export const EDIT_TEMPLATE = 'pic/CaseEntry/EDIT_TEMPLATE';
export const END_CALL_RECORD = 'pic/CaseEntry/END_CALL_RECORD';
export const LINK_CASE_INCIDENT = 'pic/CaseEntry/LINK_CASE_INCIDENT';
export const RESET_AGENT_VIEW_CENTRE_NAME = 'pic/CaseEntry/RESET_AGENT_VIEW_CENTRE_NAME';
export const SAVE_TEMPLATE = 'pic/CaseEntry/SAVE_TEMPLATE';
export const UNLINK_CASE_INCIDENT = 'pic/CaseEntry/UNLINK_CASE_INCIDENT';
export const UPDATE_AGENT_VIEW_CENTRE_NAME = 'pic/CaseEntry/UPDATE_AGENT_VIEW_CENTRE_NAME';
export const UPDATE_APPLICATION_KEY_ID = 'pic/CaseEntry/UPDATE_APPLICATION_KEY_ID';
export const UPDATE_CASE_OUTCOME = 'pic/CaseEntry/UPDATE_CASE_OUTCOME';
export const UPDATE_CASE_STATUS = 'pic/CaseEntry/UPDATE_CASE_STATUS';
export const UPDATE_CASE_TOPIC = 'pic/CaseEntry/UPDATE_CASE_TOPIC';
export const UPDATE_CASE_TYPE = 'pic/CaseEntry/UPDATE_CASE_TYPE';
export const UPDATE_INCIDENT_NAME = 'pic/CaseEntry/UPDATE_INCIDENT_NAME';
export const UPDATE_TEMPLATE_CASE_TYPE = 'pic/CaseEntry/UPDATE_TEMPLATE_CASE_TYPE';
export const UPDATE_TEMPLATE_MACRO = 'pic/CaseEntry/UPDATE_TEMPLATE_MACRO';
export const UPDATE_TEMPLATE_OUTCOME = 'pic/CaseEntry/UPDATE_TEMPLATE_OUTCOME';
export const UPDATE_TEMPLATE_TOPIC = 'pic/CaseEntry/UPDATE_TEMPLATE_TOPIC';
