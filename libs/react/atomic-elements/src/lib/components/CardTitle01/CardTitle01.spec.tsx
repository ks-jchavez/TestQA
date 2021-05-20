import React from 'react';
import { render } from '@testing-library/react';

import CardTitle01 from './CardTitle01';

describe(' CardTitle01', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardTitle01 />);
    expect(baseElement).toBeTruthy();
  });
});
