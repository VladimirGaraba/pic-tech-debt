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
} from '../actions';

describe('ActionBarContainer action creators', () => {
  it('toggleNewCallModal', () => {
    expect(toggleNewCallModal()).toMatchSnapshot();
  });
  it('updateNewCallModalCallerLocation', () => {
    expect(updateNewCallModalCallerLocation('New Location')).toMatchSnapshot();
  });
  it('updateNewCallModalCallerOrganisation', () => {
    expect(updateNewCallModalCallerOrganisation('New organisation')).toMatchSnapshot();
  });
  it('updateNewCallModalCentreName', () => {
    expect(updateNewCallModalCentreName('New centre name')).toMatchSnapshot();
  });
  it('updateNewCallModalFilter', () => {
    expect(updateNewCallModalFilter('New filter')).toMatchSnapshot();
  });
  it('updateNewCallModalId', () => {
    expect(updateNewCallModalId('New id')).toMatchSnapshot();
  });
  it('updateNewCallModalName', () => {
    expect(updateNewCallModalName('New name')).toMatchSnapshot();
  });
  it('updateNewCallModalPostcode', () => {
    expect(updateNewCallModalPostcode(8000)).toMatchSnapshot();
  });
  it('updateNewCallModalSelected', () => {
    expect(updateNewCallModalSelected('New selected')).toMatchSnapshot();
  });
  it('updateNewCallModalSex', () => {
    expect(updateNewCallModalSex('New sex')).toMatchSnapshot();
  });
  it('updateNewCallModalTime', () => {
    expect(updateNewCallModalTime('New time')).toMatchSnapshot();
  });
});
