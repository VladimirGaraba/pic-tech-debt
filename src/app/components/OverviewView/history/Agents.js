/* eslint-disable no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';

import moment from 'moment/moment';
import _compact from 'lodash/compact';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _isObject from 'lodash/isObject';
import _isUndefined from 'lodash/isUndefined';
import _pickBy from 'lodash/pickBy';
import _without from 'lodash/without';

import overviewmessages from 'components/OverviewView/messages';
import messages from 'components/AgentView/messages';

const AgentsHistory = ({ history, agents, notes, ix }) => <div>
  <br /><strong><FormattedMessage {...messages.title} /></strong>
  {
    Object.keys(history).map(
        (record, id) => {
          const sanitised = _pickBy(history[record], (a) => _isObject(a) ? !_isEmpty(_pickBy(a, (b) => !_isEmpty(_compact(b)))) : !_isUndefined(a));
          return (<div key={id}>
            {
              (Object.keys(sanitised).length > 0)
                  ? <div>
                    {
                      (
                          sanitised.deleted
                          && sanitised.interlocutorAgentName
                      )
                          ? <strong>
                            <del>{sanitised.interlocutorAgentName}</del>
                          </strong>
                          : <strong>{
                            (sanitised.interlocutorAgentName)
                                ? sanitised.interlocutorAgentName[1]
                                : agents.map((object) => (object.id === record) ? object.name : null)
                          }</strong>
                    }
                    {(_without(Object.keys(sanitised), 'id', 'interlocutorAgentName').length > 0)
                        ? <div>
                          {
                            (sanitised.quantity)
                                ? <div>
                                  <strong><FormattedMessage {...overviewmessages.quantity} /></strong>
                                  {sanitised.quantityUnknown && sanitised.quantityUnknown[1] === true
                                      ? <FormattedMessage {...overviewmessages['quantity.unknown']} />
                                      : <FormattedMessage
                                        {...overviewmessages['quantity.format']}
                                        values={{
                                          quantity: (sanitised.quantity && sanitised.quantity[1]) ? sanitised.quantity[1] : null,
                                          quantityUnits: (sanitised.quantityUnits && sanitised.quantityUnits[1]) ? sanitised.quantityUnits[1] : null,
                                        }}
                                      />
                                  }
                                  {
                                    (
                                        (
                                            !_isEmpty(sanitised.quantity[0])
                                            && sanitised.quantity[0] !== sanitised.quantity[1]
                                        )
                                        || (
                                            sanitised.quantityUnits
                                            && !_isEmpty(sanitised.quantityUnits[0])
                                            && sanitised.quantityUnits[0] !== sanitised.quantityUnits[1]
                                        )
                                    )
                                        ? <span> (was&nbsp;
                                          <FormattedMessage
                                            {...overviewmessages['quantity.format']}
                                            values={{
                                              quantity: (sanitised.quantity && sanitised.quantity[0]) ? sanitised.quantity[0] : null,
                                              quantityUnits: (sanitised.quantityUnits && sanitised.quantityUnits[0]) ? sanitised.quantityUnits[0] : null,
                                            }}
                                          />)
                                        </span>
                                        : null
                                  }
                                </div>
                                : null
                          }
                          {
                            (sanitised.duration)
                                ? <div>
                                  <strong><FormattedMessage {...overviewmessages.duration} /></strong>
                                  {sanitised.durationUnknown && sanitised.durationUnknown[1] === true
                                      ? <FormattedMessage {...overviewmessages['duration.unknown']} />
                                      : <FormattedMessage
                                        {...overviewmessages['duration.format']}
                                        values={{
                                          duration: (sanitised.duration && sanitised.duration[1]) ? sanitised.duration[1] : null,
                                          durationUnits: (sanitised.durationUnits) ? sanitised.durationUnits[1] : null,
                                        }}
                                      />
                                  }
                                  {
                                    (
                                        (
                                            !_isEmpty(sanitised.duration[0])
                                            && sanitised.duration[0] !== sanitised.duration[1]
                                        )
                                        || (
                                            sanitised.durationUnits
                                            && !_isEmpty(sanitised.durationUnits[0])
                                            && sanitised.durationUnits[0] !== sanitised.durationUnits[1]
                                        )
                                    )
                                        ? <span> (was&nbsp;
                                          <FormattedMessage
                                            {...overviewmessages['duration.format']}
                                            values={{
                                              duration: (sanitised.duration && sanitised.duration[0]) ? sanitised.duration[0] : null,
                                              durationUnits: (sanitised.durationUnits) ? sanitised.durationUnits[0] : null,
                                            }}
                                          />)
                                         </span>
                                        : null
                                  }
                                </div>
                                : null
                          }
                          {
                            (
                                sanitised.timestamp
                                && (
                                    moment(sanitised.timestamp[0], 'YYYY-MM-DDTHH:mm:ss.SSSZ').isValid()
                                    || moment(sanitised.timestamp[1], 'YYYY-MM-DDTHH:mm:ss.SSSZ').isValid()
                                )
                            )
                                ? <div>
                                  <strong><FormattedMessage {...overviewmessages.timeOfExposure} /></strong>
                                  {(sanitised.timestamp[1])
                                      ? <span>: <FormattedDate
                                        value={sanitised.timestamp[1]}
                                        formatMatcher="best fit"
                                        year="numeric"
                                        month="long"
                                        day="2-digit"
                                      /> <FormattedTime value={sanitised.timestamp[1]} /></span>
                                      : null}
                                </div>
                                : null
                          }
                          {
                            (
                                sanitised.category
                                || sanitised.useType
                                || sanitised.intendedUseGiven
                            )
                                ? <div>
                                  {
                                    (
                                        sanitised.category
                                        && (
                                            sanitised.category[0]
                                            || sanitised.category[1]
                                        )
                                    )
                                        ? <span>
                                          <strong><FormattedMessage {...overviewmessages.category} /></strong>
                                          {
                                            (sanitised.category && sanitised.category[1]) ? sanitised.category[1] : null
                                          }
                                          {
                                            (
                                                !_isEmpty(sanitised.category[0])
                                                && sanitised.category[0] !== sanitised.category[1]
                                            )
                                                ? <span> (was&nbsp; {sanitised.category[0]})</span>
                                                : null
                                          }
                                          &nbsp;
                                        </span>
                                        : null
                                  }
                                  {
                                    (
                                        sanitised.useType
                                        && (
                                            sanitised.useType[0]
                                            || sanitised.useType[1]
                                        )
                                    )
                                        ? <span>
                                          <strong><FormattedMessage {...overviewmessages.useType} /></strong>
                                          {
                                            (sanitised.useType && sanitised.useType[1]) ? (_isArray(sanitised.useType[1]) ? sanitised.useType[1].join(', ') : sanitised.useType[1]) : null
                                          }
                                          {
                                            (
                                                !_isEmpty(sanitised.useType[0])
                                                && sanitised.useType[0] !== sanitised.useType[1]
                                            )
                                                ? <span> (was&nbsp;{sanitised.useType[0].join(', ')})</span>
                                                : null
                                          }
                                          &nbsp;
                                        </span>
                                        : null
                                  }
                                  {
                                    (
                                        sanitised.intendedUseGiven
                                        && (
                                            sanitised.intendedUseGiven[0]
                                            || sanitised.intendedUseGiven[1]
                                        )
                                    )
                                        ? <span>
                                          <strong><FormattedMessage {...overviewmessages.intendedUseGiven} /></strong>
                                          {
                                            (sanitised.intendedUseGiven && sanitised.intendedUseGiven[1]) ? sanitised.intendedUseGiven[1] : null
                                          }
                                          {
                                            (
                                                !_isEmpty(sanitised.intendedUseGiven[0])
                                                && sanitised.intendedUseGiven[0] !== sanitised.intendedUseGiven[1]
                                            )
                                                ? <span> (was&nbsp; {sanitised.intendedUseGiven[0]})</span>
                                                : null
                                          }
                                          &nbsp;
                                        </span>
                                        : null
                                  }
                                </div>
                                : null
                          }
                          {
                            (
                                sanitised.typeOfExposure
                                || sanitised.routeOfExposure
                            )
                                ? <div>
                                  {
                                    (
                                        sanitised.typeOfExposure
                                        && (
                                            sanitised.typeOfExposure[0]
                                            || sanitised.typeOfExposure[1]
                                        )
                                    )
                                        ? <span>
                                          <strong><FormattedMessage {...overviewmessages.typeOfExposure} /></strong>
                                          {
                                            (sanitised.typeOfExposure && sanitised.typeOfExposure[1]) ? sanitised.typeOfExposure[1] : '<blank>'
                                          }
                                          {
                                            (
                                                !_isEmpty(sanitised.typeOfExposure[0])
                                                && sanitised.typeOfExposure[0] !== sanitised.typeOfExposure[1]
                                            )
                                                ? <span> (was&nbsp; {sanitised.typeOfExposure[0]})</span>
                                                : null
                                          }
                                          &nbsp;
                                        </span>
                                        : null
                                  }
                                  {
                                    (
                                        sanitised.routeOfExposure
                                        && (
                                            sanitised.routeOfExposure[0]
                                            || sanitised.routeOfExposure[1]
                                        )
                                    )
                                        ? <span>
                                          <strong><FormattedMessage {...overviewmessages.routeOfExposure} /></strong>
                                          {
                                            (sanitised.routeOfExposure && sanitised.routeOfExposure[1]) ? (_isArray(sanitised.routeOfExposure[1]) ? sanitised.routeOfExposure[1].join(', ') : sanitised.routeOfExposure[1]) : null
                                          }
                                          {
                                            (
                                                !_isEmpty(sanitised.routeOfExposure[0])
                                                && sanitised.routeOfExposure[0] !== sanitised.routeOfExposure[1]
                                            )
                                                ? <span> (was&nbsp; {_isArray(sanitised.routeOfExposure[0]) ? sanitised.routeOfExposure[0].join(', ') : sanitised.routeOfExposure[0]})</span>
                                                : null
                                          }
                                          &nbsp;
                                        </span>
                                        : null
                                  }
                                </div>
                                : null
                          }
                          {
                            (sanitised.centreAgents)
                                ? <div>
                                  <strong><FormattedMessage {...messages['section.centreAgents']} /></strong>
                                  {(Object.keys(sanitised.centreAgents).map(
                                      (agentName, j) => (
                                          (
                                              'deleted' in sanitised.centreAgents[agentName]
                                          )
                                              ? (
                                                  (sanitised.centreAgents[agentName].name && sanitised.centreAgents[agentName].name[0])
                                                  || (sanitised.centreAgents[agentName].quantity && sanitised.centreAgents[agentName].quantity[0])
                                              )
                                              ? <div key={[ix, 'agents', record, 'centreAgents', j].join('.')}>
                                                <del>
                                                  <FormattedMessage
                                                    {...overviewmessages.centreAgent}
                                                    values={{
                                                      name: (sanitised.centreAgents[agentName].name && sanitised.centreAgents[agentName].name[0]) ? sanitised.centreAgents[agentName].name[0] : '<blank>',
                                                      quantity: (sanitised.centreAgents[agentName].quantity && sanitised.centreAgents[agentName].quantity[0]) ? sanitised.centreAgents[agentName].quantity[0] : 'Unknown',
                                                      units: (sanitised.centreAgents[agentName].units && sanitised.centreAgents[agentName].units[0]) ? sanitised.centreAgents[agentName].units[0] : null,
                                                    }}
                                                  />
                                                </del>
                                              </div>
                                              : null
                                              : (
                                              ((sanitised.centreAgents[agentName].name[0] === sanitised.centreAgents[agentName].name[1])
                                                  && (sanitised.centreAgents[agentName].quantity[0] === sanitised.centreAgents[agentName].quantity[1])
                                                  && (sanitised.centreAgents[agentName].units[0] === sanitised.centreAgents[agentName].units[1])
                                              ) || (
                                                  sanitised.centreAgents[agentName].name[0] === ''
                                                  && sanitised.centreAgents[agentName].quantity[0] === ''
                                                  && sanitised.centreAgents[agentName].units[0] === ''
                                              ))
                                              ? <div key={[ix, 'agents', record, 'centreAgents', j].join('.')}>
                                                <FormattedMessage
                                                  {...messages.centreAgent}
                                                  values={{
                                                    name: (sanitised.centreAgents[agentName].name[1]) ? sanitised.centreAgents[agentName].name[1] : '<blank>',
                                                    quantity: (sanitised.centreAgents[agentName].quantity[1]) ? sanitised.centreAgents[agentName].quantity[1] : 'Unknown',
                                                    units: (sanitised.centreAgents[agentName].units[1]) ? sanitised.centreAgents[agentName].units[1] : null,
                                                  }}
                                                />
                                              </div>
                                              : <div key={[ix, 'agents', record, 'centreAgents', j].join('.')}>
                                                <FormattedMessage
                                                  {...messages.centreAgent}
                                                  values={{
                                                    name: (sanitised.centreAgents[agentName].name && sanitised.centreAgents[agentName].name[1]) ? sanitised.centreAgents[agentName].name[1] : '<blank>',
                                                    quantity: (sanitised.centreAgents[agentName].quantity && sanitised.centreAgents[agentName].quantity[1]) ? sanitised.centreAgents[agentName].quantity[1] : 'Unknown',
                                                    units: (sanitised.centreAgents[agentName].units && sanitised.centreAgents[agentName].units[1]) ? sanitised.centreAgents[agentName].units[1] : null,
                                                  }}
                                                />
                                                &nbsp;( was&nbsp;
                                                <FormattedMessage
                                                  {...messages.centreAgent}
                                                  values={{
                                                    name: (sanitised.centreAgents[agentName].name && sanitised.centreAgents[agentName].name[0]) ? sanitised.centreAgents[agentName].name[0] : '<blank>',
                                                    quantity: (sanitised.centreAgents[agentName].quantity && sanitised.centreAgents[agentName].quantity[0]) ? sanitised.centreAgents[agentName].quantity[0] : 'Unknown',
                                                    units: (sanitised.centreAgents[agentName].units && sanitised.centreAgents[agentName].units[0]) ? sanitised.centreAgents[agentName].units[0] : null,
                                                  }}
                                                />
                                                )
                                              </div>
                                      )))}
                                </div>
                                : null
                          }
                          {
                            (sanitised.notes)
                                ? <div>
                                  <strong>Notes:</strong>
                                  {
                                    (sanitised.notes.map(
                                        (uuid, j) => (
                                          <div key={[ix, j, 'agents', record, 'notes', uuid].join('.')}>
                                            {notes[uuid].content}<br />
                                            {
                                              (notes[uuid].attachments.length > 0)
                                                  ? <span>
                                                    <br />File list:<br />
                                                    {notes[uuid].attachments.map(
                                                        (filename, k) => (<span
                                                          key={[ix, 'agents', record, 'notes', uuid, 'files', k].join('.')}
                                                        >{filename}<br /></span>)
                                                    )}
                                                  </span>
                                                  : null
                                            }
                                          </div>
                                        )
                                    ))
                                  }
                                </div>
                                : null
                          }
                        </div>
                        : <div>No data</div>
                    }
                    <br />
                  </div>
                  : <div>No data</div>
            }
          </div>);
        }
    )
  }
</div>;

AgentsHistory.propTypes = {
  history: PropTypes.object,
  agents: PropTypes.array,
  notes: PropTypes.object,
  ix: PropTypes.number,
};

export default AgentsHistory;
