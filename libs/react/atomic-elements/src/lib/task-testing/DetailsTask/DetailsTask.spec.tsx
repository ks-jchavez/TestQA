import React from 'react';
import { render } from '@testing-library/react';

import DetailsTask from './DetailsTask';

describe(' DetailsTask', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DetailsTask />);
    expect(baseElement).toBeTruthy();
  });
});
