import { connect } from 'react-redux';

import _filter from 'lodash/filter';
import _isUndefined from 'lodash/isUndefined';
import _keyBy from 'lodash/keyBy';
import _isEmpty from 'lodash/isEmpty';

import InvestigationsView from 'components/InvestigationsView';

import {
  saveTemplateNote,
} from 'containers/NoteEntry/actions/template';

import {
  makeSelectCurrentTemplate,
  makeSelectEditingTemplate,
  makeSelectSPI,
  selectVars,
} from 'containers/App/selectors';

import { generateUuid } from 'utils/helpers';

import {
  hideInvestigationsViewResultModal,
  removeInvestigationsViewResultAttachment,
  resetInvestigationsViewRequest,
  resetInvestigationsViewResult,
  showInvestigationsViewResultModal,
  updateInvestigationsViewRequest,
  updateInvestigationsViewResultAttachments,
  updateInvestigationsViewResultDescription,
  updateInvestigationsViewResultNotes,
} from './actions/case';

import {
  updateTemplateInvestigationsRequests,
  updateTemplateInvestigationsResults,
} from './actions/template';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const { currentTemplateId, editingTemplateId, investigationsViewRequest, investigationsViewResult } = vars;
    const currentTemplate = !_isEmpty(editingTemplateId) ? makeSelectEditingTemplate()(state) : makeSelectCurrentTemplate()(state);

    const investigations = currentTemplate.investigations ? currentTemplate.investigations : [];
    const notes = _keyBy(
        _filter(
            currentTemplate.notes,
            (o) => o.context === 'investigation' || o.context === 'result'
        ),
        (o) => o.id
    );

    return {
      currentTemplateId,
      editingTemplateId,

      currentRecordId: currentTemplateId,

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
    dispatch(saveTemplateNote(ownProps.recordId, uuid, 'investigation', undefined, '', request, [], spi));
    dispatch(updateTemplateInvestigationsRequests(ownProps.recordId, requestIx, uuid));
    dispatch(resetInvestigationsViewRequest());
  },
  updateInvestigationResults: (requestIx, description, results, attachments = [], spi) => {
    const uuid = generateUuid();
    dispatch(saveTemplateNote(ownProps.recordId, uuid, 'result', undefined, description, results, attachments, spi));
    dispatch(updateTemplateInvestigationsResults(ownProps.recordId, requestIx, uuid));
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
