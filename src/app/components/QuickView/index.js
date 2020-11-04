import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import _at from 'lodash/at';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _isEmpty from 'lodash/isEmpty';
import _isNaN from 'lodash/isNaN';
import _isObject from 'lodash/isObject';
import _isUndefined from 'lodash/isUndefined';
import _keyBy from 'lodash/keyBy';
import _map from 'lodash/map';

import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Radio from 'react-bootstrap/lib/Radio';
import Row from 'react-bootstrap/lib/Row';
import UnstyledTable from 'react-bootstrap/lib/Table';

import DateTime from 'react-datetime';

import Typeahead from 'components/StyledTypeahead';
import StyledGeosuggest from 'components/StyledGeosuggest';

import {
    FieldGroup,
    FieldSelectGroup,
    Fieldset,
    ageFieldBlurHandler,
    ageFieldChangeHandler,
    getTimeSince,
    isDisabled,
    isHuman,
    numberFieldKeyPressHandler,
    renderTypeaheadMenu,
    typeaheadOnChangeHandler,
    weightFieldBlurHandler,
    weightFieldChangeHandler,
} from 'utils/helpers';

import {
    getAgeUnitsOptions,
    getAnimalTypeOptions,
    getCircumstanceOptions,
    getClinicalFeaturesOptions,
    getDurationUnitsOptions,
    getInterlocutorCategoryOptions,
    getLocationOptions,
    getPoisonSeverityScoreOptions,
    getQuantityUnitsOptions,
    getRiskAssessmentOptions,
    getRouteOfExposureOptions,
    getSexOptions,
    getTimeSinceUnitsOptions,
    getTypeOfExposureOptions,
} from 'utils/options';

import { EDITTEMPLATE_UIMODE } from 'containers/App/constants';

import agentmessages from 'components/AgentView/messages';
import casemessages from 'components/CaseView/messages';
import featuresmessages from 'components/ClinicalFeaturesView/messages';
import patientmessages from 'components/PatientView/messages';

const Table = styled(UnstyledTable)`
  &.table > tbody > tr:nth-child(even) td {
    border-top: none;
  }
`;

/* eslint-disable no-nested-ternary */
export class QuickView extends React.Component {
  constructor(props) {
    super(props);

    this.updatePatientLocalityFromCaller = this.updatePatientLocalityFromCaller.bind(this);
    this.updatePatientLocalityFromLookup = this.updatePatientLocalityFromLookup.bind(this);
  }

  buildFeatureList() {
    const { features } = this.props;

    const list = {};
    if (features.length > 0) {
      features[features.length - 1].descriptors.map((desc) => {
        list[desc] = true;
        return desc;
      });
    }

    return list;
  }


  isTimeSinceExposureUnitsDisabled(timeSince) {
    let time;
    if (this.timeSinceTime) {
      time = parseInt(this.timeSinceTime.value.toString().trim(), 10);
    } else {
      time = parseInt(timeSince.time.toString().trim(), 10);
    }

    return (_isNaN(time) || time === 0);
  }

  updateCategory(category) {
    const {
        appKey,
        updateInterlocutorName,
        updateInterlocutorMediumDetail,
        updateInterlocutorOrganisation,
        updateInterlocutorAddress1,
        updateInterlocutorCity,
        updateInterlocutorState,
        updateInterlocutorPostcode,
        updateInterlocutorTelephone,
        updateInterlocutorCategory,
        userSPIFull,
    } = this.props;

    if (category === 'Current user' && !_isEmpty(userSPIFull)) {
      updateInterlocutorName(userSPIFull.name, appKey);
      updateInterlocutorMediumDetail(userSPIFull.phone, appKey);
      updateInterlocutorOrganisation(userSPIFull.org);
      updateInterlocutorAddress1(userSPIFull.street);
      updateInterlocutorCity(userSPIFull.suburb);
      updateInterlocutorState(userSPIFull.state);
      updateInterlocutorPostcode(userSPIFull.postcode);
      updateInterlocutorTelephone(userSPIFull.phone);
    }
    updateInterlocutorCategory(category);
  }

