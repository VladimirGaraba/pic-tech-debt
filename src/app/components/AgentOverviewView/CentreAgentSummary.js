import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import UnstyledTable from 'react-bootstrap/lib/Table';

import { getCentreAgentsBreakdown } from 'utils/helpers';

import messages from 'components/AgentView/messages';

const Table = styled(UnstyledTable)`
  &.table > tbody > tr:nth-child(even) td {
    border-top: none;
  }
`;

export const CentreAgentSummary = ({ agents, intl, patientWeight, patientWeightUnits, toxicologySource }) => {
  const centreAgents = getCentreAgentsBreakdown(agents, patientWeight, patientWeightUnits, toxicologySource, intl);

  return (<Table striped bordered condensed>
    <thead>
      <tr>
        <th><FormattedMessage {...messages.title} /></th>
        <th><FormattedMessage {...messages['field.quantity']} /></th>
        <th><FormattedMessage {...messages['message.dosage']} /></th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(centreAgents).length > 0
          ? Object.keys(centreAgents).map((c, i) => {
            const url = centreAgents[c].url ? centreAgents[c].url : undefined;
            return (
              <tr key={i}>
                <td>{url ? <Link href={url} target="_blank">{c}</Link> : c} (<Link href={centreAgents[c].toxicology} target="_blank"><FormattedMessage {...messages['action.lookup']} /></Link>)</td>
                <td>{centreAgents[c].qty.join(', ')}</td>
                <td>{centreAgents[c].dosage.join(', ')}</td>
              </tr>
            );
          })
          : <tr><td colSpan={4}><FormattedMessage {...messages['message.none']} /></td></tr>
    }
    </tbody>
  </Table>);
};

CentreAgentSummary.propTypes = {
  agents: PropTypes.array,
  intl: PropTypes.object,
  patientWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  patientWeightUnits: PropTypes.string,
  toxicologySource: PropTypes.string,
};

export default injectIntl(CentreAgentSummary);
