import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';

import ClinicalFeaturesView from 'components/ClinicalFeaturesView';

import { selectVars, selectCases, makeSelectSPI } from 'containers/App/selectors';

import {
  updateCaseOutcome,
} from 'containers/CaseEntry/actions/case';

import {
  updateClinicalFeaturesDescriptors,
  updateClinicalFeaturesWhen,
} from './actions/case';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const cases = selectCases(state);
    const { currentRecordId, callRecordId } = vars;
    const tokens = currentRecordId.toString().split('-');
    const currentCase = cases[tokens[0]];
    const currentFeatures = currentCase.features && currentCase.features.length > 0 ? currentCase.features[currentCase.features.length - 1] : {};

    const list = currentFeatures && currentFeatures.descriptors ? currentFeatures.descriptors : {};
    let descriptorList = [];
    if (!(list instanceof Array) && !_isEmpty(list)) {
      Object.keys(list).forEach((parent) => {
        descriptorList = descriptorList.concat(_map(list[parent], (el) => [parent, el].join('|')));
      });
    }

    return {
      currentRecordId,
      callRecordId,

      features: currentCase.features,
      when: currentFeatures.when ? currentFeatures.when : '',
      outcome: currentCase.outcome ? currentCase.outcome : '',
      descriptorList,

      userSPI: selectSPI(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateWhen: (when) => {
    dispatch(updateClinicalFeaturesWhen(ownProps.recordId, when));
  },
  updateOutcome: (old, outcome) => {
    dispatch(updateCaseOutcome(ownProps.recordId, old, outcome));
  },
  updateDescriptorList: (descriptorList) => {
    if (typeof (descriptorList) !== 'undefined') {
      dispatch(updateClinicalFeaturesDescriptors(ownProps.recordId, getDescriptors(descriptorList)));
    }
  },
});

function getDescriptors(descriptorList) {
  const checked = {};
  descriptorList.forEach((item) => {
    if (!checked[item.category]) {
      checked[item.category] = [];
    }
    checked[item.category].push(item.id.split('|')[1]);
  });

  return checked;
}

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(ClinicalFeaturesView);
