import React from 'react';
import { render } from '@testing-library/react';

import Gauge from './Gauge';

describe('Gauge', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Gauge />);
    expect(baseElement).toBeTruthy();
  });
});
