import caseReducer from 'containers/CaseEntry/reducers/case';
import { ADD_TEMPLATE, EDIT_TEMPLATE, SAVE_TEMPLATE } from 'containers/CaseEntry/constants';

const viewsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_TEMPLATE:
      newState.template = caseReducer(undefined, action);
      return newState;
    case EDIT_TEMPLATE:
      newState.template = caseReducer(action.template, action);
      return newState;
    case SAVE_TEMPLATE:
      newState.template = undefined;
      return newState;
    default:
      if (newState.template) {
        newState.template = caseReducer(newState.template, action);
      }
      return newState;
  }
};
export default viewsReducer;
