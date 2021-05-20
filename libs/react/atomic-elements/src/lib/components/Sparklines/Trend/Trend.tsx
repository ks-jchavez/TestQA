import React, { ReactElement } from 'react';
import { clone, pathOr } from 'ramda';

import { AggregationType } from '@kleeen/types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { KUIConnect } from '@kleeen/core-react';
import { generalBaseOptions } from '../../generalBaseOptions';
import { getOptions } from '../globalOptions';
import merge from 'lodash.merge';
import { trendFormatter } from '@kleeen/frontend/utils';

const transformationsWithPivot = [
  AggregationType.TrendVsEndSparkline,
  AggregationType.TrendVsStartSparkline,
  AggregationType.TrendCountVsEndSparkline,
  AggregationType.TrendCountVsStartSparkline,
];

const trendTransformations = [AggregationType.TrendSparkline, AggregationType.TrendCountSparkline];

const highlightMinMaxTransformations = [
  AggregationType.TrendHighLowSparkline,
  AggregationType.TrendCountHighLowSparkline,
];

const highlightStartTransformations = [
  AggregationType.TrendVsStartSparkline,
  AggregationType.TrendCountVsStartSparkline,
];

const highlightEndTransformations = [
  AggregationType.TrendVsEndSparkline,
  AggregationType.TrendCountVsEndSparkline,
];

const addDashedLine = (position: number, resultsLength: number, series) => {
  series.push({
    type: 'line',
    dashStyle: 'Dash',
    data: [
      [0, position],
      [resultsLength - 1, position],
    ],
  });
  return series;
};

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {} as Highcharts.Options);

function TrendBase({ translate, ...props }: HighchartsReact.Props): ReactElement {
  const results = pathOr([], ['results', 'results'], props);
  const containerProps = pathOr({}, ['containerProps'], props);
  const transformationType = pathOr(AggregationType.TrendSparkline, ['transformationType'], props);
  const formattedResults = trendFormatter({
    values: results,
    highlightMinMax: highlightMinMaxTransformations.includes(transformationType),
    highlightStart: highlightStartTransformations.includes(transformationType),
    highlightEnd: highlightEndTransformations.includes(transformationType),
  });
  const options = getOptions(baseOptions);
  const series = [{ type: 'area', data: formattedResults }];
  if (transformationsWithPivot.includes(transformationType)) {
    addDashedLine(
      highlightStartTransformations.includes(transformationType) ? results[0] : results[results.length - 1],
      results.length,
      series,
    );
  }
  const areaOptions: Highcharts.Options = merge({}, options, {
    series,
    chart: {
      type: 'area',
      plotBorderWidth: null,
      margin: [2, 2, 10, 2],
      spacing: [0, 0, 0, 0],
    },
    colors: [`hsla(var(--viz1),${trendTransformations.includes(transformationType) ? 1 : 0.5})`],
    plotOptions: {
      area: {
        lineWidth: 1,
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, `hsla(var(--on-surface-color-hsl), .4)`],
            [1, `hsla(var(--on-surface-color-hsl), 0)`],
          ],
        },
        threshold: null,
      },
      line: {
        lineWidth: 2,
      },
      series: {
        enableMouseTracking: false,
        marker: {
          enabled: false,
        },
      },
    },
  } as Highcharts.Options);

  const containerSettings = {
    ...containerProps,
    style: { height: '100%', width: '100%' },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={clone(areaOptions)}
      {...props}
      containerProps={containerSettings}
    />
  );
}
const Trend = React.memo(KUIConnect(({ translate }) => ({ translate }))(TrendBase));
export { Trend };
