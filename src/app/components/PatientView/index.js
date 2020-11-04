import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';

import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';
import _lowerCase from 'lodash/lowerCase';

import Checkbox from 'react-bootstrap/lib/Checkbox';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Grid from 'react-bootstrap/lib/Grid';
import Radio from 'react-bootstrap/lib/Radio';
import Row from 'react-bootstrap/lib/Row';

import StyledGeosuggest from 'components/StyledGeosuggest';
import Typeahead from 'components/StyledTypeahead';

import {
    FieldGroup,
    FieldSelectGroup,
    Fieldset,
    ageFieldBlurHandler,
    ageFieldChangeHandler,
    isDisabled,
    isHuman,
    numberFieldKeyPressHandler,
    typeaheadOnChangeHandler,
    weightFieldBlurHandler,
    weightFieldChangeHandler,
} from 'utils/helpers';

import {
    getAgeGroupOptions,
    getAgeUnitsOptions,
    getAnimalTypeOptions,
    getCircumstanceOptions,
    getLocationOptions,
    getOccupationOptions,
    getPoisonSeverityScoreOptions,
    getRiskAssessmentOptions,
    getSexOptions,
} from 'utils/options';

import { EDITTEMPLATE_UIMODE } from 'containers/App/constants';

import messages from './messages';

export class PatientView extends React.Component {
  constructor(props) {
    super(props);

    this.updateLocalityFromCaller = this.updateLocalityFromCaller.bind(this);
    this.updateLocalityFromLookup = this.updateLocalityFromLookup.bind(this);
  }

  updateLocalityFromCaller() {
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
      address1,
      country,
      geometry,
      isoCountry,
      locationName,
      placeId,
      postcode,
      state,
      suburb,
      telephone,
      updateLocality,
    } = this.props;

