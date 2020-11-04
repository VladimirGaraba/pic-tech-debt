import {
  resetReferralsView,
  resetTreatmentsView,
  updateReferrals,
  updateReferralsViewReferee,
  updateReferralsViewRefereeSite,
  updateReferralsViewSpecialty,
  updateTreatments,
  updateTreatmentsViewContent,
  updateTreatmentsViewDisposition,
  updateTreatmentsViewTreatments,
} from '../actions/case';

describe('Treatments action creators', () => {
  it('resetReferralsView', () => {
    expect(resetReferralsView()).toMatchSnapshot();
  });
  it('resetTreatmentsView', () => {
    expect(resetTreatmentsView()).toMatchSnapshot();
  });
  it('updateReferrals', () => {
    expect(updateReferrals(1, 2, 'Test Referee', 'Test Specialty')).toMatchSnapshot();
  });
  it('updateReferralsViewReferee', () => {
    expect(updateReferralsViewReferee('Test Referee')).toMatchSnapshot();
  });
  it('updateReferralsViewRefereeSite', () => {
    expect(updateReferralsViewRefereeSite(1)).toMatchSnapshot();
  });
  it('updateReferralsViewSpecialty', () => {
    expect(updateReferralsViewSpecialty('Test Specialty')).toMatchSnapshot();
  });
  it('updateTreatments', () => {
    expect(updateTreatments(1, 2, 'Test Disposition', ['Treatment 1'], { name: 'Test SPI' })).toMatchSnapshot();
  });
  it('updateTreatmentsViewContent', () => {
    expect(updateTreatmentsViewContent('Test Content')).toMatchSnapshot();
  });
  it('updateTreatmentsViewDisposition', () => {
    expect(updateTreatmentsViewDisposition('Test Disposition')).toMatchSnapshot();
  });
  it('updateTreatmentsViewTreatments', () => {
    expect(updateTreatmentsViewTreatments(['Test Treatment 2'])).toMatchSnapshot();
  });
});
