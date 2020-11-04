/*
 * Overview Messages
 *
 * This contains all the text for the Overview component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  'section.casehistory': {
    id: 'pic.components.Overview.section.casehistory',
    defaultMessage: 'Case History',
  },
  'section.changelog': {
    id: 'pic.components.Overview.section.casehistory',
    defaultMessage: 'Change Log',
  },
  'history.none': {
    id: 'pic.components.Overview.history.none',
    defaultMessage: 'Change history unavailable',
  },
  'communication.spi.name': {
    id: 'pic.components.Overview.communication.spi.name',
    defaultMessage: 'SPI:',
  },
  'communication.spi.org': {
    id: 'pic.components.Overview.communication.spi.org',
    defaultMessage: 'Org:',
  },
  'communication.spi.job.spi': {
    id: 'pic.components.Overview.communication.spi.job.spi',
    defaultMessage: 'SPI',
  },
  'communication.spi.job.specialist': {
    id: 'pic.components.Overview.communication.spi.job.specialist',
    defaultMessage: 'Specialist',
  },
  'communication.spi.job.admin': {
    id: 'pic.components.Overview.communication.spi.job.admin',
    defaultMessage: 'Admin',
  },
  'communication.interlocutor.name': {
    id: 'pic.components.Overview.communication.interlocutor.name',
    defaultMessage: 'Caller:',
  },
  'communication.endTimestamp': {
    id: 'pic.components.Overview.communication.endTimestamp',
    defaultMessage: ' (call end: {endTimestamp})',
  },
  routeOfExposure: {
    id: 'pic.components.Overview.communication.agent.routeOfExposure',
    defaultMessage: 'Route of Exposure: ',
  },
  typeOfExposure: {
    id: 'pic.components.Overview.communication.agent.typeOfExposure',
    defaultMessage: 'Type of Exposure: ',
  },
  intendedUseGiven: {
    id: 'pic.components.Overview.communication.agent.intendedUseGiven',
    defaultMessage: 'Intended Use/Function: ',
  },
  useType: {
    id: 'pic.components.Overview.communication.agent.useType',
    defaultMessage: 'Use Type: ',
  },
  category: {
    id: 'pic.components.Overview.communication.agent.category',
    defaultMessage: 'Category: ',
  },
  quantity: {
    id: 'pic.components.Overview.communication.agent.quantity',
    defaultMessage: 'Quantity: ',
  },
  'quantity.format': {
    id: 'pic.components.Overview.communication.agent.quantity',
    defaultMessage: '{quantity} {quantityUnits}',
  },
  'quantity.unknown': {
    id: 'pic.components.Overview.communication.agent.quantity.unknown',
    defaultMessage: 'unknown',
  },
  duration: {
    id: 'pic.components.Overview.communication.agent.duration',
    defaultMessage: 'Duration: ',
  },
  'duration.format': {
    id: 'pic.components.Overview.communication.agent.duration',
    defaultMessage: '{duration} {durationUnits}',
  },
  'duration.unknown': {
    id: 'pic.components.Overview.communication.agent.duration.unknown',
    defaultMessage: 'unknown',
  },
  centreAgent: {
    id: 'pic.components.Overview.communication.agent.centreAgent',
    defaultMessage: '{name}: Amount - {quantity} {units}',
  },
  lastExposure: {
    id: 'pic.components.Overview.communication.agent.lastExposure',
    defaultMessage: 'Time since last exposure: ',
  },
  timeOfExposure: {
    id: 'pic.components.Overview.communication.agent.timeOfExposure',
    defaultMessage: 'Time of Exposure',
  },
  'errors.missingSPIName': {
    id: 'pic.components.Overview.errors.missingSPIName',
    defaultMessage: '<Unknown SPI>',
  },
  'errors.missingSPIRole': {
    id: 'pic.components.Overview.errors.missingSPIRole',
    defaultMessage: '<Unknown Role>',
  },
  'errors.missingSPIJob': {
    id: 'pic.components.Overview.errors.missingSPIJob',
    defaultMessage: '<Unknown Job>',
  },
  'errors.missingAddress1': {
    id: 'pic.components.Overview.errors.missingAddress1',
    defaultMessage: 'Missing address line 1',
  },
  'errors.missingAddress2': {
    id: 'pic.components.Overview.errors.missingAddress2',
    defaultMessage: 'Missing address line 2',
  },
  'errors.missingCity': {
    id: 'pic.components.Overview.errors.missingCity',
    defaultMessage: 'Missing city',
  },
  'errors.missingPostcode': {
    id: 'pic.components.Overview.errors.missingPostcode',
    defaultMessage: 'Missing postcode',
  },
  'errors.missingState': {
    id: 'pic.components.Overview.errors.missingState',
    defaultMessage: 'Missing state',
  },
  'errors.missingCountry': {
    id: 'pic.components.Overview.errors.missingCountry',
    defaultMessage: 'Missing country',
  },
});
