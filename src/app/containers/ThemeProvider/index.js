import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider as DefaultThemeProvider } from 'styled-components';

import { makeSelectTheme } from '../App/selectors';

import themes from './themes';

export const ThemeProvider = ({ theme, children, ...rest }) => (
  <DefaultThemeProvider
    theme={themes[theme]}
    {...rest}
  >
    {children}
  </DefaultThemeProvider>
);

ThemeProvider.propTypes = {
  theme: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const makeMapStateToProps = () => {
  const selectTheme = makeSelectTheme();
  const mapStateToProps = (state) => {
    const theme = selectTheme(state);
    return {
      theme,
    };
  };
  return mapStateToProps;
};

export default connect(
  makeMapStateToProps
)(ThemeProvider);
