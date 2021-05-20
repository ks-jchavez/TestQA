import { AggregationType, DataListResult, SameSDTAggregations } from '@kleeen/types';
import { Attribute, CrossLinking, DataListItem, FormatProps } from '@kleeen/types';
import { GetSeveritiesResultProps, ValueLabelsProps, ValueResultProps } from './ResultFormatters.model';

import _ from 'lodash';
import camelCase from 'lodash.camelcase';
import { isNil } from 'ramda';
import { isNilOrEmpty } from '@kleeen/common/utils';
import memoize from 'lodash.memoize';

export const formatAxis = (axis) => {
  return axis.categories ? { ..._.omit(axis, ['min', 'max']) } : { ...axis };
};

export const getColor = (
  valueResult: ValueResultProps,
  severities,
  valueLabels?: ValueLabelsProps,
): string => {
  if (isNilOrEmpty(valueResult)) return '';

  const valueLabel =
    valueLabels &&
    Object.keys(valueLabels).find(
      (key) => (Array.isArray(valueLabels) ? valueLabels[key].label : valueLabels[key]) === valueResult,
    );
  const valueKey = valueLabel || valueResult;

  if (isNilOrEmpty(valueKey)) return '';

  const valueCompare: ValueResultProps = Array.isArray(valueLabels) ? valueLabels[valueKey].value : valueKey;

  let color = '';
  severities.forEach((severity) => {
    const { topValue, bottomValue } = severity;
    if (
      (topValue > valueCompare && valueCompare >= bottomValue) ||
      (topValue >= valueCompare && valueCompare > bottomValue)
    ) {
      color = severity.color;
    }
  });
  return color;
};

const getSeveritiesFn = (yAxis: FormatProps): GetSeveritiesResultProps[] => {
  if (isNil(yAxis)) return [];

  const { severityLevels, severityGood, severityBad } = yAxis;

  if (isNilOrEmpty(severityLevels) || isNilOrEmpty(severityGood) || isNilOrEmpty(severityBad)) return [];

  let bottomLevel = 0;
  let range, top;
  let topLevel = 0;
  const categoryColors = [
    ['var(--severity1)', 'var(--severity5)'],
    ['var(--severity1)', 'var(--severity2)', 'var(--severity5)'],
    ['var(--severity1)', 'var(--severity2)', 'var(--severity4)', 'var(--severity5)'],
    ['var(--severity1)', 'var(--severity2)', 'var(--severity3)', 'var(--severity4)', 'var(--severity5)'],
  ];
  const severities: GetSeveritiesResultProps[] = [];
  let index;

  if (severityGood > severityBad) {
    range = (severityGood - severityBad) / severityLevels;
    top = severityGood;
    bottomLevel = severityBad;
    index = severityLevels - 1;
  } else {
    range = (severityBad - severityGood) / severityLevels;
    top = severityBad;
    bottomLevel = severityGood;
    index = 0;
  }

  topLevel = bottomLevel;
  const colors = categoryColors[severityLevels - 2] || [];

  while (topLevel < top && index < colors.length) {
    topLevel = range + bottomLevel;
    severities.push({
      topValue: topLevel,
      bottomValue: bottomLevel,
      index,
      color: colors[index],
    });
    bottomLevel = topLevel;
    severityGood > severityBad ? index === 0 || index-- : index++;
  }

  return severities;
};

export const getSeverities = memoize(
  getSeveritiesFn,
  ({ severityLevels, severityGood, severityBad }) => `${severityLevels}_${severityGood}_${severityBad}`,
);

export const getColorForSeverityValues = (
  value: number | string,
  format: FormatProps,
  transformation: string,
): string => {
  if (SameSDTAggregations.includes(transformation as AggregationType)) {
    const severities = getSeverities(format);
    const color = getColor(value, severities, format?.valueLabels);
    return color ? `hsl(${color})` : 'inherit';
  } else {
    return 'inherit';
  }
};

export const formatRadialResults = (
  results: any[],
  xAxis?: FormatProps,
  hasZ?: boolean,
  crossLinking: CrossLinking[] = [],
  yAxis: FormatProps = {},
): { name: string; y: number }[] => {
  const isResultsArray = Array.isArray(results[0]);
  const yAxisSeverities = getSeverities(yAxis);
  const xAxisSeverities = getSeverities(xAxis);

  if (!results.length) return [];
  const formattedResults = results.map((result, index) => {
    const [groupBy, value] = isResultsArray ? result : [index, result];
    const displayValue = xAxis?.categories ? xAxis.categories[groupBy] : groupBy;
    const crossLinkingMetadata = crossLinking[index] || {};
    const contextInfo = xAxis?.key
      ? {
          [xAxis.key]: {
            displayValue,
            ...crossLinkingMetadata,
          },
        }
      : {};

    const severities = yAxisSeverities.length ? yAxisSeverities : xAxisSeverities;
    const valueLabels = yAxisSeverities.length ? yAxis.valueLabels : xAxis?.valueLabels;

    let valueResult;

    if (yAxisSeverities.length) {
      valueResult = valueLabels ? displayValue : value;
    } else {
      valueResult = valueLabels ? displayValue : groupBy;
    }

    const fillColor = getColor(valueResult, severities, valueLabels);

    return {
      name: displayValue,
      y: value,
      z: hasZ ? value : undefined,
      color: fillColor ? `hsl(${fillColor}, 1)` : undefined,
      drilldown: displayValue,
      ...contextInfo,
    };
  });

  return formattedResults;
};

