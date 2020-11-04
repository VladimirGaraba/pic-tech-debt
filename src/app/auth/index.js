import { Cookies } from 'react-cookie';
import moment from 'moment/moment';

import request from './fakeRequest';
import jsonRequest from './jsonRequest';

const debug = false;
const cookies = new Cookies();

const auth = {
  /**
   * Logs a user in, returning a promise with `true` when done
   * @param  {string} username The username of the user
   * @param  {string} password The password of the user
   */
  login(username, password) {
    if (auth.loggedIn()) return Promise.resolve(true);

    if (debug) {
      // Post a fake request
      return request.post('/login', { username, password })
          .then((response) => {
            // Save token to cookie
            auth.setToken(response.token);
            return Promise.resolve(true);
          });
    }

    const URL = '/api/v1/auth/login';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = `email=${username}&password=${password}`;

    return jsonRequest.post(URL, headers, body)
      .then((json) => {
        auth.setToken(json.access_token);
        return Promise.resolve(true);
      })
      .catch((err) => {
        let message = err.message;
        if (message === '401 Unauthorized') {
          message = 'Incorrect Email/Password';
        }
        throw new Error(message);
      });
  },
  /**
   * Logs the current user out
   */
  logout() {
    const URL = '/api/v1/auth/logout';
    const headers = {
      Authorization: `Bearer ${auth.getToken()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    auth.clearToken();
    if (debug) {
      return request.post('/logout');
    }
    return jsonRequest.post(URL, headers, '')
      .then(() => Promise.resolve(true))
      .catch(console.log.bind(console)); // eslint-disable-line no-console
  },
  /**
   * Checks if a user is logged in
   */
  loggedIn() {
    return !!auth.getToken();
  },
  /**
   * Registers a user and then logs them in
   * @param  {string} username The username of the user
   * @param  {string} password The password of the user
   */
  register(username, password) {
    // Post a fake request
    return request.post('/register', { username, password })
    // Log user in after registering
        .then(() => auth.login(username, password));
  },
  validateToken() {
    const claims = auth.getClaims();
    if (claims.exp) {
      if (moment().isAfter(moment.unix(claims.exp))) {
        auth.clearToken();
      }
    }
  },
  onChange() {},
  getToken() { return cookies.get('token'); },
  setToken(token) { cookies.set('token', token, { httpOnly: false }); },
  getClaims() {
    return auth.getToken() && auth.getToken().split('.')[1] ? JSON.parse(atob(auth.getToken().split('.')[1])) : {};
  },
  clearToken() {
    cookies.remove('token');
  },
  refreshToken() {
    if (!auth.debug()) {
      const URL = '/api/v1/auth/refresh';
      const headers = {
        Authorization: `Bearer ${auth.getToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const body = '';
      return jsonRequest.post(URL, headers, body)
        .then((json) => {
          auth.setToken(json.access_token);
          return Promise.resolve(true);
        })
        .catch((err) => {
          auth.validateToken();
          const message = err.message;
          throw new Error(message);
        });
    }
    return undefined;
  },
  expiresIn() {
    return auth.loggedIn() ? moment.unix(auth.getClaims().exp).diff(moment(), 'seconds') : 0;
  },
  debug() { return debug; },
};

export default auth;
