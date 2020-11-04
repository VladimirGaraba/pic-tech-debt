import { connect } from 'react-redux';

import _isEmpty from 'lodash/isEmpty';

import {
  makeSelectCurrentTemplate,
  makeSelectEditingTemplate,
  makeSelectSPI,
  selectVars,
} from 'containers/App/selectors';

import {
  addTemplateNoteAttachments,
  removeTemplateNoteAttachment,
  updateTemplateNoteContent,
  updateTemplateNoteContext,
} from 'containers/NoteEntry/actions/template';

import NoteView from 'components/NoteView';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const { currentTemplateId, editingTemplateId } = vars;
    const currentTemplate = !_isEmpty(editingTemplateId) ? makeSelectEditingTemplate()(state) : makeSelectCurrentTemplate()(state);

    const noteId = currentTemplate.communications[currentTemplate.communications.length - 1].noteRef;
    const note = currentTemplate.notes[noteId];

    return {
      currentTemplateId,
      editingTemplateId,
      noteId,
      noteContext: note.context,
      noteContent: note.content,
      noteAttachments: note.attachments,

      userSPI: selectSPI(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateNoteContext: (noteRef, context) => {
    dispatch(updateTemplateNoteContext(ownProps.recordId, noteRef, context));
  },
  updateNoteContent: (noteRef, content) => {
    dispatch(updateTemplateNoteContent(ownProps.recordId, noteRef, content));
  },
  addNoteAttachments: (noteRef, attachments) => {
    dispatch(addTemplateNoteAttachments(ownProps.recordId, noteRef, attachments));
  },
  removeNoteAttachment: (noteRef, index, name) => {
    dispatch(removeTemplateNoteAttachment(ownProps.recordId, noteRef, index, name));
  },
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(NoteView);
