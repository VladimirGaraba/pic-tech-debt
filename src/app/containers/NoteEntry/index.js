import { connect } from 'react-redux';

import { selectVars, makeSelectCurrentCase, makeSelectSPI } from 'containers/App/selectors';

import { updateNoteContext, updateNoteContent, addNoteAttachments, removeNoteAttachment } from 'containers/NoteEntry/actions/case';

import NoteView from 'components/NoteView';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const { currentRecordId, callRecordId } = vars;
    const currentCase = makeSelectCurrentCase()(state);

    let noteId;
    let note;
    if (currentCase.communications && currentCase.communications.length > 0) {
      noteId = currentCase.communications[currentCase.communications.length - 1].noteRef;
      note = currentCase.notes[noteId];
    }

    return {
      currentRecordId,
      callRecordId,
      noteId,
      noteContext: note && note.context ? note.context : '',
      noteContent: note && note.content ? note.content : '',
      noteAttachments: note && note.attachments ? note.attachments : [],

      userSPI: selectSPI(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateNoteContext: (noteRef, context) => {
    dispatch(updateNoteContext(ownProps.recordId, noteRef, context));
  },
  updateNoteContent: (noteRef, content) => {
    dispatch(updateNoteContent(ownProps.recordId, noteRef, content));
  },
  addNoteAttachments: (noteRef, attachments) => {
    dispatch(addNoteAttachments(ownProps.recordId, noteRef, attachments));
  },
  removeNoteAttachment: (noteRef, index, name) => {
    dispatch(removeNoteAttachment(ownProps.recordId, noteRef, index, name));
  },
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(NoteView);
