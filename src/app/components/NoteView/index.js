/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import Panel from 'react-bootstrap/lib/Panel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import Dropzone from 'react-dropzone';

import {
  isDisabled,
  FieldSelectGroup,
} from 'utils/helpers';

import {
  getNoteContexts,
} from 'utils/options';
import { EDITTEMPLATE_UIMODE } from '../../containers/App/constants';

const StyledPanel = styled(Panel)`
  & .panel-heading {
    padding: 0;
  }
  
  & .panel-heading a {
    display: block;
    outline: none;
    padding: 10px 15px;
  }
  
  & .panel-heading a,
  & .panel-heading a:hover {
    text-decoration: none;
  }
`;

class NoteView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    const { noteId, noteContext, updateNoteContext, noteContent, updateNoteContent, noteAttachments, addNoteAttachments, removeNoteAttachment } = this.props;

    return (
      <StyledPanel id={'notes-pg'} expanded={this.state.open} onToggle={() => this.setState({ open: !this.state.open })}>
        <Panel.Heading>
          <Panel.Title toggle>Notes <span className={this.state.open ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-top'}></span></Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <FieldSelectGroup
            id={'noteContext'}
            label={'Note Type'}
            options={getNoteContexts()}
            value={noteContext}
            onChange={(e) => updateNoteContext(noteId, e.target.value)}
            disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
          />
          <br />
          <FormGroup controlId="noteContent">
            <ControlLabel>Content</ControlLabel>
            <FormControl
              componentClass="textarea"
              rows={6}
              value={noteContent}
              onChange={(e) => updateNoteContent(noteId, e.target.value)}
              disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
            />
          </FormGroup>
          <br />
          {this.context.uiMode !== EDITTEMPLATE_UIMODE
            ? <FormGroup controlId="noteAttachments">
              <ControlLabel>Attachments</ControlLabel>
              <Dropzone
                style={{
                  width: '100%',
                  height: '50px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '1rem',
                }}
                multiple
                onDrop={(files) => addNoteAttachments(noteId, files)}
                disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
              >
                  Drag and drop, or click to upload attachments.
                </Dropzone>
              {noteAttachments && noteAttachments.length > 0
                  ? <ul style={{ marginTop: '1rem', listStyle: 'none', paddingLeft: '0' }}>
                    {noteAttachments.map((filename, i) =>
                      <li key={i}>
                        {filename} <Glyphicon glyph="remove" style={{ marginLeft: '1rem' }} onClick={() => removeNoteAttachment(noteId, i, filename)} />
                      </li>)}
                      {/*Look slike here ^ is the spot where we need to process teh filename to avoid spaces and dodgy chars*/}
                  </ul>
                  : null
                }
            </FormGroup>
          : null}
        </Panel.Body>
      </StyledPanel>
    );
  }
}

NoteView.propTypes = {
  noteId: PropTypes.string,
  noteContext: PropTypes.string,
  updateNoteContext: PropTypes.func,
  noteContent: PropTypes.string,
  updateNoteContent: PropTypes.func,
  noteAttachments: PropTypes.array,
  addNoteAttachments: PropTypes.func,
  removeNoteAttachment: PropTypes.func,
};

NoteView.contextTypes = {
  uiMode: PropTypes.string,
};

export default injectIntl(NoteView);
