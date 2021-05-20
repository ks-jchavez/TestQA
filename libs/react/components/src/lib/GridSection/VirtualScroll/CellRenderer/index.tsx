import { CellRendererProps } from './CellRenderer.model';
import DataViewRow from './DataViewRow';
import EditDataView from './EditDataView';
import React from 'react';
import RemainingRow from './RemainingRow';

const allComponent: { [index: string]: any } = {
  DataViewRow,
  EditDataView,
  RemainingRow,
};

export function CellRenderer({
  cellData,
  classes,
  columnIndex,
  columns,
  typeOf,
  draggable,
  orderColumnName,
  ...rest
}: CellRendererProps): React.ReactElement {
  const index = typeOf(cellData);

  return allComponent[index]({
    attr: columns[columnIndex].attr,
    row: cellData,
    idx: columnIndex,
    draggable,
    orderColumnName,
    props: columns[columnIndex].props,
    ...rest,
  });
}

export default React.memo(CellRenderer);