    updateLocality(null, {
      address1,
      city: suburb,
      country,
      geometry,
      isoCountry,
      name: locationName,
      placeId,
      postcode,
      state,
      telephone,
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

  updateLocalityFromLookup(suggest) {
    const {
      address1,
      country,
      geometry,
      isoCountry,
      locationName,
      placeId,
      postcode,
      state,
      suburb,
      telephone,
      updateLocality,
    } = this.props;

    updateLocality(suggest, {
      address1,
      country,
      geometry,
      isoCountry,
      locationName,
      placeId,
      postcode,
      state,
      suburb,
      telephone,
    });
  }

  _handleTopicUpdate(value) {
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
      age,
      ageGroup,
      ageUnits,
      ageYears,
      animalType,
      appKey,
      category,
      circumstance,
      intl,
      isValidMacro,
      location,
      macro,
      medicalRecordNumber,
      name,
      occupation,
      orgCountry,
      poisonSeverityScore,
      postcode,
      pregnantLactating,
      pregnantStatus,
      pregnantTrimester,
      riskAssessment,
      sex,
      suburb,
      topic,
      updateAge,
      updateAgeGroup,
      updateAnimalType,
      updateCategory,
      updateCircumstance,
      updateLocation,
      updateMedicalRecordNumber,
      updateName,
      updateOccupation,
      updatePoisonSeverityScore,
      updatePostcode,
      updatePregnantLactating,
      updatePregnantStatus,
      updatePregnantTrimester,
      updateRiskAssessment,
      updateSex,
      updateSuburb,
      updateTemplateMacro,
      updateWeight,
      weight,
      weightUnits,
    } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Fieldset>
              <Row>
                <Col xs={12}>
                  <FieldGroup
                    id="topic"
                    type="text"
                    label={<FormattedMessage {...messages['field.topic']} />}
                    value={topic}
                    onChange={(e) => this._handleTopicUpdate(e.target.value)} // eslint-disable-line no-underscore-dangle
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
                      label={<FormattedMessage {...messages['field.macro']} />}
                      value={macro}
                      onChange={(e) => updateTemplateMacro(macro, e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                      style={!isDisabled(this.props, this.context) && !isValidMacro ? { border: '1px solid #ff0000' } : null}
                      help={!isDisabled(this.props, this.context) && !isValidMacro ? (_isEmpty(macro) ? <FormattedMessage {...messages['field.macro.required']} /> : <FormattedMessage {...messages['field.macro.invalid']} />) : null} // eslint-disable-line no-nested-ternary
                    />
                  </Col>
                </Row>
                : null}
              <Row>
                <Col xs={4}>
                  <FieldGroup
                    id="name"
                    type="text"
                    label={<FormattedMessage {...messages['field.name']} />}
                    value={name}
                    onChange={(e) => updateName(name, e.target.value, appKey)}
                    disabled={isDisabled(this.props, this.context)}
                  />
                </Col>
                <Col xs={3}>
                  <FieldSelectGroup
                    id="sex"
                    label={<FormattedMessage {...messages['field.sex']} />}
                    options={getSexOptions()}
                    value={_lowerCase(sex)}
                    onChange={(e) => updateSex(sex, e.target.value)}
                    disabled={isDisabled(this.props, this.context)}
                  />
                </Col>
                <Col xs={2}>
                  <ControlLabel>&nbsp;</ControlLabel>
                  <FormGroup>
                    <Radio name="category" inline value="human" checked={category === 'human'} onChange={(e) => updateCategory(category, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                      {'Human'}
                    </Radio><br />
                    <Radio name="category" inline value="animal" checked={category === 'animal'} onChange={(e) => updateCategory(category, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                      {'Animal'}
                    </Radio>
                  </FormGroup>
                </Col>
                {!isHuman(category)
                  ? <Col xs={3}>
                    <FieldSelectGroup
                      id="animalType"
                      label={<FormattedMessage {...messages['field.animalType']} />}
                      options={getAnimalTypeOptions()}
                      value={animalType}
                      onChange={(e) => updateAnimalType(animalType, e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </Col>
                  : null}
              </Row>
              <Row>
                {isHuman(category)
                  ? <Col xs={2}>
                    <FieldGroup
                      id="age"
                      label={<FormattedMessage {...messages['field.age']} />}
                      value={age}
                      onKeyPress={numberFieldKeyPressHandler}
                      onChange={(e) => ageFieldChangeHandler(e, updateAge, age, ageUnits, ageGroup, ageYears, category)}
                      onBlur={(e) => ageFieldBlurHandler(e, updateAge, age, ageUnits, ageGroup, ageYears, category)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </Col>
                  : null}
                {isHuman(category)
                  ? <Col xs={2}>
                    <FieldSelectGroup
                      id="ageUnits"
                      label="&nbsp;"
                      options={getAgeUnitsOptions()}
                      value={ageUnits}
                      onChange={(e) => updateAge(age, age, ageUnits, e.target.value, ageGroup, ageYears)}
                      disabled={isDisabled(this.props, this.context)}
                      noblank
                    />
                  </Col>
                  : null}
                {isHuman(category)
                  ? <Col xs={2}>
                    <FieldSelectGroup
                      id="ageGroup"
                      label={<FormattedMessage {...messages['field.ageGroup']} />}
                      options={getAgeGroupOptions()}
                      value={ageGroup}
                      onChange={(e) => updateAgeGroup(ageGroup, e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </Col>
                  : null}
                <Col xs={2}>
                  <FieldGroup
                    id="weight"
                    type="number"
                    label={<FormattedMessage {...messages['field.weight']} />}
                    value={weight}
                    onKeyPress={numberFieldKeyPressHandler}
                    onChange={(e) => weightFieldChangeHandler(e, updateWeight, weight, weightUnits)}
                    onBlur={(e) => weightFieldBlurHandler(e, updateWeight, weight, weightUnits)}
                    disabled={isDisabled(this.props, this.context)}
                  />
                </Col>
              </Row>
              {isHuman(category)
                ? <Row>
                  <Col xs={4}>
                    <FormGroup>
                      <ControlLabel><FormattedMessage {...messages['field.circumstance']} /></ControlLabel>
                      <Typeahead
                        clearButton
                        options={getCircumstanceOptions()}
                        selected={_isEmpty(circumstance) ? [] : [circumstance]}
                        onChange={(values) => typeaheadOnChangeHandler(_isEmpty(circumstance) ? '' : circumstance, values, updateCircumstance)}
                        bodyContainer
                        disabled={isDisabled(this.props, this.context)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={4}>
                    <FieldSelectGroup
                      id="occupation"
                      label={<FormattedMessage {...messages['field.occupation']} />}
                      options={getOccupationOptions()}
                      value={occupation}
                      onChange={(e) => updateOccupation(occupation, e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </Col>
                  <Col xs={4}>
                    <FieldGroup
                      id="medicalRecordNumber"
                      type="text"
                      label={<FormattedMessage {...messages['field.mrn']} />}
                      value={medicalRecordNumber}
                      onChange={(e) => updateMedicalRecordNumber(medicalRecordNumber, e.target.value, appKey)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </Col>
                </Row>
                : null }
            </Fieldset>
            <Fieldset>
              <legend>Location of Exposure</legend>
              <Row>
                <Col xs={4}>
                  <ControlLabel>
                    Organisation Name/Locality
                    {this.context.uiMode !== EDITTEMPLATE_UIMODE
                      ? <Checkbox
                        inline
                        style={{ marginLeft: '1rem' }}
                        value
                        onChange={this.updateLocalityFromCaller}
                        disabled={isDisabled(this.props, this.context)}
                      >
                        {'from Caller'}
                      </Checkbox>
                      : null}
                  </ControlLabel>
                  <StyledGeosuggest
                    id="location"
                    inputClassName="form-control"
                    suggestsClassName="list-group"
                    suggestItemClassName="list-group-item"
                    suggestItemActiveClassName="active"
                    onSuggestSelect={this.updateLocalityFromLookup}
                    disabled={isDisabled(this.props, this.context)}
                    country={!_isEmpty(orgCountry) ? [orgCountry] : null}
                  />
                </Col>
                <Col xs={4}>
                  <FormGroup>
                    <ControlLabel><FormattedMessage {...messages['field.location']} /></ControlLabel>
                    <Typeahead
                      clearButton
                      options={getLocationOptions()}
                      selected={_isEmpty(location) ? [] : [location]}
                      onChange={(values) => typeaheadOnChangeHandler(_isEmpty(location) ? '' : location, values, updateLocation)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <FieldGroup
                    id="city"
                    type="text"
                    label="Suburb"
                    value={suburb}
                    onChange={(e) => updateSuburb(suburb, e.target.value)}
                    disabled={isDisabled(this.props, this.context)}
                  />
                </Col>
                <Col xs={4}>
                  <FieldGroup
                    id="postcode"
                    type="text"
                    label={<FormattedMessage {...messages['field.postcode']} />}
                    value={postcode}
                    onChange={(e) => updatePostcode(postcode, e.target.value)}
                    disabled={isDisabled(this.props, this.context)}
                  />
                </Col>
              </Row>
            </Fieldset>
            {sex === 'female' ? <Fieldset>
              <legend>Pregnancy Status</legend>
              <Col xs={4}>
                <FormGroup>
                  <ControlLabel>Pregnancy Status</ControlLabel><br />
                  <Radio name="pregnantStatus" inline value="yes" checked={pregnantStatus === 'yes'} onChange={(e) => updatePregnantStatus(pregnantStatus, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                    {'Yes'}
                  </Radio><br />
                  <Radio name="pregnantStatus" inline value="no" checked={pregnantStatus === 'no'} onChange={(e) => updatePregnantStatus(pregnantStatus, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                    {'No'}
                  </Radio><br />
                  <Radio name="pregnantStatus" inline value="uncertain" checked={pregnantStatus === 'uncertain'} onChange={(e) => updatePregnantStatus(pregnantStatus, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                    {'Uncertain'}
                  </Radio><br />
                  <Radio name="pregnantStatus" inline value="unknown" checked={pregnantStatus === 'unknown'} onChange={(e) => updatePregnantStatus(pregnantStatus, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                    {'Unknown'}
                  </Radio>
                </FormGroup>
              </Col>
              <Col xs={4}>
                <FormGroup>
                  <ControlLabel>Trimester</ControlLabel><br />
                  <Radio name="pregnantTrimester" inline value="1" checked={pregnantTrimester.toString() === '1'} onChange={(e) => updatePregnantTrimester(pregnantTrimester, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                    {'1'}
                  </Radio><br />
                  <Radio name="pregnantTrimester" inline value="2" checked={pregnantTrimester.toString() === '2'} onChange={(e) => updatePregnantTrimester(pregnantTrimester, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                    {'2'}
                  </Radio><br />
                  <Radio name="pregnantTrimester" inline value="3" checked={pregnantTrimester.toString() === '3'} onChange={(e) => updatePregnantTrimester(pregnantTrimester, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                    {'3'}
                  </Radio><br />
                  <Radio name="pregnantTrimester" inline value="unknown" checked={pregnantTrimester.toString() === 'unknown'} onChange={(e) => updatePregnantTrimester(pregnantTrimester, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                    {'Unknown'}
                  </Radio>
                </FormGroup>
              </Col>
              <Col xs={4}>
                <FormGroup>
                  <ControlLabel>Lactating</ControlLabel><br />
                  <Radio name="pregnantLactating" inline value="yes" checked={pregnantLactating === 'yes'} onChange={(e) => updatePregnantLactating(pregnantLactating, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                    {'Yes'}
                  </Radio><br />
                  <Radio name="pregnantLactating" inline value="no" checked={pregnantLactating === 'no'} onChange={(e) => updatePregnantLactating(pregnantLactating, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                    {'No'}
                  </Radio><br />
                  <Radio name="pregnantLactating" inline value="unknown" checked={pregnantLactating === 'unknown'} onChange={(e) => updatePregnantLactating(pregnantLactating, e.target.value)} disabled={isDisabled(this.props, this.context)}>
                    {'Unknown'}
                  </Radio>
                </FormGroup>
              </Col>
            </Fieldset> : null }
            {isHuman(category)
              ? <Fieldset>
                <legend>Poisoning Risk Assessment</legend>
                <Row>
                  <Col xs={4}>
                    <FieldSelectGroup
                      id="riskassessment"
                      label={intl.formatMessage(messages['field.riskassessment'])}
                      options={getRiskAssessmentOptions()}
                      value={riskAssessment}
                      onChange={(e) => updateRiskAssessment(riskAssessment, e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </Col>
                  <Col xs={4}>
                    <FieldSelectGroup
                      id="poisonseverityscore"
                      label={intl.formatMessage(messages['field.poisonseverityscore'])}
                      options={getPoisonSeverityScoreOptions()}
                      value={poisonSeverityScore}
                      onChange={(e) => updatePoisonSeverityScore(poisonSeverityScore, e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </Col>
                </Row>
              </Fieldset>
              : null }
          </Col>
        </Row>
      </Grid>
    );
  }
}

PatientView.propTypes = {
  address1: PropTypes.string,
  age: PropTypes.string,
  ageGroup: PropTypes.string,
  ageUnits: PropTypes.string,
  ageYears: PropTypes.string,
  animalType: PropTypes.string,
  appKey: PropTypes.object,
  category: PropTypes.string,
  circumstance: PropTypes.string,
  country: PropTypes.string,
  currentCase: PropTypes.object,
  executeMacro: PropTypes.func,
  geometry: PropTypes.object,
  interlocutorAddress1: PropTypes.string,
  interlocutorCity: PropTypes.string,
  interlocutorCountry: PropTypes.string,
  interlocutorGeometry: PropTypes.object,
  interlocutorISOCountry: PropTypes.string,
  interlocutorOrganisation: PropTypes.string,
  interlocutorPlaceId: PropTypes.string,
  interlocutorPostcode: PropTypes.string,
  interlocutorState: PropTypes.string,
  interlocutorTelephone: PropTypes.string,
  intl: PropTypes.object,
  isoCountry: PropTypes.string,
  isValidMacro: PropTypes.bool,
  location: PropTypes.string,
  locationName: PropTypes.string,
  lookupMacroTemplate: PropTypes.func,
  macro: PropTypes.string,
  medicalRecordNumber: PropTypes.string,
  name: PropTypes.string,
  occupation: PropTypes.string,
  orgCountry: PropTypes.string,
  placeId: PropTypes.string,
  poisonSeverityScore: PropTypes.string,
  postcode: PropTypes.string,
  pregnantLactating: PropTypes.string,
  pregnantStatus: PropTypes.string,
  pregnantTrimester: PropTypes.string,
  riskAssessment: PropTypes.string,
  sex: PropTypes.string,
  state: PropTypes.string,
  suburb: PropTypes.string,
  telephone: PropTypes.string,
  template: PropTypes.object,
  topic: PropTypes.string,
  updateAge: PropTypes.func,
  updateAgeGroup: PropTypes.func,
  updateAnimalType: PropTypes.func,
  updateCaseTopic: PropTypes.func,
  updateCategory: PropTypes.func,
  updateCircumstance: PropTypes.func,
  updateLocality: PropTypes.func,
  updateLocation: PropTypes.func,
  updateMedicalRecordNumber: PropTypes.func,
  updateName: PropTypes.func,
  updateOccupation: PropTypes.func,
  updatePoisonSeverityScore: PropTypes.func,
  updatePostcode: PropTypes.func,
  updatePregnantLactating: PropTypes.func,
  updatePregnantStatus: PropTypes.func,
  updatePregnantTrimester: PropTypes.func,
  updateRiskAssessment: PropTypes.func,
  updateSex: PropTypes.func,
  updateSuburb: PropTypes.func,
  updateTemplateMacro: PropTypes.func,
  updateWeight: PropTypes.func,
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  weightUnits: PropTypes.string,
};

PatientView.contextTypes = {
  uiMode: PropTypes.string,
};

export default injectIntl(PatientView);
