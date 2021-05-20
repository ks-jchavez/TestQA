import React from 'react';
import { render } from '@testing-library/react';

import Pie from './Pie';

describe(' Pie', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Pie />);
    expect(baseElement).toBeTruthy();
  });
});
