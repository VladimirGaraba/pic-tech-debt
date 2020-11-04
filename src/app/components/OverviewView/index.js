/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import moment from 'moment-timezone';

import _capitalize from 'lodash/capitalize';
import _compact from 'lodash/compact';
import _filter from 'lodash/filter';
import _keyBy from 'lodash/keyBy';
import _min from 'lodash/min';

import Col from 'react-bootstrap/lib/Col';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Label from 'react-bootstrap/lib/Label';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Row from 'react-bootstrap/lib/Row';
import UnstyledTable from 'react-bootstrap/lib/Table';
import Well from 'react-bootstrap/lib/Well';

import printJS from 'print-js/dist/print.min.js'; // eslint-disable-line import/extensions

import CallerAgentSummary from 'components/AgentOverviewView/CallerAgentSummary';
import CentreAgentSummary from 'components/AgentOverviewView/CentreAgentSummary';

import { EDITTEMPLATE_UIMODE } from 'containers/App/constants';

import {
  Fieldset,
  ReadOnlyField,
  buildAttachments,
  formatTimestamp,
  getCentreAgentsBreakdown,
  getContextName,
  getGlyph,
  isHuman,
} from 'utils/helpers';

import auth from 'auth';

import agentmessages from 'components/AgentView/messages';
import casemessages from 'components/CaseView/messages';
import featuresmessages from 'components/ClinicalFeaturesView/messages';
import investigationsmessages from 'components/InvestigationsView/messages';
import patientmessages from 'components/PatientView/messages';
import treatmentmessages from 'components/TreatmentView/messages';

import CaseHistory from './CaseHistory';

import messages from './messages';

const Table = styled(UnstyledTable)`
  &.table > tbody > tr:nth-child(even) td {
    border-top: none;
  }
`;

