import React from 'react';
import { render } from '@testing-library/react';

import GridTask from './GridTask';

describe(' GridTask', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GridTask />);
    expect(baseElement).toBeTruthy();
  });
});
