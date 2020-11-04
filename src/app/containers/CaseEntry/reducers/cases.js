/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_rev", "_attachments"] }]*/
import { sanitiseAttachments, isCase } from 'utils/helpers';

import {
  BATCH_INSERT_DOCUMENT,
  DELETE_DOCUMENT,
  DISPLAY_RECORD,
  INSERT_DOCUMENT,
  UPDATE_DOCUMENT,
} from 'containers/App/constants';

import {
  SAVE_NOTE,
  ADD_NOTE_ATTACHMENTS,
} from 'containers/NoteEntry/constants';

import {
  ADD_CASE,
} from '../constants';

import caseReducer from './case';

const casesReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_CASE:
      newState[action.id] = caseReducer(undefined, action);
      return newState;
    case BATCH_INSERT_DOCUMENT:
      action.documents.map((document) => { // eslint-disable-line array-callback-return
        if (isCase(document)) {
          newState[document._id] = document;
        }
      });
      return newState;
    case DELETE_DOCUMENT:
      delete newState[action.id];
      return newState;
    case DISPLAY_RECORD:
      return state;
    case INSERT_DOCUMENT:
    case UPDATE_DOCUMENT:
      if (isCase(action.document)) {
        newState[action.document._id] = action.document;
      }
      return newState;
    default:
      if ('id' in action || 'caseId' in action) {
        const caseId = action.id || action.caseId;
        const myAction = action;
        if ((action.type === SAVE_NOTE || action.type === ADD_NOTE_ATTACHMENTS) && action.attachments) {
          const filenames = Object.keys(state[caseId]._attachments);
          myAction.sanitisedAttachments = sanitiseAttachments(action.attachments, filenames);
        }
        newState[caseId] = caseReducer(state[caseId], myAction);
        return newState;
      }
      return state;
  }
};
export default casesReducer;
