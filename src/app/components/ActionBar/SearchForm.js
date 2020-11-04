import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Row from 'react-bootstrap/lib/Row';

import {
  FieldSelectGroup,
  userCan,
} from 'utils/helpers';

import {
  getInterlocutorLocationOptions,
  getSearchTimeOptions,
  getSexOptions,
} from 'utils/options';

import agentmessages from 'components/AgentView/messages';

import 'react-datetime/css/react-datetime.css';

export const SearchForm = ({
    intl,
    modalProps,
    updateModalCallerLocation,
    updateModalCallerOrganisation,
    updateModalCentreName,
    updateModalFilter,
    updateModalId,
    updateModalName,
    updateModalPostcode,
    updateModalSex,
    updateModalTime,
    userSPI,
  }) => (
    <div>
      <div className="alert alert-info">Please search for the file</div>
      <Row>
        <Col xs={8}>
          <FormControl
            id="modalId"
            type="text"
            placeholder="ID"
            value={modalProps.naturalId}
            onChange={(e) => updateModalId(e.target.value)}
          />
        </Col>
        <Col xs={4}>
          <FieldSelectGroup
            id="modalTime"
            placeholder="Time of Call"
            options={getSearchTimeOptions()}
            value={modalProps.time}
            onChange={(e) => updateModalTime(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <FormControl
            type="text"
            placeholder="Patient Name"
            value={modalProps.name}
            onChange={(e) => updateModalName(e.target.value)}
          />
        </Col>
        <Col xs={4}>
          <FieldSelectGroup
            id="modalSex"
            placeholder="Gender"
            options={getSexOptions()}
            value={modalProps.sex}
            onChange={(e) => updateModalSex(e.target.value)}
          />
        </Col>
        <Col xs={4}>
          <FormControl
            type="text"
            placeholder="Postcode"
            value={modalProps.postcode}
            onChange={(e) => updateModalPostcode(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <FormControl
            type="text"
            placeholder={intl.formatMessage(agentmessages['field.centreAgent.name'])}
            value={modalProps.centreName}
            onChange={(e) => updateModalCentreName(e.target.value)}
          />
        </Col>
        <Col xs={4}>
          <FieldSelectGroup
            id="modalLocation"
            placeholder="Caller Location"
            options={getInterlocutorLocationOptions()}
            value={modalProps.callerLocation}
            onChange={(e) => updateModalCallerLocation(e.target.value)}
          />
        </Col>
        <Col xs={4}>
          <FormControl
            type="text"
            placeholder="Caller Organisation"
            value={modalProps.callerOrganisation}
            onChange={(e) => updateModalCallerOrganisation(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FormControl
            componentClass="select"
            placeholder="Show"
            value={modalProps.filter}
            onChange={(e) => updateModalFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="closed-reviewed">Closed - Reviewed</option>
            {userCan(userSPI, 'view deleted files') ? <option value="deleted">Deleted</option> : null}
          </FormControl>
        </Col>
      </Row>
    </div>
);

SearchForm.propTypes = {
  intl: PropTypes.object,
  modalProps: PropTypes.object,
  updateModalCallerLocation: PropTypes.func,
  updateModalCallerOrganisation: PropTypes.func,
  updateModalCentreName: PropTypes.func,
  updateModalFilter: PropTypes.func,
  updateModalId: PropTypes.func,
  updateModalName: PropTypes.func,
  updateModalPostcode: PropTypes.func,
  updateModalSex: PropTypes.func,
  updateModalTime: PropTypes.func,
  userSPI: PropTypes.object,
};

export default SearchForm;
