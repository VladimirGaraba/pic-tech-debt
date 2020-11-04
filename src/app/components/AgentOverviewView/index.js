import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';

import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import { getToxicologySources } from 'utils/options';
import { FieldSelectGroup } from 'utils/helpers';

import messages from 'components/AgentView/messages';

import CallerAgentSummary from './CallerAgentSummary';
import CentreAgentSummary from './CentreAgentSummary';

export const AgentOverviewView = ({ agents, patientWeight, patientWeightUnits, toxicologySource, updateToxicologySource }) => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <div className="pull-right">
          <FieldSelectGroup
            label={'Look up information in...'}
            options={getToxicologySources()}
            value={toxicologySource}
            onChange={(e) => updateToxicologySource(e.target.value)}
            noblank
          />
        </div>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <h4><FormattedMessage {...messages['section.by.centreAgent']} /></h4>
        <CentreAgentSummary agents={agents} patientWeight={patientWeight} patientWeightUnits={patientWeightUnits} toxicologySource={toxicologySource} />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <h4><FormattedMessage {...messages['section.by.callerAgent']} /></h4>
        <CallerAgentSummary agents={agents} patientWeight={patientWeight} patientWeightUnits={patientWeightUnits} toxicologySource={toxicologySource} breakdown />
      </Col>
    </Row>
  </Grid>
  );

AgentOverviewView.propTypes = {
  agents: PropTypes.array,
  patientWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  patientWeightUnits: PropTypes.string,
  toxicologySource: PropTypes.string,
  updateToxicologySource: PropTypes.func,
};

export default injectIntl(AgentOverviewView);
