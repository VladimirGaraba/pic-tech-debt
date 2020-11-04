import React from 'react';
import PropTypes from 'prop-types';

import ListGroup from './StyledListGroup';

export class CaseListGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
  }

  render() {
    const { parent, children } = this.props;
    return (
      <div className={'list-group-wrapper'} >
        {parent}
        <ListGroup>
          {children}
        </ListGroup>
      </div>
    );
  }
}

CaseListGroup.propTypes = {
  parent: PropTypes.object,
  children: PropTypes.array,
};

export default CaseListGroup;
