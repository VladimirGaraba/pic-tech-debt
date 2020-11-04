import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import styled, { keyframes } from 'styled-components';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import UnstyledGlyphicon from 'react-bootstrap/lib/Glyphicon';

import {
  userCan,
} from 'utils/helpers';

const kfSpin = keyframes`
    from { transform: scale(1) rotate(0deg);}
    to { transform: scale(1) rotate(360deg);}
`;

const kfSpin2 = keyframes`
    from { -webkit-transform: rotate(0deg);}
    to { -webkit-transform: rotate(360deg);}
`;

const Glyphicon = styled(UnstyledGlyphicon)`
  &.glyphicon.spinning {
    animation: ${kfSpin} 1s infinite linear;
    -webkit-animation: ${kfSpin2} 1s infinite linear;
  }
`;

export const CaseListFilter = ({ currentlySyncing, search, doSearch, updateSearchFilter, userSPI, ...props }) => (
  <Form className={props.className} >
    <FormGroup>
      <InputGroup>
        <FormControl
          componentClass="select"
          placeholder="Show"
          value={search.filter}
          onChange={(e) => updateSearchFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="pending">Closed Pending Review</option>
          <option value="closed">Closed</option>
          {userCan(userSPI, 'view deleted files') ? <option value="deleted">Deleted</option> : null}
        </FormControl>
        <InputGroup.Button>
          <Button
            onClick={() => doSearch(search)}
            disabled={currentlySyncing}
          >
            <Glyphicon glyph={'refresh'} className={currentlySyncing ? 'spinning' : ''} />
          </Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  </Form>
);


CaseListFilter.propTypes = {
  className: PropTypes.string,
  currentlySyncing: PropTypes.bool,
  doSearch: PropTypes.func,
  search: PropTypes.object,
  updateSearchFilter: PropTypes.func,
  userSPI: PropTypes.object,
};

export default injectIntl(styled(CaseListFilter)`
  ${({ theme }) => theme.CaseListFilter}
`);
