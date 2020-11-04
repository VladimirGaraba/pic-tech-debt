import { connect } from 'react-redux';

import _filter from 'lodash/filter';
import _isUndefined from 'lodash/isUndefined';
import _keyBy from 'lodash/keyBy';

import InvestigationsView from 'components/InvestigationsView';

import {
  saveNote,
} from 'containers/NoteEntry/actions/case';

import { selectVars, selectCases, makeSelectSPI } from 'containers/App/selectors';

import { generateUuid } from 'utils/helpers';

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
} from './actions/case';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const cases = selectCases(state);
    const { currentRecordId, callRecordId, investigationsViewRequest, investigationsViewResult } = vars;
    const tokens = currentRecordId.toString().split('-');
    const currentCase = cases[tokens[0]];

    const investigations = currentCase.investigations ? currentCase.investigations : [];
    const notes = _keyBy(
        _filter(
            currentCase.notes,
            (o) => o.context === 'investigation' || o.context === 'result'
        ),
        (o) => o.id
    );

    return {
      currentRecordId,
      callRecordId,

      investigations,
      notes,

      request: investigationsViewRequest.content,

      show: investigationsViewResult.show,
      nextRequestIx: investigations.length.toString(),
      requestIx: investigationsViewResult && !_isUndefined(investigationsViewResult.requestIx) ? investigationsViewResult.requestIx.toString() : '',
      resultDescription: investigationsViewResult.description,
      result: investigationsViewResult.content,
      attachments: investigationsViewResult.attachments,

      userSPI: selectSPI(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateInvestigationRequests: (requestIx, request, spi) => {
    const uuid = generateUuid();
    dispatch(saveNote(ownProps.recordId, uuid, 'investigation', undefined, '', request, [], spi));
    dispatch(updateInvestigationsRequests(ownProps.recordId, requestIx, uuid));
    dispatch(resetInvestigationsViewRequest());
  },
  updateInvestigationResults: (requestIx, description, results, attachments = [], spi) => {
    const uuid = generateUuid();
    dispatch(saveNote(ownProps.recordId, uuid, 'result', undefined, description, results, attachments, spi));
    dispatch(updateInvestigationsResults(ownProps.recordId, requestIx, uuid));
    dispatch(resetInvestigationsViewResult());
  },
  updateViewRequest: (content) => {
    dispatch(updateInvestigationsViewRequest(content));
  },

  showModal: (requestIx) => {
    dispatch(showInvestigationsViewResultModal(requestIx));
  },
  hideModal: () => {
    dispatch(hideInvestigationsViewResultModal());
    dispatch(resetInvestigationsViewResult());
  },
  updateViewResultDescription: (resultDescription) => {
    dispatch(updateInvestigationsViewResultDescription(resultDescription));
  },
  updateViewResultNotes: (content) => {
    dispatch(updateInvestigationsViewResultNotes(content));
  },
  updateViewResultAttachments: (attachments) => {
    dispatch(updateInvestigationsViewResultAttachments(attachments));
  },
  removeViewResultAttachment: (index) => {
    dispatch(removeInvestigationsViewResultAttachment(index));
  },
});

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(InvestigationsView);
