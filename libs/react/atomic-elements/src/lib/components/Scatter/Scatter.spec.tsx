import React from 'react';
import { render } from '@testing-library/react';

import Scatter from './Scatter';

describe(' Scatter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Scatter />);
    expect(baseElement).toBeTruthy();
  });
});
