import { combineReducers } from 'redux';

import {
  UPDATE_INVESTIGATIONS_REQUESTS,
  UPDATE_INVESTIGATIONS_RESULTS,
  UPDATE_TEMPLATE_INVESTIGATIONS_REQUESTS,
  UPDATE_TEMPLATE_INVESTIGATIONS_RESULTS,
} from './constants';

const resultInitialState = {
  description: '',
  content: '',
  attachments: [],
  timestamp: '',
  spi: {
    name: '',
    id: '',
    org: '',
  },
};

function request(state = '', action) {
  switch (action.type) {
    case UPDATE_INVESTIGATIONS_REQUESTS:
    case UPDATE_TEMPLATE_INVESTIGATIONS_REQUESTS:
      return action.noteId;
    default:
      return state;
  }
}

function result(state = resultInitialState, action) {
  switch (action.type) {
    case UPDATE_INVESTIGATIONS_RESULTS:
    case UPDATE_TEMPLATE_INVESTIGATIONS_RESULTS:
      return {
        ...state,
        description: action.description,
        content: action.results,
        timestamp: new Date().toISOString(),
        spi: {
          name: action.spiName,
        },
      };
    default:
      return state;
  }
}

function results(state = [], action) {
  switch (action.type) {
    case UPDATE_INVESTIGATIONS_RESULTS:
    case UPDATE_TEMPLATE_INVESTIGATIONS_RESULTS:
      return state.concat(result(undefined, action));
    default:
      return state;
  }
}

const requestRecord = combineReducers({
  request,
  results,
});

export default (state = [], action) => {
  const newState = [...state];
  switch (action.type) {
    case UPDATE_INVESTIGATIONS_REQUESTS:
    case UPDATE_TEMPLATE_INVESTIGATIONS_REQUESTS: {
      newState[action.requestIx] = requestRecord(undefined, action);
      return newState;
    }
    case UPDATE_INVESTIGATIONS_RESULTS:
    case UPDATE_TEMPLATE_INVESTIGATIONS_RESULTS:
      newState[action.requestIx].results.push(action.noteId);
      return newState;
    default:
      return state;
  }
};
