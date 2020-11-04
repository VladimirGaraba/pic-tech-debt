import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { selectVars, makeSelectSPI } from 'containers/App/selectors';

import SearchForm from 'components/ActionBar/SearchForm';

import {
  updateNewCallModalCallerLocation,
  updateNewCallModalCallerOrganisation,
  updateNewCallModalCentreName,
  updateNewCallModalFilter,
  updateNewCallModalId,
  updateNewCallModalName,
  updateNewCallModalPostcode,
  updateNewCallModalSex,
  updateNewCallModalTime,
} from './actions';

const makeMapStateToProps = () => {
  const selectSPI = makeSelectSPI();
  const mapStateToProps = (state) => {
    const vars = selectVars(state);
    const modalProps = vars.newCallModal;

    return {
      modalProps,

      userSPI: selectSPI(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
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
});

export default injectIntl(connect(
  makeMapStateToProps,
  mapDispatchToProps
)(SearchForm));
