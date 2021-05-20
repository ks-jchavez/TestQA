import React from 'react';
import { render } from '@testing-library/react';

import Line from './Line';

describe(' Line', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Line />);
    expect(baseElement).toBeTruthy();
  });
});
