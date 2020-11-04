/* eslint-disable */

import exposureReducer from '../../reducers/exposure';

import {
  addAgent,
  updateAgentDuration,
  updateAgentRouteOfExposure,
  updateAgentTimeOfExposure,
  updateAgentTimeSinceExposure,
  updateAgentTimeSinceExposureUnits,
  updateAgentTypeOfExposure,
  updateQuickViewAgentDuration,
  updateQuickViewAgentDurationUnits,
  updateQuickViewAgentDurationUnknown,
  updateQuickViewAgentRouteOfExposure,
  updateQuickViewAgentTimeOfExposure,
  updateQuickViewAgentTimeSinceExposure,
  updateQuickViewAgentTimeSinceExposureUnits,
  updateQuickViewAgentTypeOfExposure,
} from '../../actions/case';

describe('exposureReducer', () => {
  it('returns the initial state', () => {
    expect(exposureReducer(undefined, {})).toMatchSnapshot();
  });
  it('add agent', () => {
    expect(exposureReducer({}, addAgent(2, 'Test Agent', '1', 'mg', false, '2018-04-14 14:25:00', '1', 'hour', false, 'Test Exposure Type', 'Ingested', '123456'))).toMatchSnapshot();
  });
  it('update agent duration', () => {
    expect(exposureReducer({}, updateAgentDuration(1, 1, 1, '1', '2', 'hours', 'hours', false, false))).toMatchSnapshot();
  });
  it('update agent route of exposure', () => {
    expect(exposureReducer({}, updateAgentRouteOfExposure(1, 1, ['Old Exposure'], ['Old Exposure', 'New Exposure']))).toMatchSnapshot();
  });
  it('update agent time of exposure', () => {
    expect(exposureReducer({}, updateAgentTimeOfExposure(1, 1, 'Old Time of Exposure', 'New Time of Exposure'))).toMatchSnapshot();
  });
  it('update agent time since exposure', () => {
    expect(exposureReducer({}, updateAgentTimeSinceExposure(1, 1, 'Old Time Since', 'New Time Since'))).toMatchSnapshot();
  });
  it('update agent time since exposure units', () => {
    expect(exposureReducer({}, updateAgentTimeSinceExposureUnits(1, 1, 'Old Time Since Units', 'New Time Since Units'))).toMatchSnapshot();
  });
  it('update agent type of exposure', () => {
    expect(exposureReducer({}, updateAgentTypeOfExposure(1, 1, 'Old Type of Exposure', 'New Type of Exposure'))).toMatchSnapshot();
  });
  it('update quick view agent duration', () => {
    expect(exposureReducer({}, updateQuickViewAgentDuration(10))).toMatchSnapshot();
  });
  it('update quick view agent duration units', () => {
    expect(exposureReducer({}, updateQuickViewAgentDurationUnits('hours'))).toMatchSnapshot();
  });
  it('update quick view agent duration unknown', () => {
    expect(exposureReducer({}, updateQuickViewAgentDurationUnknown(true))).toMatchSnapshot();
  });
  it('update quick view agent route of exposure', () => {
    expect(exposureReducer({}, updateQuickViewAgentRouteOfExposure('Ingested'))).toMatchSnapshot();
  });
  it('update quick view agent time of exposure', () => {
    expect(exposureReducer({}, updateQuickViewAgentTimeOfExposure('Test TIme'))).toMatchSnapshot();
  });
  it('update quick view agent time since exposure', () => {
    expect(exposureReducer({}, updateQuickViewAgentTimeSinceExposure(10))).toMatchSnapshot();
  });
  it('update quick view agent time since exposure units', () => {
    expect(exposureReducer({}, updateQuickViewAgentTimeSinceExposureUnits('hours'))).toMatchSnapshot();
  });
  it('update quick view agent type of exposure', () => {
    expect(exposureReducer({}, updateQuickViewAgentTypeOfExposure('Acute'))).toMatchSnapshot();
  });
});
