import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';

import agentReducer from './reducers/agent';

import {
    ADD_AGENT,
    ADD_TEMPLATE_AGENT,
    DELETE_AGENT,
    DELETE_TEMPLATE_AGENT,
} from './constants';

export const agents = (state = [], action) => {
  let index;
  const newState = _cloneDeep(state);
  switch (action.type) {
    case ADD_AGENT:
    case ADD_TEMPLATE_AGENT:
      newState.push(agentReducer(undefined, action));
      return newState;
    case DELETE_AGENT:
    case DELETE_TEMPLATE_AGENT:
      index = _findIndex(newState, { id: action.agentId });
      newState.splice(index, 1);
      return newState;
    default:
      if ('agentId' in action) {
        index = _findIndex(newState, { id: action.agentId });
        newState[index] = agentReducer(newState[index], action);
        return newState;
      }
      return state;
  }
};

export default agents;
