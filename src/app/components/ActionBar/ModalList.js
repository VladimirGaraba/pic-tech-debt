import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import moment from 'moment/moment';

import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

import InfiniteScroll from 'react-infinite-scroller';

import {
  getGlyph,
} from 'utils/helpers';

import caselistmessages from 'components/CaseList/messages';
import caseviewmessages from 'components/CaseView/messages';

export class ModalList extends React.Component {
  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);

    this.state = {
      scrollKey: moment().format('x'),
      items: [],
      modalMode: 'search',
      btn: 'addCase',
    };
  }

  componentDidMount() {
    const { doSearch, modalProps } = this.props;
    doSearch(modalProps);
  }

  componentWillUpdate(nextProps) {
    const { doSearch, modalProps, results } = this.props;

    if (!_isEqual(modalProps, nextProps.modalProps)) {
      this.setState({
        scrollKey: moment().format('x'),
        items: [],
      });
      doSearch(nextProps.modalProps);
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

    this.setState({ items: results.slice(0, 5 * page) });
  }

  render() {
    const { modalProps, updateSelected, results, intl } = this.props;

    return (
      <ListGroup style={{ marginTop: '1rem' }}>
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
            const glyph = getGlyph(entry.type);
            const styles = {};
            if (entry.status === 'closed') {
              styles.backgroundColor = '#aaa';
            }
            let icons;
            if (entry.status === 'pending') {
              icons = (<OverlayTrigger
                overlay={<Tooltip id={`tooltip-${entry.id}`}><FormattedMessage {...caseviewmessages[`status.${entry.status}`]} /></Tooltip>}
                placement="top"
                delayShow={150}
                delayHide={150}
              >
                <Glyphicon glyph={'eye-open'} className={'pull-right'} />
              </OverlayTrigger>);
            }
            const label = !_isEmpty(entry.topic) ? entry.topic : `${intl.formatMessage(caselistmessages[entry.category.replace(' ', '_')])} - ${intl.formatMessage(caselistmessages[topic.none])}`;
            {/* Not exactly sure what this ^ does since CaseListItem.js renders the label-BW*/}
            return (
              <ListGroupItem
                key={entry.id}
                style={styles}
                className={modalProps.selected === entry.id ? 'active' : null}
                onClick={() => updateSelected(entry.id)}
              >
                <OverlayTrigger
                  overlay={<Tooltip id={`tooltip-${entry.id}`}><FormattedMessage {...caseviewmessages[`type.${entry.type}`]} /></Tooltip>}
                  placement="top"
                  delayShow={150}
                  delayHide={150}
                >
                  <Glyphicon glyph={glyph} style={{ marginRight: '0.5rem' }} />
                </OverlayTrigger> {label}{icons}
              </ListGroupItem>
            );
          })}
        </InfiniteScroll>
      </ListGroup>
    );
  }
}

ModalList.propTypes = {
  doSearch: PropTypes.func,
  intl: PropTypes.object,
  modalProps: PropTypes.object,
  results: PropTypes.array,
  updateSelected: PropTypes.func,
};

export default injectIntl(ModalList);
