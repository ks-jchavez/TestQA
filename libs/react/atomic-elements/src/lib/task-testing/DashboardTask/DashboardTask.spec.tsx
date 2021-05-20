import React from 'react';
import { render } from '@testing-library/react';

import DashboardTask from './DashboardTask';

describe(' DashboardTask', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardTask />);
    expect(baseElement).toBeTruthy();
  });
});
