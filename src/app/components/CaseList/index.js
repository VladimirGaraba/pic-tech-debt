/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import _isEqual from 'lodash/isEqual';

import Dialog from 'react-bootstrap-dialog';

import InfiniteScroll from 'react-infinite-scroller';

import {
  terminateCall,
  userCan,
} from 'utils/helpers';

import CaseListFilter from './CaseListFilter';
import IncidentModal from './IncidentModal';
import CaseContextMenu from './CaseContextMenu';
import CaseListItem from './CaseListItem';
import CaseListGroup from './CaseListGroup';
import ListGroup from './StyledListGroup';

export class CaseList extends React.Component {
  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleIncidentClick = this.handleIncidentClick.bind(this);

    this.state = {
      scrollKey: moment().format('x'),
      items: [],
      selected: [props.currentRecordId],
      showIncident: {},
    };
  }

  componentWillUpdate(nextProps) {
    const { doSearch, search, results } = this.props;

    if (!_isEqual(search, nextProps.search)) {
      this.setState({
        scrollKey: moment().format('x'),
        items: [],
      });
      doSearch(nextProps.search);
    }

    if (!_isEqual(results, nextProps.results)) {
      this.setState({
        scrollKey: moment().format('x'),
        items: [],
      });
    }
  }

  loadMore(page) {
    const { results } = this.props;
    const items = results.slice(0, 10 * page);
    const showIncident = this.state.showIncident;
    let newShowIncident = {};
    items.filter((i) => i.type === 'incident').map((j) => { newShowIncident[j.id] = true; }); // eslint-disable-line array-callback-return
    newShowIncident = Object.assign(newShowIncident, showIncident);

    this.setState({ items, showIncident: newShowIncident });
  }

  handleSelectChange(onItemClick, path) {
    const { callRecordId, currentCase, search, userSPI, deleteFile, deleteRecord, endCall } = this.props;
    if (callRecordId) {
      // If target is same as current, do nothing
      if (path[path.length - 1] !== callRecordId) {
        if (confirm('Switching files will automatically close this call record. Do you want to proceed?')) { // eslint-disable-line no-alert
          terminateCall(currentCase, callRecordId, endCall, search, deleteFile, deleteRecord, userSPI);
          onItemClick(path[path.length - 1], callRecordId);
        }
      }
    } else {
      onItemClick(path[path.length - 1], callRecordId);
    }
  }

  handleIncidentClick(incidentId) {
    const showIncident = this.state.showIncident;
    showIncident[incidentId] = !showIncident[incidentId];
    this.setState({ showIncident });
  }

  render() {
    const {
        currentRecordId,
        onItemClick,
        results,
        userSPI,
    } = this.props;

    const modal = <IncidentModal {...this.props} />;
    const form = <CaseListFilter {...this.props} />;

    const contextmenus = [];
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {form}
        <ListGroup style={{ overflow: 'auto', marginBottom: '0' }}>
          <InfiniteScroll
            pageStart={0}
            key={this.state.scrollKey}
            initialLoad
            loadMore={this.loadMore}
            hasMore={this.state.items.length < results.length}
            loader={<div className="loader">Loading ...</div>}
            threshold={150}
            useWindow={false}
          >
            {this.state.items.map((entry) => {
              const parent = <CaseListItem key={`item-${entry.id}`} entry={entry} currentRecordId={currentRecordId} handleSelectChange={this.handleSelectChange} expanded={entry.type === 'incident' && this.state.showIncident[entry.id]} onItemClick={entry.type === 'incident' ? this.handleIncidentClick : onItemClick} />;
              let children = []; // eslint-disable-line prefer-const
              if ((entry.type === 'incident' && userCan(userSPI, 'manage incidents')) || entry.type !== 'incident') {
                contextmenus.push(<CaseContextMenu
                  key={`menu-${entry.id}`}
                  id={entry.id}
                  item={entry}
                  dialog={entry.type === 'incident' ? this.dialog : null}
                  {...this.props}
                />);
              }
              if (entry.cases && entry.cases.length > 0) {
                entry.cases.map((e) => { // eslint-disable-line array-callback-return
                  contextmenus.push(<CaseContextMenu key={`menu-${e.id}`} id={e.id} item={e} {...this.props} />);
                  children.push(<CaseListItem key={`item-${e.id}`} entry={e} currentRecordId={currentRecordId} handleSelectChange={this.handleSelectChange} onItemClick={onItemClick} />);
                });
              }

              if (children.length > 0 && this.state.showIncident[entry.id]) {
                return <CaseListGroup key={`wrapper-${entry.id}`} parent={parent} ListGroup={ListGroup}>{children}</CaseListGroup>;
              }
              return parent;
            })}
          </InfiniteScroll>
        </ListGroup>
        {contextmenus}
        {modal}
        <Dialog ref={(e) => { this.dialog = e; }} />
      </div>
    );
  }
}

CaseList.propTypes = {
  callRecordId: PropTypes.string,
  currentCase: PropTypes.object,
  currentRecordId: PropTypes.string,
  deleteFile: PropTypes.func,
  deleteRecord: PropTypes.func,
  doSearch: PropTypes.func,
  endCall: PropTypes.func,
  onItemClick: PropTypes.func,
  results: PropTypes.array,
  search: PropTypes.object,
  userSPI: PropTypes.object,
};

export default CaseList;
