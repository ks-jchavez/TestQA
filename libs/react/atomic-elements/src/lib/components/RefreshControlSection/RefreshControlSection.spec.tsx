import React from 'react';
import { render } from '@testing-library/react';

import RefreshControlSection from './RefreshControlSection';

describe(' RefreshControlSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RefreshControlSection />);
    expect(baseElement).toBeTruthy();
  });
});
