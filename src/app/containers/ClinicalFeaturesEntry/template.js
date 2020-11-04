import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';

import ClinicalFeaturesView from 'components/ClinicalFeaturesView';

import { selectVars, makeSelectCurrentTemplate, makeSelectEditingTemplate, makeSelectSPI } from 'containers/App/selectors';

import {
  updateTemplateOutcome,
} from 'containers/CaseEntry/actions/template';

import {
  updateTemplateClinicalFeaturesDescriptors,
  updateTemplateClinicalFeaturesWhen,
} from './actions/template';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const { currentTemplateId, editingTemplateId } = vars;
    const currentTemplate = !_isEmpty(editingTemplateId) ? makeSelectEditingTemplate()(state) : makeSelectCurrentTemplate()(state);
    const currentFeatures = currentTemplate.features && currentTemplate.features.length > 0 ? currentTemplate.features[currentTemplate.features.length - 1] : {};

    const list = currentFeatures && currentFeatures.descriptors ? currentFeatures.descriptors : {};
    let descriptorList = [];
    if (!(list instanceof Array) && !_isEmpty(list)) {
      Object.keys(list).forEach((parent) => {
        descriptorList = descriptorList.concat(_map(list[parent], (el) => [parent, el].join('|')));
      });
    }

    return {
      currentTemplateId,
      editingTemplateId,

      features: currentTemplate.features,
      when: currentFeatures.when ? currentFeatures.when : '',
      outcome: currentTemplate.outcome ? currentTemplate.outcome : '',
      descriptorList,

      userSPI: selectSPI(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateWhen: (when) => {
    dispatch(updateTemplateClinicalFeaturesWhen(ownProps.recordId, when));
  },
  updateOutcome: (old, outcome) => {
    dispatch(updateTemplateOutcome(ownProps.recordId, old, outcome));
  },
  updateDescriptorList: (descriptorList) => {
    if (typeof (descriptorList) !== 'undefined') {
      dispatch(updateTemplateClinicalFeaturesDescriptors(ownProps.recordId, getDescriptors(descriptorList)));
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
