import { Loader, RankedListItem, SimpleList } from '@kleeen/react/components';
import React, { ReactElement, ReactText, useState } from 'react';
import { formatDataList, formatSeverity, parseAttributes } from '@kleeen/frontend/utils';

import { AccessControl } from '@kleeen/core-react';
import Area from '../Area/Area';
import AreaMacroMicro from '../AreaMacroMicro/AreaMacroMicro';
import AreaMasterDetail from '../AreaMasterDetail/AreaMasterDetail';
import { Attribute } from '@kleeen/types';
import BubbleChart from '../BubbleChart/BubbleChart';
import ColumnBar from '../ColumnBar/ColumnBar';
import { Donut } from '../donut';
import { DonutVariant } from '../donut-variant';
import Gauge from '../Gauge/Gauge';
import Line from '../Line/Line';
import Pie from '../Pie/Pie';
import PolarArea from '../PolarArea/PolarArea';
import PositiveNegativeArea from '../PositiveNegativeArea/PositiveNegativeArea';
import ReadOnlyText from '../ReadOnlyText/ReadOnlyText';
import Scatter from '../Scatter/Scatter';
import SingleBarHighlightMax from '../SingleBarHighlightMax/SingleBarHighlightMax';
import StepLineWidget from '../StepLine/StepLine';
import SummaryStatistics from '../SummaryStatistics/SummaryStatistics';
import { VizCommonParams } from '../../../types/types';
import Waterfall from '../Waterfall/Waterfall';
import { WidgetTypes } from '../../../enums';
import { makeStyles } from '@material-ui/core/styles';
import { roleAccessKeyTag } from '@kleeen/common/utils';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  visualizationContainer: {
    boxShadow: 'var(--card-content-shadow)',
    height: '100%',
    width: '100%',
  },
  // TODO: @cafe we need to add props depending on if the viz is Full View or sub widget
  // simpleListContainer: {
  //   margin: '0 calc(-1 * var(--pm-L))',
  // },
});

export interface Widget extends VizCommonParams {
  attributes?: Attribute[];
  chartType: WidgetTypes;
  component: any;
  id: string | number;
  title: string;
  viableSolutions?: WidgetTypes[];
  viewOrder?: number;
  viewId: ReactText;
}

interface VisualizationProps {
  taskName: string;
  widget: Widget;
}

/**
 *
 * @param selectedChartType - end-user changes the viz type
 * @param widget
 * @param widgetData
 */
