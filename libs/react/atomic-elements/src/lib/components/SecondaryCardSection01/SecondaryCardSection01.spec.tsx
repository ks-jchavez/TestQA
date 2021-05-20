import React from 'react';
import { render } from '@testing-library/react';

import SecondaryCardSection01 from './SecondaryCardSection01';

describe(' SecondaryCardSection01', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SecondaryCardSection01 />);
    expect(baseElement).toBeTruthy();
  });
});