  updatePatientLocalityFromCaller() {
    const {
      interlocutorAddress1,
      interlocutorCity,
      interlocutorCountry,
      interlocutorGeometry,
      interlocutorISOCountry,
      interlocutorOrganisation,
      interlocutorPlaceId,
      interlocutorPostcode,
      interlocutorState,
      interlocutorTelephone,
      patientAddress1,
      patientCountry,
      patientGeometry,
      patientISOCountry,
      patientLocationName,
      patientPlaceId,
      patientPostcode,
      patientState,
      patientSuburb,
      patientTelephone,
      updatePatientLocality,
    } = this.props;

    updatePatientLocality(null, {
      address1: patientAddress1,
      city: patientSuburb,
      country: patientCountry,
      geometry: patientGeometry,
      isoCountry: patientISOCountry,
      name: patientLocationName,
      placeId: patientPlaceId,
      postcode: patientPostcode,
      state: patientState,
      telephone: patientTelephone,
    }, {
      address1: interlocutorAddress1,
      city: interlocutorCity,
      country: interlocutorCountry,
      geometry: interlocutorGeometry,
      isoCountry: interlocutorISOCountry,
      name: interlocutorOrganisation,
      placeId: interlocutorPlaceId,
      postcode: interlocutorPostcode,
      state: interlocutorState,
      telephone: interlocutorTelephone,
    });
  }

  updatePatientLocalityFromLookup(suggest) {
    const {
      patientAddress1,
      patientCountry,
      patientGeometry,
      patientISOCountry,
      patientLocationName,
      patientPlaceId,
      patientPostcode,
      patientState,
      patientSuburb,
      patientTelephone,
      updatePatientLocality,
    } = this.props;

    updatePatientLocality(suggest, {
      patientAddress1,
      patientCountry,
      patientGeometry,
      patientISOCountry,
      patientLocationName,
      patientPlaceId,
      patientPostcode,
      patientState,
      patientSuburb,
      patientTelephone,
    });
  }

  handleTopicUpdate(value) {
    const { currentCase, topic, updateCaseTopic, template, lookupMacroTemplate, executeMacro } = this.props;

    updateCaseTopic(topic, value);
    if (this.context.uiMode !== EDITTEMPLATE_UIMODE) {
      if (value.match(/^;.*;$/) && !_isUndefined(template)) {
        executeMacro(currentCase, template);
      } else if (value.replace(';', '').length >= 3) {
        lookupMacroTemplate(value.replace(/;/g, ''));
      }
    }
  }

