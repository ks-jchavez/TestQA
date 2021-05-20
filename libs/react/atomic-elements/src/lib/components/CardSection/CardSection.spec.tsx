import React from 'react';
import { render } from '@testing-library/react';

import CardSection from './CardSection';

describe(' CardSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardSection />);
    expect(baseElement).toBeTruthy();
  });
});
