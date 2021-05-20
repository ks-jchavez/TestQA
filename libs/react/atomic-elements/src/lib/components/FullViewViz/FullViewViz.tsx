import React, { ReactElement } from 'react';

import { Attribute } from '../DataViewControlSection/DataViewControlSection.model';
import CardTitle01 from '../CardTitle01/CardTitle01';
import FullAreaCardWidget01 from '../FullAreaCardWidget01/FullAreaCardWidget01';
import H3Title01 from '../H3Title01/H3Title01';
import Visualization from '../Visualization/Visualization';
import { VizCommonParams } from '../../../types/types';
import WidgetSection03 from '../WidgetSection03/WidgetSection03';
import { WidgetTypes } from '../../../enums';

interface Widget extends VizCommonParams {
  attributes?: Attribute[];
  id: string | number;
  chartType: WidgetTypes;
  component: any;
  flags: {
    download: boolean;
    navigation: boolean;
  };
  title: string;
}

export interface FullViewVizProps {
  taskName: string;
  widget: any;
}

const FullViewViz = (props: FullViewVizProps): ReactElement => {
  const { widget } = props;

  return (
    <FullAreaCardWidget01 key={widget.id}>
      <CardTitle01>
        <H3Title01>
          <div>{widget.title}</div>
        </H3Title01>
      </CardTitle01>

      <WidgetSection03>
        <Visualization widget={widget} taskName={props.taskName} />
      </WidgetSection03>
    </FullAreaCardWidget01>
  );
};

export default FullViewViz;
