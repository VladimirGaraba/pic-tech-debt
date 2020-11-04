import { combineReducers } from 'redux';

import { timestamp, spi } from 'containers/App/reducers/utils';

import {
  DELETE_AGENT,
  DELETE_TEMPLATE_AGENT,
} from 'containers/AgentEntry/constants';

import {
  RESET_INVESTIGATIONS_VIEW_RESULT,
} from 'containers/InvestigationsEntry/constants';

import {
  ADD_CALL_RECORD,
  ADD_CASE,
  ADD_TEMPLATE,
  EDIT_TEMPLATE,
} from 'containers/CaseEntry/constants';

import {
  SAVE_NOTE,
  SAVE_TEMPLATE_NOTE,
  UPDATE_NOTE_CONTENT,
  UPDATE_TEMPLATE_NOTE_CONTENT,
  UPDATE_NOTE_CONTEXT,
  UPDATE_TEMPLATE_NOTE_CONTEXT,
  UPDATE_NOTE_SUBCONTEXT,
  UPDATE_TEMPLATE_NOTE_SUBCONTEXT,
  UPDATE_NOTE_TITLE,
  UPDATE_TEMPLATE_NOTE_TITLE,
  ADD_NOTE_ATTACHMENTS,
  ADD_TEMPLATE_NOTE_ATTACHMENTS,
  REMOVE_NOTE_ATTACHMENT,
  REMOVE_TEMPLATE_NOTE_ATTACHMENT,
} from './constants';

const attachments = (state = [], action) => {
  let newState = [...state];
  switch (action.type) {
    case SAVE_NOTE:
    case SAVE_TEMPLATE_NOTE:
    case ADD_NOTE_ATTACHMENTS:
    case ADD_TEMPLATE_NOTE_ATTACHMENTS:
      if (action.sanitisedAttachments) {
        newState = newState.concat(Object.keys(action.sanitisedAttachments));
      }
      return newState;
    case REMOVE_NOTE_ATTACHMENT:
    case REMOVE_TEMPLATE_NOTE_ATTACHMENT:
      newState.splice(action.index, 1);
      return newState;
    default:
      return state;
  }
};

const content = (state = '', action) => {
  switch (action.type) {
    case SAVE_NOTE:
    case SAVE_TEMPLATE_NOTE:
      if (action.content) {
        return action.content;
      }
      return state;
    case UPDATE_NOTE_CONTENT:
    case UPDATE_TEMPLATE_NOTE_CONTENT:
      return action.content;
    default:
      return state;
  }
};

const context = (state = '', action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case ADD_TEMPLATE:
    case EDIT_TEMPLATE:
      return 'general';
    case SAVE_NOTE:
    case SAVE_TEMPLATE_NOTE:
    case UPDATE_NOTE_CONTEXT:
    case UPDATE_TEMPLATE_NOTE_CONTEXT:
      return action.context;
    default:
      return state;
  }
};

const id = (state = '', action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case ADD_TEMPLATE:
    case EDIT_TEMPLATE:
      return action.commsNoteId;
    case SAVE_NOTE:
    case SAVE_TEMPLATE_NOTE:
      return action.noteId;
    default:
      return state;
  }
};

const subcontext = (state = '', action) => {
  switch (action.type) {
    case SAVE_NOTE:
    case SAVE_TEMPLATE_NOTE:
    case UPDATE_NOTE_SUBCONTEXT:
    case UPDATE_TEMPLATE_NOTE_SUBCONTEXT:
      return action.subcontext ? action.subcontext : '';
    default:
      return state;
  }
};

const title = (state = '', action) => {
  switch (action.type) {
    case SAVE_NOTE:
    case SAVE_TEMPLATE_NOTE:
    case UPDATE_NOTE_TITLE:
    case UPDATE_TEMPLATE_NOTE_TITLE:
      return action.title ? action.title : '';
    case RESET_INVESTIGATIONS_VIEW_RESULT:
      return '';
    default:
      return state;
  }
};

const noteRecord = combineReducers({
  id,
  context,
  subcontext,
  title,
  content,
  attachments,
  timestamp,
  spi,
});

const notes = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case ADD_TEMPLATE:
    case EDIT_TEMPLATE:
      newState[action.commsNoteId] = noteRecord(undefined, action);
      return newState;
    case SAVE_NOTE:
    case SAVE_TEMPLATE_NOTE: {
      newState[action.noteId] = noteRecord(undefined, action);
      return newState;
    }
    case UPDATE_NOTE_CONTEXT:
    case UPDATE_TEMPLATE_NOTE_CONTEXT:
    case UPDATE_NOTE_CONTENT:
    case UPDATE_TEMPLATE_NOTE_CONTENT:
    case ADD_NOTE_ATTACHMENTS:
    case ADD_TEMPLATE_NOTE_ATTACHMENTS:
    case REMOVE_NOTE_ATTACHMENT:
    case REMOVE_TEMPLATE_NOTE_ATTACHMENT:
      newState[action.noteId] = noteRecord(state[action.noteId], action);
      return newState;
    case DELETE_AGENT:
    case DELETE_TEMPLATE_AGENT:
      Object.keys(newState).map((note) => {
        if (newState[note].subcontext === action.id) {
          delete newState[note];
        }
        return note;
      });
      return newState;
    default:
      return state;
  }
};

export default notes;
