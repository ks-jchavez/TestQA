import React from 'react';
import { render } from '@testing-library/react';

import FullAreaCardWidget01 from './FullAreaCardWidget01';

describe(' FullAreaCardWidget01', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FullAreaCardWidget01 />);
    expect(baseElement).toBeTruthy();
  });
});
