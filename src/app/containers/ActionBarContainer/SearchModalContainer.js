import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  displayRecord,
  executeSearch,
  setTab,
} from 'containers/App/actions';

import { selectVars } from 'containers/App/selectors';

import SearchModal from 'components/ActionBar/SearchModal';

import {
  toggleNewCallModal,
  updateNewCallModalSelected,
} from './actions';

const makeMapStateToProps = () => {
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const callRecordId = vars.callRecordId ? vars.callRecordId.toString() : vars.callRecordId;
    const newCallModal = vars.newCallModal;

    return {
      callRecordId,
      results: newCallModal.show && vars.searchResults.actionBar ? vars.searchResults.actionBar : [],
      modalProps: newCallModal,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
  displayCase: (id, callRecordId) => {
    dispatch(displayRecord(id));
    if (id !== callRecordId) {
      dispatch(setTab(0));
    }
  },
  toggleModal: () => {
    dispatch(toggleNewCallModal());
  },
  updateModalSelected: (id) => {
    dispatch(updateNewCallModalSelected(id));
  },
  doSearch: (search) => {
    dispatch(executeSearch('action_bar', search));
  },
});

export default injectIntl(connect(
  makeMapStateToProps,
  mapDispatchToProps
)(SearchModal));
