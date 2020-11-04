/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import _isEmpty from 'lodash/isEmpty';
import _isObject from 'lodash/isObject';
import _keyBy from 'lodash/keyBy';
import _at from 'lodash/at';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Label from 'react-bootstrap/lib/Label';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Radio from 'react-bootstrap/lib/Radio';
import Table from 'react-bootstrap/lib/Table';

import { isDisabled, Fieldset, typeaheadOnChangeHandler, renderTypeaheadMenu } from 'utils/helpers';
import { getClinicalFeaturesOptions, getOutcomeOptions } from 'utils/options';

import Typeahead from 'components/StyledTypeahead';
import messages from './messages';

class ClinicalFeaturesView extends React.Component {
  render() {
    const {
        when,
        outcome,
        descriptorList,
        updateWhen,
        updateOutcome,
        updateDescriptorList,
    } = this.props;

    const clinicalFeaturesOptions = getClinicalFeaturesOptions();
    const selectedDescriptors = _at(_keyBy(getClinicalFeaturesOptions(), 'id'), descriptorList);

    return (
      <Grid fluid>
        <Row>
          <Col xs={7}>
            <Fieldset>
              <Row>
                <Col xs={6}>
                  <FormGroup>
                    <Radio
                      name="when"
                      value="before"
                      checked={when === 'before'}
                      onChange={(e) => updateWhen(e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                    >
                      <FormattedMessage {...messages['field.when.before']} />
                    </Radio>
                    <Radio
                      name="when"
                      value="at"
                      checked={when === 'at'}
                      onChange={(e) => updateWhen(e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                    >
                      <FormattedMessage {...messages['field.when.at']} />
                    </Radio>
                    <Radio
                      name="when"
                      value="end"
                      checked={when === 'end'}
                      onChange={(e) => updateWhen(e.target.value)}
                      disabled={isDisabled(this.props, this.context)}
                    >
                      <FormattedMessage {...messages['field.when.end']} />
                    </Radio>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <FormGroup>
                    <ControlLabel><FormattedMessage {...messages['field.outcome']} /></ControlLabel>
                    <Typeahead
                      clearButton
                      options={getOutcomeOptions()}
                      selected={_isEmpty(outcome) ? [] : [outcome]}
                      onChange={(values) => typeaheadOnChangeHandler(_isEmpty(outcome) ? '' : outcome, values, updateOutcome)}
                      bodyContainer
                      disabled={isDisabled(this.props, this.context)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Fieldset>
          </Col>
          <Col xs={5}>
            <FormGroup>
              <ControlLabel><FormattedMessage {...messages['field.features']} /></ControlLabel>
              {isDisabled(this.props, this.context)
                ? <Table bordered condensed>
                  <tbody>
                    {selectedDescriptors.length > 0
                        ? selectedDescriptors.map((o) => <tr key={o.id}><td>{o.label}</td></tr>)
                        : <tr><td><Label><FormattedMessage {...messages['message.none']} /></Label></td></tr>
                    }
                  </tbody>
                </Table>
                : <Typeahead
                  clearButton
                  multiple
                  options={clinicalFeaturesOptions}
                  selected={selectedDescriptors}
                  renderMenu={renderTypeaheadMenu}
                  onChange={(values) => {
                    if (!_isEmpty(values) && !_isObject(values[0])) {
                      return;
                    }
                    typeaheadOnChangeHandler(undefined, values, updateDescriptorList, true);
                  }}
                  bodyContainer
                  disabled={isDisabled(this.props, this.context)}
                />
              }
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}
ClinicalFeaturesView.propTypes = {
  descriptorList: PropTypes.array,
  outcome: PropTypes.string,
  updateDescriptorList: PropTypes.func,
  updateOutcome: PropTypes.func,
  updateWhen: PropTypes.func,
  when: PropTypes.string,
};

ClinicalFeaturesView.contextTypes = {
  uiMode: PropTypes.string,
};

export default ClinicalFeaturesView;
