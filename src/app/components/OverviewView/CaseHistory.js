
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import _isEmpty from 'lodash/isEmpty';
import _omitBy from 'lodash/omitBy';

import UnstyledTable from 'react-bootstrap/lib/Table';

import { formatTimestamp } from 'utils/helpers';

import casemessages from 'components/CaseView/messages';
import interlocutormessages from 'components/InterlocutorView/messages';

import PatientHistory from './history/Patient';
import ClinicalFeaturesHistory from './history/ClinicalFeatures';
import InvestigationsHistory from './history/Investigations';
import ReferralsHistory from './history/Referrals';
import TreatmentsHistory from './history/Treatments';
import AgentsHistory from './history/Agents';

import messages from './messages';

const Table = styled(UnstyledTable)`
  &.table > tbody > tr:nth-child(even) td {
    border-top: none;
  }
  
  &.table > tbody > tr > td.timestamp {
    white-space: nowrap;
  }
`;

const CaseHistory = ({ communications, notes, agents, intl }) => <Table condensed>
  {communications.length > 0 ?
      communications.map((communication, i) => (
        <tbody key={i}>
          <tr>
            <td className={'timestamp'}>
              {communication.spi && communication.spi.name
                ? communication.spi.name
                : intl.formatMessage(messages['errors.missingSPIName'])
              }&nbsp;
              {communication.spi && communication.spi.job
                ? `(${intl.formatMessage(messages[`communication.spi.job.${communication.spi.job}`])})`
                : `(${intl.formatMessage(messages['errors.missingSPIJob'])})`
              }<br />
              {formatTimestamp(communication.timestamp)}
              {communication.endTimestamp
              ? <FormattedMessage
                {...messages['communication.endTimestamp']}
                values={{
                  endTimestamp: formatTimestamp(communication.endTimestamp),
                }}
              />
              : null}
            </td>
            <td>
              <strong><FormattedMessage {...interlocutormessages['communication.type']} />:</strong> {communication.type ? communication.type : ''}
              {communication.type
              && communication.type === 'status'
              && communication.newState
              ? <span>&nbsp;(<FormattedMessage {...casemessages[`status.${communication.newState}`]} />)</span>
              : null}
            </td>
            <td>
              <strong><FormattedMessage {...messages['communication.spi.org']} /></strong> {communication.spi ? communication.spi.org : ' '}
            </td>
            {communication.type && communication.type !== 'status'
            ? <td>
              <strong><FormattedMessage {...messages['communication.interlocutor.name']} /></strong> {communication.interlocutor ? communication.interlocutor.name : ' '}
            </td>
            : null}
            <td>{communication.interlocutor && communication.interlocutor.organisation ? communication.interlocutor.organisation.name : ' '}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td colSpan={4}>
              <div>
                {communication.medium
                    ? <span>
                      <strong><FormattedMessage {...interlocutormessages['field.medium.type']} />:</strong> {(communication.medium.type) ? communication.medium.type : ''},&nbsp;
                      <strong><FormattedMessage {...interlocutormessages[`field.medium.detail.${!_isEmpty(communication.medium.type) && (communication.medium.type === 'Email' || communication.medium.type === 'Phone') ? communication.medium.type.toLowerCase() : 'default'}`]} />:</strong> {(communication.medium && communication.medium.detail) ? communication.medium.detail : ''}
                    </span>
                    : null}&nbsp;
                {communication.direction
                  ? <span>
                    <strong><FormattedMessage {...interlocutormessages['field.direction']} />:</strong> {communication.direction},&nbsp;
                  </span>
                  : null}
              </div>
              {
                (communication.interlocutor
                    && (
                        communication.interlocutor.name
                        || communication.interlocutor.category
                        || communication.interlocutor.contact
                    )
                )
                    ? <div>
                      <strong><FormattedMessage {...interlocutormessages['field.name']} />:</strong> {(communication.interlocutor.name) ? communication.interlocutor.name : ''},&nbsp;
                      <strong><FormattedMessage {...interlocutormessages['field.category']} />:</strong> {(communication.interlocutor.category) ? communication.interlocutor.category : ''},&nbsp;
                      <strong><FormattedMessage {...interlocutormessages['field.contact']} />:</strong> {(communication.interlocutor.contact) ? communication.interlocutor.contact : ''}
                    </div>
                    : null
              }
              {
                (communication.interlocutor
                    && communication.interlocutor.organisation
                    && (
                        communication.interlocutor.organisation.name
                        || communication.interlocutor.organisation.address1
                        || communication.interlocutor.organisation.city
                        || communication.interlocutor.organisation.postcode
                        || communication.interlocutor.organisation.state
                        || communication.interlocutor.organisation.telephone
                    ))
                    ? <div>
                      <strong><FormattedMessage {...interlocutormessages['section.caller']} /> - <FormattedMessage {...interlocutormessages['section.organisation']} />:</strong>
                      <br /><strong>{communication.interlocutor.organisation.name}</strong>
                      <br />{(communication.interlocutor.organisation.address1) ? communication.interlocutor.organisation.address1 :
                      <span>&lt;<FormattedMessage {...messages['errors.missingAddress1']} />&gt;</span>},&nbsp;
                      {(communication.interlocutor.organisation.address2)
                          ? <span>{communication.interlocutor.organisation.address2},&nbsp;</span>
                          : null}
                      {(communication.interlocutor.organisation.city)
                          ? communication.interlocutor.organisation.city
                          : <span>&lt;<FormattedMessage {...messages['errors.missingCity']} />&gt;</span>},&nbsp;
                      {(communication.interlocutor.organisation.postcode)
                          ? communication.interlocutor.organisation.postcode
                          : <span>&lt;<FormattedMessage {...messages['errors.missingPostcode']} />&gt;</span>},&nbsp;
                      {(communication.interlocutor.organisation.state)
                          ? communication.interlocutor.organisation.state
                          : <span>&lt;<FormattedMessage {...messages['errors.missingState']} />&gt;</span>},&nbsp;
                      {(communication.interlocutor.organisation.country)
                          ? communication.interlocutor.organisation.country
                          : <span>&lt;<FormattedMessage {...messages['errors.missingCountry']} />&gt;</span>}
                      <br /><strong><FormattedMessage {...interlocutormessages['field.organisation.location']} />:</strong> {communication.interlocutor.organisation.location},&nbsp;
                      <strong><FormattedMessage {...interlocutormessages['field.organisation.telephone']} />:</strong> {communication.interlocutor.organisation.telephone}
                    </div>
                    : null
              }
              {(typeof (communication.history) === 'undefined')
                  ? <FormattedMessage {...interlocutormessages['history.none']} /> : null}
              {(communication.history && communication.history.patient && Object.keys(_omitBy(communication.history.patient, _isEmpty)).length > 0)
                  ? <PatientHistory history={communication.history.patient} />
                  : null}
              {
                (
                    communication.history
                    && communication.history.features
                    && (
                        communication.history.features.descriptors
                        || (
                            communication.history.features.notes
                            && communication.history.features.notes.length > 0
                        )
                    )
                )
                    ? <ClinicalFeaturesHistory history={communication.history.features} notes={notes} ix={i} />
                    : null
              }
              {
                (communication.history && communication.history.investigations && Object.keys(communication.history.investigations).length > 0)
                    ? <InvestigationsHistory history={communication.history.investigations} notes={notes} ix={i} />
                    : ''
              }
              {
                (communication.history
                    && communication.history.treatments
                    && communication.history.treatments.referrals
                    && communication.history.treatments.referrals.length > 0)
                    ? <ReferralsHistory history={communication.history.treatments.referrals} />
                    : null
              }
              {
                (communication.history
                    && communication.history.treatments
                    && communication.history.treatments.treatments
                    && communication.history.treatments.treatments.length > 0)
                    ? <TreatmentsHistory history={communication.history.treatments} ix={i} />
                    : null
              }
              {
                (communication.history
                    && communication.history.agents
                    && Object.keys(communication.history.agents).length > 0)
                    ? <AgentsHistory history={communication.history.agents} agents={agents} notes={notes} ix={i} />
                    : null
              }
            </td>
          </tr>
        </tbody>
      )) : <tbody>
        <tr>
          <td colSpan={4}>No Communications</td>
        </tr>
      </tbody>
  }
</Table>;

CaseHistory.propTypes = {
  communications: PropTypes.array,
  notes: PropTypes.object,
  agents: PropTypes.array,
  intl: PropTypes.object,
};

export default injectIntl(CaseHistory);
