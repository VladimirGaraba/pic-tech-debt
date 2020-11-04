import {
  addAgent,
  addAgentCentreAgent,
  deleteAgent,
  hideAgentModal,
  removeAgentCentreAgent,
  resetAgentView,
  resetQuickView,
  setAgentTab,
  showAgentModal,
  updateAgentCategory,
  updateAgentCentreAgent,
  updateAgentDuration,
  updateAgentEUPCS,
  updateAgentIntendedUseGiven,
  updateAgentInterlocutorAgentName,
  updateAgentIsPatientsOwnMedication,
  updateAgentQuantity,
  updateAgentRouteOfExposure,
  updateAgentTimeOfExposure,
  updateAgentTimeSinceExposure,
  updateAgentTimeSinceExposureUnits,
  updateAgentTypeOfExposure,
  updateAgentUseType,
  updateQuickViewAgentDuration,
  updateQuickViewAgentDurationUnits,
  updateQuickViewAgentDurationUnknown,
  updateQuickViewAgentName,
  updateQuickViewAgentQuantity,
  updateQuickViewAgentQuantityUnits,
  updateQuickViewAgentQuantityUnknown,
  updateQuickViewAgentRouteOfExposure,
  updateQuickViewAgentTimeOfExposure,
  updateQuickViewAgentTimeSinceExposure,
  updateQuickViewAgentTimeSinceExposureUnits,
  updateQuickViewAgentTypeOfExposure,
} from '../../actions/case';

describe('Treatments action creators', () => {
  it('addAgent', () => {
    expect(addAgent(1, 'Test Agent', '1', 'mg', false, '2018-04-14 14:25:00', '1', 'hour', false, 'Test Exposure Type', 'Ingested', '123456')).toMatchSnapshot();
  });
  it('addAgentCentreAgent', () => {
    expect(addAgentCentreAgent(1, 1, 'Test Agent', '', '1', 'mg')).toMatchSnapshot();
  });
  it('deleteAgent', () => {
    expect(deleteAgent(1, 1, 'Test Agent')).toMatchSnapshot();
  });
  it('hideAgentModal', () => {
    expect(hideAgentModal()).toMatchSnapshot();
  });
  it('removeAgentCentreAgent', () => {
    expect(removeAgentCentreAgent(1, 1, 1, 'Test Agent')).toMatchSnapshot();
  });
  it('resetAgentView', () => {
    expect(resetAgentView()).toMatchSnapshot();
  });
  it('resetQuickView', () => {
    expect(resetQuickView()).toMatchSnapshot();
  });
  it('setAgentTab', () => {
    expect(setAgentTab(1)).toMatchSnapshot();
  });
  it('showAgentModal', () => {
    expect(showAgentModal(1)).toMatchSnapshot();
  });
  it('updateAgentCategory', () => {
    expect(updateAgentCategory(1, 1, 'Old Category', 'New Category')).toMatchSnapshot();
  });
  it('updateAgentCentreAgent', () => {
    expect(updateAgentCentreAgent(1, 1, 1, 'Centre Agent', '', '1', 'mg')).toMatchSnapshot();
  });
  it('updateAgentDuration', () => {
    expect(updateAgentDuration(1, 1, 1, '1', '2', 'hours', 'hours', false, false)).toMatchSnapshot();
  });
  it('updateAgentEUPCS', () => {
    expect(updateAgentEUPCS(1, 1, 1, '1', '2', 'Old EUPCS', 'New EUPCS')).toMatchSnapshot();
  });
  it('updateAgentIntendedUseGiven', () => {
    expect(updateAgentIntendedUseGiven(1, 1, 'Old Intended Use', 'New Intended Use')).toMatchSnapshot();
  });
  it('updateAgentInterlocutorAgentName', () => {
    expect(updateAgentInterlocutorAgentName(1, 1, 'Old Agent Name', 'New Agent Name')).toMatchSnapshot();
  });
  it('updateAgentIsPatientsOwnMedication', () => {
    expect(updateAgentIsPatientsOwnMedication(1, 1, true, false)).toMatchSnapshot();
  });
  it('updateAgentQuantity', () => {
    expect(updateAgentQuantity(1, 1, '1', '2', 'mg', 'g', false, false)).toMatchSnapshot();
  });
  it('updateAgentRouteOfExposure', () => {
    expect(updateAgentRouteOfExposure(1, 1, ['Old Exposure'], ['New Exposure'])).toMatchSnapshot();
  });
  it('updateAgentTimeOfExposure', () => {
    expect(updateAgentTimeOfExposure(1, 1, 'Old Time of Exposure', 'New Time of Exposure')).toMatchSnapshot();
  });
  it('updateAgentTimeSinceExposure', () => {
    expect(updateAgentTimeSinceExposure(1, 1, 'Old Time Since', 'New Time Since')).toMatchSnapshot();
  });
  it('updateAgentTimeSinceExposureUnits', () => {
    expect(updateAgentTimeSinceExposureUnits(1, 1, 'Old Time Since Units', 'New Time Since Units')).toMatchSnapshot();
  });
  it('updateAgentTypeOfExposure', () => {
    expect(updateAgentTypeOfExposure(1, 1, 'Old Type of Exposure', 'New Type of Exposure')).toMatchSnapshot();
  });
  it('updateAgentUseType', () => {
    expect(updateAgentUseType(1, 1, ['Old Use Type'], ['New Use Type'])).toMatchSnapshot();
  });
  it('updateQuickViewAgentDuration', () => {
    expect(updateQuickViewAgentDuration(1)).toMatchSnapshot();
  });
  it('updateQuickViewAgentDurationUnits', () => {
    expect(updateQuickViewAgentDurationUnits('kg')).toMatchSnapshot();
  });
  it('updateQuickViewAgentDurationUnknown', () => {
    expect(updateQuickViewAgentDurationUnknown(false)).toMatchSnapshot();
  });
  it('updateQuickViewAgentName', () => {
    expect(updateQuickViewAgentName('Agent Name')).toMatchSnapshot();
  });
  it('updateQuickViewAgentQuantity', () => {
    expect(updateQuickViewAgentQuantity(10)).toMatchSnapshot();
  });
  it('updateQuickViewAgentQuantityUnits', () => {
    expect(updateQuickViewAgentQuantityUnits('g')).toMatchSnapshot();
  });
  it('updateQuickViewAgentQuantityUnknown', () => {
    expect(updateQuickViewAgentQuantityUnknown(false)).toMatchSnapshot();
  });
  it('updateQuickViewAgentRouteOfExposure', () => {
    expect(updateQuickViewAgentRouteOfExposure(['Oral'])).toMatchSnapshot();
  });
  it('updateQuickViewAgentTimeOfExposure', () => {
    expect(updateQuickViewAgentTimeOfExposure('2018-01-14 15:40:00')).toMatchSnapshot();
  });
  it('updateQuickViewAgentTimeSinceExposure', () => {
    expect(updateQuickViewAgentTimeSinceExposure('2')).toMatchSnapshot();
  });
  it('updateQuickViewAgentTimeSinceExposureUnits', () => {
    expect(updateQuickViewAgentTimeSinceExposureUnits('kg')).toMatchSnapshot();
  });
  it('updateQuickViewAgentTypeOfExposure', () => {
    expect(updateQuickViewAgentTypeOfExposure('Test Type')).toMatchSnapshot();
  });
});
