/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { selectVars } from 'containers/App/selectors';
import { FormattedMessage } from 'react-intl';

import Alert from 'react-bootstrap/lib/Alert';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Well from 'react-bootstrap/lib/Well';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Panel from 'react-bootstrap/lib/Panel';

import { FieldGroup, checkForUpdates } from 'utils/helpers';

import { loginRequest } from 'containers/App/actions';

import messages from './messages';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentWillMount() {
    checkForUpdates();
  }

  render() {
    const { data, dispatch, ...props } = this.props;
    const { error } = data;

    return (
      <div {...props} >
		<Grid>
			<Row>
				<Col sm={12}>
					<div className="logo">
						<div className="image-cover">
							<img src="/images/mushroom.png" class="img-fluid" alt="" />
						</div>
						<span className="name">PICSI</span>
					</div>
				</Col>
			</Row>
			<div className="login-form row align-items-md-center">
				<Col xs={12} sm={6} md={4} lg={4} mdOffset={4}>
					<form
	                    onSubmit={(e) => {
	                      e.preventDefault();
	                      const { username, password } = this.state;
	                      dispatch(loginRequest({ username, password }));
	                    }}
	                  >
	                  <div className="title text-center text-bold">
						<FormattedMessage {...messages['action.login']} />
                    </div>
								<FieldGroup
	                      id="username"
	                      type="text"
	                      label="Username"
	                      onChange={(e) => this.setState({ username: e.target.value })}
	                    />
								<FieldGroup
	                      id="password"
	                      type="password"
	                      label="Password"
	                      onChange={(e) => this.setState({ password: e.target.value })}
	                    />
								<Button type="submit" bsStyle="primary">
	                        Submit
	                      </Button>
							</form>
							<br />
							<a href="http://www.picsi.co/#contact">
						<FormattedMessage {...messages['contact']} />
					</a>
				</Col>
			</div>
		</Grid>
	</div>
    );
  }
}

Login.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
};

function select(state) {
  return {
    data: selectVars(state),
  };
}

export default connect(select)(styled(Login)`
  body,html {
background-color:#fff;
font-family:Roboto,sans-serif;
font-size:14px;
min-width:320px!important;
}
html { 
  background: url("https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).jpg") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.logo {
-webkit-box-align:center;
align-items:center;
display:flex;
font-size:20px;
font-weight:900;
margin:16px 10px;
}

.logo,.logo .image-cover {
display:flex;
}

.logo .image-cover {
height:32px;
margin-right:8px;
width:32px;
}

.logo .image-cover * {
margin:auto;
}

#login {
height:100vh;
margin-left:0!important;
padding:40px 0;
}

.text-bold {
font-weight:900;
}

.title.text-bold {
color:#191c23;
font-size:20px;
font-weight:800!important;
margin-bottom:40px;
}

.my-input-group {
margin:22px 0;
position:relative;
}

.my-input-group label {
-webkit-transition:all .2s ease;
color:#96979c;
font-size:14px;
font-weight:400;
left:20px;
margin-bottom:0;
pointer-events:none;
position:absolute;
top:18px;
transition:all .2s ease;
}

.my-input-group input.form-control {
background-color:#f7f7fa;
border:1px solid transparent;
border:0;
border-radius:8px;
color:#191c23;
height:56px;
padding:10px 20px;
}

.my-input-group input.form-control:focus {
border:1px solid #2d48c5!important;
box-shadow:0 0 0 0 rgba(0,123,255,.25);
outline:none;
}

.my-input-group input.form-control:focus,.my-input-group input.form-control:valid {
background-color:#fff;
border:1px solid #d4d5db;
}

.my-input-group input.form-control:focus~label {
color:#2d48c5!important;
}

.my-input-group input.form-control:focus~label,.my-input-group input.form-control:valid~label {
background:#fff;
color:#96979c;
font-size:14px;
padding:0 5px;
top:-9px;
z-index:9;
}

.my-input-group input[type=password].form-control {
letter-spacing:.3em;
}

.link {
color:#2d48c5;
font-weight:500;
}

.link:hover {
text-decoration:none;
}

#forget-password {
display:block;
font-size:14px;
font-weight:500;
margin-top:24px;
}

#login .login-form {
height:75vh!important;
}

.title {
color:#191c23;
font-size:20px;
font-weight:400;
padding-bottom:5px;
}

.my-primary-btn {
-moz-user-select:none;
-ms-user-select:none;
-webkit-touch-callout:none;
-webkit-user-select:none;
background-color:#2d48c5;
border:0;
border-radius:36px;
color:#fff;
font-family:Roboto,sans-serif;
font-size:18px;
font-weight:700;
height:56px;
position:relative;
user-select:none;
width:256px;
}

.my-primary-btn .icon {
-webkit-box-align:center;
-webkit-box-pack:center;
align-content:center;
align-items:center;
bottom:0;
display:-webkit-box;
display:flex;
justify-content:center;
position:absolute;
top:0;
}

.my-primary-btn .icon.icon-left {
left:8px;
}

.my-primary-btn .icon .img {
-webkit-box-align:center;
-webkit-box-pack:center;
align-content:center;
align-items:center;
display:-webkit-box;
display:flex;
height:40px;
justify-content:center;
margin:auto;
width:40px;
}

.my-primary-btn .icon .img img {
margin:auto;
max-width:100%;
}

.logo .name {
font-size:20px;
font-weight:900;
margin:auto 10px;
vertical-align:middle;
}
`);
