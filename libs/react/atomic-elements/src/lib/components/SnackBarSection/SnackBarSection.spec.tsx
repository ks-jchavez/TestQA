import React from 'react';
import { render } from '@testing-library/react';

import SnackBarSection from './SnackBarSection';

describe(' SnackBarSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SnackBarSection />);
    expect(baseElement).toBeTruthy();
  });
});
