/* eslint-disable complexity */
import {
  AreaWidget,
  BubbleChartWidget,
  ColumnBarWidget,
  ConfigInputWidget,
  ConfigTableWidget,
  CustomActionWidget,
  CustomWidget,
  DonutVariantWidget,
  DonutWidget,
  GaugeWidget,
  LineWidget,
  PieWidget,
  PolarAreaWidget,
  PositiveNegativeAreaWidget,
  RankedListWidget,
  ReadOnlyTextWidget,
  ScatterWidget,
  SingleBarHighlightMaxWidget,
  StepLineWidget,
  SummaryStatisticsWidget,
  TableWidget,
} from '../../Widgets';
import React, { ReactElement, useState } from 'react';

import { AttributeInputEvents } from '@kleeen/react/hooks';
import CardWidget from '../CardWidget';
import { RenderWidgetProps } from '../CardWidget.model';
import { VisualizationSelector } from '../../VisualizationSelector/VisualizationSelector';
import WaterfallWidget from '../../Widgets/WaterfallWidget/WaterfallWidget';
import { Widget } from '../../../../types';
import { WidgetTypes } from '../../../../enums';
import { isNilOrEmpty } from '@kleeen/common/utils';

const renderWidget = ({
  preferredWidget,
  widget,
  taskName,
  registerEvents,
  hideSaveAndClose,
  onInputChange,
}: RenderWidgetProps): ReactElement => {
  const { statisticalType } = widget;

  switch (preferredWidget) {
    case WidgetTypes.AREA:
    case WidgetTypes.AREA_MASTER_DETAIL:
    case WidgetTypes.AREA_MACRO_MICRO:
    case WidgetTypes.AREA_GRADIENT:
      return (
        <AreaWidget
          chartType={preferredWidget}
          params={widget.params}
          taskName={taskName}
          widgetId={widget.id}
        />
      );
    case WidgetTypes.BUBBLE_CHART:
      return (
        <BubbleChartWidget
          attributes={widget.attributes}
          params={widget.params}
          taskName={taskName}
          widgetId={widget.id}
        />
      );

    /** TODO: Add subtype as in COLUMN_BAR */
    case WidgetTypes.SINGLE_BAR_HIGHLIGHT_MAX:
      return (
        <SingleBarHighlightMaxWidget
          chartType={WidgetTypes.SINGLE_BAR_HIGHLIGHT_MAX}
          params={widget.params}
          taskName={taskName}
          widgetId={widget.id}
          attributes={widget.attributes}
        />
      );

    case WidgetTypes.COLUMN_BAR:
    case WidgetTypes.COLUMN_BAR_SEGMENTED:
    case WidgetTypes.COLUMN_BAR_DOUBLE_BAR:
    case WidgetTypes.COLUMN_BAR_MACRO_MICRO:
      return (
        <ColumnBarWidget
          chartType={preferredWidget}
          params={widget.params}
          taskName={taskName}
          widgetId={widget.id}
          attributes={widget.attributes}
        />
      );

    case WidgetTypes.CONFIG_INPUT_FIELD_USER_DEFINED:
      return (
        <ConfigInputWidget
          attributes={widget.attributes}
          icon={false}
          params={widget.params}
          taskName={taskName}
          title={widget.title}
          widgetId={widget.id}
          statisticalType={statisticalType}
          hideSaveAndClose={hideSaveAndClose}
          registerEvents={registerEvents}
          onInputChange={onInputChange}
        />
      );

    case WidgetTypes.CONFIG_TABLE:
      return (
        <ConfigTableWidget
          actions={widget.actions}
          addModalAttributes={widget.addModalAttributes}
          attributes={widget.attributes}
          onInputChange={onInputChange}
          params={widget.params}
          registerEvents={registerEvents}
          taskName={taskName}
          widgetId={widget.id}
        />
      );

    case WidgetTypes.CUSTOM: {
      return <CustomWidget widget={widget} onInputChange={onInputChange} registerEvents={registerEvents} />;
    }

    case WidgetTypes.CUSTOM_ACTION:
      return (
        <CustomActionWidget
          actions={widget.actions}
          params={widget.params}
          taskName={taskName}
          widgetId={widget.id}
        />
      );

    case WidgetTypes.DONUT:
      return (
        <DonutWidget
          attributes={widget.attributes}
          params={widget.params}
          taskName={taskName}
          widgetId={widget.id}
        />
      );

    case WidgetTypes.DONUT_VARIANT:
      return (
        <DonutVariantWidget
          attributes={widget.attributes}
          params={widget.params}
          taskName={taskName}
          widgetId={widget.id}
        />
      );

    case WidgetTypes.GAUGE:
    case WidgetTypes.GAUGE_SEVERITY_LEVEL:
    case WidgetTypes.GAUGE_SEVERITY_SCORE:
      return <GaugeWidget params={widget.params} taskName={taskName} widgetId={widget.id} />;

    case WidgetTypes.LINE:
      return <LineWidget params={widget.params} taskName={taskName} widgetId={widget.id} />;

    case WidgetTypes.PIE:
      return (
        <PieWidget
          attributes={widget.attributes}
          params={widget.params}
          taskName={taskName}
          widgetId={widget.id}
        />
      );

    case WidgetTypes.POLAR_AREA:
      return (
        <PolarAreaWidget
          params={widget.params}
          attributes={widget.attributes}
          taskName={taskName}
          widgetId={widget.id}
        />
      );

    case WidgetTypes.POSITIVE_NEGATIVE_AREA:
      return <PositiveNegativeAreaWidget params={widget.params} taskName={taskName} widgetId={widget.id} />;

    case WidgetTypes.READ_ONLY_TEXT:
      return <ReadOnlyTextWidget params={widget.params} taskName={taskName} widgetId={widget.id} />;

    case WidgetTypes.SCATTER:
      return <ScatterWidget params={widget.params} taskName={taskName} widgetId={widget.id} />;

    case WidgetTypes.STEP_LINE:
      return <StepLineWidget params={widget.params} taskName={taskName} widgetId={widget.id} />;

    case WidgetTypes.SUMMARY_STATISTICS:
      return (
        <SummaryStatisticsWidget
          attributes={widget.attributes}
          taskName={taskName}
          widgetId={widget.id}
          params={widget.params}
          isWidget={true}
        />
      );

    case WidgetTypes.TABLE:
      return (
        <TableWidget
          attributes={widget.attributes}
          params={widget.params}
          taskName={taskName}
          widgetId={widget.id}
        />
      );
    case WidgetTypes.SIMPLE_LIST_RANKED:
      return (
        <RankedListWidget
          attributes={widget.attributes}
          params={widget.params}
          taskName={taskName}
          widgetId={widget.id}
        />
      );

    case WidgetTypes.WATERFALL:
      return <WaterfallWidget params={widget.params} taskName={taskName} widgetId={widget.id} />;
  }
};

