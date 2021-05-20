import React from 'react';
import { render } from '@testing-library/react';

import BubbleChart from './BubbleChart';

describe('BubbleChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BubbleChart />);
    expect(baseElement).toBeTruthy();
  });
});
