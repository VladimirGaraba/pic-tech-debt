import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _isNaN from 'lodash/isNaN';

import UnstyledTable from 'react-bootstrap/lib/Table';

import { convertWeightToKg, getToxicologyLink } from 'utils/helpers';

import messages from 'components/AgentView/messages';

const Table = styled(UnstyledTable)`
  &.table > tbody > tr:nth-child(even) td {
    border-top: none;
  }
`;

export const CallerAgentSummary = ({ agents, breakdown, intl, patientWeight, patientWeightUnits, toxicologySource }) => (
  <Table striped bordered condensed>
    <thead>
      <tr>
        <th colSpan={2}><FormattedMessage {...messages.title} /></th>
        <th><FormattedMessage {...messages['field.quantity']} /></th>
        <th><FormattedMessage {...messages['field.routeOfExposure.short']} /></th>
        <th><FormattedMessage {...messages['field.typeOfExposure.short']} /></th>
        {breakdown ? <th><FormattedMessage {...messages['message.dosage']} /></th> : null}
      </tr>
    </thead>
    {agents.length > 0
        ? agents.map((agent, i) => {
          let quantity = '';
          if (!_isNaN(Number(agent.dosage.quantity))) {
            quantity = `${agent.dosage.quantity} ${!_isEmpty(agent.dosage.units) ? agent.dosage.units : intl.formatMessage(messages['message.units.unspecified'])}`;
          } else {
            quantity = intl.formatMessage(messages['message.quantity.unspecified']);
          }
          return (
            <tbody key={i}>
              <tr>
                <td colSpan={2}>{!_isEmpty(agent.name) ? agent.name : <FormattedMessage {...messages['message.caller.none']} />}</td>
                <td>{quantity}</td>
                <td>{_isArray(agent.exposure.route) ? agent.exposure.route.join(', ') : agent.exposure.route}</td>
                <td>{agent.exposure.type}</td>
                {breakdown ? <td>&nbsp;</td> : null}
              </tr>
              {breakdown && agent.centreAgents.length > 0
                  ? agent.centreAgents.map((centreAgent, j) => {
                    let qty = '';
                    if (!_isNaN(Number(centreAgent.quantity))) {
                      qty = `${centreAgent.quantity} ${!_isEmpty(centreAgent.units) ? centreAgent.units : intl.formatMessage(messages['message.units.unspecified'])}`;
                    } else {
                      qty = intl.formatMessage(messages['message.quantity.unspecified']);
                    }
                    let dosage;
                    if (!_isNaN(Number(centreAgent.quantity)) && !_isNaN(patientWeight) && patientWeight > 0 && !_isEmpty(patientWeightUnits)) {
                      dosage = `${((parseFloat(centreAgent.quantity) / convertWeightToKg(patientWeight, patientWeightUnits))).toFixed(4)} ${!_isEmpty(centreAgent.units) ? centreAgent.units : intl.formatMessage(messages['message.units.unspecified'])} / kg`;
                    } else {
                      dosage = intl.formatMessage(messages['message.dosage.insufficient']);
                    }
                    const toxicology = getToxicologyLink(centreAgent.name, toxicologySource);

                    return (<tr key={j}>
                      <td>&nbsp;</td>
                      <td>{!_isEmpty(centreAgent.url) ? <Link href={centreAgent.url} target="_blank">{centreAgent.name}</Link> : centreAgent.name} (<Link href={toxicology} target="_blank"><FormattedMessage {...messages['action.lookup']} /></Link>)</td>
                      <td>{qty}</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>{dosage}</td>
                    </tr>);
                  })
                  : null
              }
            </tbody>
          );
        })
        : <tbody><tr><td colSpan={breakdown ? 6 : 5}><FormattedMessage {...messages['message.none']} /></td></tr></tbody>
    }
  </Table>
);

CallerAgentSummary.propTypes = {
  agents: PropTypes.array,
  breakdown: PropTypes.bool,
  intl: PropTypes.object,
  patientWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  patientWeightUnits: PropTypes.string,
  toxicologySource: PropTypes.string,
};

export default injectIntl(CallerAgentSummary);