const renderChildren = (selectedChartType: string, widget: Widget, widgetData: any): ReactElement | null => {
  const params = widget.params;
  switch (selectedChartType) {
    case WidgetTypes.SINGLE_BAR_HIGHLIGHT_MAX:
      return <SingleBarHighlightMax context={widgetData} base={params.baseModel} params={params} />;
    // COLUMN_BAR, COLUMN_BAR_SEGMENTED, COLUMN_BAR_DOUBLE_BAR resolve to ColumnBar but with appropriate subtype (default, segmented, ...)
    case WidgetTypes.COLUMN_BAR:
    case WidgetTypes.COLUMN_BAR_SEGMENTED:
    case WidgetTypes.COLUMN_BAR_DOUBLE_BAR:
    case WidgetTypes.COLUMN_BAR_MACRO_MICRO:
      return (
        <ColumnBar
          key={`column-bar-${selectedChartType}-${widget.id}`}
          context={widgetData}
          base={params.baseModel}
          /** Can be COLUMN_BAR_SEGMENTED, COLUMN_BAR_DOUBLE_BAR TODO: Cezar consider default COLUMN_BAR after testing  */
          subType={selectedChartType}
          params={params}
        />
      );
    case WidgetTypes.AREA_MACRO_MICRO:
      return <AreaMacroMicro context={widgetData} base={params.baseModel} params={params} />;
    case WidgetTypes.AREA_MASTER_DETAIL:
      return <AreaMasterDetail context={widgetData} base={params.baseModel} />;
    case WidgetTypes.AREA:
      return <Area context={widgetData} base={params.baseModel} params={params} />;
    case WidgetTypes.BUBBLE_CHART:
      return <BubbleChart context={widgetData} base={params.baseModel} params={params} />;
    case WidgetTypes.CUSTOM: {
      const CustomWidget = widget.component;
      return <CustomWidget {...widget} />;
    }
    case WidgetTypes.DONUT:
      return (
        <Donut attributes={widget.attributes} base={params.baseModel} context={widgetData} params={params} />
      );
    case WidgetTypes.DONUT_VARIANT:
      return (
        <DonutVariant
          attributes={widget.attributes}
          base={params.baseModel}
          context={widgetData}
          params={params}
          sliceResultsBy={4}
        />
      );
    case WidgetTypes.GAUGE:
    case WidgetTypes.GAUGE_SEVERITY_LEVEL:
    case WidgetTypes.GAUGE_SEVERITY_SCORE:
      return <Gauge context={widgetData} base={params.baseModel} params={params} />;
    case WidgetTypes.LINE:
      return <Line context={widgetData} base={params.baseModel} params={params} />;
    case WidgetTypes.PIE:
      return (
        <Pie attributes={widget.attributes} base={params.baseModel} context={widgetData} params={params} />
      );
    case WidgetTypes.POLAR_AREA:
      return (
        <PolarArea
          context={widgetData}
          attributes={widget.attributes}
          base={params.baseModel}
          params={params}
        />
      );
    case WidgetTypes.POSITIVE_NEGATIVE_AREA:
      return <PositiveNegativeArea context={widgetData} base={params.baseModel} params={params} />;
    case WidgetTypes.READ_ONLY_TEXT:
      return <ReadOnlyText context={widgetData} fullscreen />;
    case WidgetTypes.SCATTER:
      return <Scatter context={widgetData} base={params.baseModel} params={params} />;
    case WidgetTypes.STEP_LINE:
      return <StepLineWidget context={widgetData} base={params.baseModel} params={params} />;

    case WidgetTypes.SUMMARY_STATISTICS:
      return <SummaryStatistics context={widgetData} values={params.value} />;
    case WidgetTypes.TABLE: {
      const { format, crossLinking, results } = widgetData.data || {};
      const parsedAttributes = parseAttributes(widget.attributes, format);
      const { data } = formatDataList({ crossLinking, results, format, params });
      const newWidgetData = {
        ...widgetData,
        data,
        format: formatSeverity(format, params),
      };

      return <SimpleList data={newWidgetData.data} columns={parsedAttributes} />;
    }
    case WidgetTypes.SIMPLE_LIST_RANKED: {
      const { format, crossLinking, results } = widgetData.data || {};
      const parsedAttributes = parseAttributes(widget.attributes, format);
      const { data, metadata } = formatDataList({
        crossLinking,
        results,
        format,
        params,
        includeMinMax: true,
      });
      const newWidgetData = {
        ...widgetData,
        data,
        format: formatSeverity(format, params),
      };

      return (
        <SimpleList
          data={newWidgetData.data}
          columns={parsedAttributes}
          metadata={metadata}
          listOptions={{
            ListItemComponent: RankedListItem,
            sortBy: metadata?.valueColumnName,
          }}
        />
      );
    }
    case WidgetTypes.WATERFALL: {
      return (
        <Waterfall
          key={`waterfall-${widget.id}`}
          context={widgetData}
          base={params.baseModel}
          params={params}
        />
      );
    }
    default:
      return null;
  }
};

export const Visualization = ({ taskName, widget }: VisualizationProps): ReactElement => {
  const widgetData = useWidgetContext({ taskName, widgetId: widget.id, params: widget.params });
  const classes = useStyles();

  /** Used for those cases where end-user can select a different type of chart for the same data */
  const [selectedChartType, setSelectedChartType] = useState(widget.chartType);

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <AccessControl id={roleAccessKeyTag(`${taskName}.widgets.${widget.id}`)}>
      <div className={classes.visualizationContainer}>
        {renderChildren(selectedChartType, widget, widgetData)}
      </div>
    </AccessControl>
  );
};
export default Visualization;
