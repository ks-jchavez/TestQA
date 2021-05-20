import { CrossLinkingProps, useCrossLinkingMenuOnViz, useTextFormattersForViz } from '@kleeen/react/hooks';
import { clone, has, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { generalBaseOptions } from '../generalBaseOptions';
import { getOptions } from './options';
import more from 'highcharts/highcharts-more';

more(Highcharts);

export const BubbleChart = ({ translate, ...props }: HighchartsReact.Props): React.ReactElement => {
  const widgetId = pathOr('', ['widgetId'], props);
  const results = pathOr([], ['context', 'data', 'results'], props);
  const format = pathOr({}, ['context', 'data', 'format'], props);
  const xAxis = clone(pathOr({}, ['xAxis'], format));

  if (!has('key', xAxis)) {
    xAxis['key'] = widgetId;
  }

  const { crossLinkingValuesForAxis, openMenuIfCrossLink } = useCrossLinkingMenuOnViz(
    props as CrossLinkingProps,
    {
      xAxis,
    },
  );

  const options: Highcharts.Options = getOptions(
    results,
    format,
    generalBaseOptions,
    props.params,
    openMenuIfCrossLink,
    crossLinkingValuesForAxis,
  );

  const containerPropsPlus = { ...props, style: { height: '100%', width: '100%' } };

  if (props.isLoading) {
    return <Loader />;
  }

  return (
    <HighchartsReact
      containerProps={containerPropsPlus}
      highcharts={Highcharts}
      options={clone(options)}
      {...props}
    />
  );
};

export default React.memo(BubbleChart);
