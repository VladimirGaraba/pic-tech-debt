import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Alert from 'react-bootstrap/lib/Alert';


// This is used in place of ThemeProvide as a quick and dirty demo of themes
// It places a toggle controls at the top of the page that demo each theme
// and button styles. Simply import and change the name of the ThemeProvider
// to ThemeProviderWithDemo.
export class ThemeProviderWithDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'oreo',
      open: false,
    };
  }


  render() {
    const ButtonDemo = () => (
      <ButtonToolbar>
        {/* Standard button */}
        <Button>Default</Button>

        {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
        <Button bsStyle="primary">Primary</Button>

        {/* Indicates a successful or positive action */}
        <Button bsStyle="success">Success</Button>

        {/* Contextual button for informational alert messages */}
        <Button bsStyle="info">Info</Button>

        {/* Indicates caution should be taken with this action */}
        <Button bsStyle="warning">Warning</Button>

        {/* Indicates a dangerous or potentially negative action */}
        <Button bsStyle="danger">Danger</Button>

        {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
        <Button bsStyle="link">Link</Button>
      </ButtonToolbar>
    );

    return (
      <ThemeProvider theme={themes[this.state.theme]}>
        <div>
          <Grid fluid>
            <Row>
              <Col xs={2}>
                <ButtonGroup>
                  {Object.keys(themes).map((k) => (
                    <Button
                      key={k}
                      bsStyle={this.state.theme === k ? 'success' : 'default'}
                      onClick={
                        (e) => {
                          e.preventDefault();
                          this.setState({ theme: k });
                        }
                      }
                    >
                      {k}
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
              <Col>
                <Button onClick={() => this.setState({ open: !this.state.open })}>
                  Demo contextual buttons, etc.
                </Button>
                <Panel id="collapsible-panel-example-1" expanded={this.state.open}>
                  <Panel.Collapse>
                    <Panel.Body>
                      <Alert bsStyle="success">
                        Success message
                        <ButtonDemo />
                      </Alert>
                      <Alert bsStyle="warning">
                        Warning message
                        <ButtonDemo />
                      </Alert>
                      <Alert bsStyle="danger">
                        Error message
                        <ButtonDemo />
                      </Alert>
                      <Alert bsStyle="info">
                        Information message
                        <ButtonDemo />
                      </Alert>
                    </Panel.Body>
                  </Panel.Collapse>
                </Panel>
              </Col>
            </Row>
          </Grid>
          {this.props.children}
        </div>
      </ThemeProvider>
    );
  }
}

ThemeProviderWithDemo.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

// Improvements to Bootstrap
const bootstrapTabs = `
  .nav-tabs > li > a {
    border: 1px solid #ddd;
    border-bottom-color: transparent;
    font-weight: bold;
  }
  .tab-content {
    border: 1px solid #ddd;
    border-top: none;
    background: white;
  }
`;

// adds an opacity, n, to a rgb or rgba color specifier.
const opacity = (c, n) => c.replace(/(rgba?[(])(\d+,\s*\d+,\s*\d+)(,\s*\d+)?[)]/, `rgba($2,${n})`);

// Apply a color palette (three colors specified by rgb() specifier)
// to a theme template. Attributes map to component names. The component
// injects the theming string into the styled-component template string.
// So, to the login component would interpolate theme.Login into it's
// styled()`` template like so:
//
//   ${({ theme }) => theme.Login}
const palette = ({ c1, c2, c3 }) => ({
  App: `
      background-color: ${c3};
      ${bootstrapTabs}
      .nav-tabs > li > a {
        color: ${c1}
        border-color: ${c1}
      }
      && .nav-tabs > li {
        &.active > a, & a:hover {
          background: ${c1}
          color: ${c2};
        }
      }
      .tab-content {
        border-color: ${c1}
      }
    `,
  Login: `
      & .PageHeading {
        background-color: ${c1}
        color: ${c2};
      }
      .PageContent {
        .panel-default .panel-heading {
          background-color: ${c1};
          color: ${c2};
        }
      }
    `,
  ActionBar: `
      &, & ul {
        background-color: ${c1};
      }
      & {
        .btn, ul > li > a {
          color: ${c2};
        }
        ul > li > a:hover, .btn:hover, .btn:active, .btn:focus, .btn:focus-within {
          color: ${c2};
          background: rgba(255, 255, 255, 0.2);
        }
      }
    `,
  CaseListFilter: `
      & .input-group-btn .btn {
        color: ${c2};
        background-color: ${c1};
        &:hover {
          background-color: ${opacity(c1, 0.85)};
        }
      }
      #caseListSearch .panel-body {
        color: ${c2};
        background-color: ${opacity(c1, 0.85)};
      }
    `,
  CaseListItem: `
      &.list-group-item {
        &:hover, &:focus, &.active {
          color: ${c2};
          background-color: ${c1};
          .glyphicon-folder-close {
            color: ${c2};
          }
        }
      }
      .glyphicon-folder-close {
        color: ${c1};
      }
    `,
});

// A collection of themes
const themes = {
  bootstrap: { // effectively reverts to original bootstrap
  },
  ocean: palette({
    c1: 'rgb(7, 71, 166)',
    c2: 'rgb(198, 183, 143)',
    c3: 'rgb(228, 227, 200)',
  }),
  magenta: palette({
    c1: 'rgb(189, 31, 141)',
    c2: 'rgb(202, 202, 202)',
    c3: 'rgb(228, 227, 200)',
  }),
  oreo: palette({
    c1: 'rgb(0,0,0)',
    c2: 'rgb(255, 255, 255)',
    c3: 'rgb(255, 255, 255)',
  }),
};

ThemeProviderWithDemo.propTypes = {
  children: PropTypes.array,
};

export default themes;
