import React from 'react';
import { render } from '@testing-library/react';

import CardTitle02 from './CardTitle02';

describe(' CardTitle02', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardTitle02 />);
    expect(baseElement).toBeTruthy();
  });
});
