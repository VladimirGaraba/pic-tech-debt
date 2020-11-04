import React from 'react';
import ReactTable from "react-table";

import 'react-table/react-table.css';

import { columns } from './config';

class TableView extends React.Component {
  render() {
    if (this.props.data.length === 0) {
      return (<div className="alert alert-warning">No data</div>);
    }

    return (
      <ReactTable
        data={this.props.data}
        columns={columns}
      />
    );
  }
}

export default TableView;