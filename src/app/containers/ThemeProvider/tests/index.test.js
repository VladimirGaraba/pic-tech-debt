import React from 'react';
import { shallow } from 'enzyme';

import { ThemeProvider } from '../index';

describe('<ThemeProvider />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <ThemeProvider>
        {children}
      </ThemeProvider>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
