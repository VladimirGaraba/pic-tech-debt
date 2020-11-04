import React from 'react';
import { mount, shallow } from 'enzyme';
import { IntlProvider, intlShape } from 'react-intl';

const messages = require('../../app/translations/en');

// Create IntlProvider to retrieve React Intl context
const intlProvider = new IntlProvider(
  {
    locale: 'en',
    messages,
  },
  {}
);
const { intl } = intlProvider.getChildContext();

// `intl` prop is required when using injectIntl HOC
const nodeWithIntlProp = (node) => React.cloneElement(node, { intl });

// shallow() with React Intl context
global.shallowWithIntl = (node, { context, ...options } = {}) => shallow(nodeWithIntlProp(node), {
  ...options,
  context: {
    ...context,
    intl,
  },
});
// mount() with React Intl context
global.mountWithIntl = (
  node,
  { context, childContextTypes, ...options } = {}
) => mount(nodeWithIntlProp(node), {
  ...options,
  context: {
    ...context,
    intl,
  },
  childContextTypes: {
    intl: intlShape,
    ...childContextTypes,
  },
});
