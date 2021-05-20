import {
  DashboardView,
  DataViewDisplaySectionAtomicProps,
  DisplaySectionViews,
  ViewType,
} from './DataViewDisplaySection.model';
import { isNilOrEmpty, roleAccessKeyTag, sortByKeys } from '@kleeen/common/utils';

import CardSection from '../CardSection/CardSection';
import CustomView from '../CustomView/CustomView';
import DataViewDisplaySection from './DataViewDisplaySection';
import FullViewViz from '../FullViewViz/FullViewViz';
import GridAreaSection from '../GridAreaSection/GridAreaSection';
import React from 'react';
import { Widget } from '@kleeen/react/atomic-elements';
import { useAccessControlChecker } from '@kleeen/core-react';
import { useGetWidgetsAmount } from '@kleeen/react/hooks';

const permissionOk = 'SHOW';

export const DataViewDisplaySectionAtomic = React.memo((props: DataViewDisplaySectionAtomicProps) => {
  const {
    atomicCustomViews = [],
    dashboardWidgets = [],
    selectedRows,
    setSelectedRows,
    singleViewWidgets = [],
    tableWidgets = [],
    taskName,
    value: indexToRender,
  } = props;

  const accessControlFilterViews = (view: Widget & { type: ViewType }): boolean => {
    if (view.type === ViewType.dashboard) {
      return (
        useAccessControlChecker(roleAccessKeyTag(`${props.taskName}.views.dashboard`)).permission ===
        permissionOk
      );
    }
    return (
      useAccessControlChecker(
        roleAccessKeyTag(`${props.taskName}.views.${view.title || view.params.baseModel}`),
      ).permission === permissionOk
    );
  };

  const taskViews = [
    ...singleViewWidgets.map((widget) => ({ ...widget, type: ViewType.single })),
    ...atomicCustomViews.map((widget) => ({ ...widget, type: ViewType.custom })),
    ...tableWidgets.map((widget) => ({ ...widget, type: ViewType.table })),
    ...generateDashboardViews(dashboardWidgets),
  ];

  const orderedTaskViews = sortByKeys<Widget & { type: ViewType }>(taskViews, ['viewOrder', 'viewId']);

  useGetWidgetsAmount(props.setCardsNumber);

  // TODO: @Guaria this is just a workaround, the solution should be assign an ID to each entry on the DataViewControlSection
  // then use that selected ID to identify which section should be render.
  let currentIndex = -1;
  const isTheIndexToRender = (): boolean => {
    currentIndex += 1;
    return currentIndex === indexToRender;
  };

  const children = orderedTaskViews.reduce((views, view) => {
    if (!isNilOrEmpty(view) && isTheIndexToRender() && accessControlFilterViews(view)) {
      return resolveViews({
        widget: view,
        setSelectedRows,
        selectedRows,
        indexToRender,
        taskName,
        dashboardWidgets,
      });
    }
    return views;
  }, []);
  return <DataViewDisplaySection value={0}>{children}</DataViewDisplaySection>;
});

// This will work just for the current implementation of one dashboard per task
function generateDashboardViews(dashboardWidgets: Widget[]): DashboardView[] {
  if (isNilOrEmpty(dashboardWidgets)) return [];

  const [firsWidget] = dashboardWidgets;
  return [
    {
      dashboardWidgets,
      type: ViewType.dashboard,
      viewOrder: firsWidget?.viewOrder,
      viewId: firsWidget?.viewId,
    },
  ];
}

function resolveViews({
  widget,
  taskName,
  setSelectedRows,
  selectedRows,
  dashboardWidgets,
  indexToRender,
}: DisplaySectionViews) {
  const viewResolvers = {
    [ViewType.custom]: () => (
      <CustomView key={`data-view-display-section-full-view-viz-${widget.id}`} widget={widget} />
    ),
    [ViewType.single]: () => (
      <FullViewViz
        key={`data-view-display-section-full-view-viz-${widget.id}`}
        taskName={taskName}
        widget={widget}
      />
    ),
    [ViewType.dashboard]: () => (
      <CardSection
        justifyContent="center"
        key={`data-view-display-section-card-section-${indexToRender}`}
        taskName={taskName}
        widgets={dashboardWidgets}
      />
    ),
    [ViewType.table]: () => (
      <GridAreaSection
        entityName={widget.params.baseModel}
        key={`data-view-display-section-grid-area-section-${widget.id}`}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        taskName={taskName}
        widget={widget}
        entityId={widget.attributes[0].id}
        sortableColumns={true}
      />
    ),
  };

  return viewResolvers[widget.type]();
}

export default DataViewDisplaySectionAtomic;
