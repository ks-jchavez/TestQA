import { Action, ActionType, AmendCellUpdate, Attribute } from '@kleeen/types';
import React, { useState } from 'react';

import { GridSectionProps } from '../GridSection.model';
import { KUIConnect } from '@kleeen/core-react';
import { Loader } from '../../Loader/Loader';
import Paper from '@material-ui/core/Paper';
import { VirtualizedTable } from './VirtualizedTable';
import { allComponentEnum } from './CellRenderer/CellRenderer.model';
import { stableSort } from '../stableSort';
import useFilter from '../useFilter';
import useSort from '../useSort';

type HeaderColumns = Array<{
  attr: Attribute;
  dataKey: string;
  label: string;
  props;
}>;

function ReactVirtualizedTableComponent({
  onSortRow,
  sortable,
  orderColumnName,
  translate,
  widgetId,
  sortableColumns,
  ...props
}: GridSectionProps): JSX.Element {
  const [{ rows }, handleChange] = useFilter(props.entity.data);
  const [{ order, orderBy }, onSort] = useSort();
  const [deleteContainer, setStatusDeleteContainer] = useState([]);
  const [editingCell, setEditingCell] = useState({});
  const [remainingRows] = useState([]);

  const actions = props?.actions || [];
  const isDeletable = actions.some(({ type }) => type.toLowerCase() === ActionType.Delete);
  const hasActions = isDeletable || actions.length > 0;
  const localization = {
    actionsTableHeaderRow: translate('app.gridSection.actionsTableHeaderRow'),
    addButtonAriaLabel: translate('app.gridSection.addButtonAriaLabel'),
    clearSearchAriaLabel: translate('app.gridSection.clearSearchAriaLabel'),
    confirmArialLabel: translate('app.gridSection.confirmArialLabel'),
    confirmDeleteLabel: translate('app.gridSection.confirmDeleteLabel'),
    deleteButtonAriaLabel: translate('app.gridSection.deleteButtonAriaLabel'),
    editButtonAriaLabel: translate('app.gridSection.editButtonAriaLabel'),
    rejectAriaLabel: translate('app.gridSection.rejectAriaLabel'),
    searchPlaceholder: translate('app.gridSection.searchPlaceholder'),
    searchTooltip: translate('app.gridSection.searchTooltip'),
  };

  if (props.entity.isLoading) {
    return <Loader />;
  }

  const amendCellUpdate: AmendCellUpdate = (params): void => {
    if (props.onCellUpdate) {
      props.onCellUpdate(params);
    }
    setEditingCell({});
  };

  function deleteProcess(id: string): void {
    props.entityActions['deleteRequest']({ id, entityKey: props.entityName });
    toggleDelete(id);
  }

  function toggleDelete(id: string): void {
    deleteContainer.includes(id)
      ? setStatusDeleteContainer(deleteContainer.filter((q) => q != id))
      : setStatusDeleteContainer([...deleteContainer, id]);
  }

  function triggerCustomAction(action: Action, id: string): void {
    const dispatchCustomAction = props?.entityActions?.dispatchCustomAction || (() => ({}));

    dispatchCustomAction({
      params: {
        baseModel: props.entityName,
        displayName: action.displayName,
        operationName: `${action.name}${props.entityId}`,
      },
      paramsBasedOnRoute: { [props.entityName]: id },
      taskName: props.taskName,
      widgetId: '',
    });
  }

  function typeOf(row): allComponentEnum {
    if (rows) {
      if (props.enableEditMode) {
        return allComponentEnum.EditDataView;
      } else {
        return allComponentEnum.DataViewRow;
      }
    } else {
      return allComponentEnum.RemainingRow;
    }
  }

  if (Array.isArray(rows) || Array.isArray(remainingRows)) {
    const rowsStableSort = rows ? stableSort(rows, order, orderBy) : remainingRows;

    return (
      <Paper
        style={{
          backgroundColor: 'var(--row-even)',
          borderRadius: 'var(--card-border-radius)',
          boxShadow: 'var(--card-shadow)',
          height: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          width: '100%',
        }}
      >
        <VirtualizedTable
          widgetId={widgetId}
          actions={actions}
          amendCellUpdate={amendCellUpdate}
          attributes={props.attributes}
          autocomplete={props.autocomplete}
          columns={headerColumns(props.attributes, props)}
          deleteContainer={deleteContainer}
          deleteProcess={props.onDeleteRow || deleteProcess}
          editingCell={editingCell}
          getMoreRows={props.getMoreRows}
          handleChange={handleChange}
          hasActions={hasActions}
          isDeletable={isDeletable}
          localization={localization}
          onAutocompleteRequest={props.onAutocompleteRequest}
          onSort={onSort}
          onSortRow={onSortRow}
          order={order}
          orderBy={orderBy}
          rowCount={rowsStableSort.length}
          rowGetter={({ index }) => (rowsStableSort.length > 0 ? rowsStableSort[index] : {})}
          setEditingCell={setEditingCell}
          sortable={sortable}
          sortableColumns={sortableColumns}
          toggleDelete={toggleDelete}
          triggerCustomAction={triggerCustomAction}
          typeOf={typeOf}
          orderColumnName={orderColumnName}
        />
      </Paper>
    );
  } else return null;
}

//#region Private Members

function headerColumns(attrs: Attribute[], props): HeaderColumns {
  const columns: HeaderColumns = [];

  attrs.forEach((attr) => {
    columns.push({
      attr,
      dataKey: attr.name,
      label: attr.label || attr.name,
      props,
    });
  });

  return columns;
}

//#endregion

const ReactVirtualizedTable = React.memo(
  KUIConnect(({ translate }) => ({ translate }))(ReactVirtualizedTableComponent),
);

export default ReactVirtualizedTable;
