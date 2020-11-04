import styled from 'styled-components';

import ListGroup from 'react-bootstrap/lib/ListGroup';

const StyledListGroup = styled(ListGroup)`
  & .list-group-item {
    border-radius: 0;
  }

  & .react-contextmenu-wrapper > .list-group-item {
    margin-bottom: -1px;
  }
  
  & .react-contextmenu-wrapper:last-child > .list-group-item {
    margin-bottom: 0;
  }
  
  & .list-group .list-group-item {
    padding-left: 30px;
  }
  
  & .list-group-wrapper:not(:last-child) .list-group-item:last-child {
    border-bottom: none;
  }
  
  & .list-group-wrapper .list-group {
    margin-bottom: 0;
  }
`;

export default StyledListGroup;
