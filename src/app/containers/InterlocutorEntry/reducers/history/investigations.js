import {
  UPDATE_INVESTIGATIONS_REQUESTS,
  UPDATE_INVESTIGATIONS_RESULTS,
  UPDATE_TEMPLATE_INVESTIGATIONS_REQUESTS,
  UPDATE_TEMPLATE_INVESTIGATIONS_RESULTS,
} from 'containers/InvestigationsEntry/constants';

const investigations = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case UPDATE_INVESTIGATIONS_REQUESTS:
    case UPDATE_INVESTIGATIONS_RESULTS:
    case UPDATE_TEMPLATE_INVESTIGATIONS_REQUESTS:
    case UPDATE_TEMPLATE_INVESTIGATIONS_RESULTS:
      newState[action.requestIx] = investigationsRecord((action.requestIx in newState) ? newState[action.requestIx] : undefined, action);
      return newState;
    default:
      return state;
  }
};

const investigationsRecord = (state = { results: [] }, action) => {
  const newState = { ...state };
  switch (action.type) {
    case UPDATE_INVESTIGATIONS_REQUESTS:
    case UPDATE_TEMPLATE_INVESTIGATIONS_REQUESTS:
      newState.request = action.noteId;
      return newState;
    case UPDATE_INVESTIGATIONS_RESULTS:
    case UPDATE_TEMPLATE_INVESTIGATIONS_RESULTS:
      newState.results.push(action.noteId);
      return newState;
    default:
      return state;
  }
};

export default investigations;
