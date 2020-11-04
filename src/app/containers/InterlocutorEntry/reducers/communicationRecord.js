import { combineReducers } from 'redux';

import { timestamp, spi } from 'containers/App/reducers/utils';

import {
  ADD_CALL_RECORD,
  ADD_CASE,
  END_CALL_RECORD,
  ADD_TEMPLATE,
  EDIT_TEMPLATE,
} from 'containers/CaseEntry/constants';

import historyReducer from './history';
import interlocutorReducer from './interlocutor';
import mediumReducer from './medium';

import {
  ADD_COMMUNICATION,
  UPDATE_COMMUNICATION_STATUS,
  UPDATE_INTERLOCUTOR_DIRECTION,
} from '../constants';

const commType = (state = 'comms', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const sequenceId = (state = 1, action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_CALL_RECORD:
    case ADD_COMMUNICATION:
    case ADD_TEMPLATE:
    case EDIT_TEMPLATE:
      return action.sequenceId;
    default:
      return state;
  }
};

const deleted = (state = false, action) => {
  switch (action.type) {
    case UPDATE_COMMUNICATION_STATUS:
      return (action.status === 'deleted');
    default:
      return state;
  }
};

const direction = (state = 'incoming', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_DIRECTION:
      return action.direction;
    default:
      return state;
  }
};

const endTimestamp = (state = null, action) => {
  switch (action.type) {
    case END_CALL_RECORD:
      return new Date().toISOString();
    default:
      return state;
  }
};

const noteRef = (state = null, action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case ADD_TEMPLATE:
    case EDIT_TEMPLATE:
      return action.commsNoteId;
    default:
      return state;
  }
};

const communicationRecordReducer = combineReducers({
  sequenceId,
  deleted,
  direction,
  history: historyReducer,
  interlocutor: interlocutorReducer,
  medium: mediumReducer,
  noteRef,
  spi,
  timestamp,
  endTimestamp,
  type: commType,
});
export default communicationRecordReducer;
