import {
  TOGGLE_NEW_CALL_MODAL,
  UPDATE_NEW_CALL_MODAL_CALLER_LOCATION,
  UPDATE_NEW_CALL_MODAL_CALLER_ORGANISATION,
  UPDATE_NEW_CALL_MODAL_CENTRE_NAME,
  UPDATE_NEW_CALL_MODAL_FILTER,
  UPDATE_NEW_CALL_MODAL_ID,
  UPDATE_NEW_CALL_MODAL_NAME,
  UPDATE_NEW_CALL_MODAL_SELECTED,
  UPDATE_NEW_CALL_MODAL_SEX,
  UPDATE_NEW_CALL_MODAL_POSTCODE,
  UPDATE_NEW_CALL_MODAL_TIME,
} from '../constants';

describe('ActionBarContainer action constants', () => {
  it('TOGGLE_NEW_CALL_MODAL', () => {
    expect(TOGGLE_NEW_CALL_MODAL).toMatchSnapshot();
  });
  it('UPDATE_NEW_CALL_MODAL_CALLER_LOCATION', () => {
    expect(UPDATE_NEW_CALL_MODAL_CALLER_LOCATION).toMatchSnapshot();
  });
  it('UPDATE_NEW_CALL_MODAL_CALLER_ORGANISATION', () => {
    expect(UPDATE_NEW_CALL_MODAL_CALLER_ORGANISATION).toMatchSnapshot();
  });
  it('UPDATE_NEW_CALL_MODAL_CENTRE_NAME', () => {
    expect(UPDATE_NEW_CALL_MODAL_CENTRE_NAME).toMatchSnapshot();
  });
  it('UPDATE_NEW_CALL_MODAL_FILTER', () => {
    expect(UPDATE_NEW_CALL_MODAL_FILTER).toMatchSnapshot();
  });
  it('UPDATE_NEW_CALL_MODAL_ID', () => {
    expect(UPDATE_NEW_CALL_MODAL_ID).toMatchSnapshot();
  });
  it('UPDATE_NEW_CALL_MODAL_NAME', () => {
    expect(UPDATE_NEW_CALL_MODAL_NAME).toMatchSnapshot();
  });
  it('UPDATE_NEW_CALL_MODAL_SELECTED', () => {
    expect(UPDATE_NEW_CALL_MODAL_SELECTED).toMatchSnapshot();
  });
  it('UPDATE_NEW_CALL_MODAL_SEX', () => {
    expect(UPDATE_NEW_CALL_MODAL_SEX).toMatchSnapshot();
  });
  it('UPDATE_NEW_CALL_MODAL_POSTCODE', () => {
    expect(UPDATE_NEW_CALL_MODAL_POSTCODE).toMatchSnapshot();
  });
  it('UPDATE_NEW_CALL_MODAL_TIME', () => {
    expect(UPDATE_NEW_CALL_MODAL_TIME).toMatchSnapshot();
  });
});
