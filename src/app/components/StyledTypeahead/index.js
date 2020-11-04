import styled from 'styled-components';

import { Typeahead } from 'react-bootstrap-typeahead';

const StyledTypeahead = styled(Typeahead)`
  & .rbt-input-multi {
    height: auto;
  }

  & .rbt-aux {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  
  & .rbt-token-removeable {
    cursor: pointer;
    padding-right: 21px;
  }

  & .rbt-token {
    background-color: #e7f4ff;
    border: 0;
    border-radius: 2px;
    color: #1f8dd6;
    display: inline-block;
    line-height: 1em;
    margin: 0 3px 3px 0;
    padding: 4px 7px;
    position: relative;
  }
  
  & .rbt-token .close {
    line-height: inherit;
    padding: 0 0 0 7px;
  }
`;

export default StyledTypeahead;
