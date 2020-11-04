/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';

import _isEmpty from 'lodash/isEmpty';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Radio from 'react-bootstrap/lib/Radio';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import StyledGeosuggest from 'components/StyledGeosuggest';

import {
    isDisabled,
    Fieldset,
    FieldGroup,
    FieldSelectGroup,
    typeaheadOnChangeHandler,
} from 'utils/helpers';

import {
    getCommunicationMediumOptions,
    getInterlocutorCategoryOptions,
    getInterlocutorLocationOptions,
} from 'utils/options';

import Typeahead from 'components/StyledTypeahead';

import messages from './messages';

class InterlocutorView extends React.Component {
  _updateCategory(category) {
    const {
        appKey,
        updateName,
        updateMediumDetail,
        updateOrganisation,
        updateCategory,
        userSPIFull,
    } = this.props;

    if (category === 'Current user' && !_isEmpty(userSPIFull)) {
      updateName(userSPIFull.name, appKey);
      updateMediumDetail(userSPIFull.phone, appKey);
      updateOrganisation(null, {
        name: userSPIFull.org,
        address1: userSPIFull.street,
        city: userSPIFull.suburb,
        state: userSPIFull.state,
        postcode: userSPIFull.postcode,
        telephone: userSPIFull.phone,
      });
    }
    updateCategory(category);
  }

