import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QueryBuilder from './QueryBuilder';
import DataViewer from './DataViewer';
import FieldList from './FieldList';

class Reports extends Component {
  constructor() {
    super();
    this.state = {
      fields: [],
      selector: {},
      results: '',
    };
  }

  handleFieldsUpdate(fields) {
    this.setState({
      fields
    });
  }

  handleSelectorUpdate(selector) {
    this.setState({
      selector
    });

    const headers = {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': window._token
    };
    fetch('/analytics/query', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        fields: this.state.fields,
        selector
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
      .then(results => {
        this.setState({ results });
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-5">
            <FieldList handleUpdate={this.handleFieldsUpdate.bind(this)} />
          </div>
          <div className="col-xs-7">
            <QueryBuilder handleUpdate={this.handleSelectorUpdate.bind(this)} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <DataViewer data={this.state.results} />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Reports />, document.getElementById('reports'));