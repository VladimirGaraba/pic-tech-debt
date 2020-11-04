/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import _isEmpty from 'lodash/isEmpty';
import _sortBy from 'lodash/sortBy';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Label from 'react-bootstrap/lib/Label';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';

import Dropzone from 'react-dropzone';

import { isDisabled, Fieldset, FieldGroup, formatTimestamp, buildAttachments } from 'utils/helpers';

import messages from './messages';
import { EDITTEMPLATE_UIMODE } from '../../containers/App/constants';

class InvestigationsView extends React.Component {
  constructor(props) {
    super(props);

    this._buildAttachments = buildAttachments.bind(this);

    this.state = {
      attachments: {},
    };
  }

  componentWillMount() {
    this._buildAttachments(this.props.currentRecordId, this.props.notes);
  }

  componentWillUpdate(nextProps) {
    this._buildAttachments(nextProps.currentRecordId, nextProps.notes);
  }

  render() {
    const {
        investigations,
        notes,

        request,
        updateInvestigationRequests,
        updateViewRequest,

        show,
        showModal,
        hideModal,
        nextRequestIx,
        requestIx,
        resultDescription,
        result,
        attachments,
        updateInvestigationResults,
        updateViewResultDescription,
        updateViewResultNotes,
        updateViewResultAttachments,
        removeViewResultAttachment,

        userSPI,
    } = this.props;

    const sortedInvestigations = _sortBy(investigations, [(o) => o.results.length > 0 ? notes[o.results[o.results.length - 1]].timestamp : null]);

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Fieldset>
              <legend>Investigations Requested</legend>
              <Row>
                <Col xs={12}>
                  <FormGroup controlId="request">
                    <ControlLabel>Request</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      rows={6}
                      value={request}
                      onChange={(e) => updateViewRequest(e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <Button
                      bsStyle="primary"
                      onClick={() => {
                        updateInvestigationRequests(nextRequestIx, request, userSPI);
                      }}
                      disabled={isDisabled(this.props, this.context) || _isEmpty(request)}
                    >
                        Add Investigation
                      </Button>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  {investigations.length > 0
                        ? <PanelGroup accordion id={'investigations-pg'}>
                          {sortedInvestigations.map((r, i) => {
                            const myRequest = notes[r.request];
                            const addButton = !isDisabled(this.props, this.context)
                                ? (<Button
                                  bsStyle="link"
                                  style={{ marginTop: '-0.5rem' }}
                                  className={'pull-right'}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isDisabled(this.props, this.context)) {
                                      showModal(i);
                                    }
                                    return false;
                                  }}
                                ><FormattedMessage {...messages['action.result.add']} /></Button>)
                                : null;
                            const labelSuffix = r.results.length > 0
                                ? <span style={{ marginLeft: '0.5rem', display: 'inline-block' }}><Label bsStyle="success"><FormattedMessage {...messages['requests.label.result']} /></Label></span>
                                : <span style={{ marginLeft: '0.5rem', display: 'inline-block' }}><Label><FormattedMessage {...messages['requests.label.pending']} /></Label></span>;
                            const requestLabel = r.results.length === 0
                                ? `${formatTimestamp(myRequest.timestamp)} - ${myRequest.spi.name}`
                                : `${formatTimestamp(notes[r.results[r.results.length - 1]].timestamp)}`;
                            return (<Panel key={i} eventKey={i}>
                              <Panel.Heading>
                                <Panel.Title toggle>
                                  {requestLabel}
                                  {labelSuffix}
                                  {addButton}
                                </Panel.Title>
                              </Panel.Heading>
                              <Panel.Body collapsible>
                                {myRequest.content !== ''
                                    ? <div>{myRequest.content}</div>
                                    : <Label>No request content</Label>
                                }<br />
                                {r.results.length > 0
                                    ? <PanelGroup id={`investigation-results-${i}`} accordion style={{ marginTop: '1rem' }}>
                                      {r.results.map((res, j) => {
                                        const resultLabel = `${notes[res].title} - ${formatTimestamp(notes[res].timestamp)} - ${notes[res].spi.name}`;
                                        return (<Panel key={j} eventKey={j}>
                                          <Panel.Heading>
                                            <Panel.Title toggle>{resultLabel}</Panel.Title>
                                          </Panel.Heading>
                                          <Panel.Body collapsible>
                                            {notes[res].content !== ''
                                                ? notes[res].content
                                                : <Label>No result content</Label>
                                            }
                                            {notes[res].attachments && notes[res].attachments.length > 0
                                                ? <div style={{ overflow: 'hidden' }}>
                                                  <h5><strong>Attachments</strong></h5>
                                                  <ul>
                                                    {notes[res].attachments.map((filename, k) => <li key={k}><Link href={this.state.attachments[filename]} target="_blank">{filename}</Link></li>)}
                                                  </ul>
                                                </div>
                                                : null}
                                          </Panel.Body>
                                        </Panel>);
                                      })}
                                    </PanelGroup>
                                    : <Label>No results</Label>
                                }
                              </Panel.Body>
                            </Panel>);
                          })}
                        </PanelGroup>
                        : <Label>No Investigations Requested</Label>
                    }
                </Col>
              </Row>
            </Fieldset>
            <Modal show={show} onHide={() => hideModal()}>
              <Modal.Header closeButton>
                <Modal.Title>Add Results</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <FieldGroup
                    id="resultDescription"
                    type="text"
                    label="Result Description"
                    value={resultDescription}
                    onChange={(e) => updateViewResultDescription(e.target.value)}
                    disabled={isDisabled(this.props, this.context)}
                  />
                  <FormGroup controlId="result">
                    <ControlLabel>Result Notes</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      rows={6}
                      value={result}
                      onChange={(e) => updateViewResultNotes(e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </FormGroup>
                  {this.context.uiMode !== EDITTEMPLATE_UIMODE
                    ? <FormGroup controlId="attachments">
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
                        onDrop={(files) => updateViewResultAttachments(files)}
                        disabled={isDisabled(this.props, this.context)}
                      >
                          Drag and drop, or click to upload attachments.
                        </Dropzone>
                      {attachments && attachments.length > 0
                            ? <ul style={{ marginTop: '1rem', listStyle: 'none', paddingLeft: '0' }}>
                              {attachments.map((f, i) =>
                                <li key={i}>
                                  {f.name} <Glyphicon glyph="remove" style={{ marginLeft: '1rem' }} onClick={() => removeViewResultAttachment(i)} />
                                </li>)}
                            </ul>
                            : null
                        }
                    </FormGroup>
                  : null}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  bsStyle="primary"
                  onClick={() => {
                    updateInvestigationResults(requestIx, resultDescription, result, attachments, userSPI);
                  }}
                  disabled={isDisabled(this.props, this.context) || (_isEmpty(resultDescription) && _isEmpty(result) && _isEmpty(attachments))}
                >
                    Add
                  </Button>
                <Button onClick={() => hideModal()}>Close</Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Grid>
    );
  }
}

InvestigationsView.propTypes = {
  investigations: PropTypes.array,
  notes: PropTypes.object,
  request: PropTypes.string,
  updateInvestigationRequests: PropTypes.func,
  updateViewRequest: PropTypes.func,
  show: PropTypes.bool,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  nextRequestIx: PropTypes.string,
  requestIx: PropTypes.string,
  resultDescription: PropTypes.string,
  result: PropTypes.string,
  attachments: PropTypes.array,
  updateInvestigationResults: PropTypes.func,
  updateViewResultDescription: PropTypes.func,
  updateViewResultNotes: PropTypes.func,
  updateViewResultAttachments: PropTypes.func,
  removeViewResultAttachment: PropTypes.func,
  userSPI: PropTypes.object,
  currentRecordId: PropTypes.string,
};

InvestigationsView.contextTypes = {
  uiMode: PropTypes.string,
};

export default InvestigationsView;
