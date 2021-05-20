import React from 'react';
import { render } from '@testing-library/react';

import H3Title02 from './H3Title02';

describe(' H3Title02', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<H3Title02 />);
    expect(baseElement).toBeTruthy();
  });
});
