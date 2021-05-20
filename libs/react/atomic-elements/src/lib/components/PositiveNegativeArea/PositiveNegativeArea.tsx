import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { clone } from 'ramda';
import { formatAxis } from '@kleeen/frontend/utils';
import { generalBaseOptions } from '../generalBaseOptions';
import merge from 'lodash.merge';
import { useTextFormattersForViz } from '@kleeen/react/hooks';

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  tooltip: {
    pointFormat: '{point.category}: {point.value} <br> Delta: {point.delta}',
  },
} as Highcharts.Options);

export const PositiveNegativeArea = (props: HighchartsReact.Props) => {
  const results = props.context?.data?.results || [];
  const format = props.context?.data?.format || {};
  const { xAxis = {}, yAxis = {} } = format || {};
  const isResultsArray = Array.isArray(results[0]);
  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(
    props.params,
  );

  const xAxisLabel =
    xAxis?.type !== 'datetime'
      ? {
          ...baseOptions.yAxis['labels'],
          formatter(this) {
            return formatterGroupBy(this.value);
          },
        }
      : {
          ...baseOptions.yAxis['labels'],
        };

  const xAxisValues = formatAxis(xAxis);

  const deltaOfResults = results.map((result, index) => {
    const [x, y] = isResultsArray ? result : [index, result];

    let prevY = y;
    if (index > 0) {
      prevY = isResultsArray ? results[index - 1][1] : results[index - 1];
    }
    return {
      x,
      y: y - prevY,
      value: y,
      delta: y - prevY,
    };
  });

  const options = {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type: 'area',
      events: {
        render() {
          const chart = this;
          const yAxis = chart.yAxis[0];

          const posGrad = (yAxis.max - 0) / (yAxis.max - yAxis.min) || 1;
          const negGrad = (0 - yAxis.min) / (yAxis.max - yAxis.min) || 1;

          if (yAxis.max !== yAxis.oldMax || yAxis.min !== yAxis.oldMin) {
            chart.series[0].update({
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1,
                },
                stops: [
                  [0, 'var(--good-on)'],
                  [posGrad, 'var(--good-on-opacity-0)'],
                ],
              },
              zones: [
                {
                  value: 0,
                  color: 'var(--bad-off)',
                  fillColor: {
                    linearGradient: {
                      x1: 0,
                      y1: 1,
                      x2: 0,
                      y2: 0,
                    },
                    stops: [
                      [0, 'var(--bad-off)'],
                      [negGrad, 'var(--bad-off-opacity-0)'],
                    ],
                  },
                },
              ],
            });
          }
        },
      },
    },
    xAxis: {
      ...baseOptions.xAxis,
      ...xAxisValues,
      type: xAxis.type,
      labels: {
        ...xAxisLabel,
      },
    },
    yAxis: {
      crosshair: {
        color: 'var(--good-on)',
      },
      ...baseOptions.yAxis,
      type: yAxis.type,
      labels: {
        ...baseOptions.yAxis['labels'],
        formatter(this) {
          return formatterValue(this.value);
        },
      },
    },
    series: [
      {
        color: 'var(--good-on)',
        negativeColor: 'var(--bad-off)',
        data: deltaOfResults,
      },
    ],
    tooltip: {
      ...baseOptions.tooltip,
      ...format,
      formatter(this) {
        return `${formatterGroupByForTooltip(this.point.category)}:  ${formatterValue(
          this.point.value,
        )} <br> Delta:  ${this.point.delta}`;
      },
    },
  };
  const containerProps = { ...props.containerProps, style: { height: '100%', width: '100%' } };

  if (props.context.isLoading) {
    return <Loader />;
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={clone(options)}
      containerProps={containerProps}
      {...props}
    />
  );
};

export default React.memo(PositiveNegativeArea);
