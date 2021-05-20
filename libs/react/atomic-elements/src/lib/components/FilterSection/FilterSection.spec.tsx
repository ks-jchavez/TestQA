import React from 'react';
import { render } from '@testing-library/react';

import FilterSection from './FilterSection';

describe(' FilterSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterSection />);
    expect(baseElement).toBeTruthy();
  });
});
