export function getWidgetContextName({ taskName, widgetId }: { taskName: string; widgetId: string }): string {
  return `${taskName}_${widgetId}`;
}
