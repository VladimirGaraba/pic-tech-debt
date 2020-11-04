import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styled from 'styled-components';
import Button from '../../../node_modules/react-bootstrap/lib/Button';

const glyphs = {
  success: 'ok',
  warning: 'warning-sign',
  danger: 'remove',
  info: 'info-sign',
  default: '',
  primary: '',
  link: '',
};

export default styled(({ children, ...props }) => {
  const glyph = glyphs[props.bsStyle || 'default'] || '';

  return (
    <Button {...props} >
      {glyph && <Glyphicon glyph={glyph} />}{' '}{children}
    </Button>
  );
})`
  &.btn-primary {
    background: #1b6ec2;
    &:hover,
    &:focus,
    &:active,
    &.active {
      background: #fff;
      color: #1b6ec2;
      border-color: #1b6ec2;
    }
    &.disabled {
      color: #606060;
      border: 1px solid #999;
      background: #eee;
    }
  }
  &.btn-default {
    background: #fff;
    border: 1px solid #999;
    &:hover,
    &:focus,
    &:active,
    &.active {
      background: #eee;
      border-color: #ccc;
    }
    &.disabled {
      color: #606060;
      background: #eee;
    }
  }
  &.btn-success {
    background: #008000;
    &:hover,
    &:focus,
    &:active,
    &.active {
      background: #fff;
      border-color: #008000;
      color: #008000;
    }
    &.disabled {
      color: #606060;
      border: 1px solid #999;
      background: #eee;
    }
  }
  &.btn-danger {
    background: #d50000;
    &:hover,
    &:focus,
    &:active,
    &.active {
      background: #fff;
      border-color: #d50000;
      color: #d50000;
    }
    &.disabled {
      color: #606060;
      border: 1px solid #999;
      background: #eee;
    }
  }
  &.btn-warning {
    background-color: #f4d03f;
    color: #000;
    border: 1px solid #999;
    &:visited {
      color: #000;
    }
    &:hover,
    &:focus,
    &:active,
    &.active {
      background: #fff;
      color: #8d6708;
      border-color: #8d6708;
    }
    &.disabled {
      color: #606060;
      border: 1px solid #999;
      background: #eee;
    }
  }
  &.btn-info {
    background-color: #8cd2e7;
    color: #000;
    border: 1px solid #999;
    &:visited {
      color: #000;
    }
    &:hover,
    &:focus,
    &:active,
    &.active {
      background: #fff;
      color: #217e9b;
      border-color: #217e9b;
    }
    &.disabled {
      color: #606060;
      border: 1px solid #999;
      background: #eee;
    }
  }
  &.btn-link {
    color: #337ab7;
    background-color: transparent;
    -webkit-box-shadow: none;
    box-shadow: none;
    &:hover,
    &:focus,
    &:active,
    &.active {
      color: #2a6496;
      text-decoration: underline;
    }
    &.disabled {
      color: #606060;
      text-decoration: none;
    }
  }
`;
