import React from 'react';
import { render } from '@testing-library/react';

import PageIntroSection from './PageIntroSection';

describe(' PageIntroSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageIntroSection />);
    expect(baseElement).toBeTruthy();
  });
});
