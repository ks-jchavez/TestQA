import React from 'react';
import { render } from '@testing-library/react';

import NavTop from './NavTop';

describe(' NavTop', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavTop />);
    expect(baseElement).toBeTruthy();
  });
});
