import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import _isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import { ContextMenuTrigger } from 'react-contextmenu';

import {
  getGlyph,
} from 'utils/helpers';

import { CLOSED_STATE, REVIEWED_STATE, DELETED_STATE } from 'containers/CaseEntry/constants';

import caselistmessages from 'components/CaseList/messages';

export const CaseListItem = ({ entry, expanded, currentRecordId, handleSelectChange, onItemClick, intl, ...props }) => {
  const glyph = getGlyph(entry.type, expanded);
  const styles = {};
  let icons;
  switch (entry.status) {
    case CLOSED_STATE:
      icons = <Glyphicon glyph={'eye-open'} className={'pull-right'} />;
      break;
    case REVIEWED_STATE:
      styles.backgroundColor = '#aaa';
      break;
    case DELETED_STATE:
      icons = <Glyphicon glyph={'trash'} className={'pull-right'} />;
      break;
    default:
      break;
  }

  let label;
  switch (entry.type) {
    case 'incident':
      label = `${entry.name} (${entry.naturalId.slice(0, -9)})`;
      break;
    default:
      label = !_isEmpty(entry.topic) ? entry.topic : intl.formatMessage(caselistmessages['item.label'], { category: intl.formatMessage(caselistmessages[entry.category.replace(' ', '_')]), name: intl.formatMessage(caselistmessages['topic.none']) });
      break;
  }

  return (
    <ContextMenuTrigger key={`trigger-${entry.id}`} id={entry.id}>
      <ListGroupItem
        active={entry.id === currentRecordId}
        style={styles}
        onClick={() => entry.type !== 'incident' ? handleSelectChange(onItemClick, [entry.id]) : onItemClick(entry.id)}
        {...props}
      >
        <Glyphicon glyph={glyph} style={{ marginRight: '0.5rem' }} /> {label}{icons}
      </ListGroupItem>
    </ContextMenuTrigger>

  );
};

CaseListItem.propTypes = {
  currentRecordId: PropTypes.string,
  entry: PropTypes.object,
  expanded: PropTypes.bool,
  handleSelectChange: PropTypes.func,
  intl: PropTypes.object,
  onItemClick: PropTypes.func,
};

export default injectIntl(styled(CaseListItem)`
  ${({ theme }) => theme.CaseListItem}
`);
