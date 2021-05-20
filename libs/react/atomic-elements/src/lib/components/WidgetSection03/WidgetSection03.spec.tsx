import React from 'react';
import { render } from '@testing-library/react';

import WidgetSection03 from './WidgetSection03';

describe(' WidgetSection03', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WidgetSection03 />);
    expect(baseElement).toBeTruthy();
  });
});
