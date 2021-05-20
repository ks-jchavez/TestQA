import DataViewDisplaySection from './DataViewDisplaySection';
import React from 'react';
import { render } from '@testing-library/react';

describe(' DataViewControlSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DataViewDisplaySection />);
    expect(baseElement).toBeTruthy();
  });
});
