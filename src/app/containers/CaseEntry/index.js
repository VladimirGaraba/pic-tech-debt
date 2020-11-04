import { connect } from 'react-redux';

import _isEmpty from 'lodash/isEmpty';

import { selectVars, selectCases, makeSelectCurrentCaseId, makeSelectCurrentTemplate, makeSelectEditingTemplate, makeSelectSPI } from 'containers/App/selectors';

import { addAgent, setAgentTab } from 'containers/AgentEntry/actions/case';

import { addTemplateAgent } from 'containers/AgentEntry/actions/template';

import { EDITTEMPLATE_UIMODE } from 'containers/App/constants';

import CaseView from 'components/CaseView';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const cases = selectCases(state);
    const { currentTemplateId, editingTemplateId } = vars;
    const currentRecordId = makeSelectCurrentCaseId()(state);
    const currentTemplate = !_isEmpty(editingTemplateId) ? makeSelectEditingTemplate()(state) : makeSelectCurrentTemplate()(state);
    const callRecordId = vars.callRecordId ? vars.callRecordId.toString() : vars.callRecordId;

    let data;
    if (vars.uiMode === EDITTEMPLATE_UIMODE) {
      data = currentTemplate;
    } else {
      data = currentRecordId && cases[currentRecordId] ? cases[currentRecordId] : null;
    }

    return {
      currentRecordId,
      callRecordId,
      currentTemplateId,
      editingTemplateId,
      data,
      userSPI: selectSPI(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
  addAgent: (currentRecordId, count) => {
    dispatch(addAgent(currentRecordId));
    dispatch(setAgentTab(count));
  },
  addTemplateAgent: (currentRecordId, count) => {
    dispatch(addTemplateAgent(currentRecordId));
    dispatch(setAgentTab(count));
  },
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CaseView);
