import { CrossLinking, FormatProps } from '@kleeen/types';

import { pathOr } from 'ramda';
import { useTextFormattersForViz } from '@kleeen/react/hooks';
import { vizColors } from '../generalBaseOptions';

interface IOptionsFormat {
  xAxis?: Highcharts.XAxisOptions | Array<Highcharts.XAxisOptions>;
  yAxis?: Highcharts.YAxisOptions | Array<Highcharts.YAxisOptions>;
}

const transformToObjectFormat = (
  data: any[],
  xAxis?: FormatProps,
  crossLinking: CrossLinking[] = [],
): Highcharts.PointOptionsObject[] => {
  const isValueAnArray = Array.isArray(data[0]);
  return data.map((dataPoint, index) => {
    const name = xAxis.categories[index];
    const value = isValueAnArray ? dataPoint[1] : dataPoint;
    const color = vizColors.default[index % vizColors.default.length];
    const [groupBy, val] = isValueAnArray ? dataPoint : [index, dataPoint];
    const displayValue = xAxis?.categories ? xAxis.categories[groupBy] : groupBy;
    const crossLinkingMetadata = crossLinking[index] || {};
    const contextInfo = {
      [xAxis.key]: {
        displayValue,
        ...crossLinkingMetadata,
      },
    };
    return { name, value, color, ...contextInfo };
  });
};

const getValueAVG = (data: Highcharts.PointOptionsObject[]): number => {
  let datmin = 0,
    datmax = 0,
    dat = 0;
  data.forEach((dataPoint) => {
    if (datmin > dataPoint.value) {
      datmin = dataPoint.value;
    }
    if (datmax < dataPoint.value) {
      datmax = dataPoint.value;
    }
  });
  const dif = datmax - datmin;
  dat = (80 * dif) / 100;
  return dat;
};

/**
 * Creates the appropriate Highcharts options based on the params
 * @param results - data received for plotting
 * @param format
 * @param baseOptions - shared options for consistency between different subTypes
 * @param params
 */
export const getOptions = (
  results: [],
  format: IOptionsFormat,
  baseOptions: Highcharts.Options,
  params,
  openMenuIfCrossLink: Function,
  crossLinkingValuesForAxis,
): Highcharts.Options => {
  const type = pathOr('column', ['chart', 'type'], format);
  const title = pathOr(null, ['title', 'text'], format);
  const labels = pathOr({}, ['xAxis', 'labels'], format);
  const xAxis = pathOr({}, ['xAxis'], format);
  const yAxis = pathOr({}, ['yAxis'], format);
  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(params);
  const formattedResults = transformToObjectFormat(results, xAxis, crossLinkingValuesForAxis);
  const defaultOptions: Highcharts.Options = {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type,
      height: '100%',
    },
    title: { text: title },
    xAxis: {
      ...baseOptions.xAxis,
      ...xAxis,
      labels: {
        ...baseOptions.xAxis['labels'],
        ...labels,
        formatter(this) {
          return formatterGroupBy(this.value);
        },
      },
    },
    yAxis: {
      ...baseOptions.yAxis,
      ...yAxis,
      labels: {
        ...baseOptions.yAxis['labels'],
        formatter(this) {
          return formatterValue(this.value);
        },
      },
    },
    plotOptions: {
      packedbubble: {
        minSize: '10%',
        maxSize: '120%',
        layoutAlgorithm: {
          gravitationalConstant: 0.02,
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          filter: {
            property: 'y',
            operator: '>',
            value: getValueAVG(formattedResults),
          },
          style: {
            color: 'var(--on-surface-color)',
            textOutline: 'none',
            fontWeight: 'normal',
          },
        },
      },
    },
    series: [
      {
        type: 'packedbubble',
        data: formattedResults,
        borderWidth: 0,
        cursor: 'pointer',
        events: {
          click: (e) => {
            openMenuIfCrossLink(e);
          },
        },
      },
    ],
    tooltip: {
      ...baseOptions.tooltip,
      formatter(this) {
        return `${formatterGroupByForTooltip(this.key)}: ${formatterValue(this.y)}`;
      },
    },
  };
  return defaultOptions;
};
