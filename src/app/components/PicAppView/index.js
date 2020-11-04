import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { selectVars } from 'containers/App/selectors';

import UnstyledGrid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import UnstyledCol from 'react-bootstrap/lib/Col';

import ActionBarContainer from 'containers/ActionBarContainer';
import CaseEntry from 'containers/CaseEntry';
import CurrentCaseList from 'containers/CurrentCaseList';
import TemplateListContainer from 'containers/TemplateListContainer';

import { EDITTEMPLATE_UIMODE } from 'containers/App/constants';

import messages from './messages';

const Grid = styled(UnstyledGrid)`
  & {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
  }
  
  & .row.content {
    flex: 1;
    display: flex;
    flex-direction: row;
  }
  
  & .row.debug {
    font-size: smaller;
  }
`;

const Col = styled(UnstyledCol)`
  & {
    display: flex;
    flex-direction: column;
  }
  
  & > div,
  & > div > #tabs,
  & > div > #tabs > .tab-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  & > div > #tabs,
  & > div > #tabs .tab-pane {
    height: auto;
  }
  
  & > div > #tabs > .tab-content {
    overflow: auto;
  }
  
  & > footer {
    text-align: right;
  }
`;

const Notification = styled.div`
  padding: 5px;
  margin: 0;
  text-align: center;
`;

/* eslint-disable jsx-a11y/no-static-element-interactions */
class PicAppView extends React.Component {
  getChildContext() {
    return {
      uiMode: this.props.data.uiMode,
    };
  }

  render() {
    const { data } = this.props;
    const { swUpdated, uiMode } = data;

    return (
      <Grid fluid>
        {swUpdated
          ? <Row>
            <Notification className="alert alert-warning">
              <FormattedMessage {...messages['app.updated']} values={{ link: <a onClick={() => window.location.reload(true)}><FormattedMessage {...messages['app.click']} /></a> }} />
            </Notification>
          </Row>
          : null}
        {uiMode === EDITTEMPLATE_UIMODE
          ? <Row>
            <Notification className="alert alert-success">
              <FormattedMessage {...messages[`app.mode.${EDITTEMPLATE_UIMODE}`]} />
            </Notification>
          </Row>
          : null}
        <Row className="content">
          <Col xs={3}>
            <ActionBarContainer />
            {uiMode === EDITTEMPLATE_UIMODE
              ? <TemplateListContainer />
              : <CurrentCaseList />}
          </Col>
          <Col xs={9}>
            <CaseEntry />
            <footer>
              <FormattedMessage {...messages['app.version']} values={{ version: process.env.REACT_APP_VERSION }} />
            </footer>
          </Col>
        </Row>
      </Grid>
    );
  }
}
/* eslint-enable jsx-a11y/no-static-element-interactions */

PicAppView.propTypes = {
  data: PropTypes.object,
};

PicAppView.childContextTypes = {
  uiMode: PropTypes.string,
};

function select(state) {
  return {
    data: selectVars(state),
  };
}

export default connect(select)(PicAppView);
