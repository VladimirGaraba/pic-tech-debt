/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { combineReducers } from 'redux-immutable';

import casesReducer from 'containers/CaseEntry/reducers/cases';
import incidentsReducer from 'containers/CaseEntry/reducers/incidents';
import siteConfigReducer from './reducers/siteConfig';
import varsReducer from './reducers/vars';

const globalReducer = combineReducers({
  cases: casesReducer,
  incidents: incidentsReducer,
  vars: varsReducer,
  siteConfig: siteConfigReducer,
});
export default globalReducer;
