import { AutoSizer, Column, InfiniteLoader, Table, defaultTableRowRenderer } from 'react-virtualized';
import React, { ReactElement, useEffect, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import { useTheme, useUserInfo } from '@kleeen/react/hooks';

import CellRenderer from './CellRenderer/';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { ListingModal } from '../../ListingModal/ListingModal';
import { ListingModalSettings } from '../../ListingModal/ListingModal.model';
import { Loader } from '../../Loader/Loader';
import { MuiVirtualizedTableProps } from './VirtualScroll.model';
import ReactDOM from 'react-dom';
import { StorageHelper } from '@aws-amplify/core';
import classnames from 'classnames';
import { getRowClassName } from './GetRowClassName';
import { headerRenderer } from './HeaderRenderer';
import { styles } from './VirtualScroll.style';
import { useStyles } from './VirtualizedTable.style';
import { withStyles } from '@material-ui/core/styles';

const DragHandle = SortableHandle(({ children }) => <div className="draggableArea">{children}</div>);

const SortableHeader = SortableElement(({ children }) => (
  <div className="header-container">
    <DragHandle>
      <DragIndicatorIcon />
    </DragHandle>
    {children}
  </div>
));

const SortableHeaderRowRenderer = SortableContainer(({ className, columns, style }) => {
  return (
    <div className={className} role="row" style={style}>
      {React.Children.map(columns, (column) => (
        <SortableHeader index={Number(column.key.match(/\d+/)[0])}>{column}</SortableHeader>
      ))}
    </div>
  );
});

const SortableTable: any = SortableContainer(Table, {
  withRef: true,
});
const SortableRow = SortableElement(defaultTableRowRenderer);

const _isRowSortable = (index) => {
  return index >= 0; // Header row should not be draggable
};

const _rowRenderer = (props) => {
  const { index } = props;
  return _isRowSortable(index) ? <SortableRow {...props} /> : defaultTableRowRenderer(props);
};

const defaultProps = {
  headerHeight: 42,
  rowHeight: 34,
};

const initialModelSettings = {
  attribute: null,
  columnLabel: '',
  data: [],
  format: null,
  isOpen: false,
  rowDisplayValue: '',
};

function MuiVirtualizedTable({
  actions,
  amendCellUpdate,
  attributes,
  classes,
  columns,
  deleteContainer,
  deleteProcess,
  editingCell,
  enableEditMode,
  handleChange,
  hasActions,
  headerHeight,
  isDeletable,
  localization,
  onRowClick,
  onSort,
  order,
  orderBy,
  rowHeight,
  toggleDelete,
  translate,
  triggerCustomAction,
  typeOf,
  sortable,
  sortableColumns,
  onSortRow,
  getMoreRows,
  orderColumnName,
  widgetId,
  ...tableProps
}: MuiVirtualizedTableProps): ReactElement {
  const minWidth = 178 * columns.length;
  const list = columns[0].props?.entity?.data;
  const pagination = columns[0].props?.entity?.pagination;
  const remoteRowCount = pagination?.totalCount ?? list?.length;

  const [listingModalSettings, setIsListingModalOpen] = useState(initialModelSettings);
  const [isLoadingMoreRows, setIsLoadingMoreRows] = useState(false);
  const [columnsState, setColumnsState] = useState(columns || []);
  const [columnsOrderChanged, setColumnsOrderChanged] = useState(false);
  const displayColumnAttribute = attributes.find((attribute) => attribute.isDisplayValue);
  const { themeClass } = useTheme();
  const [inputValues, setInputValues] = useState({});

  //Antorcha TODO: take the storage logic out of the component
  const _storage = new StorageHelper().getStorage();
  const _user = useUserInfo();
  const userName = _user?.userInfo?.username;
  const keyOfLocalStorage = userName ? `order-of-columns-${userName}-${widgetId}` : '';

  function handleOnColumnSort(oldIndex, newIndex) {
    _storage.setItem(keyOfLocalStorage, JSON.stringify(arrayMove(columnsState, oldIndex, newIndex)));
    setColumnsState(arrayMove(columnsState, oldIndex, newIndex));
    setColumnsOrderChanged(!columnsOrderChanged);
  }

  useEffect(() => {
    const localStorageColumns = JSON.parse(_storage.getItem(keyOfLocalStorage));
    if (localStorageColumns) {
      if (localStorageColumns.length > 0) {
        setColumnsState(localStorageColumns);
      }
    }
  }, [columnsOrderChanged, keyOfLocalStorage]);

  function setInputValue(index, value) {
    setInputValues({
      ...inputValues,
      [index]: value,
    });
  }

  function isRowLoaded({ index }) {
    return !!list[index];
  }

  function loadMoreRows({ startIndex, stopIndex }) {
    if (!isLoadingMoreRows) {
      getMoreRows && getMoreRows({ startIndex, stopIndex });
      setIsLoadingMoreRows(true);
    }
  }

  useEffect(() => {
    setIsLoadingMoreRows(false);
  }, [list]);

  function closeShowMoreModal(): void {
    setIsListingModalOpen(initialModelSettings);
  }

  function _sortRow({ newIndex, oldIndex }) {
    if (newIndex === oldIndex) {
      return;
    }
    if (onSortRow) onSortRow(newIndex, oldIndex);
  }

  function openShowMoreModal(settings: ListingModalSettings): void {
    setIsListingModalOpen(settings);
  }

  const rowClassName = ({ index }) =>
    getRowClassName({
      classes,
      deleteContainer,
      index,
      onRowClick,
      rowGetter: tableProps.rowGetter,
    });

  const gridStyle = { direction: 'inherit' };
  const headerStyles = useStyles();
  return (
    <>
      <AutoSizer>
        {({ height, width }) => {
          if (sortable) {
            return (
              <SortableTable
                className={classnames(classes.table, { [classes.tableHidden]: width === 0 })}
                gridStyle={gridStyle}
                headerHeight={defaultProps.headerHeight}
                height={height}
                overscanRowCount={3}
                rowClassName={rowClassName}
                rowHeight={defaultProps.rowHeight}
                width={minWidth < width ? width : minWidth}
                getContainer={(wrappedInstance: any) => ReactDOM.findDOMNode(wrappedInstance.Grid) as any}
                onSortEnd={_sortRow}
                rowRenderer={_rowRenderer}
                useDragHandle
                helperClass={`${themeClass} dragging-row-helper-styles`}
                {...tableProps}
              >
                {columns.map(({ dataKey, ...other }, index) => {
                  return (
                    <Column
                      className={classes.flexContainer}
                      cellRenderer={({ cellData, columnIndex, rowData }) => {
                        return (
                          <CellRenderer
                            amendCellUpdate={amendCellUpdate}
                            actions={actions}
                            cellData={cellData}
                            classes={classes}
                            columnIndex={columnIndex}
                            columns={columns}
                            deleteContainer={deleteContainer}
                            deleteProcess={deleteProcess}
                            displayColumnAttribute={displayColumnAttribute}
                            editingCell={editingCell}
                            hasActions={hasActions}
                            isDeletable={isDeletable}
                            localization={localization}
                            openShowMoreModal={openShowMoreModal}
                            rowData={rowData}
                            toggleDelete={toggleDelete}
                            triggerCustomAction={triggerCustomAction}
                            typeOf={typeOf}
                            draggable={sortable && index === 0}
                            orderColumnName={orderColumnName}
                            {...tableProps}
                          />
                        );
                      }}
                      dataKey={dataKey}
                      headerClassName={classes.tableHeader}
                      headerRenderer={(headerProps) =>
                        headerRenderer({
                          ...headerProps,
                          attributes,
                          columnIndex: index,
                          handleChange,
                          hasActions,
                          onSort,
                          order,
                          orderBy,
                        })
                      }
                      width={width}
                      key={dataKey}
                      {...other}
                    />
                  );
                })}
              </SortableTable>
            );
          } else if (sortableColumns) {
            return (
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                minimumBatchSize={501}
                threshold={10}
                rowCount={remoteRowCount}
              >
                {({ onRowsRendered, registerChild }) => (
                  <SortableTable
                    onRowsRendered={onRowsRendered}
                    getContainer={(wrappedInstance: any) => ReactDOM.findDOMNode(wrappedInstance.Grid) as any}
                    ref={registerChild}
                    className={classnames(classes.table, { [classes.tableHidden]: width === 0 })}
                    gridStyle={gridStyle}
                    headerHeight={defaultProps.headerHeight}
                    height={height}
                    overscanRowCount={3}
                    rowClassName={rowClassName}
                    headerRowRenderer={(props) => (
                      <SortableHeaderRowRenderer
                        {...props}
                        axis="x"
                        helperClass={`${themeClass} ${headerStyles['dragging-column-helper-styles']}`}
                        lockAxis="x"
                        distance={20}
                        onSortEnd={({ oldIndex, newIndex }) => {
                          handleOnColumnSort(oldIndex, newIndex);
                        }}
                      />
                    )}
                    useDragHandle
                    rowHeight={defaultProps.rowHeight}
                    width={minWidth < width ? width : minWidth}
                    {...tableProps}
                  >
                    {columnsState.map(({ dataKey, ...other }, index) => {
                      return (
                        <Column
                          className={classes.flexContainer}
                          cellRenderer={({ cellData, columnIndex, rowData }) => {
                            return (
                              <CellRenderer
                                amendCellUpdate={amendCellUpdate}
                                actions={actions}
                                cellData={cellData}
                                classes={classes}
                                columnIndex={index}
                                columns={columnsState}
                                deleteContainer={deleteContainer}
                                deleteProcess={deleteProcess}
                                displayColumnAttribute={displayColumnAttribute}
                                editingCell={editingCell}
                                hasActions={hasActions}
                                isDeletable={isDeletable}
                                localization={localization}
                                openShowMoreModal={openShowMoreModal}
                                rowData={rowData}
                                toggleDelete={toggleDelete}
                                triggerCustomAction={triggerCustomAction}
                                typeOf={typeOf}
                                {...tableProps}
                              />
                            );
                          }}
                          dataKey={dataKey}
                          headerClassName={classes.tableHeader}
                          headerRenderer={(headerProps) => {
                            const newAttributes = columnsState.map((element) => {
                              return element.attr;
                            });

                            return headerRenderer({
                              ...headerProps,
                              newAttributes,
                              attributes,
                              columnIndex: index,
                              handleChange,
                              hasActions,
                              onSort,
                              order,
                              orderBy,
                              inputValues,
                              setInputValue,
                            });
                          }}
                          width={width}
                          key={dataKey}
                          {...other}
                        />
                      );
                    })}
                  </SortableTable>
                )}
              </InfiniteLoader>
            );
          } else {
            return (
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                minimumBatchSize={501}
                threshold={10}
                rowCount={remoteRowCount}
              >
                {({ onRowsRendered, registerChild }) => (
                  <Table
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    className={classnames(classes.table, { [classes.tableHidden]: width === 0 })}
                    gridStyle={gridStyle}
                    headerHeight={defaultProps.headerHeight}
                    height={height}
                    overscanRowCount={3}
                    rowClassName={rowClassName}
                    rowHeight={defaultProps.rowHeight}
                    width={minWidth < width ? width : minWidth}
                    {...tableProps}
                  >
                    {columns.map(({ dataKey, ...other }, index) => {
                      return (
                        <Column
                          className={classes.flexContainer}
                          cellRenderer={({ cellData, columnIndex, rowData }) => {
                            return (
                              <CellRenderer
                                amendCellUpdate={amendCellUpdate}
                                actions={actions}
                                cellData={cellData}
                                classes={classes}
                                columnIndex={columnIndex}
                                columns={columns}
                                deleteContainer={deleteContainer}
                                deleteProcess={deleteProcess}
                                displayColumnAttribute={displayColumnAttribute}
                                editingCell={editingCell}
                                hasActions={hasActions}
                                isDeletable={isDeletable}
                                localization={localization}
                                openShowMoreModal={openShowMoreModal}
                                rowData={rowData}
                                toggleDelete={toggleDelete}
                                triggerCustomAction={triggerCustomAction}
                                typeOf={typeOf}
                                {...tableProps}
                              />
                            );
                          }}
                          dataKey={dataKey}
                          headerClassName={classes.tableHeader}
                          headerRenderer={(headerProps) =>
                            headerRenderer({
                              ...headerProps,
                              attributes,
                              columnIndex: index,
                              handleChange,
                              hasActions,
                              onSort,
                              order,
                              orderBy,
                              inputValues,
                              setInputValue,
                            })
                          }
                          width={width}
                          key={dataKey}
                          {...other}
                        />
                      );
                    })}
                  </Table>
                )}
              </InfiniteLoader>
            );
          }
        }}
      </AutoSizer>
      {isLoadingMoreRows && (
        <div className={classes.infiniteLoader}>
          <Loader />
        </div>
      )}
      {listingModalSettings.isOpen && (
        <ListingModal
          attribute={listingModalSettings.attribute}
          columnLabel={listingModalSettings.columnLabel}
          data={listingModalSettings.data}
          format={listingModalSettings.format}
          isOpen={listingModalSettings.isOpen}
          onClose={closeShowMoreModal}
          rowDisplayValue={listingModalSettings.rowDisplayValue}
        />
      )}
    </>
  );
}

export const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);
