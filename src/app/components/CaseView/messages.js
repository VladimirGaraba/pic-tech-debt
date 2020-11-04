import { defineMessages } from 'react-intl';

export default defineMessages({
  'section.overview': {
    id: 'pic.components.Case.section.overview.title',
    defaultMessage: 'Current Status',
  },
  'section.quick': {
    id: 'pic.components.Case.section.quick.title',
    defaultMessage: 'Quick Entry',
  },
  'section.interlocutor': {
    id: 'pic.components.Case.section.interlocutor.title',
    defaultMessage: 'Caller',
  },
  'section.patient': {
    id: 'pic.components.Case.section.patient.title',
    defaultMessage: 'Patient',
  },
  'section.clinicalfeatures': {
    id: 'pic.components.Case.section.clinicalfeatures.title',
    defaultMessage: 'Clinical Features',
  },
  'section.investigations': {
    id: 'pic.components.Case.section.investigations.title',
    defaultMessage: 'Investigations',
  },
  'section.treatment': {
    id: 'pic.components.Case.section.treatment.title',
    defaultMessage: 'Treatment',
  },
  'section.agents': {
    id: 'pic.components.Case.section.agents.title',
    defaultMessage: 'Substances',
  },
  'section.agents.individual': {
    id: 'pic.components.Case.section.agents.individual',
    defaultMessage: 'Substance {suffix}',
  },
  'section.agents.overview': {
    id: 'pic.components.Case.section.agents.overview',
    defaultMessage: 'Overview',
  },
  'section.notes': {
    id: 'pic.components.Case.section.notes',
    defaultMessage: 'Notes',
  },
  'type.case': {
    id: 'pic.components.Case.type.case',
    defaultMessage: 'Case',
  },
  'type.inquiry': {
    id: 'pic.components.Case.type.inqury',
    defaultMessage: 'Inquiry',
  },
  'type.hoax': {
    id: 'pic.components.Case.type.hoax',
    defaultMessage: 'Hoax',
  },
  'status.open': {
    id: 'pic.components.Case.status.open',
    defaultMessage: 'Open',
  },
  'status.pending': {
    id: 'pic.components.Case.status.reviewed',
    defaultMessage: 'Closed Pending Review',
  },
  'status.closed': {
    id: 'pic.components.Case.status.closed',
    defaultMessage: 'Closed',
  },
  'status.deleted': {
    id: 'pic.components.Case.status.deleted',
    defaultMessage: 'Deleted',
  },
  'topic.none': {
    id: 'pic.components.Case.topic.none',
    defaultMessage: 'No Topic',
  },
  'naturalId.none': {
    id: 'pic.components.Case.naturalId.none',
    defaultMessage: 'No ID',
  },
  'actions.file.update': {
    id: 'pic.components.Case.actions.file.update',
    defaultMessage: 'Update Case',
  },
  'actions.status.close': {
    id: 'pic.components.Case.actions.status.close',
    defaultMessage: 'Close Pending Review',
  },
  'actions.status.delete': {
    id: 'pic.components.Case.actions.status.delete',
    defaultMessage: 'Delete File',
  },
  'actions.status.delete.warning': {
    id: 'pic.components.Case.actions.status.delete.warning',
    defaultMessage: 'Are you sure? Only an admin can undo this action.',
  },
  'actions.status.review': {
    id: 'pic.components.Case.actions.status.review',
    defaultMessage: 'Mark as Reviewed',
  },
  'actions.status.reopen': {
    id: 'pic.components.Case.actions.status.reopen',
    defaultMessage: 'Reopen File',
  },
  'actions.status.reopen.warning': {
    id: 'pic.components.Case.actions.status.reopen.warning',
    defaultMessage: 'File is not open. Starting a new record will reopen the file.',
  },
});
