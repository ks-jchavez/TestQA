import ActionsForm from '../../ActionsForm';
import ConfirmForm from '../../ConfirmForm';
import { ContextCell } from '../../../contextCell';
import { DataViewRowProps } from './CellRenderer.model';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import KsDisplayMedia from '../../../KsDisplayMedia/KsDisplayMedia';
import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import { TableCell } from '../../components/index';
import { overwriteFormat } from '@kleeen/common/utils';
import { useStyles } from './CellRenderer.styles';
import { validateOrderColum } from './utils';

const DragHandle = SortableHandle(({ children }) => <div>{children}</div>);

function DataViewRow({
  actions,
  attr,
  deleteContainer,
  deleteProcess,
  displayColumnAttribute,
  hasActions,
  idx,
  isDeletable,
  localization,
  openShowMoreModal,
  props,
  row = {},
  rowData,
  toggleDelete,
  triggerCustomAction,
  draggable,
  orderColumnName,
}: DataViewRowProps): JSX.Element {
  function _draggableColumn(children) {
    return <DragHandle>{children}</DragHandle>;
  }
  const classes = useStyles();
  if (deleteContainer && deleteContainer.includes(row.id)) {
    const confirmMethod = () => {
      deleteProcess(row.id);
    };
    const rejectMethod = () => {
      toggleDelete(row.id);
    };

    return (
      <TableCell colSpan={props.attributes.length + 1}>
        <div className="confirm-delete-container">
          <ConfirmForm
            localization={localization}
            confirmMethod={confirmMethod}
            rejectMethod={rejectMethod}
          />
          <div className="confirm-delete-label">{localization.confirmDeleteLabel}</div>
        </div>
      </TableCell>
    );
  }
  if (deleteContainer && deleteContainer.includes(rowData.id)) return null;

  const rowKey = `${row.id}-${`${attr.isDisplayValue ? `displayValue::${attr.name}` : attr.name}`}`;
  const { displayValue: rowDisplayValue } = rowData[`displayValue::${displayColumnAttribute?.name}`] || {};

  if (idx === 0) {
    const hasBorderRight = hasActions ? 'no-border-right' : null;
    const handleCustomAction = (action) => triggerCustomAction(action, row.id);
    const handleDelete = () => toggleDelete(row.id);
    const handleEdit = () => {
      null;
    };

    return (
      <React.Fragment key={`${row.id}-fragment`}>
        {draggable &&
          _draggableColumn(
            <div className="draggable-container">
              <div className="draggable-column data-view">
                <DragIndicatorIcon />
              </div>
              <div className="draggable-column-number">{validateOrderColum(rowData, orderColumnName)}</div>
            </div>,
          )}
        <TableCell
          key={rowKey}
          className={`hasBorderRight ${draggable ? 'firstColumn' : ''} ${
            row.displayMedia && classes.tableCellContainer
          }`}
        >
          {row.displayMedia && (
            <KsDisplayMedia
              className={classes.displayMedia}
              value={row.displayMedia.value}
              type={row.displayMedia.type}
              size={27}
            />
          )}
          <ContextCell
            attr={attr}
            cell={row}
            format={overwriteFormat(props?.entity?.format[attr.name], attr.format)}
            openShowMoreModal={openShowMoreModal}
            rowDisplayValue={rowDisplayValue}
            hasDisplayMedia={row.displayMedia ? true : false}
          />
        </TableCell>
        {hasActions && (
          <TableCell key={`${rowKey}-actions`} className="actions-form-cell">
            <ActionsForm
              actions={actions}
              handleCustomAction={handleCustomAction}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              isDeletable={isDeletable}
              localization={localization}
              row={rowData}
            />
          </TableCell>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <TableCell key={rowKey} className={`${row.displayMedia && classes.tableCellContainer}`}>
        {row.displayMedia && (
          <KsDisplayMedia
            className={classes.displayMedia}
            value={row.displayMedia.value}
            type={row.displayMedia.type}
            size={27}
          />
        )}
        <ContextCell
          attr={attr}
          cell={row}
          format={overwriteFormat(props?.entity?.format[attr.name], attr.format)}
          rowDisplayValue={rowDisplayValue}
          openShowMoreModal={openShowMoreModal}
          hasDisplayMedia={row.displayMedia ? true : false}
        />
      </TableCell>
    );
  }
}

export default DataViewRow;
