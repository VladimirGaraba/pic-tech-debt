import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';

import _find from 'lodash/find';

import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Tab from 'react-bootstrap/lib/Tab';
import UnstyledTabs from 'react-bootstrap/lib/Tabs';

import {
  terminateCall,
  userCan,
} from 'utils/helpers';

import SearchFormContainer from 'containers/ActionBarContainer/SearchFormContainer';

import caseviewmessages from 'components/CaseView/messages';
import messages from './messages';

import ModalList from './ModalList';

const Tabs = styled(UnstyledTabs)`
  .nav-pills>li:not(.active)>a,
  .nav-pills>li:not(.active)>a:focus,
  .nav-pills>li:not(.active)>a:hover {
    background-color: #eee;
  }
`;

export class RecordModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleTabSelect = this.handleTabSelect.bind(this);

    this.state = {
      btn: 'addCase',
    };
  }

  handleTabSelect(key) {
    if (key === 1) {
      this.setState({ btn: 'addCase' });
    } else {
      this.setState({ btn: 'startCall' });
    }
  }

  render() {
    const {
      addCase,
      appKey,
      callRecordId,
      caseListSearch,
      currentCase,
      deleteFile,
      deleteRecord,
      doSearch,
      endCall,
      intl,
      modalProps,
      openFile,
      results,
      site,
      startCall,
      toggleModal,
      updateModalSelected,
      userSPI,
    } = this.props;
    return (
      <Modal show={modalProps.show} onHide={() => toggleModal()} dialogClassName="record">
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage {...messages['title.call.new']} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Tabs
              bsStyle="pills" defaultActiveKey={userCan(userSPI, 'create call files') ? 1 : 2}
              id="new-call-tab-container" onSelect={this.handleTabSelect}
            >
              {userCan(userSPI, 'create call files')
                ? <Tab eventKey={1} title={'New File'}>
                  <div className="alert alert-info">Click &quot;Create Record&quot; to start a new file</div>
                </Tab>
                : null}
              <Tab eventKey={2} title={'Followup/Add Notes'}>
                <SearchFormContainer />
                <Row>
                  <Col xs={12}>
                    <ModalList modalProps={modalProps} updateSelected={updateModalSelected} results={results} doSearch={doSearch} />
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {this.state.btn === 'addCase'
            ? <Button
              bsStyle="primary"
              onClick={() => {
                if (callRecordId) {
                  terminateCall(currentCase, callRecordId, endCall, caseListSearch, deleteFile, deleteRecord, userSPI);
                }
                addCase(userSPI, site.shortcode, callRecordId, appKey);
              }}
              disabled={!userCan(userSPI, 'create call files')}
            ><FormattedMessage {...messages['action.case.create']} /></Button>
            : <Button
              bsStyle="primary"
              onClick={() => {
                const file = _find(results, ['id', modalProps.selected]);
                if (callRecordId) {
                  terminateCall(currentCase, callRecordId, endCall, caseListSearch, deleteFile, deleteRecord, userSPI);
                }
                if (file.status !== 'open') {
                  if (confirm(intl.formatMessage(caseviewmessages['actions.status.reopen.warning']))) { // eslint-disable-line no-alert
                    openFile(modalProps.selected, userSPI);
                    startCall(modalProps.selected, userSPI);
                  }
                } else {
                  startCall(modalProps.selected, userSPI);
                }
              }}
              disabled={!(modalProps.selected && _find(results, ['id', modalProps.selected]))}
            >
              <FormattedMessage {...messages['action.call.start']} />
            </Button>}
          <Button onClick={() => toggleModal()}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

RecordModal.propTypes = {
  addCase: PropTypes.func,
  appKey: PropTypes.object,
  callRecordId: PropTypes.string,
  caseListSearch: PropTypes.object,
  currentCase: PropTypes.object,
  deleteFile: PropTypes.func,
  deleteRecord: PropTypes.func,
  doSearch: PropTypes.func,
  endCall: PropTypes.func,
  intl: intlShape.isRequired,
  modalProps: PropTypes.object,
  openFile: PropTypes.func,
  results: PropTypes.array,
  site: PropTypes.object,
  startCall: PropTypes.func,
  toggleModal: PropTypes.func,
  updateModalSelected: PropTypes.func,
  userSPI: PropTypes.object,
};

export default injectIntl(RecordModal);
