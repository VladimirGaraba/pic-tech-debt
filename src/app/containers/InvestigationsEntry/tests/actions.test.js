import {
  hideInvestigationsViewResultModal,
  removeInvestigationsViewResultAttachment,
  resetInvestigationsViewRequest,
  resetInvestigationsViewResult,
  showInvestigationsViewResultModal,
  updateInvestigationsRequests,
  updateInvestigationsResults,
  updateInvestigationsViewRequest,
  updateInvestigationsViewResultAttachments,
  updateInvestigationsViewResultDescription,
  updateInvestigationsViewResultNotes,
} from '../actions/case';

describe('InvestigationsEntry action creators', () => {
  it('hideInvestigationsViewResultModal', () => {
    expect(hideInvestigationsViewResultModal()).toMatchSnapshot();
  });
  it('removeInvestigationsViewResultAttachment', () => {
    expect(removeInvestigationsViewResultAttachment(1)).toMatchSnapshot();
  });
  it('resetInvestigationsViewRequest', () => {
    expect(resetInvestigationsViewRequest()).toMatchSnapshot();
  });
  it('resetInvestigationsViewResult', () => {
    expect(resetInvestigationsViewResult()).toMatchSnapshot();
  });
  it('showInvestigationsViewResultModal', () => {
    expect(showInvestigationsViewResultModal(1)).toMatchSnapshot();
  });
  it('updateInvestigationsRequests', () => {
    expect(updateInvestigationsRequests(1, 0, 2)).toMatchSnapshot();
  });
  it('updateInvestigationsResults', () => {
    expect(updateInvestigationsResults(1, 0, 3)).toMatchSnapshot();
  });
  it('updateInvestigationsViewRequest', () => {
    expect(updateInvestigationsViewRequest('Test Content')).toMatchSnapshot();
  });
  it('updateInvestigationsViewResultAttachments', () => {
    expect(updateInvestigationsViewResultAttachments([1, 2, 3])).toMatchSnapshot();
  });
  it('updateInvestigationsViewResultDescription', () => {
    expect(updateInvestigationsViewResultDescription('Test description')).toMatchSnapshot();
  });
  it('updateInvestigationsViewResultNotes', () => {
    expect(updateInvestigationsViewResultNotes('Test content')).toMatchSnapshot();
  });
});
