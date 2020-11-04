import { connect } from 'react-redux';

import _isEmpty from 'lodash/isEmpty';

import TreatmentView from 'components/TreatmentView';

import { generateUuid } from 'utils/helpers';

import {
  selectVars,
  makeSelectCurrentTemplate,
  makeSelectEditingTemplate,
  makeSelectSPI,
} from 'containers/App/selectors';

import {
  saveTemplateNote,
} from 'containers/NoteEntry/actions/template';

import {
  resetReferralsView,
  resetTreatmentsView,
  updateReferralsViewReferee,
  updateReferralsViewRefereeSite,
  updateReferralsViewSpecialty,
  updateTreatmentsViewDisposition,
  updateTreatmentsViewTreatments,
} from './actions/case';

import {
  updateTemplateReferrals,
  updateTemplateTreatments,
} from './actions/template';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const { currentTemplateId, editingTemplateId, referralsView, treatmentsView } = vars;
    const currentTemplate = !_isEmpty(editingTemplateId) ? makeSelectEditingTemplate()(state) : makeSelectCurrentTemplate()(state);

    const referrals = currentTemplate.referrals ? currentTemplate.referrals : [];

    const treatments = currentTemplate.treatments ? currentTemplate.treatments : [];

    return {
      currentTemplateId,
      editingTemplateId,

      currentRecordId: currentTemplateId,

      referrals,
      referee: referralsView.referee,
      refereeSite: referralsView.refereeSite,
      specialty: referralsView.specialty,

      treatments,
      treatmentList: treatmentsView.treatmentList,
      disposition: treatmentsView.disposition,
      content: treatmentsView.content,

      userSPI: selectSPI(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateReferrals: (referee, specialty, refereeSite) => {
    dispatch(updateTemplateReferrals(ownProps.recordId, referee, specialty, refereeSite));
    dispatch(resetReferralsView());
  },
  updateReferralsViewReferee: (referee) => {
    dispatch(updateReferralsViewReferee(referee));
  },
  updateReferralsViewRefereeSite: (refereeSite) => {
    dispatch(updateReferralsViewRefereeSite(refereeSite));
  },
  updateReferralsViewSpecialty: (specialty) => {
    dispatch(updateReferralsViewSpecialty(specialty));
  },
  updateTreatments: (disposition, content, treatmentList, spi) => {
    const uuid = generateUuid();
    dispatch(saveTemplateNote(ownProps.recordId, uuid, 'treatment', undefined, '', content, [], spi));
    dispatch(updateTemplateTreatments(ownProps.recordId, uuid, disposition, getTreatmentsObject(treatmentList), spi));
    dispatch(resetTreatmentsView());
  },
  updateTreatmentsViewTreatments: (treatmentList) => {
    dispatch(updateTreatmentsViewTreatments(treatmentList));
  },
  updateTreatmentsViewDisposition: (disposition) => {
    dispatch(updateTreatmentsViewDisposition(disposition));
  },
});

function getTreatmentsObject(treatmentList) {
  const checked = {};
  treatmentList.forEach((item) => {
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
)(TreatmentView);
