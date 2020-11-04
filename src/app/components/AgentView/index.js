/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _isEmpty from 'lodash/isEmpty';
import _isObject from 'lodash/isObject';
import _map from 'lodash/map';

import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Grid from 'react-bootstrap/lib/Grid';
import Label from 'react-bootstrap/lib/Label';
import Row from 'react-bootstrap/lib/Row';

import DropdownTreeSelect from 'react-dropdown-tree-select';
import { BootstrapTable as UnstyledBootstrapTable, InsertModalHeader, TableHeaderColumn } from 'react-bootstrap-table';
import { asyncContainer } from 'react-bootstrap-typeahead';
import DateTime from 'react-datetime';

import auth from 'auth';
import Typeahead from 'components/StyledTypeahead';

import {
  buildUseTypeTree,
  Fieldset,
  FieldGroup,
  FieldSelectGroup,
  getTimeSince,
  isDisabled,
  numberFieldBlurHandler,
  numberFieldChangeHandler,
  numberFieldKeyPressHandler,
  typeaheadOnChangeHandler,
} from 'utils/helpers';

import {
  getAgentUseTypeDetailOptions,
  getDurationUnitsOptions,
  getQuantityUnitsOptions,
  getRouteOfExposureOptions,
  getTimeSinceUnitsOptions,
  getTypeOfExposureOptions,
} from 'utils/options';

import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'react-dropdown-tree-select/dist/styles.css';

import CentreAgentNameField from './CentreAgentNameField';
import CentreAgentTableBody from './CentreAgentTableBody';

import messages from './messages';

const AsyncTypeahead = asyncContainer(Typeahead);

const BootstrapTable = styled(UnstyledBootstrapTable)`
  & .react-bs-container-body {
    overflow: inherit !important;
  }
  
  & td.typeahead-cell {
    overflow: inherit !important;
  }
`;

export class AgentView extends React.Component {
  constructor(props) {
    super(props);

    this.createCentreAgentNameEditField = this.createCentreAgentNameEditField.bind(this);
    this.createCentreAgentNameInsertField = this.createCentreAgentNameInsertField.bind(this);
    this.onUseTypeChange = this.onUseTypeChange.bind(this);

    this.state = {
      isEUPCSLoading: false,
      eUPCSOptions: [],
    };
  }

  onUseTypeChange(currentNode, selectedNodes) {
    this.props.updateType(this.props.useType, _map(selectedNodes, (s) => s.value));
  }

  createCentreAgentNameEditField(onUpdate, props) {
    return <CentreAgentNameField onUpdate={onUpdate} {...props} tableRef={this._bootstraptable} />;
  }

  createCentreAgentNameInsertField(column, attr) {
    return <CentreAgentNameField {...attr} />;
  }

  createCustomModalBody(columns, validateState, ignoreEditable) {
    // could validate somewhere maybe as well?
    return (
      <CentreAgentTableBody
        columns={columns}
        validateState={validateState}
        ignoreEditable={ignoreEditable}
      />
    );
  }

  isTimeSinceExposureUnitsDisabled(timeSince) {
    let time;
    if (this.timeSinceTime) {
      time = parseInt(this.timeSinceTime.value.toString().trim(), 10);
    } else {
      time = parseInt(timeSince.time.toString().trim(), 10);
    }

    return (isNaN(time) || time === 0);
  }

