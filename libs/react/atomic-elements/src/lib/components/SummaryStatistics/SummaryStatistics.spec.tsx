import React from 'react';
import SummaryStatistics from './SummaryStatistics';
import { render } from '@testing-library/react';

describe(' SummaryStatistics', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SummaryStatistics
        values={{ name: '', transformation: '' }}
        context={{
          data: {
            crossLinking: [''],
            format: {
              type: '',
              key: '',
            },
            results: [],
          },
          error: '',
          isLoading: true,
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
