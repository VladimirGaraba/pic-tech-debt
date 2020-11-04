/* eslint-disable */

import { fromJS } from 'Immutable';
import TreatmentsReducer from '../reducer';

import {
  updateTreatments,
} from '../actions/case';


describe('TreatmentsReducer', () => {
  it('returns the initial state', () => {
    expect(TreatmentsReducer(undefined, {})).toMatchSnapshot();
  });
  it('update treatments', () => {
    var mockedDate = new Date(2018, 3, 7, 17, 15);
    global.Date = jest.fn(() => mockedDate);
    expect(TreatmentsReducer(fromJS({}), updateTreatments(1, 2, 'Test Disposition', {'key': 'Test Treatments'}, {'name': 'Test SPI Name'}))).toMatchSnapshot();
  });
});
