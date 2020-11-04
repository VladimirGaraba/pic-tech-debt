/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment/moment';

import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';

import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import UnstyledTabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import InfiniteScroll from 'react-infinite-scroller';

import {
  userCan,
} from 'utils/helpers';

import ListGroup from './StyledListGroup';

const Tabs = styled(UnstyledTabs)`
  .nav-pills>li:not(.active)>a,
  .nav-pills>li:not(.active)>a:focus,
  .nav-pills>li:not(.active)>a:hover {
    background-color: #eee;
  }
`;

export class IncidentModal extends React.Component {
  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
    this.handleTabSelect = this.handleTabSelect.bind(this);

    this.state = {
      scrollKey: moment().format('x'),
      items: [],
      selected: [props.currentRecordId],
      btn: 'linkIncident',
    };
  }

  loadMore(page) {
    const { incidents } = this.props;

    this.setState({ items: incidents.slice(0, 10 * page) });
  }

  handleTabSelect(key) {
    if (key === 1) {
      this.setState({ btn: 'linkIncident' });
    } else {
      this.setState({ btn: 'addIncident' });
    }
  }

  render() {
    const {
      incidentModal,
      incidents,
      toggleModal,
      addIncident,
      linkCaseIncident,
      updateModalName,
      updateModalSelected,
      userSPI,
      site,
      doSearch,
      search,
    } = this.props;

    return (<Modal show={incidentModal.show} onHide={() => toggleModal()} dialogClassName="incident">
      <Modal.Header closeButton>
        <Modal.Title>
          Link to Incident
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Tabs bsStyle="pills" defaultActiveKey={1} id="link-to-incident-tab-container" onSelect={this.handleTabSelect}>
            <Tab eventKey={1} title={'Add to Existing Incident'}>
              <Row>
                <Col xs={12}>
                  <ListGroup style={{ marginTop: '1rem' }}>
                    <InfiniteScroll
                      pageStart={0}
                      key={this.state.scrollKey}
                      initialLoad
                      loadMore={this.loadMore}
                      hasMore={this.state.items.length < incidents.length}
                      loader={<div className="loader">Loading ...</div>}
                      threshold={150}
                      useWindow={false}
                    >
                      {this.state.items.map((entry) => (
                        <ListGroupItem
                          key={entry._id}
                          className={incidentModal.selected === entry._id ? 'active' : null}
                          onClick={() => updateModalSelected(entry._id)}
                        >
                          {entry.name}
                        </ListGroupItem>
                      ))}
                    </InfiniteScroll>
                  </ListGroup>
                </Col>
              </Row>
            </Tab>
            {userCan(userSPI, 'manage incidents')
              ? <Tab eventKey={2} title={'New Incident'}>
                <div className="alert alert-info">Enter a name for the new incident.</div>
                <Row>
                  <Col xs={12}>
                    <FormControl
                      id="modalName"
                      type="text"
                      maxLength={'32'}
                      placeholder="Name"
                      value={incidentModal.name}
                      onChange={(e) => updateModalName(e.target.value)}
                    />
                  </Col>
                </Row>
              </Tab>
              : null}
          </Tabs>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {this.state.btn === 'addIncident'
          ? <Button
            bsStyle="primary"
            onClick={() => { addIncident(userSPI, site.shortcode, incidentModal); doSearch(search); }}
            disabled={_isEmpty(incidentModal.name)}
          >
            Create Incident
          </Button>
          : <Button
            bsStyle="primary"
            onClick={() => {
              const incident = _find(incidents, ['_id', incidentModal.selected]);
              if (incident) {
                linkCaseIncident(incidentModal.caseId, incidentModal.selected);
                doSearch(search);
              } else {
                alert('Incident not found, please select another.'); // eslint-disable-line no-alert
              }
            }}
            disabled={!(incidentModal.selected && _find(incidents, ['_id', incidentModal.selected]))}
          >
            Link Incident
          </Button>}
        <Button onClick={() => toggleModal()}>Close</Button>
      </Modal.Footer>
    </Modal>);
  }
}

IncidentModal.propTypes = {
  addIncident: PropTypes.func,
  currentRecordId: PropTypes.string,
  doSearch: PropTypes.func,
  incidentModal: PropTypes.object,
  incidents: PropTypes.array,
  linkCaseIncident: PropTypes.func,
  search: PropTypes.object,
  site: PropTypes.object,
  toggleModal: PropTypes.func,
  updateModalName: PropTypes.func,
  updateModalSelected: PropTypes.func,
  userSPI: PropTypes.object,
};

export default IncidentModal;
