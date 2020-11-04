import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';

import { selectVars, makeSelectCurrentCase, makeSelectCurrentTemplate, makeSelectEditingTemplate, makeSelectToxicologySource } from 'containers/App/selectors';
import { updateToxicologySource } from 'containers/App/actions';

import AgentOverviewView from 'components/AgentOverviewView';

import { EDITTEMPLATE_UIMODE } from 'containers/App/constants';

const mapStateToProps = (state) => {
  const vars = selectVars(state);
  let current;
  if (vars.uiMode === EDITTEMPLATE_UIMODE) {
    current = !_isEmpty(vars.editingTemplateId) ? makeSelectEditingTemplate()(state) : makeSelectCurrentTemplate()(state);
  } else {
    current = makeSelectCurrentCase()(state);
  }
  const toxicologySource = makeSelectToxicologySource()(state);

  const { agents, patient } = current;
  const patientWeight = (patient && patient.weight) ? Number(patient.weight) : '';
  const patientWeightUnits = (patient && !_isUndefined(patient.weightUnits)) ? patient.weightUnits : '';

  return {
    agents,
    patientWeight,
    patientWeightUnits,
    toxicologySource,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateToxicologySource: (toxicologySource) => {
    dispatch(updateToxicologySource(toxicologySource));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AgentOverviewView);
