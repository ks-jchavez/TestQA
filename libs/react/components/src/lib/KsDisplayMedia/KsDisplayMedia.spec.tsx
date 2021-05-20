import React from 'react';
import { render } from '@testing-library/react';

import KsDisplayMedia from './KsDisplayMedia';

describe(' KsDisplayMedia', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KsDisplayMedia />);
    expect(baseElement).toBeTruthy();
  });
});
