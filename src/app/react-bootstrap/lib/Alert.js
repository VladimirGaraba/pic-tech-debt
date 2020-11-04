import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import styled from 'styled-components';
import Alert from '../../../node_modules/react-bootstrap/lib/Alert';

export default styled(({ children, ...props }) => {
  const glyph = {
    success: 'ok',
    warning: 'warning-sign',
    danger: 'remove',
    info: 'info-sign',
  }[props.bsStyle || 'info'] || '';

  return (
    <Alert {...props} >
      <Glyphicon glyph={glyph} />{' '}{children}
    </Alert>
  );
})`
  &.alert-success {
    color: #234234;
    border-color: #234234;
  }
  &.alert-warning {
    color: #6b4c17;
    border-color: #6b4c17;
  }
  &.alert-danger {
    color: #a94442;
    border-color: #a94442;
  }
  &.alert-info {
    color: #136b97;
    border-color: #136b97;
  }
`;
