/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Well from 'react-bootstrap/lib/Well';

import TabContainer from 'containers/TabContainer';

import AgentEntry from 'containers/AgentEntry';
import AgentOverviewEntry from 'containers/AgentOverviewEntry';
import ClinicalFeaturesEntry from 'containers/ClinicalFeaturesEntry';
import InterlocutorEntry from 'containers/InterlocutorEntry';
import InvestigationsEntry from 'containers/InvestigationsEntry';
import OverviewEntry from 'containers/OverviewEntry';
import PatientEntry from 'containers/PatientEntry';
import QuickEntry from 'containers/QuickEntry';
import TreatmentEntry from 'containers/TreatmentEntry';

import AgentEntryTemplate from 'containers/AgentEntry/template';
import ClinicalFeaturesEntryTemplate from 'containers/ClinicalFeaturesEntry/template';
import InvestigationsEntryTemplate from 'containers/InvestigationsEntry/template';
import QuickEntryTemplate from 'containers/QuickEntry/template';
import TreatmentEntryTemplate from 'containers/TreatmentEntry/template';

import { isDisabled, isHuman } from 'utils/helpers';

import { EDITTEMPLATE_UIMODE } from 'containers/App/constants';

import messages from './messages';

export class CaseView extends React.Component {
  getBlankMessage() {
    let message = (<div>
      <Well style={{ marginTop: '2rem' }}>
        Search for, or select, a file from the list on the left to view a file. Or click <strong>New Record</strong> to
        start a new record.
      </Well>
    </div>);

    if (this.context.uiMode === EDITTEMPLATE_UIMODE) {
      message = (<div>
        <Well style={{ marginTop: '2rem' }}>
          Select a template from the list on the left to edit. Or click <strong>New Template</strong> to create a new
          file template.
        </Well>
      </div>);
    }

    return message;
  }

  getDefaultTabs() {
    const { data, callRecordId, addAgent, intl } = this.props;
    const currentId = data._id;

    let tabs = []; // eslint-disable-line prefer-const
    let views = []; // eslint-disable-line prefer-const


    if (data.communications.length > 1 || (data.communications.length === 1 && !callRecordId)) {
      tabs.push(intl.formatMessage(messages['section.overview']));
      views.push(<OverviewEntry key="overview" recordId={currentId} />);
    }

    if (callRecordId) {
      tabs.push(intl.formatMessage(messages['section.quick']));
      views.push(<QuickEntry key="quick" recordId={currentId} />);

      tabs.push(intl.formatMessage(messages['section.interlocutor']));
      views.push(<InterlocutorEntry key="interlocutor" recordId={currentId} />);
    }
    if (data.type === 'case') {
      tabs.push(intl.formatMessage(messages['section.patient']));
      views.push(<PatientEntry key="patient" recordId={currentId} />);
    }

    if (isHuman(data.patient.category)) {
      if (data.type === 'case') {
        tabs.push(intl.formatMessage(messages['section.clinicalfeatures']));
        views.push(<ClinicalFeaturesEntry key="features" recordId={currentId} />);
        tabs.push(intl.formatMessage(messages['section.investigations']));
        tabs.push(intl.formatMessage(messages['section.treatment']));
        views.push(<InvestigationsEntry key="investigations" recordId={currentId} />);
        views.push(<TreatmentEntry key="treatment" recordId={currentId} />);
      }
    }

    tabs.push(intl.formatMessage(messages['section.agents']));

    let agentTabs = []; // eslint-disable-line prefer-const
    let agentViews = []; // eslint-disable-line prefer-const

    agentTabs.push(intl.formatMessage(messages['section.agents.overview']));
    agentViews.push(<AgentOverviewEntry />);

    data.agents.map((agent, i) => {
      agentTabs.push(agent.centreName || agent.name || 'unnamed');
      agentViews.push(<AgentEntry key={`agent_${i}`} recordId={currentId} agentIx={i} agentId={agent.id} />);
      return agent;
    });
    agentTabs.push('+');
    views.push(<TabContainer tabs={agentTabs} views={agentViews} scrollable hotkeys={false} notice={false} onAddHandler={() => { if (!isDisabled(this.props, this.context)) addAgent(currentId, Object.keys(data.agents).length + 1); }} />);

    return { tabs, views };
  }

  getTemplateTabs() {
    const { data, addTemplateAgent, editingTemplateId, intl } = this.props;
    const currentId = data._id;

    let tabs = []; // eslint-disable-line prefer-const
    let views = []; // eslint-disable-line prefer-const

    if (data.communications.length > 1 || (data.communications.length === 1 && !editingTemplateId)) {
      tabs.push(intl.formatMessage(messages['section.overview']));
      views.push(<OverviewEntry key="overview" recordId={currentId} />);
    }

    if (editingTemplateId) {
      tabs.push(intl.formatMessage(messages['section.quick']));
      views.push(<QuickEntryTemplate key="quick" recordId={currentId} />);
    }

    if (isHuman(data.patient.category)) {
      tabs.push(intl.formatMessage(messages['section.clinicalfeatures']));
      views.push(<ClinicalFeaturesEntryTemplate key="features" recordId={currentId} />);

      if (data.type === 'case') {
        tabs.push(intl.formatMessage(messages['section.investigations']));
        tabs.push(intl.formatMessage(messages['section.treatment']));
        views.push(<InvestigationsEntryTemplate key="investigations" recordId={currentId} />);
        views.push(<TreatmentEntryTemplate key="treatment" recordId={currentId} />);
      }
    }

    tabs.push(intl.formatMessage(messages['section.agents']));

    let agentTabs = []; // eslint-disable-line prefer-const
    let agentViews = []; // eslint-disable-line prefer-const

    agentTabs.push(intl.formatMessage(messages['section.agents.overview']));
    agentViews.push(<AgentOverviewEntry />);

    data.agents.map((agent, i) => {
      agentTabs.push(agent.centreName || agent.name || 'unnamed');
      agentViews.push(<AgentEntryTemplate key={`agent_${i}`} recordId={currentId} agentIx={i} agentId={agent.id} />);
      return agent;
    });
    agentTabs.push('+');
    views.push(<TabContainer tabs={agentTabs} views={agentViews} scrollable hotkeys={false} notice={false} onAddHandler={() => { if (!isDisabled(this.props, this.context)) addTemplateAgent(currentId, Object.keys(data.agents).length + 1); }} />);

    return { tabs, views };
  }

  isBlank() {
    if (!this.props.data || !this.props.data._id) {
      return true;
    }
    return false;
  }

  render() {
    if (this.isBlank()) {
      return this.getBlankMessage();
    }

    const { tabs, views } = (this.context.uiMode === EDITTEMPLATE_UIMODE) ? this.getTemplateTabs() : this.getDefaultTabs();

    return (
      <TabContainer
        tabs={tabs}
        views={views}
        primary
      />
    );
  }
}

CaseView.propTypes = {
  addAgent: PropTypes.func,
  addTemplateAgent: PropTypes.func,
  callRecordId: PropTypes.string,
  editingTemplateId: PropTypes.string,
  data: PropTypes.object,
  intl: intlShape.isRequired,
};

CaseView.contextTypes = {
  uiMode: PropTypes.string,
};

export default injectIntl(CaseView);
