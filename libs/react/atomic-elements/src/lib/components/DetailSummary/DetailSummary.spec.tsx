import React from 'react';
import { render } from '@testing-library/react';

import DetailSummary from './DetailSummary';

describe(' DetailSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DetailSummary />);
    expect(baseElement).toBeTruthy();
  });
});
