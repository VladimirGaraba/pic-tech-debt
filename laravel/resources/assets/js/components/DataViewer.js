import React from 'react';

import TableView from './TableView';

class DataViewer extends React.Component {
  render() {
    return <textarea style={{ width: '100%', height: '50vh' }} value={this.props.data} />;
    //return (<TableView {...this.props} />);
  }
}

export default DataViewer;