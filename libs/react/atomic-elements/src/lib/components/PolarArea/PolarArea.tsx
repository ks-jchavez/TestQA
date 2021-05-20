import { GroupByProps, ValueProp, ValuesProps, VizCommonParams } from '../../../types';
import React, { ReactElement } from 'react';
import { generalBaseOptions, maxLabelLength, radialCrosshair, radialLegend } from '../generalBaseOptions';
import { useCrossLinkingMenuOnViz, useTextFormattersForViz } from '@kleeen/react/hooks';

import { Attribute } from '@kleeen/types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import VariablePie from 'highcharts/modules/variable-pie';
import { formatRadialResults } from '@kleeen/frontend/utils';
import merge from 'lodash.merge';
import { clone } from 'ramda';

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  chart: {
    type: 'variablepie',
    marginBottom: 0,
    marginTop: 0,
  },
  plotOptions: {
    variablepie: {
      borderWidth: 0.5,
    },
  },
  legend: radialLegend,
  tooltip: {
    pointFormat: '{point.name}: {point.y}',
  },
});
interface VizCommonProps extends VizCommonParams {
  context: any; //WidgetState;
  attributes: Attribute[];
  base?: string;
  containerProps?: { [key: string]: any };
}

export const PolarArea = (props: VizCommonProps): ReactElement => {
  const results = props.context.data?.results || [];
  const format = props.context.data?.format || {};
  const { xAxis = {}, yAxis = {} } = format || {};
  const { crossLinkingValuesForAxis, openMenuIfCrossLink } = useCrossLinkingMenuOnViz(props, { xAxis });

  const formattedResults = formatRadialResults(results, xAxis, true, crossLinkingValuesForAxis, yAxis);
  // TODO: prefix and suffix

  const { groupBy } = props.params;
  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(
    props.params as { groupBy: GroupByProps; value: ValueProp | ValuesProps },
  );

  const options = {
    ...baseOptions,
    xAxis: {
      ...baseOptions.xAxis,
      ...xAxis,
    },
    yAxis: {
      ...baseOptions.yAxis,
      ...yAxis,
    },
    series: [
      {
        data: formattedResults,
        point: radialCrosshair,
        events: {
          click: (e) => {
            openMenuIfCrossLink(e);
          },
        },
      },
    ],
    legend: {
      ...baseOptions.legend,
      labelFormatter() {
        if (groupBy.formatType === 'timestamp') {
          return formatterGroupByForTooltip(this.name);
        }
        const name = formatterGroupBy(this.name) as string;
        return name.length > maxLabelLength
          ? [...name].splice(0, maxLabelLength).join('').trim() + '...'
          : name;
      },
    },
    tooltip: {
      ...baseOptions.tooltip,
      formatter(this) {
        return `${formatterGroupByForTooltip(this.point.name)}: ${formatterValue(this.point.y)}`;
      },
    },
  };
  const containerProps = { ...props.containerProps, style: { height: '100%', width: '100%' } };

  if (props.context.isLoading) {
    return <Loader />;
  }

  return (
    <HighchartsReact
      containerProps={containerProps}
      highcharts={VariablePie(Highcharts)}
      options={clone(options)}
      {...props}
    />
  );
};

export default React.memo(PolarArea);
