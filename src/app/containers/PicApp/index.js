import React from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';

import PicAppView from 'components/PicAppView';

const PicApp = () => (
  <article>
    <Helmet
      title="Home Page"
    />
    <PicAppView />
  </article>
);

PicApp.propTypes = {
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(PicApp);
