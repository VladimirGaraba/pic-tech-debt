import { connect } from 'react-redux';

import TreatmentView from 'components/TreatmentView';

import {
  saveNote,
} from 'containers/NoteEntry/actions/case';

import { selectVars, selectCases, makeSelectSPI } from 'containers/App/selectors';

import { generateUuid } from 'utils/helpers';

import {
  resetReferralsView,
  resetTreatmentsView,
  updateReferrals,
  updateReferralsViewReferee,
  updateReferralsViewRefereeSite,
  updateReferralsViewSpecialty,
  updateTreatments,
  updateTreatmentsViewDisposition,
  updateTreatmentsViewTreatments,
} from './actions/case';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const cases = selectCases(state);
    const { currentRecordId, callRecordId, referralsView, treatmentsView } = vars;
    const tokens = currentRecordId.toString().split('-');
    const currentCase = cases[tokens[0]];

    const referrals = currentCase.referrals ? currentCase.referrals : [];

    const treatments = currentCase.treatments ? currentCase.treatments : [];

    return {
      currentRecordId,
      callRecordId,

      referrals,
      referee: referralsView.referee,
      specialty: referralsView.specialty,
      refereeSite: referralsView.refereeSite,

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
    dispatch(updateReferrals(ownProps.recordId, referee, specialty, refereeSite));
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
    dispatch(saveNote(ownProps.recordId, uuid, 'treatment', undefined, '', content, [], spi));
    dispatch(updateTreatments(ownProps.recordId, uuid, disposition, getTreatmentsObject(treatmentList), spi));
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
