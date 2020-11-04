/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';

const selectGlobal = (state) => state.get('global');
const selectCases = (state) => selectGlobal(state).get('cases');
const selectIncidents = (state) => selectGlobal(state).get('incidents');
const selectSiteConfig = (state) => selectGlobal(state).get('siteConfig');
const selectVars = (state) => selectGlobal(state).get('vars');

const selectViews = (state) => selectVars(state).views;
const selectTemplateView = (state) => selectViews(state).template;

const selectCase = (state, id) => selectCases(state)[id];
const selectIncident = (state, id) => selectIncidents(state)[id];
const selectTemplates = (state) => selectSiteConfig(state).templates;
const selectTemplate = (state, id) => selectTemplates(state)[id];

const selectAppKeyById = (state, appKeyId) => {
  const appKeys = makeSelectAppKeys()(state);
  return appKeys[appKeyId];
};

const makeSelectAppKey = () => createSelector(
  selectVars,
  (vars) => ({ id: vars.jwtClaims.application_key_id, key: vars.jwtClaims.application_key }),
);

const makeSelectAppKeys = () => createSelector(
  selectVars,
  (vars) => (vars.applicationKeys),
);

const makeSelectCaseNotes = (caseId) => createSelector(
  selectCases,
  (cases) => (cases[caseId].notes)
);

const makeSelectCurrentCaseId = () => createSelector(
  selectVars,
  (vars) => vars.currentRecordId
);

const makeSelectCurrentCase = () => createSelector(
  makeSelectCurrentCaseId(),
  selectCases,
  (currentCaseId, cases) => (currentCaseId) ? _cloneDeep(cases[currentCaseId.toString().split('-')[0]]) : {}
);

const makeSelectCurrentCaseComms = () => createSelector(
  makeSelectCurrentCaseId(),
  selectCases,
  (currentCaseId, cases) => {
    if (currentCaseId) {
      const tokens = currentCaseId.toString().split('-');
      if (tokens[1]) {
        return _cloneDeep(cases[tokens[0]].communications[tokens[1] - 1]);
      }
      return _cloneDeep(cases[tokens[0]].communications[0]);
    }
    return null;
  }
);

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectToxicologySource = () => createSelector(
  selectVars,
  (vars) => vars.toxicologySource
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectJWTClaims = () => createSelector(
  selectVars,
  (vars) => vars.jwtClaims
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route');

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const makeSelectLoggedIn = () => createSelector(
  selectVars,
  (vars) => vars.loggedIn
);

const makeSelectSPI = () => createSelector(
  selectVars,
  (vars) => ({
    id: vars.jwtClaims.sub,
    name: vars.jwtClaims.name,
    org: vars.jwtClaims.org,
    job: vars.jwtClaims.job,
    roles: vars.jwtClaims.roles,
    abilities: vars.jwtClaims.abilities,
    siteId: vars.jwtClaims.site_id,
  })
);

const makeSelectSPIFull = () => createSelector(
  [selectVars, makeSelectSPI()],
  (vars, spi) => ({
    ...spi,
    phone: vars.jwtClaims.phone,
    street: vars.jwtClaims.org_street,
    suburb: vars.jwtClaims.org_suburb,
    state: vars.jwtClaims.org_state,
    postcode: vars.jwtClaims.org_postcode,
  })
);

const makeSelectSite = () => createSelector(
    selectVars,
    (vars) => ({
      siteId: vars.jwtClaims.site_id,
      shortcode: vars.jwtClaims.site_shortcode,
    })
);

const makeSelectTheme = () => createSelector(
  selectVars,
  (vars) => vars.jwtClaims.theme ? vars.jwtClaims.theme : 'bootstrap'
);

const makeSelectCurrentTemplateId = () => createSelector(
  selectVars,
  (vars) => vars.currentTemplateId
);

const makeSelectEditingTemplateId = () => createSelector(
  selectVars,
  (vars) => vars.editingTemplateId
);

const makeSelectCurrentTemplate = () => createSelector(
  makeSelectCurrentTemplateId(),
  selectTemplates,
  (currentTemplateId, templates) => (!_isEmpty(currentTemplateId)) ? templates[currentTemplateId] : null
);

const makeSelectEditingTemplate = () => createSelector(
  selectViews,
  (views) => views.template
);

export {
  selectAppKeyById,
  selectCase,
  selectCases,
  selectGlobal,
  selectIncident,
  selectIncidents,
  selectSiteConfig,
  selectTemplate,
  selectTemplates,
  selectTemplateView,
  selectVars,
  selectViews,
  makeSelectAppKey,
  makeSelectAppKeys,
  makeSelectCaseNotes,
  makeSelectCurrentCaseId,
  makeSelectCurrentCase,
  makeSelectCurrentCaseComms,
  makeSelectCurrentUser,
  makeSelectEditingTemplate,
  makeSelectEditingTemplateId,
  makeSelectToxicologySource,
  makeSelectError,
  makeSelectJWTClaims,
  makeSelectLoading,
  makeSelectLocationState,
  makeSelectLoggedIn,
  makeSelectSPI,
  makeSelectSPIFull,
  makeSelectSite,
  makeSelectTheme,
  makeSelectCurrentTemplateId,
  makeSelectCurrentTemplate,
};
