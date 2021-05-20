import React, { useEffect, useState } from 'react';
import { clone, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import { generalBaseOptions } from '../generalBaseOptions';
import { getOptions } from './options';
import { isValidArray } from '@kleeen/common/utils';
import merge from 'lodash.merge';

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  yAxis: {
    crosshair: {
      color: 'var(--primary-color)',
    },
    labels: {
      style: {
        color: 'hsl(var(--on-surface-color-hsl), .5)',
      },
    },
    gridLineColor: 'hsl(var(--on-surface-color-hsl), .2)',
    gridLineDashStyle: 'Dash',
    tickColor: 'var(--transparent)',
    endOnTick: false,
    tickAmount: 4,
  },
  xAxis: {
    labels: {
      style: {
        color: 'hsl(var(--on-surface-color-hsl), .5)',
      },
    },
  },
} as Highcharts.Options);

export const AreaGradient = (props: HighchartsReact.Props) => {
  const results = pathOr([], ['context', 'data', 'results'], props);
  const format = pathOr({}, ['context', 'data', 'format'], props);

  const yAxis = pathOr({}, ['yAxis'], format);
  const containerProps = pathOr({}, ['containerProps'], props);

  const options = getOptions(results, format, baseOptions, props.params);

  const containerSettings = { ...containerProps, style: { height: '100%', width: '100%' } };
  const [chartOptions, setChartOptions] = useState(null);
  useEffect(() => {
    if (isValidArray(results)) {
      const optionsForAreaChart: Highcharts.Options = merge({}, options, {
        yAxis: {
          type: yAxis.type,
          ceiling: Math.max(...results),
        },
        series: [{ data: results }],
      } as Highcharts.Options);
      setChartOptions(optionsForAreaChart);
      return () => {
        setChartOptions(null);
      };
    }
  }, [results]);

  if (props.context.isLoading) {
    return <Loader />;
  }

  return chartOptions !== null ? (
    <HighchartsReact
      highcharts={Highcharts}
      options={clone(chartOptions)}
      {...props}
      containerProps={containerSettings}
    />
  ) : null;
};

export default React.memo(AreaGradient);
