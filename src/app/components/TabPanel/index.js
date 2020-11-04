import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UnstyledTabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Alert from 'react-bootstrap/lib/Alert';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import Hotkeys from 'react-hot-keys';

import NoteEntry from 'containers/NoteEntry';

import NoteEntryTemplate from 'containers/NoteEntry/template';

import { DEFAULT_UIMODE } from 'containers/App/constants';

import { isDisabled } from 'utils/helpers';

const Tabs = styled(UnstyledTabs)`
  & .tab-pane {
    padding-top: 2rem;
    background: #fff;
  }
  
  & .tab-pane input[type=number]::-webkit-outer-spin-button,
  & .tab-pane input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0 !important;
  }

  & .tab-pane input[type=number] {
    -moz-appearance:textfield;
  }
`;

class TabPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTab,
      activeAgentTab: props.activeAgentTab,
    };
  }

  componentWillUpdate(nextProps) {
    this.state.activeTab = nextProps.activeTab;
    this.state.activeAgentTab = nextProps.activeAgentTab;
  }

  showNotePanel() {
    const { editingTemplateId, callRecordId } = this.props;
    if (this.context.uiMode !== DEFAULT_UIMODE) {
      return <NoteEntryTemplate recordId={editingTemplateId} />;
    }
    return <NoteEntry recordId={callRecordId} />;
  }

  render() {
    const {
        callRecordId,
        tabs,
        views,
        setTab,
        setAgentTab,
        primary,
        justified,
        hotkeys,
        notice,
        onAddHandler,
    } = this.props;

    const optionalProps = {
      unmountOnExit: true,
    };
    if (justified) optionalProps.justified = true;
    if (primary) {
      optionalProps.activeKey = this.state.activeTab;
      optionalProps.onSelect = (key) => setTab(key);
    } else {
      optionalProps.activeKey = this.state.activeAgentTab;
      optionalProps.onSelect = (key) => {
        if (key === tabs.length - 1 && tabs[tabs.length - 1] === '+' && onAddHandler) {
          onAddHandler();
        } else {
          setAgentTab(key);
        }
      };
    }

    let readonlynotice;
    if (this.context.uiMode === DEFAULT_UIMODE && !callRecordId && notice) {
      readonlynotice = (<Alert bsStyle="warning" style={{ marginLeft: '1rem', marginRight: '1rem' }}>
        This record is currently read-only. Please start a call against this record to edit it.
      </Alert>);
    }

    if (hotkeys) {
      return (
        <div>
          <Tabs id="tabs" {...optionalProps}>
            { tabs.map((tabTitle, i) => {
              const tooltip = <Tooltip id={`Alt+${i + 1}`}>Alt+{(i + 1)}</Tooltip>;
              return (<Tab
                key={i} eventKey={i}
                title={<OverlayTrigger overlay={tooltip} placement={'bottom'} delayShow={300} delayHide={150}><span>{tabTitle}</span></OverlayTrigger>}
              >{readonlynotice}{views[i]}</Tab>);
            })}
          </Tabs>
          { tabs.map((tabTitle, i) =>
            <Hotkeys
              key={i}
              keyName={`alt+${i + 1}`}
              onKeyUp={() => setTab(i)}
            />
            )}
          { !isDisabled({ ability: 'add call notes', ...this.props }, this.context) ? this.showNotePanel() : null }
        </div>
      );
    }
    return (
      <Tabs id="tabs" {...optionalProps}>
        { tabs.map((tabTitle, i) => {
          let newTabTitle = tabTitle;
          if (newTabTitle === '+') {
            newTabTitle = <Glyphicon glyph={'plus'} />;
          }
          return (<Tab
            key={i} eventKey={i}
            title={newTabTitle}
          >{readonlynotice}{views[i]}</Tab>);
        })}
      </Tabs>
    );
  }
}

TabPanel.propTypes = {
  callRecordId: PropTypes.string,
  editingTemplateId: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  views: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTab: PropTypes.func,
  setAgentTab: PropTypes.func,
  primary: PropTypes.bool,
  justified: PropTypes.bool,
  hotkeys: PropTypes.bool,
  notice: PropTypes.bool,
  onAddHandler: PropTypes.func,
  activeTab: PropTypes.number,
  activeAgentTab: PropTypes.number,
};

TabPanel.defaultProps = {
  title: '',
  scrollable: false,
  hotkeys: true,
  notice: true,
};

TabPanel.contextTypes = {
  uiMode: PropTypes.string,
};

export default TabPanel;
