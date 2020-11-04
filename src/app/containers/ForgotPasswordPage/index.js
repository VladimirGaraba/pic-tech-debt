/* eslint-disable no-underscore-dangle */

/**
 * LoginPage
 */

import React from 'react';
import { Link } from 'react-router';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

import { FieldGroup } from 'utils/helpers';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={4} xsOffset={4}>
            <h3>Forgot Password</h3>

            <form>
              <FieldGroup
                id="email"
                type="email"
                label="Email"
                onChange={(e, newValue) => this.setState({ email: newValue })}
              />
              <Button bsStyle="primary">
              Submit
            </Button>
              <Button bsStyle="link">
                <Link to="/login">Return to Login</Link>
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Login;