export function TransformToWidgetComponent({
  taskName,
  widget,
  registerEvents,
  hideSaveAndClose,
  onInputChange,
  CardWidgetElement = CardWidget,
}: {
  taskName: string;
  widget: Widget;
  registerEvents?: (event: AttributeInputEvents) => void;
  hideSaveAndClose?: boolean;
  onInputChange?: (hasChanged: boolean) => void;
  CardWidgetElement?: any;
}): ReactElement {
  const { viableSolutions } = widget;

  const hasViableSolutions = !isNilOrEmpty(viableSolutions);

  const [preferredWidgetIndex, setPreferredWidgetIndex] = useState(0);

  function getChartTypeToRender(): WidgetTypes {
    if (
      hasViableSolutions &&
      preferredWidgetIndex < viableSolutions.length &&
      viableSolutions[preferredWidgetIndex]
    ) {
      return viableSolutions[preferredWidgetIndex];
    }
    return widget.chartType;
  }

  return widget.chartType === WidgetTypes.CUSTOM ? (
    renderWidget({ preferredWidget: getChartTypeToRender(), widget, taskName, onInputChange, registerEvents })
  ) : (
    <CardWidgetElement
      title={widget.title}
      icon={false}
      selectedViz={preferredWidgetIndex}
      widgetSelector={
        hasViableSolutions ? (
          <VisualizationSelector
            items={viableSolutions}
            onItemPress={setPreferredWidgetIndex}
            preferredWidgetIndex={preferredWidgetIndex}
          />
        ) : null
      }
    >
      {renderWidget({
        preferredWidget: getChartTypeToRender(),
        widget,
        taskName,
        registerEvents,
        hideSaveAndClose,
        onInputChange,
      })}
    </CardWidgetElement>
  );
}
