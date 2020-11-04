import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import styled from 'styled-components';
import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Dialog from 'react-bootstrap-dialog';

import { ContextMenu as UnstyledContextMenu, MenuItem } from 'react-contextmenu';

import { CLOSED_STATE, OPENED_STATE, REVIEWED_STATE, DELETED_STATE } from 'containers/CaseEntry/constants';

import {
  terminateCall,
  userCan,
} from 'utils/helpers';

import caseviewmessages from 'components/CaseView/messages';
import caselistmessages from './messages';

const ContextMenu = styled(UnstyledContextMenu)`
  & {
    z-index: 1000;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    background-clip: padding-box;
  }
  
  & > .react-contextmenu-item {
    padding: 3px 20px;
    clear: both;
    font-weight: 400;
    line-height: 1.42857143;
    color: #333;
    white-space: nowrap;
    &:hover {
      background: rgba(0, 0, 0, 0.5);
    }
  }

  & > .react-contextmenu-item.dropdown-header {
    display: block;
    padding: 3px 20px;
    font-size: 12px;
    line-height: 1.42857143;
    color: #777;
    white-space: nowrap;
  }

  & > .react-contextmenu-item--disabled {
    color: #999;
  }
  
  & > .react-contextmenu-item--divider {
    height: 1px;
    padding: 0;
    margin: 9px 0;
    overflow: hidden;
    background-color: #e5e5e5;
  }
`;

