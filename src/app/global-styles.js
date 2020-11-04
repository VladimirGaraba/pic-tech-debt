import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  .vbottom {
    display: inline-block;
    vertical-align: bottom;
    margin-top: 320px;
  }
  
  div.react-dropdown-tree-select .dropdown {
    width: 100%;
  }
  
  div.react-dropdown-tree-select .dropdown-trigger {
    border-radius: 0.25rem;
    display: flex !important;
    flex: 1;
  }
  
  div.react-dropdown-tree-select .dropdown-trigger.arrow:after {
    margin-top: 0.5em;
  }
  
  div.react-dropdown-tree-select .dropdown-trigger > span:after {
    font-size: 12px;
    color: #555;
  }
  
  div.react-dropdown-tree-select .toggle {
    font: normal normal normal 12px/1 FontAwesome;
    color: #555;
    margin-right: 0.25em;
    vertical-align: middle;
  }
  
  div.react-dropdown-tree-select .toggle.collapsed::after {
    content: "\\f067";
  }
  
  div.react-dropdown-tree-select .toggle.expanded::after {
    content: "\\f068";
  }
  
  div.react-dropdown-tree-select .checkbox-item {
    margin-top: 0;
    margin-right: 0.25em;
  }
  
  div.react-dropdown-tree-select .tag-list {
    flex: 1;
  }
  
  div.react-dropdown-tree-select .tag-item .search {
    flex: 1;
    border: none !important;
  }
`;
