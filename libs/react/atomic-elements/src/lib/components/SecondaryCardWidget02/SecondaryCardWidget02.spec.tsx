import React from 'react';
import { render } from '@testing-library/react';

import SecondaryCardWidget02 from './SecondaryCardWidget02';

describe(' SecondaryCardWidget02', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SecondaryCardWidget02 />);
    expect(baseElement).toBeTruthy();
  });
});