export class CaseContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.getIncidentMenu = this.getIncidentMenu.bind(this);
  }

  getIncidentContextMenu() {
    const { id, item, renameIncident, doSearch, search, dialog } = this.props;

    return (<ContextMenu id={id}>
      <MenuItem
        onClick={() => dialog.show({
          body: 'Incident Name',
          actions: [
            Dialog.CancelAction(),
            Dialog.OKAction((res) => {
              renameIncident(id, res.value);
              doSearch(search);
            }),
          ],
          prompt: Dialog.TextPrompt({ initialValue: item.name }),
        })}
      >
        Rename Incident
      </MenuItem>
    </ContextMenu>);
  }

  getIncidentMenu(id, item) {
    const { callRecordId, toggleModal, unlinkCaseIncident, doSearch, search } = this.props;
    let menu = [<MenuItem key={'incident-menu-divider'} divider />]; // eslint-disable-line prefer-const
    if (_isEmpty(item.incidentId)) {
      menu.push(<MenuItem
        key={'link-to-incident'}
        disabled={!_isUndefined(callRecordId)}
        onClick={() => toggleModal(id)}
      >Link to Incident</MenuItem>);
    } else {
      menu.push(<MenuItem
        key={'unlink-from-incident'}
        disabled={!_isUndefined(callRecordId)}
        onClick={() => {
          unlinkCaseIncident(id, item.incidentId);
          doSearch(search);
        }}
      >
        Unlink from Incident
      </MenuItem>);
    }

    return menu;
  }

  getCaseContextMenu() {
    const { callRecordId, currentCase, endCall, search, deleteFile, deleteRecord, markAsCase, markAsInquiry, markAsHoax, id, item, startCall, userSPI, intl } = this.props;

    return (<ContextMenu id={id}>
      {item.status === OPENED_STATE || item.status === CLOSED_STATE
        ? <MenuItem
          disabled={callRecordId && callRecordId.toString() === id.toString()}
          onClick={() => {
            if ((callRecordId && terminateCall(currentCase, callRecordId, endCall, search, deleteFile, deleteRecord, userSPI, true))
              || !callRecordId) {
              if (item.status === CLOSED_STATE) {
                if (confirm(intl.formatMessage(caseviewmessages['actions.status.reopen.warning']))) { // eslint-disable-line no-alert
                  this.handleUpdateState(OPENED_STATE, id);
                  startCall(id, userSPI);
                }
              } else {
                startCall(id, userSPI);
              }
            }
          }}
        ><FormattedMessage {...caseviewmessages['actions.file.update']} /></MenuItem>
        : null}
      <MenuItem divider />
      {item.status !== CLOSED_STATE && item.status !== OPENED_STATE
        ? <MenuItem><FormattedMessage {...caselistmessages['messages.context.unavailable']} /></MenuItem>
        : null }
      {item.status === OPENED_STATE
        ? <MenuItem
          disabled={!_isEmpty(callRecordId)}
          onClick={() => this.handleUpdateState(CLOSED_STATE, id)}
        ><FormattedMessage {...caseviewmessages['actions.status.close']} /></MenuItem>
        : null}
      {item.status === CLOSED_STATE
        ? <MenuItem
          disabled={!_isUndefined(callRecordId)}
          onClick={() => this.handleUpdateState(REVIEWED_STATE, id)}
        ><FormattedMessage {...caseviewmessages['actions.status.review']} /></MenuItem>
        : null}
      {item.status === CLOSED_STATE || item.status === REVIEWED_STATE || item.status === DELETED_STATE
        ? <MenuItem
          disabled={!_isUndefined(callRecordId)}
          onClick={() => this.handleUpdateState(OPENED_STATE, id)}
        ><FormattedMessage {...caseviewmessages['actions.status.reopen']} /></MenuItem>
        : null}
      {item.status !== DELETED_STATE && item.status !== CLOSED_STATE
        ? <MenuItem
          disabled={!_isUndefined(callRecordId)}
          onClick={() => {
            if (confirm(intl.formatMessage(caseviewmessages['actions.status.delete.warning']))) { // eslint-disable-line no-alert
              this.handleUpdateState(DELETED_STATE, id);
            }
          }}
        ><FormattedMessage {...caseviewmessages['actions.status.delete']} /></MenuItem>
        : null}
      {userCan(userSPI, 'manage incidents')
        ? this.getIncidentMenu(id, item)
        : null}
      <MenuItem divider />
      <MenuItem disabled attributes={{ className: 'dropdown-header' }}>Mark File as</MenuItem>
      {item.type === 'inquiry' || item.type === 'hoax' ?
        <MenuItem
          disabled={!_isUndefined(callRecordId)}
          onClick={() => this.handleUpdateType(markAsCase, id)}
        ><Glyphicon glyph="minus" /> <FormattedMessage {...caseviewmessages['type.case']} /></MenuItem> : null}
      {item.type === 'case' || item.type === 'hoax' ?
        <MenuItem
          disabled={!_isUndefined(callRecordId)}
          onClick={() => this.handleUpdateType(markAsInquiry, id)}
        ><Glyphicon glyph="minus" /> <FormattedMessage {...caseviewmessages['type.inquiry']} /></MenuItem> : null}
      {item.type === 'case' || item.type === 'inquiry' ?
        <MenuItem
          disabled={!_isUndefined(callRecordId)}
          onClick={() => this.handleUpdateType(markAsHoax, id)}
        ><Glyphicon glyph="minus" /> <FormattedMessage {...caseviewmessages['type.hoax']} /></MenuItem> : null}
    </ContextMenu>);
  }

  handleUpdateState(newState, id) {
    const { closeFile, reviewFile, deleteFile, openFile, doSearch, search, userSPI } = this.props;

    switch (newState) {
      case CLOSED_STATE:
        closeFile(id, userSPI);
        break;
      case REVIEWED_STATE:
        reviewFile(id, userSPI);
        break;
      case DELETED_STATE:
        deleteFile(id, userSPI);
        break;
      default:
      case OPENED_STATE:
        openFile(id, userSPI);
        break;
    }
    doSearch(search);
  }

  handleUpdateType(onClick, id) {
    onClick(id);
  }

  render() {
    const { item } = this.props;

    if (item.type === 'incident') {
      return this.getIncidentContextMenu();
    }

    return this.getCaseContextMenu();
  }
}

CaseContextMenu.propTypes = {
  callRecordId: PropTypes.string,
  closeFile: PropTypes.func,
  currentCase: PropTypes.object,
  deleteFile: PropTypes.func,
  deleteRecord: PropTypes.func,
  dialog: PropTypes.object,
  doSearch: PropTypes.func,
  endCall: PropTypes.func,
  id: PropTypes.string,
  intl: intlShape.isRequired,
  item: PropTypes.object,
  markAsCase: PropTypes.func,
  markAsHoax: PropTypes.func,
  markAsInquiry: PropTypes.func,
  openFile: PropTypes.func,
  renameIncident: PropTypes.func,
  reviewFile: PropTypes.func,
  search: PropTypes.object,
  startCall: PropTypes.func,
  toggleModal: PropTypes.func,
  unlinkCaseIncident: PropTypes.func,
  userSPI: PropTypes.object,
};

export default injectIntl(styled(CaseContextMenu)`

`);
