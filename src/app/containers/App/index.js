/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import injectTapEventPlugin from 'react-tap-event-plugin';

import withProgressBar from 'components/ProgressBar';

injectTapEventPlugin();

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export function App({ className, ...props }) {
  return (
    <AppWrapper className={className}>
      <Helmet
        titleTemplate="%s - Poisons Information Centre"
        defaultTitle="App"
        meta={[
            { name: 'description', content: 'Poisons Information Centre Application' },
        ]}
        style={[{
          cssText: `
                  body .modal-content {
                      max-height: calc(100vh - 60px);
                  }

                  body .modal-content,
                  body .modal-body,
                  body .modal-body > form,
                  body .modal-body > form > #new-call-tab-container,
                  body .modal-dialog.record .modal-body .tab-content,
                  body .modal-dialog.record .modal-body .tab-content > .tab-pane.active,
                  body .modal-dialog.record .modal-body .tab-content > .tab-pane.active > .row,
                  body .modal-dialog.record .modal-body .tab-content > .tab-pane.active > .row > div,
                  body .modal-dialog.search .modal-body > form > .row,
                  body .modal-dialog.search .modal-body > form > .row > div {
                      display: flex;
                      flex-direction: column;
                      min-height: 0;
                  }

                  body .modal-dialog.record .modal-body .nav-pills,
                  body .modal-dialog.incident .modal-body .nav-pills {
                      margin-bottom: 1rem;
                  }

                  body .modal-dialog.search .modal-body .list-group,
                  body .modal-dialog.record .modal-body .tab-content .list-group  {
                      flex: 1;
                      overflow: auto;
                  }
              `,
        }]}
      />
      {React.Children.toArray(props.children)}
    </AppWrapper>
  );
}

App.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default withProgressBar(styled(App)`
  min-height: 100vh;
  ${({ theme }) => theme.App};
`);
