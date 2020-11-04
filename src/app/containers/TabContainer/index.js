import { connect } from 'react-redux';

import { selectVars, makeSelectSPI } from 'containers/App/selectors';

import TabPanel from 'components/TabPanel';

import {
  setTab,
} from 'containers/App/actions';

import { setAgentTab } from 'containers/AgentEntry/actions/case';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const { activeTab, activeAgentTab, currentRecordId, callRecordId, currentTemplateId, editingTemplateId } = vars;

    return {
      currentRecordId,
      callRecordId,
      currentTemplateId,
      editingTemplateId,
      activeTab,
      activeAgentTab,
      userSPI: selectSPI(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
  setTab: (tab) => {
    dispatch(setTab(tab));
  },
  setAgentTab: (tab) => {
    dispatch(setAgentTab(tab));
  },
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TabPanel);
