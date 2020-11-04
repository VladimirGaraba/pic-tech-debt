/* eslint-disable */

import investigationsViewResultReducer from '../../reducers/investigationsViewResult';

import {
  hideInvestigationsViewResultModal,
  removeInvestigationsViewResultAttachment,
  resetInvestigationsViewResult,
  showInvestigationsViewResultModal,
  updateInvestigationsViewResultAttachments,
  updateInvestigationsViewResultDescription,
  updateInvestigationsViewResultNotes,
} from '../../actions/case';

describe('investigationsViewResultReducer', () => {
  it('returns the initial state', () => {
    expect(investigationsViewResultReducer(undefined, {})).toMatchSnapshot();
  });
  it('hide investigations view result modal', () => {
    expect(investigationsViewResultReducer({}, hideInvestigationsViewResultModal())).toMatchSnapshot();
  });
  it('remove investigations view result attachment', () => {
    expect(investigationsViewResultReducer({'attachments': [0,1,2,3,4] }, removeInvestigationsViewResultAttachment(1))).toMatchSnapshot();
  });
  updateInvestigationsViewResultAttachments,
  updateInvestigationsViewResultDescription,
  updateInvestigationsViewResultNotes,
  it('reset investigations view result', () => {
    expect(investigationsViewResultReducer({'attachments': [0,1,2,3,4] }, resetInvestigationsViewResult())).toMatchSnapshot();
  });
  it('show investigations view result modal', () => {
    expect(investigationsViewResultReducer({}, showInvestigationsViewResultModal(1))).toMatchSnapshot();
  });
  it('update investigations view result attachments', () => {
    expect(investigationsViewResultReducer({}, updateInvestigationsViewResultAttachments([1, 2, 3]))).toMatchSnapshot();
  });
  it('update investigations view result description', () => {
    expect(investigationsViewResultReducer({}, updateInvestigationsViewResultDescription('Test Description'))).toMatchSnapshot();
  });
  it('update investigations view result notes', () => {
    expect(investigationsViewResultReducer({}, updateInvestigationsViewResultNotes('Test Content'))).toMatchSnapshot();
  });
});
