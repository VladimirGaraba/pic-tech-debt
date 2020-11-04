/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import _isEmpty from 'lodash/isEmpty';

import Button from 'react-bootstrap/lib/Button';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import {
  DEFAULT_UIMODE,
  EDITTEMPLATE_UIMODE,
} from 'containers/App/constants';

import {
    isFileEmpty,
    isRecordEmpty,
    terminateCall,
    userCan,
} from 'utils/helpers';

import RecordModalContainer from 'containers/ActionBarContainer/RecordModalContainer';
import SearchModalContainer from 'containers/ActionBarContainer/SearchModalContainer';

import messages from './messages';

export class ActionBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    this.handleUnload = this.handleUnload.bind(this);
    this.getTemplatesMenu = this.getTemplatesMenu.bind(this);
    this.toggleUiMode = this.toggleUiMode.bind(this);

    this.state = {
      modalMode: 'search',
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    window.addEventListener('unload', this.handleUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    window.removeEventListener('unload', this.handleUnload);
  }

  getCallActionButton() {
    const { callRecordId, caseListSearch, currentCase, deleteFile, deleteRecord, endCall, toggleModal, userSPI } = this.props;

    return (<Button
      bsSize="large"
      bsStyle="link"
      onClick={() => {
        if (callRecordId) {
          terminateCall(currentCase, callRecordId, endCall, caseListSearch, deleteFile, deleteRecord, userSPI);
        } else {
          this.setState({ modalMode: 'record', btn: 'addCase' });
          toggleModal();
        }
      }}
    >
      <Glyphicon glyph="earphone" /><br /><span style={{ fontSize: '1rem' }}><FormattedMessage {...messages[`action.call.${callRecordId ? 'end' : 'start'}`]} /></span>
    </Button>);
  }

  getTargetDisplayMode() {
    const { uiMode } = this.context;
    if (uiMode === DEFAULT_UIMODE) {
      return EDITTEMPLATE_UIMODE;
    }
    return DEFAULT_UIMODE;
  }

  getTemplateActionButton() {
    const { currentTemplateId, editingTemplate, editingTemplateId, addTemplate, saveTemplate, isValidMacro, macro, site, userSPI, appKey } = this.props;
    if (currentTemplateId && currentTemplateId === editingTemplateId) {
      return (
        <Button
          bsSize="large"
          bsStyle="link"
          onClick={() => {
            saveTemplate(macro, editingTemplate);
          }}
          disabled={!isValidMacro}
        >
          <Glyphicon glyph="floppy-disk" /><br /><span style={{ fontSize: '1rem' }}><FormattedMessage {...messages['action.template.save']} /></span>
        </Button>
      );
    }
    return (
      <Button
        bsSize="large"
        bsStyle="link"
        onClick={() => {
          addTemplate(userSPI, site.shortcode, appKey);
        }}
      >
        <Glyphicon glyph="asterisk" /><br /><span style={{ fontSize: '1rem' }}><FormattedMessage {...messages['action.template.new']} /></span>
      </Button>
    );
  }

  getTemplatesMenu() {
    return [
      <MenuItem key={'templates-menu-divider'} divider />,
      <MenuItem key={'toggle-uimode'} onClick={this.toggleUiMode}><FormattedMessage {...messages[`action.mode.${this.getTargetDisplayMode()}`]} /></MenuItem>,
    ];
  }

  handleBeforeUnload(e) {
    const {
        callRecordId,
        currentCase,
        endCall,
        caseListSearch,
        userSPI,
    } = this.props;

    if (!callRecordId) {
      return;
    }

    const _isFileEmpty = isFileEmpty(currentCase);
    const _isRecordEmpty = isRecordEmpty(currentCase, userSPI);

    let message;

    if (!_isFileEmpty && !_isRecordEmpty) {
      endCall(caseListSearch, callRecordId);
    } else if (_isFileEmpty && currentCase.communications.length === 1) {
      message = 'New files require a topic, patient age group (human cases) and caller information. Do you wish to delete this file?';
      e.returnValue = message; // eslint-disable-line no-param-reassign
    } else {
      message = 'Updates require additional case information. Do you wish to delete this record?';
      e.returnValue = message; // eslint-disable-line no-param-reassign
    }

    return message; // eslint-disable-line consistent-return
  }

  /**
   * Attempt to clean up on close of an incomplete file or record.
   *
   * This does not seem to persist changes, presumably due to window.unload completing before we can persist the changes
   * upstream. Leaving here anyway just in case.
   *
   */
  handleUnload() {
    const {
        callRecordId,
        currentCase,
        deleteFile,
        deleteRecord,
        userSPI,
    } = this.props;

    if (!callRecordId) {
      return;
    }

    const _isFileEmpty = isFileEmpty(currentCase);
    const _isRecordEmpty = isRecordEmpty(currentCase, userSPI);
    if (_isFileEmpty) {
      deleteFile(callRecordId, userSPI, true);
    } else if (_isRecordEmpty) {
      deleteRecord(callRecordId, true);
    }
  }

  toggleUiMode() {
    const { setUiModeDefault, setUiModeEditTemplate, editingTemplateId } = this.props;
    if (this.context.uiMode === 'editTemplate') {
      if (!_isEmpty(editingTemplateId)) {
        alert('There are unsaved changes. Save your template before switching modes.'); // eslint-disable-line no-alert
      } else {
        setUiModeDefault();
      }
    } else {
      setUiModeEditTemplate();
    }
  }

  render() {
    const {
        logout,
        showModal,
        toggleModal,
        userSPI,
    } = this.props;

    return (
      <nav
        className={this.props.className}
      >
        <DropdownButton
          id="actions"
          bsSize="large"
          bsStyle="link"
          title={<span><Glyphicon glyph="menu-hamburger" /><br /><span style={{ fontSize: '1rem' }}><FormattedMessage {...messages['action.menu']} /></span></span>}
          noCaret
        >
          {userCan(userSPI, 'view dashboard')
            ? <MenuItem href="/dashboard" target="_self"><FormattedMessage {...messages['action.dashboard']} /></MenuItem>
            : null}
          {userCan(userSPI, 'view data analytics')
            ? <MenuItem href="/analytics" target="_self"><FormattedMessage {...messages['action.analytics']} /></MenuItem>
            : null}
          <MenuItem href="/settings" target="_self"><FormattedMessage {...messages['action.settings']} /></MenuItem>
          {userCan(userSPI, 'manage templates')
            ? this.getTemplatesMenu()
            : null}
          <MenuItem divider />
          <MenuItem href="/docs" target="_blank"><FormattedMessage {...messages['action.documentation']} /></MenuItem>
          <MenuItem divider />
          <MenuItem onClick={logout}><FormattedMessage {...messages['action.signout']} /></MenuItem>
        </DropdownButton>
        {this.context.uiMode !== EDITTEMPLATE_UIMODE
          ? <Button
            bsSize="large"
            bsStyle="link"
            onClick={() => {
              this.setState({ modalMode: 'search' });
              toggleModal();
            }}
          >
            <Glyphicon glyph="search" /><br /><span style={{ fontSize: '1rem' }}><FormattedMessage {...messages['action.search']} /></span>
          </Button>
          : null}
        {this.context.uiMode === EDITTEMPLATE_UIMODE
          ? this.getTemplateActionButton()
          : this.getCallActionButton()}
        <Button bsSize="large" bsStyle="link" href="/settings" target="_self"><Glyphicon glyph="cog" /><br /><span style={{ fontSize: '1rem' }}><FormattedMessage {...messages['action.settings']} /></span></Button>
        {showModal && this.state.modalMode === 'search' ? <SearchModalContainer /> : null}
        {showModal && this.state.modalMode === 'record' ? <RecordModalContainer /> : null}
      </nav>
    );
  }
}

ActionBar.propTypes = {
  addTemplate: PropTypes.func,
  appKey: PropTypes.object,
  callRecordId: PropTypes.string,
  caseListSearch: PropTypes.object,
  currentCase: PropTypes.object,
  currentTemplateId: PropTypes.string,
  deleteFile: PropTypes.func,
  deleteRecord: PropTypes.func,
  editingTemplate: PropTypes.object,
  editingTemplateId: PropTypes.string,
  endCall: PropTypes.func,
  macro: PropTypes.object,
  isValidMacro: PropTypes.bool,
  logout: PropTypes.func,
  saveTemplate: PropTypes.func,
  setUiModeDefault: PropTypes.func,
  setUiModeEditTemplate: PropTypes.func,
  showModal: PropTypes.bool,
  site: PropTypes.object,
  toggleModal: PropTypes.func,
  userSPI: PropTypes.object,
  className: PropTypes.string,
};

ActionBar.contextTypes = {
  uiMode: PropTypes.string,
};

export default injectIntl(styled(ActionBar)`
  ${({ theme }) => theme.ActionBar}
`);
