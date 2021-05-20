import React from 'react';
import ToastNotification from './ToastNotification';
import { render } from '@testing-library/react';

describe(' ToastNotification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToastNotification />);
    expect(baseElement).toBeTruthy();
  });
});
