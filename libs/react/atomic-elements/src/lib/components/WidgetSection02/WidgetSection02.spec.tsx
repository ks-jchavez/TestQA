import React from 'react';
import { render } from '@testing-library/react';

import WidgetSection02 from './WidgetSection02';

describe(' WidgetSection02', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WidgetSection02 />);
    expect(baseElement).toBeTruthy();
  });
});
