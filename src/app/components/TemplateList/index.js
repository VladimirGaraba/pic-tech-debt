/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import _isEmpty from 'lodash/isEmpty';

import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import UnstyledListGroup from 'react-bootstrap/lib/ListGroup';

import { ContextMenu as UnstyledContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';

import messages from './messages';

const ContextMenu = styled(UnstyledContextMenu)`
  & {
    z-index: 1000;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    background-clip: padding-box;
  }
  
  & > .react-contextmenu-item {
    padding: 3px 20px;
    clear: both;
    font-weight: 400;
    line-height: 1.42857143;
    color: #333;
    white-space: nowrap;
  }

  & > .react-contextmenu-item.dropdown-header {
    display: block;
    padding: 3px 20px;
    font-size: 12px;
    line-height: 1.42857143;
    color: #777;
    white-space: nowrap;
  }

  & > .react-contextmenu-item--divider {
    height: 1px;
    padding: 0;
    margin: 9px 0;
    overflow: hidden;
    background-color: #e5e5e5;
  }
`;

const ListGroup = styled(UnstyledListGroup)`
  & .list-group-item {
    border-radius: 0;
  }
`;

class TemplateList extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.state = {
      selected: [props.currentTemplateId],
    };
  }

  getContextMenu(macro) {
    const { deleteTemplate, editingTemplateId, editTemplate, templates, userSPI } = this.props;
    const id = templates[macro]._id; // eslint-disable-line no-underscore-dangle

    if (!_isEmpty(editingTemplateId)) {
      return (<ContextMenu key={`contextmenu-${id}`} id={id}>
        <MenuItem><FormattedMessage {...messages['messages.context.unavailable']} /></MenuItem>
      </ContextMenu>);
    }

    return (<ContextMenu key={id} id={id}>
      <MenuItem
        onClick={() => editTemplate(macro, templates[macro], userSPI)}
      >
        <FormattedMessage {...messages['action.template.edit']} />
      </MenuItem>
      <MenuItem
        onClick={() => confirm(`Are you sure you want to delete "${macro}"?`) ? deleteTemplate(macro) : null} // eslint-disable-line no-alert
      >
        <FormattedMessage {...messages['action.template.delete']} />
      </MenuItem>
    </ContextMenu>);
  }

  handleSelectChange(onItemClick, path) {
    const { currentTemplateId, editingTemplateId } = this.props;
    if (!_isEmpty(editingTemplateId)) {
      // If target is same as current, do nothing
      if (path[path.length - 1] !== editingTemplateId) {
        alert('You need to save before switching templates.'); // eslint-disable-line no-alert
      }
    } else {
      onItemClick(path[path.length - 1], currentTemplateId);
    }
  }

  render() {
    const {
      currentTemplateId,
      onItemClick,
      templates,
    } = this.props;

    const icons = null;
    const contextmenus = [];

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ListGroup style={{ overflow: 'auto', marginBottom: '0' }}>
          {Object.keys(templates).length > 0
            ? Object.keys(templates).map((macro) => {
              const id = templates[macro]._id; // eslint-disable-line no-underscore-dangle
              contextmenus.push(this.getContextMenu(macro));

              return (
                <ContextMenuTrigger key={`trigger-${id}`} id={id}>
                  <ListGroupItem
                    active={macro === currentTemplateId}
                    onClick={() => this.handleSelectChange(onItemClick, [macro])}
                  >
                    {macro}{icons}
                  </ListGroupItem>
                </ContextMenuTrigger>
              );
            })
            : <ListGroupItem><FormattedMessage {...messages['templates.none']} /></ListGroupItem>}
        </ListGroup>
        {contextmenus}
      </div>
    );
  }
}

TemplateList.propTypes = {
  currentTemplateId: PropTypes.string,
  deleteTemplate: PropTypes.func,
  editingTemplateId: PropTypes.string,
  editTemplate: PropTypes.func,
  onItemClick: PropTypes.func,
  templates: PropTypes.object,
  userSPI: PropTypes.object,
};

export default TemplateList;
