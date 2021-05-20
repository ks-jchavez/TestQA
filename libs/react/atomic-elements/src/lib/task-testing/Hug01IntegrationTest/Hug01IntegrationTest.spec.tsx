import React from 'react';
import { render } from '@testing-library/react';

import Hug01IntegrationTest from './Hug01IntegrationTest';

describe(' Hug01IntegrationTest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hug01IntegrationTest />);
    expect(baseElement).toBeTruthy();
  });
});