  render() {
    const {
        addCentreAgent,
        caseType,
        centreAgents,
        deleteAgent,
        duration,
        durationUnits,
        durationUnknown,
        eupcs,
        interlocutorAgentName,
        intl,
        isPatientsOwnMedication,
        quantity,
        quantityUnits,
        quantityUnknown,
        removeCentreAgent,
        routeOfExposure,
        timeOfExposure,
        typeOfExposure,
        updateCentreAgent,
        updateDuration,
        updateEUPCS,
        updateInterlocutorAgentName,
        updateIsPatientsOwnMedication,
        updateQuantity,
        updateRouteOfExposure,
        updateTimeOfExposure,
        updateTypeOfExposure,
        useType,
    } = this.props;

    const timeSince = getTimeSince(timeOfExposure);
    if (timeSince.time === '' && this.timeSinceTime) {
      this.timeSinceTime.value = '';
    }
    if (timeSince.units === '' && this.timeSinceUnits) {
      this.timeSinceUnits.value = '';
    }

    const routeOfExposureList = _filter(getRouteOfExposureOptions(), (o) => _includes(routeOfExposure, o.label));

    const { res: useTypeData } = buildUseTypeTree(getAgentUseTypeDetailOptions(), useType);

    return (
      <Grid fluid>
        <Fieldset>
          <Row>
            <Col xs={6}>
              <FieldGroup
                id={'interlocutorAgentName'}
                type={'text'}
                label={intl.formatMessage(messages['field.name'])}
                value={interlocutorAgentName}
                onChange={(e) => updateInterlocutorAgentName(e.target.value)}
                disabled={isDisabled(this.props, this.context)}
              />
            </Col>

          </Row>
        </Fieldset>
        <Fieldset>
          <legend><FormattedMessage {...messages['section.details']} /></legend>
          <Row>
            <Col xs={6}>
              <ControlLabel>{intl.formatMessage(messages['field.useType'])}</ControlLabel>
              <DropdownTreeSelect
                data={useTypeData}
                onChange={this.onUseTypeChange}
                /* className={'form-control'}*/
                clearSearchOnChange
                radioSelect={true}
                disabled={isDisabled(this.props, this.context)}
              />
            </Col>

            <Col xs={2}>
              <Checkbox
                name={'isPatientsOwnMedication'}
                checked={isPatientsOwnMedication}
                onChange={() => updateIsPatientsOwnMedication(isPatientsOwnMedication, !isPatientsOwnMedication)}
                style={{ display: 'inline-block', width: 'auto', marginTop: '3rem' }}
                disabled={isDisabled(this.props, this.context)}
              >
                <FormattedMessage {...messages['value.patientsOwnMedication']} />
              </Checkbox>
            </Col>
            <Col xs={6}>
              <ControlLabel><FormattedMessage {...messages['field.eUPCS']} /></ControlLabel>
              <AsyncTypeahead
                clearButton
                bodyContainer
                isLoading={this.state.isEUPCSLoading}
                labelKey={'name'}
                onSearch={(query) => {
                  this.setState({ isEUPCSLoading: true });
                  const URL = `//${window.location.hostname}/analytics/data/getEUPCS/${query}`;
                  fetch(URL, {
                    headers: {
                      Authorization: `Bearer ${auth.getToken()}`,
                    },
                  })
                        .then((res) => res.json())
                        .then((json) => {
                          this.setState({ isEUPCSLoading: false, eUPCSOptions: json });
                        });
                }}
                options={this.state.eUPCSOptions}
                selected={_isEmpty(eupcs) ? [] : [eupcs]}
                onChange={(values) => typeaheadOnChangeHandler(_isEmpty(eupcs) ? '' : eupcs, values, updateEUPCS)}
                disabled={isDisabled(this.props, this.context)}
              />
            </Col>
          </Row>
        </Fieldset>
        {caseType === 'case'
          ? <Fieldset>
            <legend><FormattedMessage {...messages['section.exposure']} /></legend>
            <Row>
              <Col xs={3}>
                <FieldGroup
                  id={'quantity'}
                  label={intl.formatMessage(messages['field.quantity'])}
                  value={quantity}
                  onKeyPress={numberFieldKeyPressHandler}
                  onChange={(e) => numberFieldChangeHandler(e, updateQuantity, quantity, quantityUnits, quantityUnknown)}
                  onBlur={(e) => numberFieldBlurHandler(e, updateQuantity, quantity, quantityUnits, quantityUnknown)}
                  disabled={isDisabled(this.props, this.context)}
                />
              </Col>
              <Col xs={3}>
                <FieldSelectGroup
                  id={'quantityUnits'}
                  label={intl.formatMessage(messages['field.quantityUnits'])}
                  options={getQuantityUnitsOptions()}
                  value={quantityUnits}
                  onChange={(e) => updateQuantity(quantity, quantity, quantityUnits, e.target.value, quantityUnknown, quantityUnknown)}
                  disabled={isDisabled(this.props, this.context)}
                />
              </Col>
              <Col xs={2}>
                <FormGroup>
                  <ControlLabel>&nbsp;</ControlLabel>
                  <Checkbox
                    name={'quantityUnknown'}
                    value
                    checked={quantityUnknown}
                    onChange={(e) => updateQuantity(quantity, quantity, quantityUnits, quantityUnits, quantityUnknown, e.target.checked)}
                    disabled={isDisabled(this.props, this.context)}
                  >
                    {'Unknown'}
                  </Checkbox>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <FieldGroup
                  id={'timeSinceExposure'}
                  inputRef={(timeSinceTime) => { this.timeSinceTime = timeSinceTime; }}
                  type={'text'}
                  label={intl.formatMessage(messages['field.timeSinceExposure'])}
                  defaultValue={timeSince.time}
                  onKeyPress={numberFieldKeyPressHandler}
                  onChange={(e) => {
                    const time = parseInt(e.target.value.toString().trim(), 10);
                    if (isNaN(time) || time === 0) {
                      this.timeSinceUnits.disabled = true;
                    } else {
                      this.timeSinceUnits.disabled = false;
                      updateTimeOfExposure(timeOfExposure, e.target.value, this.timeSinceUnits.value);
                    }
                  }}
                  disabled={isDisabled(this.props, this.context)}
                />
              </Col>
              <Col xs={2}>
                <FieldSelectGroup
                  id={'timeSinceExposureUnits'}
                  inputRef={(timeSinceUnits) => { this.timeSinceUnits = timeSinceUnits; }}
                  label={intl.formatMessage(messages['field.timeSinceExposureUnits'])}
                  value={timeSince.units}
                  onChange={(e) => {
                    if (!isNaN(this.timeSinceTime.value) && parseInt(this.timeSinceTime.value, 10) !== 0) {
                      updateTimeOfExposure(timeOfExposure, this.timeSinceTime.value, e.target.value);
                    }
                  }}
                  options={getTimeSinceUnitsOptions()}
                  disabled={isDisabled(this.props, this.context) || this.isTimeSinceExposureUnitsDisabled(timeSince)}
                />
              </Col>
              <Col xs={3}>
                <ControlLabel><FormattedMessage {...messages['field.timeOfExposure']} /></ControlLabel>
                <DateTime
                  inputProps={{ disabled: true }}
                  dateFormat={'YYYY-MM-DD'}
                  timeFormat={'HH:mm'}
                  value={timeOfExposure}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <FieldGroup
                  id={'duration'}
                  label={intl.formatMessage(messages['field.duration'])}
                  value={duration}
                  onKeyPress={numberFieldKeyPressHandler}
                  onChange={(e) => numberFieldChangeHandler(e, updateDuration, duration, durationUnits, durationUnknown)}
                  onBlur={(e) => numberFieldBlurHandler(e, updateDuration, duration, durationUnits, durationUnknown)}
                  disabled={isDisabled(this.props, this.context)}
                />
              </Col>
              <Col xs={3}>
                <FieldSelectGroup
                  id={'durationUnits'}
                  label={intl.formatMessage(messages['field.durationUnits'])}
                  options={getDurationUnitsOptions()}
                  value={durationUnits}
                  onChange={(e) => updateDuration(duration, duration, durationUnits, e.target.value, durationUnknown, durationUnknown)}
                  disabled={isDisabled(this.props, this.context)}
                />
              </Col>
              <Col xs={2}>
                <FormGroup>
                  <ControlLabel>&nbsp;</ControlLabel>
                  <Checkbox
                    name={'durationUnknown'}
                    value
                    checked={durationUnknown}
                    onChange={(e) => updateDuration(duration, duration, durationUnits, durationUnits, durationUnknown, e.target.checked)}
                    disabled={isDisabled(this.props, this.context)}
                  >
                    {'Unknown'}
                  </Checkbox>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <FieldSelectGroup
                  id={'typeOfExposure'}
                  label={intl.formatMessage(messages['field.typeOfExposure'])}
                  options={getTypeOfExposureOptions()}
                  value={typeOfExposure}
                  onChange={(e) => updateTypeOfExposure(typeOfExposure, e.target.value)}
                  disabled={isDisabled(this.props, this.context)}
                />
              </Col>
              <Col xs={3}>
                <ControlLabel><FormattedMessage {...messages['field.routeOfExposure']} /></ControlLabel>
                {isDisabled(this.props, this.context)
                  ? <div>{routeOfExposure.length > 0
                      ? routeOfExposure.join(', ')
                      : <Label><FormattedMessage {...messages['message.none']} /></Label>
                    }
                  </div>
                  : <Typeahead
                    clearButton
                    multiple
                    dropup
                    options={getRouteOfExposureOptions()}
                    selected={routeOfExposureList}
                    onChange={(values) => {
                      if (!_isEmpty(values) && !_isObject(values[0])) {
                        return;
                      }
                      typeaheadOnChangeHandler(routeOfExposure, _map(values, 'label'), updateRouteOfExposure, true);
                    }}
                    disabled={isDisabled(this.props, this.context)}
                  /> }
              </Col>
            </Row>
          </Fieldset>
          : null }
        <Fieldset>
          <legend><FormattedMessage {...messages['section.identification']} /></legend>
          <Row>
            <Col xs={12}>
              <BootstrapTable
                ref={(ref) => { this._bootstraptable = ref; }}
                data={centreAgents}
                remote
                insertRow={!isDisabled(this.props, this.context)}
                deleteRow={!isDisabled(this.props, this.context)}
                selectRow={{ mode: 'radio' }}
                cellEdit={{
                  mode: 'click',
                  blurToSave: true,
                  afterSaveCell: updateCentreAgent,
                }}
                options={{
                  insertModalHeader: () => <InsertModalHeader
                    title={intl.formatMessage(messages['action.centreAgent.add'])}
                  />,
                  insertModalBody: this.createCustomModalBody,
                  onAddRow: addCentreAgent,
                  onDeleteRow: removeCentreAgent,
                }}
              >
                <TableHeaderColumn dataField={'id'} isKey autoValue>ID</TableHeaderColumn>
                <TableHeaderColumn
                  dataField={'name'}
                  editColumnClassName={'typeahead-cell'}
                  customEditor={{ getElement: this.createCentreAgentNameEditField }}
                  customInsertEditor={{ getElement: this.createCentreAgentNameInsertField }}
                  editable={{ readOnly: isDisabled(this.props, this.context) }}
                >
                  {intl.formatMessage(messages['field.centreAgent.name'])}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField={'url'}
                  editable={false}
                  hidden
                  hiddenOnInsert
                >
                  {intl.formatMessage(messages['field.centreAgent.url'])}
                </TableHeaderColumn>
                <TableHeaderColumn dataField={'quantity'} editable={{ type: 'number', readOnly: isDisabled(this.props, this.context) }}>
                  {intl.formatMessage(messages['field.quantity'])}
                </TableHeaderColumn>
                <TableHeaderColumn dataField={'units'} editable={{ type: 'select', readOnly: isDisabled(this.props, this.context), options: { values: [''].concat(_filter(getQuantityUnitsOptions(), (o) => o.label !== 'tabs').map((o) => o.label)) } }}>
                  {intl.formatMessage(messages['field.quantityUnits'])}
                </TableHeaderColumn>
              </BootstrapTable>
            </Col>
          </Row>
        </Fieldset>
        <Row>
          <Col xs={12}>
            <Button
              bsStyle={'danger'}
              className={'pull-right'}
              onClick={() => {
                if (window.confirm(intl.formatMessage(messages['message.delete.confirm']))) { // eslint-disable-line no-alert
                  deleteAgent(interlocutorAgentName);
                }
              }}
              disabled={isDisabled(this.props, this.context)}
            >
              <FormattedMessage {...messages['action.delete']} />
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

AgentView.propTypes = {
  addCentreAgent: PropTypes.func,
  caseType: PropTypes.string,
  centreAgents: PropTypes.array,
  deleteAgent: PropTypes.func,
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  durationUnits: PropTypes.string,
  durationUnknown: PropTypes.bool,
  eupcs: PropTypes.string,
  interlocutorAgentName: PropTypes.string,
  intl: PropTypes.object,
  isPatientsOwnMedication: PropTypes.bool,
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  quantityUnits: PropTypes.string,
  quantityUnknown: PropTypes.bool,
  removeCentreAgent: PropTypes.func,
  routeOfExposure: PropTypes.array,
  timeOfExposure: PropTypes.string,
  typeOfExposure: PropTypes.string,
  updateCentreAgent: PropTypes.func,
  updateDuration: PropTypes.func,
  updateEUPCS: PropTypes.func,
  updateInterlocutorAgentName: PropTypes.func,
  updateIsPatientsOwnMedication: PropTypes.func,
  updateQuantity: PropTypes.func,
  updateRouteOfExposure: PropTypes.func,
  updateTimeOfExposure: PropTypes.func,
  updateType: PropTypes.func,
  updateTypeOfExposure: PropTypes.func,
  useType: PropTypes.array,
};

AgentView.contextTypes = {
  uiMode: PropTypes.string,
};

export default injectIntl(AgentView);
