import DataViewControlSection from './DataViewControlSection';
import React from 'react';
import { render } from '@testing-library/react';

describe(' DataViewControlSection', () => {
it('should render successfully', () => {
  const { baseElement } = render(<DataViewControlSection />);
    expect(baseElement).toBeTruthy();
  });
});
