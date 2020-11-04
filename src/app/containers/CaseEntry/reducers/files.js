import {
  DISPLAY_RECORD,
  DISPLAY_TEMPLATE,
} from 'containers/App/constants';

import {
  RESET_AGENT_VIEW,
} from 'containers/AgentEntry/constants';

import {
  REMOVE_INVESTIGATIONS_VIEW_RESULT_ATTACHMENT,
  RESET_INVESTIGATIONS_VIEW_RESULT,
  UPDATE_INVESTIGATIONS_VIEW_RESULT_ATTACHMENTS,
} from 'containers/InvestigationsEntry/constants';

import {
  ADD_NOTE_ATTACHMENTS,
  REMOVE_NOTE_ATTACHMENT,
  ADD_TEMPLATE_NOTE_ATTACHMENTS,
  REMOVE_TEMPLATE_NOTE_ATTACHMENT,
} from 'containers/NoteEntry/constants';

import {
  ADD_CALL_RECORD,
  ADD_CASE,
  ADD_TEMPLATE,
  EDIT_TEMPLATE,
} from '../constants';

const files = (state = [], action) => {
  let newState = [...state];
  switch (action.type) {
    case UPDATE_INVESTIGATIONS_VIEW_RESULT_ATTACHMENTS:
    case ADD_NOTE_ATTACHMENTS:
    case ADD_TEMPLATE_NOTE_ATTACHMENTS:
      newState = newState.concat(action.attachments);
      return newState;
    case REMOVE_INVESTIGATIONS_VIEW_RESULT_ATTACHMENT:
    case REMOVE_NOTE_ATTACHMENT:
    case REMOVE_TEMPLATE_NOTE_ATTACHMENT:
      newState.splice(action.index, 1);
      return newState;
    case ADD_CASE:
    case ADD_TEMPLATE:
    case ADD_CALL_RECORD:
    case DISPLAY_RECORD:
    case DISPLAY_TEMPLATE:
    case EDIT_TEMPLATE:
    case RESET_INVESTIGATIONS_VIEW_RESULT:
    case RESET_AGENT_VIEW:
      return [];
    default:
      return state;
  }
};

export default files;
