import React from 'react';
import { render } from '@testing-library/react';

import WidgetSection01 from './WidgetSection01';

describe(' WidgetSection01', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WidgetSection01 />);
    expect(baseElement).toBeTruthy();
  });
});
