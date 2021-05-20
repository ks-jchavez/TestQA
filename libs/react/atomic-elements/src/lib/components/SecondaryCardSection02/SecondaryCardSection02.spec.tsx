import React from 'react';
import { render } from '@testing-library/react';

import SecondaryCardSection02 from './SecondaryCardSection02';

describe(' SecondaryCardSection02', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SecondaryCardSection02 />);
    expect(baseElement).toBeTruthy();
  });
});
