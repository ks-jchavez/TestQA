import {
  AddPayload,
  CellDisplayValue,
  DeletePayload,
  KsConfigTableOnSaveData,
  KsConfigTableProps,
  RowData,
  UpdatePayload,
} from './config-table.model';
import { NEW_ROW_ID_PREFIX, entityMap, isNilOrEmpty, mergeByOrAppend } from '@kleeen/common/utils';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

import { ActionType } from '@kleeen/types';
import { ConfigTableActions } from './components';
import { default as KsVirtualTable } from '../GridSection/VirtualScroll';
import { startsWith } from 'ramda';
import { useKsAutoComplete } from '@kleeen/react/hooks';
import { useStyles } from './config-table.styles';
import { v4 as uuid } from 'uuid';

/**
 * Configuration Table component
 * @param {Object} props The component props
 * @param {Object} props.params The parameters sent to the backend when performing API calls
 * @param {string} props.params.baseModel Use PascalCase for this value. Check entities.json as reference
 * @returns A Configuration Table react element
 */
export function KsConfigTable({
  actions,
  addModalAttributes,
  attributes,
  customModalProps,
  data: tableData,
  entityActions,
  onInputChange,
  onRegisterEvents,
  params,
  taskName,
  widgetId,
  orderColumnName,
  isSortable,
}: KsConfigTableProps): ReactElement {
  // Auto Complete
  const [autocompleteAttr, setAutocompleteAttr] = useState<string>();
  const autocompleteValues = useKsAutoComplete({ entity: autocompleteAttr, taskName, widgetId });
  // Deleted Rows
  const [deletedRows, setDeletedRows] = useState<string[]>([]);
  const deletedRowsRef = useRef(deletedRows);
  // Edited Rows
  const [editedRows, setEditedRows] = useState<RowData[]>([]);
  const editedRowsRef = useRef(editedRows);
  // Styles
  const unmounted = useRef(false);
  const classes = useStyles();

  const isASortableTable = isSortable && !isNilOrEmpty(orderColumnName);

  const entityId = entityMap[params.baseModel]; // TODO: @cafe Get EntityId from data-blob, instead of entities mapping file
  const data = tableData?.data?.data;

  const format = tableData?.data?.format;
  const isLoading = tableData?.isLoading;
  const mergedData = mergeByOrAppend(data, editedRows, 'id').filter((row) => !deletedRows.includes(row?.id));
  const sortedData = isASortableTable
    ? mergedData.slice().sort((rowA, rowB) => {
        const cellA = rowA[orderColumnName as string];
        const cellB = rowB[orderColumnName as string];
        const orderA = (cellA as CellDisplayValue)?.displayValue;
        const orderB = (cellB as CellDisplayValue)?.displayValue;
        return (orderA as number) - (orderB as number);
      })
    : mergedData;
  const entityData = {
    data: sortedData,
    format,
    isLoading,
  };
  const refEntityData = useRef(sortedData);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  useEffect(() => {
    const hasDeletedRows = !isNilOrEmpty(deletedRows);
    const hasEditedRows = !isNilOrEmpty(editedRows);

    if (unmounted.current || !isLoading) return;

    if (hasDeletedRows) {
      setDeletedRows([]);
    }

    if (hasEditedRows) {
      setEditedRows([]);
    }
  }, [isLoading]);

  useEffect(() => {
    deletedRowsRef.current = deletedRows;
  }, [deletedRows]);

  useEffect(() => {
    editedRowsRef.current = editedRows;
  }, [editedRows]);

  useEffect(() => {
    refEntityData.current = entityData.data;
  }, [entityData.data]);

  useEffect(() => {
    if (onRegisterEvents) {
      onRegisterEvents({
        id: widgetId,
        onCancel: handleCancel,
        onSave: handleSave,
      });
    }
  }, []);

  //#region Handlers

  function handleOnSortRow(newIndex: number, oldIndex: number): void {
    if (!isASortableTable) {
      return;
    }
    // This tells the table that all of the fields for each row need to be updated
    // We should only change the `[orderColumnName]` of every object
    const newDataAux = Array.from(entityData.data);
    const result = reorderArray(newIndex, oldIndex, newDataAux);
    const finalResult = result.map((element, index) => {
      return { ...element, [orderColumnName as string]: { displayValue: index, id: element.id } };
    });

    if (onInputChange) {
      onInputChange(true);
    }

    if (!unmounted.current) {
      setEditedRows(finalResult);
    }
  }

  function handleAddAction(payload: AddPayload): void {
    if (onInputChange) {
      onInputChange(true);
    }

    const rowId = { id: `${NEW_ROW_ID_PREFIX}${uuid()}` };
    const newRow: RowData = Object.keys(payload.entity).reduce((acc, key) => {
      const value = payload.entity[key];

      acc[key] = {
        displayValue: value,
      };

      return acc;
    }, rowId);

    if (isASortableTable) {
      newRow[orderColumnName as string] = { displayValue: entityData.data.length, id: rowId.id };
    }

    if (!unmounted.current) {
      setEditedRows([...editedRows, newRow]);
    }
  }

  function handleAutocomplete(attributeName: string): void {
    if (!unmounted.current) {
      setAutocompleteAttr(attributeName);
    }
  }

  function handleCancel(): void {
    if (!unmounted.current) {
      setDeletedRows([]);
      setEditedRows([]);
    }
  }

  function handleCellUpdate(cell): void {
    if (onInputChange) {
      onInputChange(true);
    }

    const editedRowIndex = editedRows.findIndex((row) => row.id === cell.rowId);
    const newRows = [...editedRows];

    if (editedRowIndex === -1) {
      newRows.push({ id: cell.rowId, [cell.attributeName]: cell.value });
    } else {
      newRows[editedRowIndex][cell.attributeName] = cell.value;
    }

    if (!unmounted.current) {
      setEditedRows(newRows);
    }
  }

  function handleRowDelete(id: string): void {
    if (onInputChange) {
      onInputChange(true);
    }

    const isAddedRow = startsWith(NEW_ROW_ID_PREFIX, id);

    if (!isAddedRow) {
      if (!unmounted.current) {
        setDeletedRows([...deletedRows, id]);
      }
    }

    const newEditedRows = editedRows.filter((row) => row.id !== id);

    if (!unmounted.current) {
      setEditedRows(newEditedRows);
    }
  }

  function handleSave(): KsConfigTableOnSaveData {
    const payload = { entityKey: params.baseModel, rows: editedRowsRef.current };
    const payloadDelete = { entityKey: params.baseModel, deletedRows: deletedRowsRef.current };
    const addPayload = getAddPayload(payload);
    const deletePayload = getDeletePayload(payloadDelete);
    const updatePayload = getUpdatePayload(payload);

    if (entityActions) {
      const { bulkAddRequest, bulkDeleteRequest, bulkUpdateRequest } = entityActions;

      bulkAddRequest && bulkAddRequest(addPayload);
      bulkDeleteRequest && bulkDeleteRequest(deletePayload);
      bulkUpdateRequest && bulkUpdateRequest(updatePayload);
    }

    return {
      changes: {
        added: addPayload,
        deleted: deletePayload,
        updated: updatePayload,
      },
      current: refEntityData.current,
      id: widgetId,
    };
  }

  //#endregion

  return (
    <div className={classes.widgetContent}>
      <KsVirtualTable
        actions={actions}
        attributes={attributes}
        autocomplete={autocompleteValues}
        enableEditMode
        entity={entityData}
        entityActions={null}
        entityId={entityId}
        onAutocompleteRequest={handleAutocomplete}
        onCellUpdate={handleCellUpdate}
        onDeleteRow={handleRowDelete}
        widgetId={widgetId}
        sortable={isSortable}
        onSortRow={isSortable ? handleOnSortRow : null}
        orderColumnName={orderColumnName}
      />
      <ConfigTableActions
        actions={actions?.filter(
          // TODO: @cafe Allow custom actions later on
          ({ type }) => type === ActionType.Add,
        )}
        attributes={!isNilOrEmpty(addModalAttributes) ? addModalAttributes : attributes}
        context={{ editedRows, customModalProps, currentRows: mergedData }}
        entityActions={entityActions}
        onAddAction={handleAddAction}
        skinny={true}
        taskName={taskName}
      />
    </div>
  );
}

