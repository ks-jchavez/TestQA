import React from 'react';
import { render } from '@testing-library/react';

import FullAreaCardSection01 from './FullAreaCardSection01';

describe(' FullAreaCardSection01', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FullAreaCardSection01>
        <div>FullAreaCardSection01</div>
      </FullAreaCardSection01>,
    );
    expect(baseElement).toBeTruthy();
  });
});
