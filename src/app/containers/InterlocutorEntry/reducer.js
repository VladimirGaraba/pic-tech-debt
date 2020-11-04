import _union from 'lodash/union';

import {
  ADD_CALL_RECORD,
  ADD_CASE,
  ADD_TEMPLATE,
  EDIT_TEMPLATE,
  UPDATE_CASE_STATUS,
} from 'containers/CaseEntry/constants';

import communicationRecordReducer from './reducers/communicationRecord';
import statusRecordReducer from './reducers/statusRecord';

import {
  ADD_COMMUNICATION,
  REPLACE_COMMUNICATIONS,
} from './constants';

import {
  setPastFeaturesHistory,
  setPastTreatmentHistory,
} from './actions';

const getCommsRecordId = (state, commsId) => {
  const tokens = commsId.split('-');
  let commsRecordId = (tokens[1]) ? tokens[1] - 1 : 0;
  if (!commsRecordId) {
    commsRecordId = state.length - 1;
  }
  return commsRecordId;
};

const communicationsReducer = (state = [], action) => {
  const newState = [...state];
  switch (action.type) {
    case ADD_CASE:
    case ADD_CALL_RECORD:
    case ADD_COMMUNICATION:
    case ADD_TEMPLATE:
    case EDIT_TEMPLATE: {
      let commRecord = communicationRecordReducer(undefined, { ...action, sequenceId: newState.length + 1 });
      if (newState.length > 0) {
        const lastCommRecord = newState[newState.length - 1];
        const pastTreatmentList = lastCommRecord.history.treatments.treatments;
        if (pastTreatmentList.length > 0) {
          const pastTreatments = pastTreatmentList
            .map((treatmentRecord) => treatmentRecord.treatments)
            .reduce((accumulator, currentValue) => {
              const newAccumulator = accumulator;
              Object.keys(currentValue).map((keyname) => {
                newAccumulator[keyname] = (accumulator[keyname]) ? _union(accumulator[keyname], currentValue[keyname]) : currentValue[keyname];
                return keyname;
              });
              return newAccumulator;
            });
          commRecord = communicationRecordReducer(commRecord, setPastTreatmentHistory(pastTreatments));
        }
        const pastFeatures = lastCommRecord.history.features;
        if (pastFeatures.descriptors) {
          commRecord = communicationRecordReducer(commRecord, setPastFeaturesHistory(pastFeatures.descriptors));
        }
      }
      newState.push(commRecord);
      return newState;
    }
    case REPLACE_COMMUNICATIONS: {
      return [
        ...action.communications,
      ];
    }
    case UPDATE_CASE_STATUS: {
      const statRecord = statusRecordReducer(undefined, action);
      newState.push(statRecord);
      return newState;
    }
    default:
      if (action.id || action.caseId) {
        const commsRecordId = getCommsRecordId(state, action.caseId ? action.caseId : action.id);
        const commsRecord = state[commsRecordId];
        newState[commsRecordId] = communicationRecordReducer(commsRecord, action);
        return newState;
      }
      if (action.templateId) {
        const commsRecordId = getCommsRecordId(state, action.templateId);
        const commsRecord = state[commsRecordId];
        newState[commsRecordId] = communicationRecordReducer(commsRecord, action);
        return newState;
      }
      return state;
  }
};
export default communicationsReducer;
