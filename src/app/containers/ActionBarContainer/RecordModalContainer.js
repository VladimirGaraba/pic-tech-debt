import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  displayRecord,
  executeSearch,
  setTab,
} from 'containers/App/actions';

import {
  addCallRecord,
  addCase,
  endCall,
  updateCaseStatus,
} from 'containers/CaseEntry/actions/case';

import { addClinicalFeatures } from 'containers/ClinicalFeaturesEntry/actions/case';

import { makeSelectAppKey, makeSelectSPI, makeSelectSite, selectVars } from 'containers/App/selectors';

import RecordModal from 'components/ActionBar/RecordModal';

import {
  toggleNewCallModal,
  updateNewCallModalSelected,
} from './actions';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const selectSite = makeSelectSite();
  const selectAppKey = makeSelectAppKey();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const newCallModal = vars.newCallModal;

    return {
      results: newCallModal.show && vars.searchResults.actionBar ? vars.searchResults.actionBar : [],
      modalProps: newCallModal,

      userSPI: selectSPI(state),
      site: selectSite(state),
      appKey: selectAppKey(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
  doSearch: (search) => {
    dispatch(executeSearch('action_bar', search));
  },
  addCase: (spi, prefix, callRecordId, appKey) => {
    dispatch(endCall());
    dispatch(setTab(0));
    dispatch(addCase(spi, prefix, appKey));
  },
  startCall: (id, spi) => {
    dispatch(displayRecord(id));
    dispatch(addCallRecord(id, spi));
    dispatch(addClinicalFeatures(id, {}, spi));
    dispatch(setTab(1));
  },
  openFile: (recordId, userSPI) => {
    dispatch(updateCaseStatus(recordId, 'open', userSPI));
  },
  toggleModal: () => {
    dispatch(toggleNewCallModal());
  },
  updateModalSelected: (id) => {
    dispatch(updateNewCallModalSelected(id));
  },
});

export default injectIntl(connect(
  makeMapStateToProps,
  mapDispatchToProps
)(RecordModal));
