import { combineReducers } from 'redux';

import agentRecordReducer from 'containers/AgentEntry/reducers/agent';
import agentViewReducer from 'containers/AgentEntry/reducers/agentView';
import caseListSearchReducer from 'containers/CurrentCaseList/reducers/caseListSearch';
import incidentSearchFilterReducer from 'containers/CurrentCaseList/reducers/incidentSearch';
import investigationsViewRequestReducer from 'containers/InvestigationsEntry/reducers/investigationsViewRequest';
import investigationsViewResultReducer from 'containers/InvestigationsEntry/reducers/investigationsViewResult';
import referralsViewReducer from 'containers/TreatmentEntry/reducers/referralsView';
import searchFilterReducer from 'containers/ActionBarContainer/reducers/searchFilter';
import searchResultsReducer from 'containers/App/reducers/searchResults';
import treatmentsViewReducer from 'containers/TreatmentEntry/reducers/treatmentsView';
import viewsReducer from 'containers/App/reducers/vars/views';

import {
  SET_AGENT_TAB,
} from 'containers/AgentEntry/constants';

import {
  ADD_CALL_RECORD,
  ADD_CASE,
  ADD_TEMPLATE,
  EDIT_TEMPLATE,
  END_CALL_RECORD,
  RESET_AGENT_VIEW_CENTRE_NAME,
  SAVE_TEMPLATE,
  UPDATE_AGENT_VIEW_CENTRE_NAME,
  UPDATE_TEMPLATE_MACRO,
} from 'containers/CaseEntry/constants';

import {
  CHANGE_FORM,
  CLEAR_ERROR,
  DEFAULT_UIMODE,
  DISPLAY_RECORD,
  DISPLAY_TEMPLATE,
  EDITTEMPLATE_UIMODE,
  LOGOUT,
  LOOKUP_MACRO,
  REQUEST_ERROR,
  SENDING_REQUEST,
  SET_AUTH,
  SET_TAB,
  SET_UI_MODE_DEFAULT,
  SET_UI_MODE_EDIT_TEMPLATES,
  STORE_KEY,
  SW_UPDATED,
  SYNCING_POUCH,
  UPDATE_TOXICOLOGY_SOURCE,
} from '../constants';

const activeTab = (state = 0, action) => {
  switch (action.type) {
    case SET_TAB:
      return action.tab;
    default:
      return state;
  }
};

const activeAgentTab = (state = 0, action) => {
  switch (action.type) {
    case SET_AGENT_TAB:
      return action.tab;
    default:
      return state;
  }
};

const agentViewCentreName = (state = '', action) => {
  switch (action.type) {
    case RESET_AGENT_VIEW_CENTRE_NAME:
      return '';
    case UPDATE_AGENT_VIEW_CENTRE_NAME:
      return action.agentViewCentreName;
    default:
      return state;
  }
};

const applicationKeys = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH: {
      const token = action.token;
      const newClaims = (action.newAuthState && token) ? JSON.parse(atob(token.split('.')[1])) : {};
      if (newClaims.application_key_id) {
        return {
          [newClaims.application_key_id]: newClaims.application_key,
        };
      }
      return {};
    }
    case STORE_KEY: {
      return {
        ...state,
        [action.appKeyId]: action.appKey,
      };
    }
    default:
      return state;
  }
};

const callRecordId = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_CALL_RECORD:
      return action.id;
    case END_CALL_RECORD:
      return null;
    default:
      return state;
  }
};

const editingTemplateId = (state = null, action) => {
  switch (action.type) {
    case ADD_TEMPLATE:
    case EDIT_TEMPLATE:
      return action.templateId;
    case SAVE_TEMPLATE:
      return null;
    default:
      return state;
  }
};

const currentlySending = (state = false, action) => {
  switch (action.type) {
    case SENDING_REQUEST:
      return action.sending;
    default:
      return state;
  }
};

const currentlySyncing = (state = false, action) => {
  switch (action.type) {
    case SYNCING_POUCH:
      return action.syncing;
    default:
      return state;
  }
};

const currentRecordId = (state = null, action) => {
  switch (action.type) {
    case ADD_CASE:
    case DISPLAY_RECORD:
      return action.id;
    case END_CALL_RECORD:
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

const currentTemplateId = (state = null, action) => {
  switch (action.type) {
    case ADD_TEMPLATE:
    case DISPLAY_TEMPLATE:
    case EDIT_TEMPLATE:
      return action.templateId;
    case SAVE_TEMPLATE:
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

const error = (state = '', action) => {
  switch (action.type) {
    case CLEAR_ERROR:
      return '';
    case REQUEST_ERROR:
      return action.error;
    default:
      return state;
  }
};

const formState = (state = { username: '', password: '' }, action) => {
  switch (action.type) {
    case CHANGE_FORM:
      return action.newFormState;
    default:
      return state;
  }
};

const jwtClaims = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH: {
      const token = action.token;
      const newClaims = (action.newAuthState && token) ? JSON.parse(atob(token.split('.')[1])) : {};
      return newClaims;
    }
    default:
      return state;
  }
};

const loggedIn = (state = false, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.newAuthState;
    default:
      return state;
  }
};

const swUpdated = (state = false, action) => {
  switch (action.type) {
    case SW_UPDATED:
      return true;
    default:
      return state;
  }
};

const toxicologySource = (state = 'POISINDEX', action) => {
  switch (action.type) {
    case UPDATE_TOXICOLOGY_SOURCE:
      return action.toxicologySource;
    default:
      return state;
  }
};

const uiMode = (state = 'default', action) => {
  switch (action.type) {
    case SET_UI_MODE_DEFAULT:
      return DEFAULT_UIMODE;
    case SET_UI_MODE_EDIT_TEMPLATES:
      return EDITTEMPLATE_UIMODE;
    default:
      return state;
  }
};

const editingTemplateMacro = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_TEMPLATE:
      newState.initial = '';
      newState.current = '';
      return newState;
    case EDIT_TEMPLATE:
      newState.initial = action.macro;
      newState.current = action.macro;
      return newState;
    case UPDATE_TEMPLATE_MACRO:
      newState.current = action.macro;
      return newState;
    case SAVE_TEMPLATE:
      return {};
    default:
      return state;
  }
};

const macro = (state = '', action) => {
  switch (action.type) {
    case LOOKUP_MACRO:
      return action.macro;
    default:
      return state;
  }
};

const varsReducer = combineReducers({
  activeTab,
  activeAgentTab,
  agentView: agentViewReducer,
  agentViewCentreName,
  applicationKeys,
  callRecordId,
  caseListSearch: caseListSearchReducer,
  currentlySending,
  currentlySyncing,
  currentRecordId,
  currentTemplateId,
  editingTemplateId,
  editingTemplateMacro,
  error,
  formState,
  jwtClaims,
  incidentModal: incidentSearchFilterReducer,
  investigationsViewRequest: investigationsViewRequestReducer,
  investigationsViewResult: investigationsViewResultReducer,
  loggedIn,
  macro,
  newCallModal: searchFilterReducer,
  quickView: agentRecordReducer,
  referralsView: referralsViewReducer,
  searchResults: searchResultsReducer,
  swUpdated,
  toxicologySource,
  treatmentsView: treatmentsViewReducer,
  uiMode,
  views: viewsReducer,
});

export default varsReducer;
