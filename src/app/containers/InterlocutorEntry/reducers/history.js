import { combineReducers } from 'redux';
import investigationsReducer from './history/investigations';
import featuresReducer from './history/features';
import treatmentsReducer from './history/treatments';
import patientReducer from './history/patient';
import agentsReducer from './history/agents';

export default combineReducers({
  features: featuresReducer,
  investigations: investigationsReducer,
  treatments: treatmentsReducer,
  patient: patientReducer,
  agents: agentsReducer,
});
