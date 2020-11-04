// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business

import { clearError } from 'containers/App/actions';
import { selectVars, makeSelectSPI } from 'containers/App/selectors';

import { userCan } from 'utils/helpers';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
  if (err && err.message.match(/Loading chunk/) && confirm('Error loading application. Click OK to reload.')) { // eslint-disable-line no-alert
    window.location.reload(true);
  }
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  /**
   * Check user is authed
   * @param  {object}   nextState The state we want to change into when we change routes
   * @param  {function} replace Function provided by React Router to replace the location
   */
  function isAuthed(nextState, replace) {
    const state = store.getState();
    const { loggedIn } = selectVars(state);
    const selectSPI = makeSelectSPI();
    const userSPI = selectSPI(state);

    store.dispatch(clearError());

    if (!loggedIn) {
      replace('/login');
    } else if (nextState.location.pathname === '/dashboard' && !userCan(userSPI, 'view data analytics')) {
      window.location = '/settings';
    }
  }

  /**
   * Check user is not logged in
   * @param  {object}   nextState The state we want to change into when we change routes
   * @param  {function} replace Function provided by React Router to replace the location
   */
  function isGuest(nextState, replace) {
    const state = store.getState();
    const { loggedIn } = selectVars(state);

    if (loggedIn) {
      replace('/');
    }
  }

  return [
    {
      onEnter: isGuest,
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        import('containers/LoginPage')
            .then(loadModule(cb))
            .catch(errorLoading);
      },
    }, {
      onEnter: isGuest,
      path: '/forgot-password',
      name: 'forgotpassword',
      getComponent(nextState, cb) {
        import('containers/ForgotPasswordPage')
            .then(loadModule(cb))
            .catch(errorLoading);
      },
    }, {
      onEnter: isAuthed,
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/PicApp'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([container]) => {
          renderRoute(container);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
