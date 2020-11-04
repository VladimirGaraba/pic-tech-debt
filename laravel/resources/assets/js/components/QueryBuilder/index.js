import React from "react";

import { filters } from "./config";

class QueryBuilder extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $(this.refs.queryBuilder).queryBuilder({ filters });
  }
  componentWillUnmount() {
    $(this.refs.queryBuilder).queryBuilder("destroy");
  }
  shouldComponentUpdate() {
    return false;
  }
  handleGetMangoClick() {
    const selector = $(this.refs.queryBuilder).queryBuilder("getMango");
    this.props.handleUpdate(selector);
  }
  render() {
    return (
      <div>
        <div id="query-builder" ref="queryBuilder"/>
        <div className="row">
          <div className="col-md-4">
            <button className="btn btn-success" onClick={this.handleGetMangoClick.bind(this)}>Run</button>
          </div>
        </div>
      </div>
    );
  }
}

export default QueryBuilder;