  render() {
    const {
        type,
        markAsCase, markAsInquiry, markAsHoax,

        topic,

        macro,
        updateTemplateMacro,
        isValidMacro,

        interlocutorName,
        updateInterlocutorName,
        interlocutorMediumDetail,
        updateInterlocutorMediumDetail,
        interlocutorPostcode,
        updateInterlocutorPostcode,
        interlocutorDirection,
        updateInterlocutorDirection,
        interlocutorOrganisation,
        updateInterlocutorOrganisation,
        interlocutorCategory,

        patientName,
        updatePatientName,
        patientAge,
        patientAgeUnits,
        patientAgeYears,
        updatePatientAge,
        patientAgeGroup,
        patientWeight,
        updatePatientWeight,
        patientWeightUnits,
        patientSex,
        updatePatientSex,
        patientCategory,
        updatePatientCategory,
        patientAnimalType,
        updatePatientAnimalType,
        patientRiskAssessment,
        updatePatientRiskAssessment,
        patientPoisonSeverityScore,
        updatePatientPoisonSeverityScore,

        patientCircumstance,
        updatePatientCircumstance,
        patientLocation,
        updatePatientLocation,
        patientPostcode,
        updatePatientPostcode,

        featuresDescriptorList,
        updateClinicalFeaturesDescriptorList,

        agentName,
        updateAgentName,
        agentQuantity,
        updateAgentQuantity,
        agentQuantityUnits,
        updateAgentQuantityUnits,
        agentQuantityUnknown,
        updateAgentQuantityUnknown,
        agentTimeOfExposure,
        updateAgentTimeOfExposure,
        agentDuration,
        updateAgentDuration,
        agentDurationUnits,
        updateAgentDurationUnits,
        agentDurationUnknown,
        updateAgentDurationUnknown,
        agentTypeOfExposure,
        updateAgentTypeOfExposure,
        agentRouteOfExposure,
        updateAgentRouteOfExposure,
        agents,
        addAgent,

        userSPIFull,
        orgCountry,
        appKey,
        intl,
    } = this.props;

    const timeSince = getTimeSince(agentTimeOfExposure);
    if (timeSince.time === '' && this.timeSinceTime) {
      this.timeSinceTime.value = '';
    }
    if (timeSince.units === '' && this.timeSinceUnits) {
      this.timeSinceUnits.value = '';
    }

    const clinicalFeaturesOptions = getClinicalFeaturesOptions();
    const selectedDescriptors = _at(_keyBy(getClinicalFeaturesOptions(), 'id'), featuresDescriptorList);
    const agentRouteOfExposureList = _filter(getRouteOfExposureOptions(), (o) => _includes(agentRouteOfExposure, o.label));

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <FormGroup style={{ marginLeft: '1rem' }}>
              <ControlLabel style={{ marginRight: '1rem' }}>Record Type</ControlLabel>
              <Radio
                name="caseType"
                inline value="case"
                checked={type === 'case'}
                aria-checked={type === 'case'}
                tabIndex={type === 'case' ? 0 : -1}
                onChange={() => markAsCase()}
              >
                <Glyphicon glyph="folder-close" style={{ marginRight: '0.5rem' }} /> <FormattedMessage {...casemessages['type.case']} />
              </Radio>
              {' '}
              <Radio
                name="caseType"
                inline value="inquiry"
                checked={type === 'inquiry'}
                aria-checked={type === 'inquiry'}
                tabIndex={type === 'inquiry' ? 0 : -1}
                onChange={() => markAsInquiry()}
              >
                <Glyphicon glyph="question-sign" style={{ marginRight: '0.5rem' }} /> <FormattedMessage {...casemessages['type.inquiry']} />
              </Radio>
              {' '}
              <Radio
                name="caseType"
                inline
                value="hoax"
                checked={type === 'hoax'}
                aria-checked={type === 'hoax'}
                tabIndex={type === 'hoax' ? 0 : -1}
                onChange={() => markAsHoax()}
              >
                <Glyphicon glyph="warning-sign" style={{ marginRight: '0.5rem' }} /> <FormattedMessage {...casemessages['type.hoax']} />
              </Radio>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FieldGroup
              id="topic"
              type="text"
              label="Topic"
              value={topic}
              groupStyle={{ marginLeft: '1rem', marginRight: '1rem' }}
              onChange={(e) => this.handleTopicUpdate(e.target.value)}
              disabled={isDisabled(this.props, this.context)}
            />
          </Col>
        </Row>
        {this.context.uiMode === EDITTEMPLATE_UIMODE
          ? <Row>
            <Col xs={12}>
              <FieldGroup
                id="macro"
                type="text"
                label={<FormattedMessage {...patientmessages['field.macro']} />}
                value={macro}
                groupStyle={{ marginLeft: '1rem', marginRight: '1rem' }}
                onChange={(e) => updateTemplateMacro(macro, e.target.value)}
                disabled={isDisabled(this.props, this.context)}
                style={!isValidMacro ? { border: '1px solid #ff0000' } : null}
                help={!isValidMacro ? (_isEmpty(macro) ? <FormattedMessage {...patientmessages['field.macro.required']} /> : <FormattedMessage {...patientmessages['field.macro.invalid']} />) : null}
              />
            </Col>
          </Row>
          : null}
        {this.context.uiMode !== EDITTEMPLATE_UIMODE
          ? <Row>
            <Col xs={12}>
              <Fieldset>
                <legend>Caller</legend>

                <Row>
                  <Col xs={6}>
                    <FieldGroup
                      id="interlocutorName"
                      type="text"
                      label="Caller Name"
                      value={interlocutorName}
                      onChange={(e) => updateInterlocutorName(e.target.value, appKey)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </Col>
                  <Col xs={4}>
                    <FieldGroup
                      id="interlocutorMediumDetail"
                      type="text"
                      label="Phone"
                      value={interlocutorMediumDetail}
                      onChange={(e) => updateInterlocutorMediumDetail(e.target.value, appKey)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </Col>
                  <Col xs={2}>
                    <FormGroup>
                      <ControlLabel>Direction</ControlLabel><br />
                      <Radio
                        name="interlocutorDirection"
                        inline
                        value="incoming"
                        checked={interlocutorDirection === 'incoming'}
                        onChange={(e) => updateInterlocutorDirection(e.target.value)}
                      >
                        {'Incoming'}
                      </Radio><br />
                      <Radio
                        name="interlocutorDirection"
                        inline
                        value="outgoing"
                        checked={interlocutorDirection === 'outgoing'}
                        onChange={(e) => updateInterlocutorDirection(e.target.value)}
                      >
                        {'Outgoing'}
                      </Radio>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <ControlLabel>Organisation Name/Locality</ControlLabel>
                    <StyledGeosuggest
                      id="interlocutorOrganisation"
                      inputClassName="form-control"
                      suggestsClassName="list-group"
                      suggestItemClassName="list-group-item"
                      suggestItemActiveClassName="active"
                      initialValue={interlocutorOrganisation}
                      onSuggestSelect={updateInterlocutorOrganisation}
                      disabled={isDisabled(this.props, this.context)}
                      country={!_isEmpty(orgCountry) ? [orgCountry] : null}
                    />
                  </Col>
                  <Col xs={4}>
                    <FieldGroup
                      id="interlocutorPostcode"
                      type="text"
                      label="Postcode"
                      value={interlocutorPostcode}
                      onChange={(e) => updateInterlocutorPostcode(e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </Col>
                  <Col xs={4}>
                    <FieldSelectGroup
                      id="category"
                      label="Caller Category"
                      options={getInterlocutorCategoryOptions()}
                      value={interlocutorCategory}
                      onChange={(e) => this.updateCategory(e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </Col>
                </Row>
              </Fieldset>
            </Col>
          </Row>
          : null}
        {type === 'case'
          ? <Row>
            <Col xs={12}>
              <Fieldset>
                <legend>Patient</legend>

                <Row>
                  <Col xs={12}>
                    <Row>
                      <Col xs={6}>
                        <ControlLabel>
                          Patient Name
                          {this.context.uiMode !== EDITTEMPLATE_UIMODE
                            ? <Checkbox
                              inline
                              style={{ marginLeft: '1rem' }}
                              value
                              onChange={() => updatePatientName(patientName, interlocutorName, appKey)}
                              disabled={isDisabled(this.props, this.context)}
                            >
                              {'from Caller'}
                            </Checkbox>
                            : null}
                        </ControlLabel>
                        <FormControl
                          id="patientName"
                          type="text"
                          label="Patient Name"
                          value={patientName}
                          onChange={(e) => updatePatientName(patientName, e.target.value, appKey)}
                          disabled={isDisabled(this.props, this.context)}
                        />
                      </Col>
                      <Col xs={2}>
                        <FieldSelectGroup
                          id="patientSex"
                          label="Sex"
                          options={getSexOptions()}
                          value={patientSex}
                          onChange={(e) => updatePatientSex(patientSex, e.target.value)}
                        />
                      </Col>
                      <Col xs={2}>
                        <ControlLabel>&nbsp;</ControlLabel>
                        <FormGroup>
                          <Radio
                            name="patientCategory"
                            inline
                            value="human"
                            checked={patientCategory === 'human'}
                            onChange={(e) => updatePatientCategory(patientCategory, e.target.value)}
                            disabled={isDisabled(this.props, this.context)}
                          >
                            {'Human'}
                          </Radio><br />
                          <Radio
                            name="patientCategory"
                            inline
                            value="animal"
                            checked={patientCategory === 'animal'}
                            onChange={(e) => updatePatientCategory(patientCategory, e.target.value)}
                            disabled={isDisabled(this.props, this.context)}
                          >
                            {'Animal'}
                          </Radio>
                        </FormGroup>
                      </Col>
                      {patientCategory === 'animal' ?
                        <Col xs={2}>
                          <FieldSelectGroup
                            id="animalType"
                            label="Animal Type"
                            options={getAnimalTypeOptions()}
                            value={patientAnimalType}
                            onChange={(e) => updatePatientAnimalType(patientAnimalType, e.target.value)}
                            disabled={isDisabled(this.props, this.context)}
                          />
                        </Col> : ''}
                    </Row>
                    <Row>
                      {isHuman(patientCategory)
                        ? <Col xs={3}>
                          <FieldGroup
                            id="patientAge"
                            type="number"
                            label="Age"
                            value={patientAge}
                            onKeyPress={numberFieldKeyPressHandler}
                            onChange={(e) => ageFieldChangeHandler(e, updatePatientAge, patientAge, patientAgeUnits, patientAgeGroup, patientAgeYears, patientCategory)}
                            onBlur={(e) => ageFieldBlurHandler(e, updatePatientAge, patientAge, patientAgeUnits, patientAgeGroup, patientAgeYears, patientCategory)}
                            disabled={isDisabled(this.props, this.context)}
                          />
                        </Col>
                        : null}
                      {isHuman(patientCategory)
                        ? <Col xs={2}>
                          <FieldSelectGroup
                            id="patientAgeUnits"
                            label="&nbsp;"
                            options={getAgeUnitsOptions()}
                            value={patientAgeUnits}
                            onChange={(e) => updatePatientAge(patientAge, patientAge, patientAgeUnits, e.target.value, patientAgeGroup, patientAgeYears)}
                            disabled={isDisabled(this.props, this.context)}
                          />
                        </Col>
                        : null}
                      <Col xs={3}>
                        <FieldGroup
                          id="patientWeight"
                          type="number"
                          label={<FormattedMessage {...patientmessages['field.weight']} />}
                          value={patientWeight}
                          onKeyPress={numberFieldKeyPressHandler}
                          onChange={(e) => weightFieldChangeHandler(e, updatePatientWeight, patientWeight, patientWeightUnits)}
                          onBlur={(e) => weightFieldBlurHandler(e, updatePatientWeight, patientWeight, patientWeightUnits)}
                          disabled={isDisabled(this.props, this.context)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      {isHuman(patientCategory)
                        ? <Col xs={4}>
                          <FormGroup>
                            <ControlLabel>Circumstance</ControlLabel>
                            <Typeahead
                              clearButton
                              options={getCircumstanceOptions()}
                              selected={[patientCircumstance]}
                              onChange={(values) => typeaheadOnChangeHandler(patientCircumstance, values, updatePatientCircumstance)}
                              bodyContainer
                            />
                          </FormGroup>
                        </Col>
                        : null}
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <ControlLabel>
                          Exposure Locality
                          {this.context.uiMode !== EDITTEMPLATE_UIMODE
                            ? <Checkbox
                              inline
                              style={{ marginLeft: '1rem' }}
                              value
                              onChange={this.updatePatientLocalityFromCaller}
                              disabled={isDisabled(this.props, this.context)}
                            >
                              {'from Caller'}
                            </Checkbox>
                            : null}
                        </ControlLabel>
                        <StyledGeosuggest
                          id="patientLocation"
                          inputClassName="form-control"
                          suggestsClassName="list-group"
                          suggestItemClassName="list-group-item"
                          suggestItemActiveClassName="active"
                          onSuggestSelect={this.updatePatientLocalityFromLookup}
                          disabled={isDisabled(this.props, this.context)}
                          country={!_isEmpty(orgCountry) ? [orgCountry] : null}
                        />
                      </Col>
                      <Col xs={4}>
                        <FieldGroup
                          id="patientPostcode"
                          type="text"
                          label={'Postcode of Exposure'}
                          value={patientPostcode}
                          onChange={(e) => updatePatientPostcode(patientPostcode, e.target.value)}
                          disabled={isDisabled(this.props, this.context)}
                        />
                      </Col>
                      <Col xs={4}>
                        <FormGroup>
                          <ControlLabel>Location Type</ControlLabel>
                          <Typeahead
                            clearButton
                            options={getLocationOptions()}
                            selected={[patientLocation]}
                            onChange={(values) => typeaheadOnChangeHandler(patientLocation, values, updatePatientLocation)}
                            bodyContainer
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Fieldset>
            </Col>
          </Row>
          : null}
        {type === 'case'
          ? <Row>
            <Col xs={12}>
              {isHuman(patientCategory)
                ? <Fieldset>
                  <legend>Poisoning Risk Assessment</legend>
                  <Row>
                    <Col xs={4}>
                      <FieldSelectGroup
                        id="riskassessment"
                        label={intl.formatMessage(patientmessages['field.riskassessment'])}
                        options={getRiskAssessmentOptions()}
                        value={patientRiskAssessment}
                        onChange={(e) => updatePatientRiskAssessment(patientRiskAssessment, e.target.value)}
                        disabled={isDisabled(this.props, this.context)}
                      />
                    </Col>
                    <Col xs={4}>
                      <FieldSelectGroup
                        id="poisonseverityscore"
                        label={intl.formatMessage(patientmessages['field.poisonseverityscore'])}
                        options={getPoisonSeverityScoreOptions()}
                        value={patientPoisonSeverityScore}
                        onChange={(e) => updatePatientPoisonSeverityScore(patientPoisonSeverityScore, e.target.value)}
                        disabled={isDisabled(this.props, this.context)}
                      />
                    </Col>
                  </Row>
                </Fieldset>
                : null}
            </Col>
          </Row>
          : null}
        {type === 'case'
          ? <Row>
            <Col xs={12}>
              <Fieldset>
                <legend>Clinical Features</legend>
                <Row>
                  <Col xs={5}>
                    <FormGroup>
                      <ControlLabel><FormattedMessage {...featuresmessages['field.features']} /></ControlLabel>
                      <Typeahead
                        clearButton
                        multiple
                        options={clinicalFeaturesOptions}
                        selected={selectedDescriptors}
                        renderMenu={renderTypeaheadMenu}
                        onChange={(values) => {
                          if (!_isEmpty(values) && !_isObject(values[0])) {
                            return;
                          }
                          typeaheadOnChangeHandler(undefined, values, updateClinicalFeaturesDescriptorList, true);
                        }}
                        bodyContainer
                        disabled={isDisabled(this.props, this.context)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Fieldset>
            </Col>
          </Row>
          : null}
        <Row>
          <Col xs={12}>
            <Fieldset>
              <legend><FormattedMessage {...agentmessages['section.callerAgents']} /></legend>
              <Row className={'equal'}>
                <Col xs={6}>
                  <Row>
                    <Col xs={12}>
                      <FieldGroup
                        id="agentName"
                        type="text"
                        label={intl.formatMessage(agentmessages['field.name'])}
                        value={agentName}
                        onChange={(e) => updateAgentName(e.target.value)}
                        disabled={isDisabled(this.props, this.context)}
                      />
                    </Col>
                  </Row>
                  {type === 'case'
                    ? <Row>
                      <Col xs={5}>
                        <FieldGroup
                          id="agentQuantity"
                          type="number"
                          label="Quantity"
                          value={agentQuantity}
                          onChange={(e) => updateAgentQuantity(e.target.value)}
                          disabled={isDisabled(this.props, this.context)}
                        />
                      </Col>
                      <Col xs={3}>
                        <FieldSelectGroup
                          id="agentQuantityUnits"
                          label="Units"
                          options={getQuantityUnitsOptions()}
                          value={agentQuantityUnits}
                          onChange={(e) => updateAgentQuantityUnits(e.target.value)}
                        />
                      </Col>
                      <Col xs={2}>
                        <FormGroup>
                          <ControlLabel>&nbsp;</ControlLabel>
                          <Checkbox
                            name="agentQuantityUnknown"
                            value
                            checked={agentQuantityUnknown}
                            onChange={(e) => updateAgentQuantityUnknown(e.target.checked)}
                          >
                            {'Unknown'}
                          </Checkbox>
                        </FormGroup>
                      </Col>
                    </Row>
                    : null }
                  {type === 'case'
                    ? <Row>
                      <Col xs={5}>
                        <FieldGroup
                          id="agentTimeSinceExposure"
                          inputRef={(timeSinceTime) => { this.timeSinceTime = timeSinceTime; }}
                          type="text"
                          label="Time Since Exposure"
                          defaultValue={timeSince.time}
                          onKeyPress={(e) => {
                            const key = e.which ? e.which : e.keyCode;
                            if ((!(key >= 48 && key <= 57) && key !== 46) || (key === 46 && e.target.value.match(/\./))) {
                              e.preventDefault();
                              return false;
                            }
                            return true;
                          }}
                          onChange={(e) => {
                            const time = parseInt(e.target.value.toString().trim(), 10);
                            if (_isNaN(time) || time === 0) {
                              this.timeSinceUnits.disabled = true;
                            } else {
                              this.timeSinceUnits.disabled = false;
                              updateAgentTimeOfExposure(e.target.value, this.timeSinceUnits.value);
                            }
                          }}
                          disabled={isDisabled(this.props, this.context)}
                        />
                      </Col>
                      <Col xs={3}>
                        <FieldSelectGroup
                          id="agentTimeSinceExposureUnits"
                          inputRef={(timeSinceUnits) => { this.timeSinceUnits = timeSinceUnits; }}
                          label="Units"
                          value={timeSince.units}
                          onChange={(e) => {
                            if (!_isNaN(this.timeSinceTime.value) && parseInt(this.timeSinceTime.value, 10) !== 0) {
                              updateAgentTimeOfExposure(this.timeSinceTime.value, e.target.value);
                            }
                          }}
                          options={getTimeSinceUnitsOptions()}
                          disabled={isDisabled(this.props, this.context) || this.isTimeSinceExposureUnitsDisabled(timeSince)}
                        />
                      </Col>
                      <Col xs={4}>
                        <ControlLabel>Time of Exposure</ControlLabel>
                        <DateTime
                          inputProps={{ disabled: true }}
                          dateFormat="YYYY-MM-DD"
                          timeFormat="HH:mm"
                          value={agentTimeOfExposure}
                        />
                      </Col>
                    </Row>
                    : null }
                  { type === 'case'
                    ? <Row>
                      <Col xs={5}>
                        <FieldGroup
                          id="agentDuration"
                          type="number"
                          label="Duration"
                          value={agentDuration}
                          onChange={(e) => updateAgentDuration(e.target.value)}
                          disabled={isDisabled(this.props, this.context)}
                        />
                      </Col>
                      <Col xs={3}>
                        <FieldSelectGroup
                          id="agentDurationUnits"
                          label="Units"
                          options={getDurationUnitsOptions()}
                          value={agentDurationUnits}
                          onChange={(e) => updateAgentDurationUnits(e.target.value)}
                        />
                      </Col>
                      <Col xs={2}>
                        <FormGroup>
                          <ControlLabel>&nbsp;</ControlLabel>
                          <Checkbox
                            name="agentDurationUnknown"
                            value
                            checked={agentDurationUnknown}
                            onChange={(e) => updateAgentDurationUnknown(e.target.checked)}
                          >
                            {'Unknown'}
                          </Checkbox>
                        </FormGroup>
                      </Col>
                    </Row>
                    : null }
                  { type === 'case'
                    ? <Row>
                      <Col xs={5}>
                        <FieldSelectGroup
                          id="agentTypeOfExposure"
                          label="Type of Exposure"
                          options={getTypeOfExposureOptions()}
                          value={agentTypeOfExposure}
                          onChange={(e) => updateAgentTypeOfExposure(e.target.value)}
                        />
                      </Col>
                      <Col xs={7}>
                        <ControlLabel>Route of Exposure</ControlLabel>
                        <Typeahead
                          clearButton
                          multiple
                          dropup
                          options={getRouteOfExposureOptions()}
                          selected={agentRouteOfExposureList}
                          onChange={(values) => {
                            if (!_isEmpty(values) && !_isObject(values[0])) {
                              return;
                            }
                            typeaheadOnChangeHandler(undefined, _map(values, 'label'), updateAgentRouteOfExposure, true);
                          }}
                          bodyContainer
                          disabled={isDisabled(this.props, this.context)}
                        />
                      </Col>
                    </Row>
                    : null }
                </Col>
                <Col xs={2} className="vbottom">
                  <Button
                    bsStyle="primary"
                    onClick={() => addAgent(agentName, agentQuantity, agentQuantityUnits, agentQuantityUnknown, agentTimeOfExposure, agentDuration, agentDurationUnits, agentDurationUnknown, agentTypeOfExposure, agentRouteOfExposure, userSPIFull)}
                    style={{ marginTop: '2.6rem' }}
                  >
                    Add <Glyphicon glyph="chevron-right" />
                  </Button>
                </Col>
                <Col xs={4}>
                  <Table striped bordered condensed style={{ marginTop: '2.6rem' }}>
                    <tbody>
                      {agents.length > 0 ?
                          agents.map((agent, i) => (
                            <tr key={i}>
                              <td>{agent.name !== '' ? agent.name : (agent.centreAgents.length > 0 ? _map(agent.centreAgents, 'name').join(', ') : 'unnamed')} ({agent.dosage.quantity ? `${agent.dosage.quantity} ${agent.dosage.units}` : 'unknown quantity'})</td>
                            </tr>
                          )) :
                            <tr><td><FormattedMessage {...agentmessages['message.none']} /></td></tr>
                      }
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Fieldset>
          </Col>

        </Row>
      </Grid>
    );
  }
}
/* eslint-enable no-nested-ternary */

QuickView.propTypes = {
  addAgent: PropTypes.func,
  agentDuration: PropTypes.string,
  agentDurationUnits: PropTypes.string,
  agentDurationUnknown: PropTypes.bool,
  agentName: PropTypes.string,
  agentQuantity: PropTypes.string,
  agentQuantityUnits: PropTypes.string,
  agentQuantityUnknown: PropTypes.bool,
  agentRouteOfExposure: PropTypes.array,
  agentTimeOfExposure: PropTypes.string,
  agentTypeOfExposure: PropTypes.string,
  agents: PropTypes.array,
  appKey: PropTypes.object,
  currentCase: PropTypes.object,
  executeMacro: PropTypes.func,
  features: PropTypes.array,
  featuresDescriptorList: PropTypes.array,
  interlocutorAddress1: PropTypes.string,
  interlocutorCategory: PropTypes.string,
  interlocutorCity: PropTypes.string,
  interlocutorCountry: PropTypes.string,
  interlocutorDirection: PropTypes.string,
  interlocutorGeometry: PropTypes.object,
  interlocutorISOCountry: PropTypes.string,
  interlocutorMediumDetail: PropTypes.string,
  interlocutorName: PropTypes.string,
  interlocutorOrganisation: PropTypes.string,
  interlocutorPlaceId: PropTypes.string,
  interlocutorPostcode: PropTypes.string,
  interlocutorState: PropTypes.string,
  interlocutorTelephone: PropTypes.string,
  intl: PropTypes.object,
  isValidMacro: PropTypes.bool,
  lookupMacroTemplate: PropTypes.func,
  macro: PropTypes.string,
  markAsCase: PropTypes.func,
  markAsHoax: PropTypes.func,
  markAsInquiry: PropTypes.func,
  orgCountry: PropTypes.string,
  patientAddress1: PropTypes.string,
  patientAge: PropTypes.string,
  patientAgeGroup: PropTypes.string,
  patientAgeUnits: PropTypes.string,
  patientAgeYears: PropTypes.string,
  patientAnimalType: PropTypes.string,
  patientCategory: PropTypes.string,
  patientCircumstance: PropTypes.string,
  patientCountry: PropTypes.string,
  patientGeometry: PropTypes.object,
  patientISOCountry: PropTypes.string,
  patientLocation: PropTypes.string,
  patientLocationName: PropTypes.string,
  patientName: PropTypes.string,
  patientPlaceId: PropTypes.string,
  patientPoisonSeverityScore: PropTypes.string,
  patientPostcode: PropTypes.string,
  patientRiskAssessment: PropTypes.string,
  patientSex: PropTypes.string,
  patientState: PropTypes.string,
  patientSuburb: PropTypes.string,
  patientTelephone: PropTypes.string,
  patientWeight: PropTypes.string,
  patientWeightUnits: PropTypes.string,
  template: PropTypes.object,
  topic: PropTypes.string,
  type: PropTypes.string,
  updateAgentDuration: PropTypes.func,
  updateAgentDurationUnits: PropTypes.func,
  updateAgentDurationUnknown: PropTypes.func,
  updateAgentName: PropTypes.func,
  updateAgentQuantity: PropTypes.func,
  updateAgentQuantityUnits: PropTypes.func,
  updateAgentQuantityUnknown: PropTypes.func,
  updateAgentRouteOfExposure: PropTypes.func,
  updateAgentTimeOfExposure: PropTypes.func,
  updateAgentTypeOfExposure: PropTypes.func,
  updateCaseTopic: PropTypes.func,
  updateClinicalFeaturesDescriptorList: PropTypes.func,
  updateInterlocutorAddress1: PropTypes.func,
  updateInterlocutorCategory: PropTypes.func,
  updateInterlocutorCity: PropTypes.func,
  updateInterlocutorDirection: PropTypes.func,
  updateInterlocutorMediumDetail: PropTypes.func,
  updateInterlocutorName: PropTypes.func,
  updateInterlocutorOrganisation: PropTypes.func,
  updateInterlocutorPostcode: PropTypes.func,
  updateInterlocutorState: PropTypes.func,
  updateInterlocutorTelephone: PropTypes.func,
  updatePatientAge: PropTypes.func,
  updatePatientAnimalType: PropTypes.func,
  updatePatientCategory: PropTypes.func,
  updatePatientCircumstance: PropTypes.func,
  updatePatientLocality: PropTypes.func,
  updatePatientLocation: PropTypes.func,
  updatePatientName: PropTypes.func,
  updatePatientPoisonSeverityScore: PropTypes.func,
  updatePatientPostcode: PropTypes.func,
  updatePatientRiskAssessment: PropTypes.func,
  updatePatientSex: PropTypes.func,
  updatePatientWeight: PropTypes.func,
  updateTemplateMacro: PropTypes.func,
  userSPIFull: PropTypes.object,
};

QuickView.contextTypes = {
  uiMode: PropTypes.string,
};

export default injectIntl(QuickView);
