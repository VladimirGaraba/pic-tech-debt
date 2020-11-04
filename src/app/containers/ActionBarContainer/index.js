import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { isValidMacro } from 'utils/helpers';

import {
  displayRecord,
  executeSearch,
  logout,
  setTab,
  setUiModeDefault,
  setUiModeEditTemplate,
} from 'containers/App/actions';

import {
  addCallRecord,
  addCase,
  endCall,
  updateCaseStatus,
} from 'containers/CaseEntry/actions/case';

import {
  addTemplate,
  deleteTemplate,
  saveTemplate,
} from 'containers/CaseEntry/actions/template';

import { updateCommunicationStatus } from 'containers/InterlocutorEntry/actions';
import { addClinicalFeatures } from 'containers/ClinicalFeaturesEntry/actions/case';

import { makeSelectAppKey, makeSelectCurrentCase, makeSelectCurrentTemplate, makeSelectEditingTemplate, makeSelectSPI, makeSelectSite, selectTemplates, selectVars } from 'containers/App/selectors';

import ActionBar from 'components/ActionBar';

import {
  toggleNewCallModal,
  updateNewCallModalCallerLocation,
  updateNewCallModalCallerOrganisation,
  updateNewCallModalCentreName,
  updateNewCallModalFilter,
  updateNewCallModalId,
  updateNewCallModalName,
  updateNewCallModalPostcode,
  updateNewCallModalSelected,
  updateNewCallModalSex,
  updateNewCallModalTime,
} from './actions';

const makeMapStateToProps = () => {
  const selectCurrentCase = makeSelectCurrentCase();
  const selectCurrentTemplate = makeSelectCurrentTemplate();
  const selectEditingTemplate = makeSelectEditingTemplate();
  const selectSPI = makeSelectSPI();
  const selectSite = makeSelectSite();
  const selectAppKey = makeSelectAppKey();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const currentCase = selectCurrentCase(state);
    const currentRecordId = vars.currentRecordId ? vars.currentRecordId.toString() : null;
    const callRecordId = vars.callRecordId ? vars.callRecordId.toString() : vars.callRecordId;
    const newCallModal = vars.newCallModal;

    const templates = selectTemplates(state);
    const { editingTemplateId, currentTemplateId } = vars;
    const currentTemplate = selectCurrentTemplate(state);
    const editingTemplate = selectEditingTemplate(state);
    const macro = vars.editingTemplateMacro;

    return {
      currentRecordId,
      currentCase,
      callRecordId,
      currentTemplate,
      currentTemplateId,
      editingTemplate,
      editingTemplateId,
      isValidMacro: isValidMacro(vars.uiMode, macro.initial, macro.current, templates),
      macro,

      results: newCallModal.show && vars.searchResults.actionBar ? vars.searchResults.actionBar : [],
      showModal: newCallModal.show,
      caseListSearch: vars.caseListSearch,

      userSPI: selectSPI(state),
      site: selectSite(state),
      appKey: selectAppKey(state),
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
  doSearch: (search) => {
    dispatch(executeSearch('action_bar', search));
  },
  addCase: (spi, prefix, recordId, appKey) => {
    dispatch(endCall(recordId));
    dispatch(setTab(0));
    dispatch(addCase(spi, prefix, appKey));
  },
  startCall: (id, spi) => {
    dispatch(displayRecord(id));
    dispatch(addCallRecord(id, spi));
    dispatch(addClinicalFeatures(id, {}, spi));
    dispatch(setTab(1));
  },
  endCall: (search, recordId) => {
    dispatch(endCall(recordId));
    dispatch(setTab(0));
    if (search) {
      dispatch(executeSearch('case_list', search));
    }
  },
  addTemplate: (spi, prefix, appKey) => {
    dispatch(addTemplate(spi, prefix, appKey));
    dispatch(setTab(0));
  },
  saveTemplate: (macro, template) => {
    if (macro.initial !== macro.current) {
      dispatch(deleteTemplate(macro.initial));
    }
    dispatch(saveTemplate(macro.current, template));
    dispatch(setTab(0));
  },
  openFile: (recordId, userSPI) => {
    dispatch(updateCaseStatus(recordId, 'open', userSPI));
  },
  deleteFile: (recordId, userSPI, immediate = false) => {
    dispatch(updateCaseStatus(recordId, 'deleted', userSPI, immediate));
  },
  deleteRecord: (recordId, immediate = false) => {
    dispatch(updateCommunicationStatus(recordId, 'deleted', immediate));
  },
  logout: () => {
    dispatch(logout());
  },
  toggleModal: () => {
    dispatch(toggleNewCallModal());
  },
  updateModalId: (naturalId) => {
    dispatch(updateNewCallModalId(naturalId));
  },
  updateModalName: (name) => {
    dispatch(updateNewCallModalName(name));
  },
  updateModalSex: (sex) => {
    dispatch(updateNewCallModalSex(sex));
  },
  updateModalPostcode: (postcode) => {
    dispatch(updateNewCallModalPostcode(postcode));
  },
  updateModalTime: (time) => {
    dispatch(updateNewCallModalTime(time));
  },
  updateModalCentreName: (centreName) => {
    dispatch(updateNewCallModalCentreName(centreName));
  },
  updateModalCallerLocation: (callerLocation) => {
    dispatch(updateNewCallModalCallerLocation(callerLocation));
  },
  updateModalCallerOrganisation: (callerOrganisation) => {
    dispatch(updateNewCallModalCallerOrganisation(callerOrganisation));
  },
  updateModalFilter: (filter) => {
    dispatch(updateNewCallModalFilter(filter));
  },
  updateModalSelected: (id) => {
    dispatch(updateNewCallModalSelected(id));
  },
  setUiModeDefault: () => {
    dispatch(setTab(0));
    dispatch(setUiModeDefault());
  },
  setUiModeEditTemplate: () => {
    dispatch(setUiModeEditTemplate());
  },
});

export default injectIntl(connect(
    makeMapStateToProps,
    mapDispatchToProps
)(ActionBar));
