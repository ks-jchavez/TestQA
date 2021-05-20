import React from 'react';
import { render } from '@testing-library/react';

import PositiveNegativeArea from './PositiveNegativeArea';

describe(' PositiveNegativeArea', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositiveNegativeArea />);
    expect(baseElement).toBeTruthy();
  });
});
