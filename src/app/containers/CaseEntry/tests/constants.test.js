import {
  ADD_CALL_RECORD,
  ADD_CASE,
  END_CALL_RECORD,
  RESET_AGENT_VIEW_CENTRE_NAME,
  UPDATE_AGENT_VIEW_CENTRE_NAME,
  UPDATE_APPLICATION_KEY_ID,
  UPDATE_CASE_OUTCOME,
  UPDATE_CASE_STATUS,
  UPDATE_CASE_TOPIC,
  UPDATE_CASE_TYPE,
  UPDATE_TEMPLATE_TOPIC,
  UPDATE_TEMPLATE_CASE_TYPE,
  LINK_CASE_INCIDENT,
  UNLINK_CASE_INCIDENT,
  UPDATE_INCIDENT_NAME,
} from '../constants';

describe('App action constants', () => {
  it('ADD_CALL_RECORD', () => {
    expect(ADD_CALL_RECORD).toMatchSnapshot();
  });
  it('ADD_CASE', () => {
    expect(ADD_CASE).toMatchSnapshot();
  });
  it('END_CALL_RECORD', () => {
    expect(END_CALL_RECORD).toMatchSnapshot();
  });
  it('RESET_AGENT_VIEW_CENTRE_NAME', () => {
    expect(RESET_AGENT_VIEW_CENTRE_NAME).toMatchSnapshot();
  });
  it('UPDATE_AGENT_VIEW_CENTRE_NAME', () => {
    expect(UPDATE_AGENT_VIEW_CENTRE_NAME).toMatchSnapshot();
  });
  it('UPDATE_APPLICATION_KEY_ID', () => {
    expect(UPDATE_APPLICATION_KEY_ID).toMatchSnapshot();
  });
  it('UPDATE_CASE_OUTCOME', () => {
    expect(UPDATE_CASE_OUTCOME).toMatchSnapshot();
  });
  it('UPDATE_CASE_STATUS', () => {
    expect(UPDATE_CASE_STATUS).toMatchSnapshot();
  });
  it('UPDATE_CASE_TOPIC', () => {
    expect(UPDATE_CASE_TOPIC).toMatchSnapshot();
  });
  it('UPDATE_CASE_TYPE', () => {
    expect(UPDATE_CASE_TYPE).toMatchSnapshot();
  });
  it('UPDATE_TEMPLATE_TOPIC', () => {
    expect(UPDATE_TEMPLATE_TOPIC).toMatchSnapshot();
  });
  it('UPDATE_TEMPLATE_CASE_TYPE', () => {
    expect(UPDATE_TEMPLATE_CASE_TYPE).toMatchSnapshot();
  });
  it('LINK_CASE_INCIDENT', () => {
    expect(LINK_CASE_INCIDENT).toMatchSnapshot();
  });
  it('UNLINK_CASE_INCIDENT', () => {
    expect(UNLINK_CASE_INCIDENT).toMatchSnapshot();
  });
  it('UPDATE_INCIDENT_NAME', () => {
    expect(UPDATE_INCIDENT_NAME).toMatchSnapshot();
  });
});
