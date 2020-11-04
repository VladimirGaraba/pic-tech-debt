// Authentication saga

import { hashSync } from 'bcryptjs';

import { delay } from 'redux-saga';
import { call, put, race, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import auth from 'auth';
import genSalt from 'auth/salt';

import {
  CHANGE_FORM,
  LOGIN_REQUEST,
  LOGOUT,
  REGISTER_REQUEST,
  REQUEST_ERROR,
  SENDING_REQUEST,
  SET_AUTH,
} from 'containers/App/constants';

import {
  setAuthState,
} from 'containers/App/actions';

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
function* authorize({ username, password, isRegistering }) {
  // We send an action that tells Redux we're sending a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // We then try to register or log in the user, depending on the request
  try {
    const salt = genSalt(username);
    let hash = password;

    if (auth.debug()) {
      hash = hashSync(password, salt);
    }
    let response;

    // For either log in or registering, we call the proper function in the `auth`
    // module, which is asynchronous. Because we're using generators, we can work
    // as if it's synchronous because we pause execution until the call is done
    // with `yield`!
    if (isRegistering) {
      response = yield call(auth.register, username, hash);
    } else {
      response = yield call(auth.login, username, hash);
    }

    return response;
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: REQUEST_ERROR, error: error.message });

    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

/**
 * Effect to handle logging out
 */
/* eslint-disable consistent-return */
function* logout() {
  // We tell Redux we're in the middle of a request
  yield put({ type: SENDING_REQUEST, sending: true });

  // Similar to above, we try to log out by calling the `logout` function in the
  // `auth` module. If we get an error, we send an appropiate action. If we don't,
  // we return the response.
  try {
    const response = yield call(auth.logout);
    yield put({ type: SENDING_REQUEST, sending: false });
    return response;
  } catch (error) {
    yield put({ type: REQUEST_ERROR, error: error.message });
  }
}
/* eslint-enable consistent-return */

/**
 * Log in saga
 */
function* loginFlow() {
  if (auth.loggedIn()) {
    yield put(setAuthState(true, auth.getToken())); // User is logged in (authorized)
  }
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) { // eslint-disable-line no-constant-condition
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    const request = yield take(LOGIN_REQUEST);
    const { username, password } = request.data;

    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    const winner = yield race({
      auth: call(authorize, { username, password, isRegistering: false }),
      logout: take(LOGOUT),
    });

    // If `authorize` was the winner...
    if (winner.auth) {
      // ...we send Redux appropiate actions
      const token = (auth.debug())
        ? 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE1MDkzNzcxODgsImV4cCI6MTUwOTM4MDc4OCwibmJmIjoxNTA5Mzc3MTg4LCJqdGkiOiJFeG5vTXkwcmRNYkxYbTJ1Iiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIiwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwib3JnIjoiV0EgUG9pc29ucyBJbmZvcm1hdGlvbiBDZW50cmUiLCJwaG9uZSI6IigwOCkgOTk5OSA5OTk5Iiwib3JnX3N0cmVldCI6Ikhvc3BpdGFsIEF2ZSIsIm9yZ19zdWJ1cmIiOiJOZWRsYW5kcyIsIm9yZ19zdGF0ZSI6IldBIiwib3JnX3Bvc3Rjb2RlIjoiNjAwOSJ9._XaDXv30uOn0yNhqBEBIIa7G_QKvqvaX6tl419EyCLc'
        : auth.getToken();
      yield put(setAuthState(true, token)); // User is logged in (authorized)
      yield put({ type: CHANGE_FORM, newFormState: { username: '', password: '' } }); // Clear form
      yield put(push('/')); // Go to dashboard page
    }
  }
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
function* logoutFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(LOGOUT);

    yield put(setAuthState(false));
    yield call(auth.logout);
    yield call(logout);

    yield put(push('/login'));
  }
}

/**
 * Register saga
 * Very similar to log in saga!
 */
function* registerFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    // We always listen to `REGISTER_REQUEST` actions
    const request = yield take(REGISTER_REQUEST);
    const { username, password } = request.data;

    // We call the `authorize` task with the data, telling it that we are registering a user
    // This returns `true` if the registering was successful, `false` if not
    const wasSuccessful = yield call(authorize, { username, password, isRegistering: true });

    // If we could register a user, we send the appropriate actions
    if (wasSuccessful) {
      yield put(setAuthState(true, auth.getToken())); // User is logged in (authorized) after being registered
      yield put({ type: CHANGE_FORM, newFormState: { username: '', password: '' } }); // Clear form
      yield put(push('/')); // Go to dashboard page
    }
  }
}

function* refreshFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    if (auth.loggedIn()) {
      yield race({
        signOutAction: take(LOGOUT),
        authLoop: call(refreshLoop),
      });

      yield call(delay, 1000);
    } else {
      yield take(SET_AUTH);
    }
  }
}

function* refreshLoop() {
  while (true) { // eslint-disable-line no-constant-condition
    const expiresIn = auth.expiresIn();

    if (expiresIn > 0) { yield call(delay, expiresIn * 1000); }

    yield put({ type: SENDING_REQUEST, sending: true });
    try {
      yield call(auth.refreshToken);
    } catch (error) {
      yield put({ type: REQUEST_ERROR, error: error.message });
    } finally {
      yield put({ type: SENDING_REQUEST, sending: false });
    }
    if (!auth.loggedIn()) {
      yield put({ type: LOGOUT });
      return;
    }
  }
}

export {
  loginFlow,
  logoutFlow,
  refreshFlow,
  registerFlow,
};
