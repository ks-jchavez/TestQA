import React from 'react';
import { render } from '@testing-library/react';

import SecondaryCardWidget01 from './SecondaryCardWidget01';

describe(' SecondaryCardWidget01', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SecondaryCardWidget01 />);
    expect(baseElement).toBeTruthy();
  });
});