/* eslint-disable no-nested-ternary */
export class OverviewView extends React.Component {
  constructor(props) {
    super(props);

    this._buildAttachments = buildAttachments.bind(this);
    this._printFile = this.printFile.bind(this);

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

  buildFeatureList() {
    const { features } = this.props;

    const list = {};
    if (features.length > 0 && features[features.length - 1].descriptors) {
      features[features.length - 1].descriptors.map((desc) => {
        list[desc] = true;
        return desc;
      });
    }

    return list;
  }

  printFile() {
    let { intl, ...data } = this.props; // eslint-disable-line prefer-const

    /** Get Local Timezone **/
    data.tz = moment.tz.guess();
    data.tzAbbr = moment(data.timestamp).tz(data.tz).zoneAbbr();

    data.centreAgents = getCentreAgentsBreakdown(this.props.agents, this.props.patientWeight, this.props.patientWeightUnits, this.props.toxicologySource, intl);
    data.descriptorList = this.props.features.length > 0 && this.props.features[this.props.features.length - 1].descriptors ? this.props.features[this.props.features.length - 1].descriptors : {};
    data.notes = this.props.notes;

    const URL = '/api/v1/file/render';
    const headers = {
      Authorization: `Bearer ${auth.getToken()}`,
      'Content-Type': 'application/json',
    };
    fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (response.ok) {
        return response.blob();
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    })
    .then((res) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = window.URL.createObjectURL(file);
      printJS({
        printable: fileURL,
        type: 'pdf',
        // showModal: true,
      });
    })
    .catch((e) => {
      alert(e); // eslint-disable-line no-alert
    });
  }

  render() {
    const {
        agents,
        communications,
        currentRecordId,
        features,
        incidentId,
        intl,
        investigations,
        naturalId,
        notes,
        patientAge,
        patientAgeUnits,
        patientCategory,
        patientCircumstance,
        patientGender,
        patientLocation,
        patientMedicalRecordNumber,
        patientName,
        patientWeight,
        patientWeightUnits,
        poisonSeverityScore,
        pregnantLactating,
        pregnantStatus,
        pregnantTrimester,
        riskAssessment,
        status,
        topic,
        treatments,
        type,
    } = this.props;

    const descriptorList = features.length > 0 && features[features.length - 1].descriptors
      ? features[features.length - 1].descriptors
      : {};

    const filteredNotes = _keyBy(_filter(notes, (o) => o.context !== 'investigation' && o.context !== 'result' && o.content.trim() !== ''), (o) => o.id);

    const agentTimestamp = _min(_compact(agents.map((a) => a.exposure.timestamp)));

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <div className="clearfix">
              <Link className="pull-right" onClick={this._printFile}><Glyphicon glyph="print" /> Print</Link>
            </div>
            <Well>
              <Glyphicon glyph={getGlyph(type)} style={{ marginRight: '0.5rem' }} /> <FormattedMessage {...casemessages[`type.${type}`]} /> - <FormattedMessage {...casemessages[`status.${status}`]} />
              {' '}/{' '}
              <span>{topic || <FormattedMessage {...casemessages['topic.none']} />}</span>
              {' '}
              <span>({naturalId || <FormattedMessage {...casemessages['naturalId.none']} />})</span>
              {' '}
              {incidentId ? <span>({incidentId})</span> : null}
            </Well>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Fieldset>
              <legend><FormattedMessage {...casemessages['section.patient']} /></legend>

              <Row>
                <Col xs={5}>
                  <ReadOnlyField
                    id="patientName"
                    label={intl.formatMessage(patientmessages['field.name'])}
                    value={patientName}
                  />
                </Col>
                {isHuman(patientCategory)
                  ? <Col xs={3}>
                    <ReadOnlyField
                      id="patientAge"
                      label={intl.formatMessage(patientmessages['field.age'])}
                      value={`${patientAge} ${patientAgeUnits}`}
                    />
                  </Col>
                  : null}
                <Col xs={2}>
                  <ReadOnlyField
                    id="patientGender"
                    value={_capitalize(patientGender)}
                  />
                </Col>
                {isHuman(patientCategory)
                  ? <Col xs={2}>
                    <ReadOnlyField
                      id="patientMedicalRecordNumber"
                      label={intl.formatMessage(patientmessages['field.mrn'])}
                      value={patientMedicalRecordNumber}
                    />
                  </Col>
                  : null}
              </Row>
              <Row>
                <Col xs={3}>
                  <ReadOnlyField
                    id="patientWeight"
                    label={intl.formatMessage(patientmessages['field.weight'])}
                    value={`${patientWeight} ${patientWeightUnits}`}
                  />
                </Col>
                {patientGender === 'female' ? <Col xs={3}>
                  <ReadOnlyField
                    id="pregnantStatus"
                    label={intl.formatMessage(patientmessages['field.pregnancy.status'])}
                    value={pregnantStatus}
                  />
                </Col> : null}
                {patientGender === 'female' ? <Col xs={3}>
                  <ReadOnlyField
                    id="pregnantTrimester"
                    label={intl.formatMessage(patientmessages['field.pregnancy.trimester'])}
                    value={pregnantTrimester}
                  />
                </Col> : null}
                {patientGender === 'female' ? <Col xs={3}>
                  <ReadOnlyField
                    id="pregnantLactating"
                    label={intl.formatMessage(patientmessages['field.pregnancy.lactating'])}
                    value={pregnantLactating}
                  />
                </Col> : null}
              </Row>
            </Fieldset>
            <Fieldset>
              <legend><FormattedMessage {...patientmessages['section.exposure']} /></legend>

              <Row>
                {isHuman(patientCategory)
                  ? <Col xs={4}>
                    <ReadOnlyField
                      id="circumstance"
                      label={intl.formatMessage(patientmessages['field.circumstance'])}
                      value={patientCircumstance}
                    />
                  </Col>
                  : null}
                <Col xs={4}>
                  <ReadOnlyField
                    id="location"
                    label={intl.formatMessage(patientmessages['field.location'])}
                    value={patientLocation}
                  />
                </Col>
                <Col xs={4}>
                  <ReadOnlyField
                    id="timestamp"
                    label={intl.formatMessage(agentmessages['field.timeOfExposure'])}
                    value={agentTimestamp ? intl.formatRelative(agentTimestamp) : null}
                  />
                </Col>
              </Row>
            </Fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Fieldset>
              <legend><FormattedMessage {...casemessages['section.agents']} /></legend>

              <h4><FormattedMessage {...agentmessages['section.by.centreAgent']} /></h4>
              <CentreAgentSummary agents={agents} patientWeight={patientWeight} patientWeightUnits={patientWeightUnits} />

              <h4><FormattedMessage {...agentmessages['section.by.callerAgent']} /></h4>
              <CallerAgentSummary agents={agents} patientWeight={patientWeight} patientWeightUnits={patientWeightUnits} />
            </Fieldset>
          </Col>
        </Row>
        {isHuman(patientCategory)
          ? <Row>
            <Col xs={12}>
              <Fieldset>
                <legend><FormattedMessage {...patientmessages['section.riskassessment']} /></legend>
                <Row>
                  <Col xs={4}>
                    <ReadOnlyField
                      id="riskAssessment"
                      label={intl.formatMessage(patientmessages['field.riskassessment'])}
                      value={riskAssessment}
                    />
                  </Col>
                  <Col xs={4}>
                    <ReadOnlyField
                      id="poisonSeverityScore"
                      label={intl.formatMessage(patientmessages['field.poisonseverityscore'])}
                      value={poisonSeverityScore}
                    />
                  </Col>
                </Row>
              </Fieldset>
            </Col>
          </Row>
          : null}
        {isHuman(patientCategory)
          ? <Row>
            <Col xs={12}>
              <Fieldset>
                <legend><FormattedMessage {...casemessages['section.clinicalfeatures']} /></legend>
                <Table bordered condensed>
                  <tbody>
                    {Object.keys(descriptorList).length > 0 ?
                        Object.keys(descriptorList).map((parent, i) => descriptorList[parent].map((feature, j) => <tr key={`${i}-${j}`}>
                          <td>{parent} - {feature}</td>
                        </tr>)) :
                        <tr><td><FormattedMessage {...featuresmessages['message.none']} /></td></tr>
                    }
                  </tbody>
                </Table>

              </Fieldset>
            </Col>
          </Row>
          : null}
        {isHuman(patientCategory)
          ? <Row>
            <Col xs={12}>
              <Fieldset>
                <legend><FormattedMessage {...casemessages['section.treatment']} /></legend>
                {treatments.length > 0 ?
                  <PanelGroup id={'overview-treatments-pg'}>
                    {treatments.map((treatment, i) => {
                      const treatmentLabel = formatTimestamp(treatment.timestamp);
                      return (<Panel key={i} eventKey={i}>
                        <Panel.Heading>
                          <Panel.Title>{treatmentLabel}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                          <Table bordered condensed>
                            <tbody>
                              {Object.keys(treatment.treatments).length > 0 ?
                                    Object.keys(treatment.treatments).map((parent) => treatment.treatments[parent].map((t) =>
                                      <tr><td>{parent} - {t}</td></tr>
                                      )) :
                                      <tr><td><Label><FormattedMessage {...treatmentmessages['message.none']} /></Label></td></tr>
                                }
                            </tbody>
                          </Table>
                          <div>
                            {treatment.disposition ? <div style={{ marginBottom: '1rem' }}><strong><FormattedMessage {...treatmentmessages['field.disposition']} />:</strong> {treatment.disposition}</div> : null}
                          </div>
                        </Panel.Body>
                      </Panel>);
                    })}
                  </PanelGroup> :
                  <Label><FormattedMessage {...treatmentmessages['message.none']} /></Label>
                  }
              </Fieldset>
            </Col>
          </Row>
          : null }
        {isHuman(patientCategory)
          ? <Row>
            <Col xs={12}>
              <Fieldset>
                <legend><FormattedMessage {...casemessages['section.investigations']} /></legend>
                {investigations.length > 0
                      ? <PanelGroup id={'overview-investigations-pg'}>
                        {investigations.map((r, i) => {
                          const request = notes[r.request];
                          const requestLabel = (<span>
                            {formatTimestamp(request.timestamp)}
                          </span>);
                          return (<Panel key={i} eventKey={i}>
                            <Panel.Heading>
                              <Panel.Title>{requestLabel}</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                              {request.content !== ''
                              ? <div>{request.content}</div>
                              : <Label><FormattedMessage {...investigationsmessages['requests.content.none']} /></Label>
                          }<br />
                              {r.results.length > 0
                              ? <PanelGroup id={`overview-investigation-results-${i}`} style={{ marginTop: '1rem' }}>
                                {r.results.map((res, j) => {
                                  const resultLabel = `${notes[res].title} - ${formatTimestamp(notes[res].timestamp)}`;
                                  return (<Panel key={j} eventKey={j}>
                                    <Panel.Heading>
                                      <Panel.Title>{resultLabel}</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                      {notes[res].content !== ''
                                      ? notes[res].content
                                      : <Label><FormattedMessage {...investigationsmessages['results.content.none']} /></Label>
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
                              : <Label><FormattedMessage {...investigationsmessages['results.none']} /></Label>
                          }
                            </Panel.Body>
                          </Panel>);
                        })}
                      </PanelGroup>
                      : <Label><FormattedMessage {...investigationsmessages['requests.none']} /></Label>
                  }
              </Fieldset>
            </Col>
          </Row>
          : null }
        <Row>
          <Col xs={12}>
            <Fieldset>
              <legend><FormattedMessage {...casemessages['section.notes']} /></legend>

              {Object.keys(filteredNotes).length > 0 ?
                <PanelGroup id={'overview-notes-pg'}>
                  {Object.keys(filteredNotes).map((note, i) => {
                    const noteLabel = `${filteredNotes[note].spi.name ? filteredNotes[note].spi.name : intl.formatMessage(messages['errors.missingSPIName'])} (${filteredNotes[note].spi.job ? filteredNotes[note].spi.job : intl.formatMessage(messages['errors.missingSPIJob'])}) - ${formatTimestamp(filteredNotes[note].timestamp)}`;
                    return (<Panel key={i} eventKey={i}>
                      <Panel.Heading>
                        <Panel.Title>{noteLabel} {filteredNotes[note].context ? <Label>{getContextName(filteredNotes[note].context)}</Label> : null}</Panel.Title>
                      </Panel.Heading>
                      <Panel.Body>
                        {filteredNotes[note].content !== ''
                          ? filteredNotes[note].content
                          : <Label>No content</Label>
                        }
                        {filteredNotes[note].attachments && filteredNotes[note].attachments.length > 0
                          ? <div style={{ overflow: 'hidden' }}>
                            <h5><strong>Attachments</strong></h5>
                            <ul>
                              {filteredNotes[note].attachments.map((filename, j) => <li key={j}><Link href={this.state.attachments[filename]} target="_blank">{filename}</Link></li>)}
                            </ul>
                          </div>
                          : null}
                      </Panel.Body>
                    </Panel>);
                  })}
                </PanelGroup> :
                <Label>No Notes</Label>
              }
            </Fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Fieldset>
              <legend><FormattedMessage {...messages[this.context.uiMode === EDITTEMPLATE_UIMODE ? 'section.changelog' : 'section.casehistory']} /></legend>
              <CaseHistory communications={communications} notes={notes} agents={agents} isHuman={isHuman(patientCategory)} type={type} />
            </Fieldset>
          </Col>
        </Row>
        <Row className={'debug'}>
          <span className={'pull-right'}>{currentRecordId}</span>
        </Row>
      </Grid>
    );
  }
}
/* eslint-enable no-nested-ternary */

OverviewView.contextTypes = {
  uiMode: PropTypes.string,
};

OverviewView.propTypes = {
  agents: PropTypes.array,
  communications: PropTypes.array,
  currentRecordId: PropTypes.string,
  features: PropTypes.array,
  incidentId: PropTypes.string,
  intl: PropTypes.object,
  investigations: PropTypes.array,
  naturalId: PropTypes.string,
  notes: PropTypes.object,
  patientAge: PropTypes.string,
  patientAgeUnits: PropTypes.string,
  patientCategory: PropTypes.string,
  patientCircumstance: PropTypes.string,
  patientGender: PropTypes.string,
  patientLocation: PropTypes.string,
  patientMedicalRecordNumber: PropTypes.string,
  patientName: PropTypes.string,
  patientPostcode: PropTypes.string,
  patientWeight: PropTypes.string,
  patientWeightUnits: PropTypes.string,
  poisonSeverityScore: PropTypes.string,
  pregnantLactating: PropTypes.string,
  pregnantStatus: PropTypes.string,
  pregnantTrimester: PropTypes.string,
  riskAssessment: PropTypes.string,
  status: PropTypes.string,
  topic: PropTypes.string,
  toxicologySource: PropTypes.string,
  treatments: PropTypes.array,
  type: PropTypes.string,
};

export default injectIntl(OverviewView);
