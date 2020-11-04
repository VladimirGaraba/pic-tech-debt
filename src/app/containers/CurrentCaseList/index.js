import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import _values from 'lodash/values';

import CaseList from 'components/CaseList';

import {
  displayRecord,
  executeSearch,
  setTab,
} from 'containers/App/actions';

import {
  addCallRecord,
  endCall,
  updateCaseStatus,
  updateCaseType,
} from 'containers/CaseEntry/actions/case';

import {
  addIncident,
  linkCaseIncident,
  unlinkCaseIncident,
  updateIncidentName,
} from 'containers/CaseEntry/actions/incident';

import {
  addClinicalFeatures,
} from 'containers/ClinicalFeaturesEntry/actions/case';

import {
  updateCommunicationStatus,
} from 'containers/InterlocutorEntry/actions';

import { selectVars, selectIncidents, makeSelectCurrentCase, makeSelectSPIFull, makeSelectSite } from 'containers/App/selectors';

import { groupByIncident } from 'utils/helpers';

import {
  updateCaseListSearchCallerLocation,
  updateCaseListSearchCallerOrganisation,
  updateCaseListSearchCentreName,
  updateCaseListSearchFilter,
  updateCaseListSearchId,
  updateCaseListSearchName,
  updateCaseListSearchPostcode,
  updateCaseListSearchSex,
  updateCaseListSearchTime,
  toggleIncidentModal,
  updateIncidentModalName,
  updateIncidentModalSelected,
} from './actions';

const makeMapStateToProps = () => {
  const selectSPIFull = makeSelectSPIFull();
  const selectSite = makeSelectSite();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const incidents = selectIncidents(state);
    const currentCase = makeSelectCurrentCase()(state);
    const currentRecordId = vars.currentRecordId ? vars.currentRecordId.toString() : null;
    const incidentModal = vars.incidentModal;
    const results = groupByIncident(vars.searchResults.caseList ? vars.searchResults.caseList : [], incidents);

    return {
      currentRecordId,
      currentCase,
      callRecordId: vars.callRecordId ? vars.callRecordId.toString() : undefined,
      search: vars.caseListSearch,
      results,
      currentlySyncing: vars.currentlySyncing,
      incidentModal,
      incidents: _values(incidents),

      userSPI: selectSPIFull(state),
      site: selectSite(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
  onItemClick: (id, callRecordId) => {
    dispatch(displayRecord(id));
    if (id !== callRecordId) {
      dispatch(setTab(0));
    }
  },
  endCall: (search, recordId) => {
    dispatch(endCall(recordId));
    if (search) {
      dispatch(executeSearch('case_list', search));
    }
  },
  doSearch: (search) => {
    dispatch(executeSearch('case_list', search));
  },
  startCall: (id, spi) => {
    dispatch(displayRecord(id));
    dispatch(addCallRecord(id, spi));
    dispatch(addClinicalFeatures(id, {}, spi));
    dispatch(setTab(1));
  },
  updateSearchFilter: (filter) => {
    dispatch(updateCaseListSearchFilter(filter));
  },
  updateSearchId: (naturalId) => {
    dispatch(updateCaseListSearchId(naturalId));
  },
  updateSearchName: (name) => {
    dispatch(updateCaseListSearchName(name));
  },
  updateSearchSex: (sex) => {
    dispatch(updateCaseListSearchSex(sex));
  },
  updateSearchPostcode: (postcode) => {
    dispatch(updateCaseListSearchPostcode(postcode));
  },
  updateSearchTime: (time) => {
    dispatch(updateCaseListSearchTime(time));
  },
  updateSearchCentreName: (centreName) => {
    dispatch(updateCaseListSearchCentreName(centreName));
  },
  updateSearchCallerLocation: (callerLocation) => {
    dispatch(updateCaseListSearchCallerLocation(callerLocation));
  },
  updateSearchCallerOrganisation: (callerOrganisation) => {
    dispatch(updateCaseListSearchCallerOrganisation(callerOrganisation));
  },
  closeFile: (recordId, userSPI) => {
    updateCaseStatusWrapper(recordId, 'pending', userSPI, dispatch);
  },
  openFile: (recordId, userSPI) => {
    updateCaseStatusWrapper(recordId, 'open', userSPI, dispatch);
  },
  reviewFile: (recordId, userSPI) => {
    updateCaseStatusWrapper(recordId, 'closed', userSPI, dispatch);
  },
  deleteFile: (recordId, userSPI) => {
    updateCaseStatusWrapper(recordId, 'deleted', userSPI, dispatch);
  },
  deleteRecord: (recordId) => {
    dispatch(updateCommunicationStatus(recordId, 'deleted'));
  },
  markAsCase: (recordId) => {
    updateCaseTypeWrapper(recordId, 'case', dispatch);
  },
  markAsInquiry: (recordId) => {
    updateCaseTypeWrapper(recordId, 'inquiry', dispatch);
  },
  markAsHoax: (recordId) => {
    updateCaseTypeWrapper(recordId, 'hoax', dispatch);
  },
  toggleModal: (caseId) => {
    dispatch(toggleIncidentModal(caseId));
  },
  updateModalName: (name) => {
    dispatch(updateIncidentModalName(name));
  },
  updateModalSelected: (id) => {
    dispatch(updateIncidentModalSelected(id));
  },
  addIncident: (spi, prefix, incident) => {
    dispatch(addIncident(spi, prefix, incident.name, incident.caseId));
  },
  linkCaseIncident: (caseId, incidentId) => {
    dispatch(linkCaseIncident(caseId, incidentId));
  },
  unlinkCaseIncident: (caseId, incidentId) => {
    dispatch(unlinkCaseIncident(caseId, incidentId));
  },
  renameIncident: (incidentId, name) => {
    dispatch(updateIncidentName(incidentId, name));
  },
});

function updateCaseStatusWrapper(recordId, status, userSPI, dispatch) {
  dispatch(updateCaseStatus(recordId, status, userSPI));
}

function updateCaseTypeWrapper(recordId, type, dispatch) {
  dispatch(updateCaseType(recordId, type));
}

const CurrentCaseList = injectIntl(connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CaseList));

export default CurrentCaseList;