  render() {
    const {
        name,
        updateName,
        medium,
        updateMedium,
        mediumDetail,
        updateMediumDetail,
        direction,
        updateDirection,
        category,
        location,
        updateLocation,
        organisation,
        updateOrganisation,
        address1,
        updateAddress1,
        address2,
        updateAddress2,
        city,
        updateCity,
        state,
        updateState,
        postcode,
        updatePostcode,
        country,
        updateCountry,
        telephone,
        updateTelephone,
        orgCountry,
        appKey,
    } = this.props;

    let mediumString;
    switch (medium) {
      case 'Email':
      case 'Phone':
        mediumString = medium.toLowerCase();
        break;
      default:
        mediumString = 'default';
        break;
    }

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Fieldset>
              <legend>Caller</legend>
              <Row>
                <Col xs={10}>
                  <FieldGroup
                    id="name"
                    type="text"
                    label={<FormattedMessage {...messages['field.name']} />}
                    value={name}
                    onChange={(e) => updateName(e.target.value, appKey)}
                    disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                  />
                </Col>
                <Col xs={2}>
                  <FormGroup>
                    <ControlLabel><FormattedMessage {...messages['field.direction']} /></ControlLabel><br />
                    <Radio name="direction" value="incoming" checked={direction === 'incoming'} onChange={(e) => updateDirection(e.target.value)} disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}>
                      {'Incoming'}
                    </Radio>
                    <Radio name="direction" value="outgoing" checked={direction === 'outgoing'} onChange={(e) => updateDirection(e.target.value)} disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}>
                      {'Outgoing'}
                    </Radio>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <FieldSelectGroup
                    id="category"
                    label={<FormattedMessage {...messages['field.category']} />}
                    options={getInterlocutorCategoryOptions()}
                    value={category}
                    onChange={(e) => this._updateCategory(e.target.value)}
                    disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                  />
                </Col>
                <Col xs={3}>
                  <FieldSelectGroup
                    id="medium"
                    label={<FormattedMessage {...messages['field.medium.type']} />}
                    options={getCommunicationMediumOptions()}
                    value={medium}
                    onChange={(e) => updateMedium(e.target.value)}
                    disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                  />
                </Col>
                {!_isEmpty(medium)
                  ? <Col xs={3}>
                    <FieldGroup
                      id="mediumDetail"
                      type="text"
                      label={<FormattedMessage {...messages[`field.medium.detail.${mediumString}`]} />}
                      value={mediumDetail}
                      onChange={(e) => updateMediumDetail(e.target.value, appKey)}
                      disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                    />
                  </Col>
                  : null}
              </Row>
            </Fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Fieldset>
              <legend>Caller Location</legend>
              <Row>
                <Col xs={6}>
                  <ControlLabel>Organisation Name/Locality</ControlLabel>
                  <StyledGeosuggest
                    id="organisation"
                    inputClassName="form-control"
                    suggestsClassName="list-group"
                    suggestItemClassName="list-group-item"
                    suggestItemActiveClassName="active"
                    initialValue={organisation}
                    onSuggestSelect={updateOrganisation}
                    disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                    country={!_isEmpty(orgCountry) ? [orgCountry] : null}
                  />
                </Col>
                <Col xs={4}>
                  <FormGroup>
                    <ControlLabel>Location Type</ControlLabel>
                    <Typeahead
                      clearButton
                      options={getInterlocutorLocationOptions()}
                      selected={[location]}
                      onChange={(values) => typeaheadOnChangeHandler(location, values, updateLocation)}
                      bodyContainer
                      disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <FieldGroup
                    id="city"
                    type="text"
                    label="City/Suburb/Department"
                    value={city}
                    onChange={(e) => updateCity(e.target.value)}
                    disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                  />
                </Col>
                <Col xs={4}>
                  <FieldGroup
                    id="postcode"
                    type="text"
                    label="Postcode"
                    value={postcode}
                    onChange={(e) => updatePostcode(e.target.value)}
                    disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <FormGroup>
                    <ControlLabel>State</ControlLabel>
                    <RegionDropdown
                      id="state"
                      classes="form-control"
                      blankOptionLabel=""
                      defaultOptionLabel="Select State/Region"
                      country={country}
                      value={state}
                      onChange={(value) => updateState(value)}
                      disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                    />
                  </FormGroup>
                </Col>
                <Col xs={4}>
                  <FormGroup>
                    <ControlLabel>Country</ControlLabel>
                    <CountryDropdown
                      id="country"
                      classes="form-control"
                      value={country}
                      onChange={(value) => updateCountry(value)}
                      disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10}>
                  <FieldGroup
                    id="address1"
                    type="text"
                    label="Address Line 1"
                    value={address1}
                    onChange={(e) => updateAddress1(e.target.value)}
                    disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={10}>
                  <FieldGroup
                    id="address2"
                    type="text"
                    label="Address Line 2"
                    value={address2}
                    onChange={(e) => updateAddress2(e.target.value)}
                    disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <FieldGroup
                    id="telephone"
                    type="text"
                    label="Main Phone"
                    value={telephone}
                    onChange={(e) => updateTelephone(e.target.value)}
                    disabled={isDisabled({ ability: 'add call notes', ...this.props }, this.context)}
                  />
                </Col>
              </Row>
            </Fieldset>
          </Col>
        </Row>
      </Grid>
    );
  }
}
InterlocutorView.propTypes = {
  appKey: PropTypes.object,
  name: PropTypes.string,
  updateName: PropTypes.func,
  medium: PropTypes.string,
  updateMedium: PropTypes.func,
  mediumDetail: PropTypes.string,
  updateMediumDetail: PropTypes.func,
  direction: PropTypes.string,
  updateDirection: PropTypes.func,
  category: PropTypes.string,
  location: PropTypes.string,
  updateLocation: PropTypes.func,
  organisation: PropTypes.string,
  updateOrganisation: PropTypes.func,
  address1: PropTypes.string,
  updateAddress1: PropTypes.func,
  address2: PropTypes.string,
  updateAddress2: PropTypes.func,
  city: PropTypes.string,
  updateCity: PropTypes.func,
  state: PropTypes.string,
  updateState: PropTypes.func,
  postcode: PropTypes.string,
  updatePostcode: PropTypes.func,
  country: PropTypes.string,
  updateCountry: PropTypes.func,
  telephone: PropTypes.string,
  updateTelephone: PropTypes.func,
  userSPIFull: PropTypes.object,
  updateCategory: PropTypes.func,
  orgCountry: PropTypes.string,
};

InterlocutorView.contextTypes = {
  uiMode: PropTypes.string,
};

export default injectIntl(InterlocutorView);
