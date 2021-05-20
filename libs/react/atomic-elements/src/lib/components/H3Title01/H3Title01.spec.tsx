import React from 'react';
import { render } from '@testing-library/react';

import H3Title01 from './H3Title01';

describe(' H3Title01', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<H3Title01 />);
    expect(baseElement).toBeTruthy();
  });
});
