/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
/* global shallowWithIntl:false */
import React from 'react';

import caseReducer from 'containers/CaseEntry/reducers/case';

import { CaseView } from 'components/CaseView';

import { DEFAULT_UIMODE, EDITTEMPLATE_UIMODE } from 'containers/App/constants';

describe('<CaseView />', () => {
  it('renders QuickView, Clinical Features, Investigations, Treatment, Agent Overview and Agent tabs in editing template mode for new templates', () => {
    const props = {};
    props.data = caseReducer(undefined, {});
    props.data._id = '12345';
    props.data.agents = [{}];
    props.data.communications = [{}];
    props.currentTemplateId = '12345';
    props.editingTemplateId = '12345';
    props.intl = {
      formatDate: jest.fn(),
    };

    const renderedComponent = shallowWithIntl(<CaseView {...props} />, { context: { uiMode: EDITTEMPLATE_UIMODE } });
    const received = renderedComponent.props().views.map((e) => e.type.displayName);
    const expected = ['Connect(InjectIntl(QuickView))', 'Connect(ClinicalFeaturesView)', 'Connect(InvestigationsView)', 'Connect(InjectIntl(TreatmentView))', 'Connect(TabPanel)'];
    expect(received).toEqual(expect.arrayContaining(expected));

    const received2 = renderedComponent.props().views[renderedComponent.props().views.length - 1].props.views.map((e) => e.type.displayName);
    const expected2 = ['Connect(InjectIntl(AgentOverviewView))', 'Connect(InjectIntl(AgentView))'];
    expect(received2).toEqual(expect.arrayContaining(expected2));
  });

  it('renders additional Overview tab all other times in template mode', () => {
    const props = {};
    props.data = caseReducer(undefined, {});
    props.data._id = '12345';
    props.data.agents = [{}];
    props.data.communications = [{}, {}];
    props.currentTemplateId = '12345';
    props.intl = {
      formatDate: jest.fn(),
    };

    const renderedComponent = shallowWithIntl(<CaseView {...props} />, { context: { uiMode: EDITTEMPLATE_UIMODE } });
    const received = renderedComponent.props().views.map((e) => e.type.displayName);
    const expected = ['Connect(InjectIntl(OverviewView))'];
    expect(received).toEqual(expect.arrayContaining(expected));
  });

  it('renders QuickView, Caller, Patient Clinical Features, Investigations, Treatment, Agent Overview and Agent tabs in default ui mode for new files', () => {
    const props = {};
    props.data = caseReducer(undefined, {});
    props.data._id = '12345';
    props.data.agents = [{}];
    props.data.communications = [{}];
    props.currentRecordId = '12345';
    props.callRecordId = '12345';
    props.intl = {
      formatDate: jest.fn(),
    };

    const renderedComponent = shallowWithIntl(<CaseView {...props} />, { context: { uiMode: DEFAULT_UIMODE } });
    const received = renderedComponent.props().views.map((e) => e.type.displayName);
    const expected = ['Connect(InjectIntl(QuickView))', 'Connect(InjectIntl(InterlocutorView))', 'Connect(InjectIntl(PatientView))', 'Connect(ClinicalFeaturesView)', 'Connect(InvestigationsView)', 'Connect(InjectIntl(TreatmentView))', 'Connect(TabPanel)'];
    expect(received).toEqual(expect.arrayContaining(expected));

    const received2 = renderedComponent.props().views[renderedComponent.props().views.length - 1].props.views.map((e) => e.type.displayName);
    const expected2 = ['Connect(InjectIntl(AgentOverviewView))', 'Connect(InjectIntl(AgentView))'];
    expect(received2).toEqual(expect.arrayContaining(expected2));
  });

  it('renders additional Overview tab all other times in default ui mode', () => {
    const props = {};
    props.data = caseReducer(undefined, {});
    props.data._id = '12345';
    props.data.agents = [{}];
    props.data.communications = [{}, {}];
    props.currentRecordId = '12345';
    props.intl = {
      formatDate: jest.fn(),
    };

    const renderedComponent = shallowWithIntl(<CaseView {...props} />, { context: { uiMode: DEFAULT_UIMODE } });
    const received = renderedComponent.props().views.map((e) => e.type.displayName);
    const expected = ['Connect(InjectIntl(OverviewView))'];
    expect(received).toEqual(expect.arrayContaining(expected));
  });
});
