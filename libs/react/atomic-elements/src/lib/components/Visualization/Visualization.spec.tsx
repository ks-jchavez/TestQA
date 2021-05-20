import React from 'react';
import Visualization from './Visualization';
import { render } from '@testing-library/react';

enum WidgetTypes {
  AREA = '[WIDGET] AREA',
}

describe(' Visualization', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Visualization
        taskName=""
        widget={{
          chartType: WidgetTypes.AREA,
          component: '',
          id: '',
          title: '',
          params: {
            baseModel: '',
          },
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
