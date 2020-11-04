import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import _isEmpty from 'lodash/isEmpty';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Label from 'react-bootstrap/lib/Label';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Table from 'react-bootstrap/lib/Table';

import { isDisabled, Fieldset, FieldSelectGroup, formatTimestamp, typeaheadOnChangeHandler, renderTypeaheadMenu } from 'utils/helpers';
import { getSpecialtyOptions, getDispositionOptions, getTreatmentOptions } from 'utils/options';

import auth from 'auth';
import Typeahead from 'components/StyledTypeahead';

import messages from './messages';

const StyledHR = styled.hr`
  & {
    line-height: 1em;
    position: relative;
    outline: 0;
    border: 0;
    color: black;
    text-align: center;
    height: 1.5em;
    opacity: .5;
  }

  &:before {
    content: '';
    background: linear-gradient(to right, transparent, #818078, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;

    padding: 0 .5em;
    line-height: 1.5em;
    color: #818078;
    background-color: #fcfcfa;
  }
`;

class TreatmentView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dispositionState: null,
      refereeOptions: [],
    };
  }

  componentDidMount() {
    const URL = '/analytics/getSpecialists';
    fetch(URL, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          refereeOptions: json.map((s) => ({
            label: s.name,
            attrs: {
              'data-specialty': s.specialty,
              'data-site': s.id_site,
            },
          })),
        });
      });
  }

  render() {
    const {
      referrals,

      referee,
      refereeSite,
      specialty,
      updateReferrals,
      updateReferralsViewReferee,
      updateReferralsViewRefereeSite,
      updateReferralsViewSpecialty,

      treatments,

      treatmentList,
      disposition,
      content,
      updateTreatments,
      updateTreatmentsViewDisposition,
      updateTreatmentsViewTreatments,

      userSPI,
      intl,
    } = this.props;

    const { dispositionState, refereeOptions } = this.state;

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Fieldset>
              <legend><FormattedMessage {...messages['section.treatment.plural']} /></legend>

              <Col xs={6}>
                <FormGroup validationState={dispositionState}>
                  <ControlLabel><FormattedMessage {...messages['field.disposition']} /></ControlLabel>
                  {dispositionState ? <HelpBlock>Disposition is required.</HelpBlock> : null}
                  {getDispositionOptions().map((option, i) => <Radio
                    key={i}
                    name="riskAssessment"
                    value={option.label}
                    checked={disposition === option.label}
                    onChange={
                      (e) => {
                        this.setState({ dispositionState: null });
                        updateTreatmentsViewDisposition(e.target.value);
                      }
                    }
                    required
                    disabled={isDisabled(this.props, this.context)}
                  >{option.label}</Radio>)}
                </FormGroup>
                <br />
                <FormGroup>
                  <Button
                    bsStyle="primary"
                    onClick={() => {
                      if (_isEmpty(disposition)) {
                        this.setState({ dispositionState: 'error' });
                      } else {
                        updateTreatments(disposition, content, treatmentList, userSPI);
                      }
                    }}
                    disabled={isDisabled(this.props, this.context)}
                  >
                    <FormattedMessage {...messages['button.treatment.add']} />
                  </Button>
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel><FormattedMessage {...messages['field.treatments']} /></ControlLabel>
                  <Typeahead
                    clearButton
                    multiple
                    options={getTreatmentOptions()}
                    selected={treatmentList}
                    renderMenu={renderTypeaheadMenu}
                    onChange={(values) => typeaheadOnChangeHandler(undefined, values, updateTreatmentsViewTreatments, true)}
                    bodyContainer
                    disabled={isDisabled(this.props, this.context)}
                  />
                </FormGroup>
              </Col>
              <Col xs={12}>
                <h4><FormattedMessage {...messages['section.treatment.plural']} /></h4>
                {treatments.length > 0 ?
                  <PanelGroup id={'treatments-pg'}>
                    {treatments.map((treatment, i) => {
                      const treatmentLabel = `${formatTimestamp(treatment.timestamp)}`;
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
                                <tr><td><Label><FormattedMessage {...messages['label.treatment.none']} /></Label></td></tr>
                            }
                            </tbody>
                          </Table>
                          <div>
                            {treatment.disposition ? <div style={{ marginBottom: '1rem' }}><strong>Disposition: </strong> {treatment.disposition}</div> : null}
                          </div>
                        </Panel.Body>
                      </Panel>);
                    })}
                  </PanelGroup> :
                  <Label><FormattedMessage {...messages['label.treatment.none']} /></Label>
                }
              </Col>
            </Fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <StyledHR data-content="OR" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Fieldset>
              <legend><FormattedMessage {...messages['section.referrals']} /></legend>

              <Col xs={8}>
                <FieldSelectGroup
                  id="referee"
                  label={intl.formatMessage(messages['label.referee'])}
                  value={referee}
                  options={refereeOptions}
                  onChange={(e) => {
                    updateReferralsViewReferee(e.target.value);
                    const spec = e.target[e.target.selectedIndex].getAttribute('data-specialty');
                    const site = e.target[e.target.selectedIndex].getAttribute('data-site');
                    if (site && site.length > 0) {
                      updateReferralsViewRefereeSite(site);
                    }
                    if (spec && spec.length > 0) {
                      updateReferralsViewSpecialty(spec);
                    }
                  }}
                  disabled={isDisabled(this.props, this.context)}
                />
              </Col>
              <Col xs={4}>
                <FieldSelectGroup
                  id="specialty"
                  label={intl.formatMessage(messages['label.specialty'])}
                  value={specialty}
                  options={getSpecialtyOptions()}
                  onChange={(e) => updateReferralsViewSpecialty(e.target.value)}
                  disabled={isDisabled(this.props, this.context)}
                />
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <Button
                    bsStyle="primary"
                    onClick={() => {
                      updateReferrals(referee, specialty, refereeSite, userSPI);
                    }}
                    disabled={isDisabled(this.props, this.context) || _isEmpty(referee)}
                  >
                    <FormattedMessage {...messages['button.referral.add']} />
                  </Button>
                </FormGroup>
              </Col>
              <Col xs={12}>
                <h4><FormattedMessage {...messages['section.referrals']} /></h4>
                {referrals.length > 0 ?
                  <PanelGroup accordion id={'referrals-pg'}>
                    {referrals.map((referral, i) => {
                      const referralLabel = `${referral.referee} - ${referral.specialty} - ${formatTimestamp(referral.timestamp)}`;
                      return (<Panel key={i} eventKey={i}>
                        <Panel.Heading>
                          <Panel.Title toggle>{referralLabel}</Panel.Title>
                        </Panel.Heading>
                      </Panel>);
                    })}
                  </PanelGroup> :
                  <Label><FormattedMessage {...messages['label.referrals.none']} /></Label>
                }
              </Col>
            </Fieldset>
          </Col>
        </Row>
      </Grid>
    );
  }
}
TreatmentView.propTypes = {
  referrals: PropTypes.array,
  referee: PropTypes.string,
  refereeSite: PropTypes.string,
  specialty: PropTypes.string,
  updateReferrals: PropTypes.func,
  updateReferralsViewReferee: PropTypes.func,
  updateReferralsViewRefereeSite: PropTypes.func,
  updateReferralsViewSpecialty: PropTypes.func,
  treatments: PropTypes.array,
  treatmentList: PropTypes.array,
  disposition: PropTypes.string,
  content: PropTypes.string,
  updateTreatments: PropTypes.func,
  updateTreatmentsViewDisposition: PropTypes.func,
  updateTreatmentsViewTreatments: PropTypes.func,
  userSPI: PropTypes.object,
  intl: PropTypes.object,
};

TreatmentView.contextTypes = {
  uiMode: PropTypes.string,
};

export default injectIntl(TreatmentView);
