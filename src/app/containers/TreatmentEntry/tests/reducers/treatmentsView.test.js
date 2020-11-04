/* eslint-disable */

import TreatmentsViewReducer from '../../reducers/treatmentsView';

import {
  resetTreatmentsView,
  updateTreatmentsViewContent,
  updateTreatmentsViewDisposition,
  updateTreatmentsViewTreatments,
} from '../../actions/case';

describe('TreatmentsViewReducer', () => {
  it('returns the initial state', () => {
    expect(TreatmentsViewReducer(undefined, {})).toMatchSnapshot();
  });
  it('reset treatments view', () => {
    expect(TreatmentsViewReducer({'content': 'Test Content', 'disposition': 'Test Disposition', 'spi': {'name': 'Test SPI'}, 'treatmentList': ['Test Item 1']}, resetTreatmentsView())).toMatchSnapshot();
  });
  it('update treatments view content', () => {
    expect(TreatmentsViewReducer({'content': 'Test Content', 'disposition': 'Test Disposition', 'spi': {'name': 'Test SPI'}, 'treatmentList': ['Test Item 1']}, updateTreatmentsViewContent('Test Content'))).toMatchSnapshot();
  });
  it('update treatments view disposition', () => {
    expect(TreatmentsViewReducer({'content': 'Test Content', 'disposition': 'Test Disposition', 'spi': {'name': 'Test SPI'}, 'treatmentList': ['Test Item 1']}, updateTreatmentsViewDisposition('Test Disposition'))).toMatchSnapshot();
  });
  it('update referrals view treatments', () => {
    expect(TreatmentsViewReducer({'content': 'Test Content', 'disposition': 'Test Disposition', 'spi': {'name': 'Test SPI'}, 'treatmentList': ['Test Item 1']}, updateTreatmentsViewTreatments(['Test Item 1', 'Test Item 2']))).toMatchSnapshot();
  });
});
