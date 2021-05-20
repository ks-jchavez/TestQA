import React from 'react';
import { render } from '@testing-library/react';

import Hug02IntegrationTest from './Hug02IntegrationTest';

describe(' Hug02IntegrationTest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hug02IntegrationTest />);
    expect(baseElement).toBeTruthy();
  });
});
