import './ColumnBar.scss';

import { CrossLinkingProps, useCrossLinkingMenuOnViz } from '@kleeen/react/hooks';
import { clone, has, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsHighstock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { WidgetTypes } from '../../../enums';
import { generalBaseOptions } from '../generalBaseOptions';
import { getOptions } from './options';
import merge from 'lodash.merge';

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  yAxis: {
    crosshair: {
      color: 'var(--primary-color)',
    },
  },
} as Highcharts.Options);

export const ColumnBar = (props: HighchartsReact.Props): JSX.Element => {
  const containedIn = pathOr('visualization', ['containedIn'], props);
  const subType = pathOr('default', ['subType'], props);
  const results = pathOr([], ['context', 'data', 'results'], props);
  const format = pathOr({}, ['context', 'data', 'format'], props);
  const xAxis = clone(pathOr({}, ['xAxis'], format));
  const widgetId = pathOr('', ['widgetId'], props);
  const containerProps = pathOr({}, ['containerProps'], props);
  const vizColors: Array<string> = generalBaseOptions.colors.slice(0, 10);

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
    baseOptions,
    containedIn,
    subType,
    props.params,
    vizColors,
    crossLinkingValuesForAxis,
    openMenuIfCrossLink,
    xAxis,
  );

  const containerSettings = { ...containerProps, style: { height: '100%', width: '100%' } };

  /** HighchartsHighstock is only used in this case for the builtin navigator*/
  const renderNavigator = subType === WidgetTypes.COLUMN_BAR_MACRO_MICRO;

  if (props.context.isLoading) {
    return <Loader />;
  }
  return (
    <HighchartsReact
      highcharts={renderNavigator ? HighchartsHighstock : Highcharts}
      options={clone(options)}
      constructorType={renderNavigator ? 'stockChart' : false}
      {...props}
      containerProps={containerSettings}
      key={`column-${props.params?.operationName}${subType}`}
    />
  );
};

export default React.memo(ColumnBar);
