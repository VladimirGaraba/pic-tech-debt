import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';

import SearchFormContainer from 'containers/ActionBarContainer/SearchFormContainer';

import ModalList from './ModalList';

export const SearchModal = ({
      callRecordId,
      displayCase,
      doSearch,
      modalProps,
      results,
      toggleModal,
      updateModalSelected,
    }) => (
      <Modal show={modalProps.show} onHide={() => toggleModal()} dialogClassName="search">
        <Modal.Header closeButton>
          <Modal.Title>
            Search
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <SearchFormContainer />
            <Row>
              <Col xs={12}>
                <ModalList modalProps={modalProps} updateSelected={updateModalSelected} results={results} doSearch={doSearch} />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="primary"
            onClick={() => {
              displayCase(modalProps.selected, callRecordId);
              toggleModal();
            }}
          >
            Display Record
          </Button>
          <Button onClick={() => toggleModal()}>Close</Button>
        </Modal.Footer>
      </Modal>
);

SearchModal.propTypes = {
  callRecordId: PropTypes.string,
  displayCase: PropTypes.func,
  doSearch: PropTypes.func,
  modalProps: PropTypes.object,
  results: PropTypes.array,
  toggleModal: PropTypes.func,
  updateModalSelected: PropTypes.func,
};

export default SearchModal;