// Table formatters
const addDeepDataTypeToAttribute = (type: string, attribute: Attribute): Attribute => {
  // Highcharts format is datetime, which is used in all other charts
  if (type === 'datetime') return { ...attribute, deepDataType: 'timestamp' };
  return { ...attribute, deepDataType: type };
};

const getResultsByAxis = (results, { xAxis, yAxis }): { xValues: unknown[]; yValues: unknown[] } => {
  if (!xAxis?.categories && !yAxis?.categories) {
    const xValues = results.map(([xValue]) => xValue);
    const yValues = results.map(([_, yValue]) => yValue);
    return { xValues, yValues };
  }

  return {
    xValues: xAxis.categories
      ? xAxis.categories
      : results.map((xValue) => (Array.isArray(xValue) ? xValue[0] : xValue)),
    yValues: yAxis.categories
      ? yAxis.categories
      : results.map((yValue) => (Array.isArray(yValue) ? yValue[1] : yValue)),
  };
};

export const formatDataList = ({
  crossLinking,
  results,
  format,
  params,
  includeMinMax = false,
}): DataListResult => {
  if (!results || !format) return { data: [] };

  const { xValues, yValues } = getResultsByAxis(results, format);
  const [xAxisCrossLinking = [], yAxisCrossLinking = []] = crossLinking || [];

  const { max, min } = includeMinMax
    ? { max: Math.max(...(yValues as number[])), min: Math.min(...(yValues as number[])) }
    : { max: 0, min: 0 };
  const positiveBarSpace = min > 0 ? 100 : Math.max((max / (max - min)) * 100, 0);
  const negativeBarSpace = 100 - positiveBarSpace;

  const groupByName = camelCase(params.groupBy?.name);
  const valueName = camelCase(params.value?.name);

  const dataList = xValues.map((element, index) => {
    return {
      [groupByName]: {
        displayValue: element,
        id: xAxisCrossLinking?.[index]?.id,
        $metadata: xAxisCrossLinking?.[index]?.$metadata,
      },
      [valueName]: {
        displayValue: yValues?.[index],
        id: yAxisCrossLinking?.[index]?.id,
        $metadata: yAxisCrossLinking?.[index]?.$metadata,
      },
    };
  });

  // TODO @cafe add types for displayValue, id and $metadata
  return {
    data: dataList as DataListItem[],
    metadata: {
      groupByColumnName: groupByName,
      max,
      min,
      positiveBarSpace,
      negativeBarSpace,
      valueColumnName: valueName,
    },
  };
};

export const formatSeverity = (format, params) => {
  if (!format) return [];

  const dataParamList = [params.groupBy?.name, params.value?.name];
  let dataFormatList = {};
  Object.keys(format).forEach((entity, index) => {
    const { type, key, categories, ...restFormat } = format[entity];

    dataFormatList = {
      ...dataFormatList,
      [dataParamList[index]]: {
        ...restFormat,
      },
    };
  });

  return dataFormatList;
};

export const parseAttributes = (attributes: Attribute[], format: any): Attribute[] => {
  if (!format) return attributes;
  const { xAxis, yAxis } = format;
  const parsedAttributes = [...attributes];

  if (xAxis?.type) {
    parsedAttributes[0] = addDeepDataTypeToAttribute(xAxis.type, attributes[0]);
    parsedAttributes[0].format = xAxis;
  }
  if (yAxis?.type) {
    parsedAttributes[1] = addDeepDataTypeToAttribute(yAxis.type, attributes[1]);
    parsedAttributes[1].format = yAxis;
  }

  return parsedAttributes;
};

export const trendFormatter = ({
  values,
  highlightMinMax = false,
  highlightStart = false,
  highlightEnd = false,
}): (number | any)[] => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const highlightedPoint = { color: 'hsl(var(--viz1))', marker: { enabled: true, radius: 3 } };

  return values.map((value, i) => {
    if (highlightMinMax && (value === min || value === max)) {
      return { ...highlightedPoint, y: value };
    }
    if (highlightStart && i === 0) {
      return { ...highlightedPoint, y: value };
    }
    if (highlightEnd && i === values.length - 1) {
      return { ...highlightedPoint, y: value };
    }
    return value;
  });
};

export const isAttributeNumericType = (attribute: Attribute): boolean => {
  const selfAggregations = [AggregationType.SelfMulti, AggregationType.SelfSingle];
  const isNotSelfAggregation =
    Boolean(attribute.aggregation) && !selfAggregations.includes(attribute.aggregation as AggregationType);

  return attribute.format?.isNumericType || isNotSelfAggregation;
};
