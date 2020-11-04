/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';

import _isEmpty from 'lodash/isEmpty';
import _isObject from 'lodash/isObject';

import { asyncContainer } from 'react-bootstrap-typeahead';
import onClickOutside from 'react-onclickoutside';

import auth from 'auth';
import Typeahead from 'components/StyledTypeahead';

const AsyncTypeahead = asyncContainer(Typeahead);

export class CentreAgentNameField extends React.Component {
  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this);
    this.updateData = this.updateData.bind(this);

    this.state = {
      name: props.defaultValue,
      url: '',
      isLoading: false,
      options: [],
    };
  }

  /**
   * Used by insert modal
   */
  getFieldValue() {
    return { name: this.state.name, url: this.state.url };
  }

  focus() {
    this._typeahead.getInstance().focus();
  }

  handleClickOutside() {
    try {
      if (this.props.tableRef) {
        this.updateData();
        this.props.tableRef.cleanSelected();
      }
    } catch (e) {
      // Do nothing
    }
  }

  updateData() {
    this.props.onUpdate({ name: this.state.name, url: this.state.url });
  }

  updateState(value) {
    if (_isObject(value) && this.state.name === value.name && this.state.url === value.url) {
      return;
    }
    if (_isObject(value)) {
      this.setState({ name: value.name, url: value.url ? value.url : undefined });
    } else {
      this.setState({ name: value, url: '' });
    }
  }

  render() {
    return (<div>
      <AsyncTypeahead
        innerRef={(ref) => { this._typeahead = ref; }}
        allowNew={false}
        clearButton
        selectHintOnEnter
        isLoading={this.state.isLoading}
        labelKey={'name'}
        onSearch={(query) => {
          this.setState({ isLoading: true });
          const URL = `//${window.location.hostname}/analytics/data/agentName/${query}`;
          fetch(URL, {
            headers: {
              Authorization: `Bearer ${auth.getToken()}`,
            },
          })
              .then((res) => res.json())
              .then((json) => {
                this.setState({ isLoading: false, options: json });
              });
        }}
        options={this.state.options}
        defaultSelected={_isEmpty(this.props.defaultValue) ? [] : [this.props.defaultValue]}
        onChange={(value) => {
          // on change state this triggers
          this.updateState(value.length > 0 ? value[0] : '');
        }}
        bodyContainer
      />
    </div>);
  }
}

CentreAgentNameField.propTypes = {
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func,
  tableRef: PropTypes.object,
};

export default onClickOutside(CentreAgentNameField);
