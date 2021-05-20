import React from 'react';
import { render } from '@testing-library/react';

import PolarArea from './PolarArea';

describe(' PolarArea', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PolarArea />);
    expect(baseElement).toBeTruthy();
  });
});