function getPayloadRow(row: RowData): { [key: string]: any } {
  return Object.keys(row).reduce((acc, key) => {
    if (key === 'id') return acc;
    if (row[key].hasOwnProperty('displayValue')) {
      acc[key] = (row[key] as CellDisplayValue).displayValue;
    } else {
      acc[key] = row[key];
    }

    return acc;
  }, {});
}

function getAddPayload({ entityKey, rows }: { entityKey: string; rows: RowData[] }): AddPayload[] {
  if (isNilOrEmpty(entityKey) || isNilOrEmpty(rows)) {
    return [];
  }

  return rows
    .filter(({ id }) => startsWith(NEW_ROW_ID_PREFIX, id))
    .map((row) => {
      const entity = getPayloadRow(row);

      return {
        entity,
        entityKey,
      };
    });
}

function getDeletePayload({
  entityKey,
  deletedRows,
}: {
  entityKey: string;
  deletedRows: string[];
}): DeletePayload[] {
  if (isNilOrEmpty(entityKey) || isNilOrEmpty(deletedRows)) {
    return [];
  }

  return deletedRows.map((id) => ({ entityKey, id }));
}

function getUpdatePayload({ entityKey, rows }: { entityKey: string; rows: RowData[] }): UpdatePayload[] {
  if (isNilOrEmpty(entityKey) || isNilOrEmpty(rows)) {
    return [];
  }
  return rows
    .filter(({ id }) => !startsWith(NEW_ROW_ID_PREFIX, id))
    .map((row: RowData) => {
      const params = getPayloadRow(row);
      return {
        entity: entityKey,
        params: { ...params, id: row.id },
      };
    });
}

function reorderArray(newIndex: number, oldIndex: number, array: RowData[]) {
  const result = array;
  const [removed] = result.splice(oldIndex, 1);
  result.splice(newIndex, 0, removed);
  return result;
}
