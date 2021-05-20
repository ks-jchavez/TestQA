import './ContextCell.scss';

import { AggregationType, Attribute, Cell, LabelResultsReturnProps } from '@kleeen/types';
import { ContextMenu, isLinkFilterableByEntityType } from '../contextMenu/ContextMenu';
import { ContextMenuProps, LabelResultsProps } from './ContextCell.model';
import React, { ReactElement } from 'react';
import { isEmpty, isNil, pathOr } from 'ramda';
import { useAnchorElement, useCrosslinking } from '@kleeen/react/hooks';

import { ArrowPoint } from '../arrowPoint/ArrowPoint';
import { BootstrapTooltip } from './bootstrap-tooltip';
import { ClickableChipsCell } from './ClickableChips/ClickableChipsCell';
import { NEW_ROW_ID_PREFIX } from '@kleeen/common/utils';
import { TextFormatter } from '../textFormatter/TextFormatter';
import classNames from 'classnames';
import { isAttributeNumericType } from '@kleeen/frontend/utils';

const MAX_TEXT_LENGTH = 15;

export function ContextCell(props: ContextMenuProps): ReactElement {
  const { anchorEl, handleClick, handleClose } = useAnchorElement();
  const { crosslink } = useCrosslinking();

  const cell = props.cell as Cell;

  if (isNil(cell)) {
    return null;
  }

  const isMultipleValuesColumn = props.attr?.aggregation === AggregationType.SelfMulti;
  const shouldDisplayClickableChipsCell = isMultipleValuesColumn && Array.isArray(props.cell);

  const beFormat = props.format;
  const ksFormat = pathOr({}, ['attr', 'format'], props);
  const format = isNil(beFormat) || isEmpty(beFormat) ? ksFormat : beFormat;
  const { displayValue, $metadata: metadata } = cell;
  const cellEntityType = metadata?.entityType;
  const isIdTemporary = props?.row?.id?.toString().includes(NEW_ROW_ID_PREFIX);

  if (shouldDisplayClickableChipsCell) {
    return (
      <ClickableChipsCell
        attribute={props.attr}
        cellItems={props.cell as Cell[]}
        columnLabel={props.attr?.label}
        format={format}
        openShowMoreModal={props.openShowMoreModal}
        rowDisplayValue={props.rowDisplayValue}
        cellEntityType={cellEntityType}
        isIdTemporary={isIdTemporary}
      />
    );
  }

  const validCrosslinks =
    (!isIdTemporary &&
      Array.isArray(props.attr?.crossLinking) &&
      props.attr?.crossLinking?.length > 0 &&
      props.attr.crossLinking.filter((link) => isLinkFilterableByEntityType(cellEntityType, link))) ||
    [];
  const showAppliedFormat = applyFormat(displayValue, props.attr) ?? '';
  const showAppliedTruncated = shouldTruncateText(showAppliedFormat);
  const { results, resultsElement } = labelResults({
    changeDirections: props.attr?.aggregationMetadata?.changeDirections,
    format,
    formatType: props.attr?.formatType,
    results: showAppliedFormat,
    transformation: props.attr?.aggregation,
    hasDisplayMedia: props.hasDisplayMedia,
  });
  const isNumericType = isAttributeNumericType(props.attr);
  const textClasses = {
    'truncate-text': showAppliedTruncated,
    'text-align-right': isNumericType,
    'text-align-left': !isNumericType,
  };
  const tooltipTitle = showAppliedTruncated ? results : '';

  function onCellClick(e) {
    if (validCrosslinks.length === 1 && !props.attr?.isFilterable?.in) {
      const [onlyValidLink] = validCrosslinks;
      crosslink(onlyValidLink.slug, cell, props.attr);
    } else {
      handleClick(e);
    }
  }

  return (
    <>
      {validCrosslinks.length > 0 || props.attr?.isFilterable?.in ? (
        <BootstrapTooltip placement="top" title={tooltipTitle}>
          <div className={classNames('context-menu-button', textClasses)}>
            <span className="cell" onClick={onCellClick}>
              {resultsElement}
            </span>
          </div>
        </BootstrapTooltip>
      ) : (
        <BootstrapTooltip placement="top" title={tooltipTitle}>
          <div className={classNames('context-menu-only-text', textClasses)}>
            <span className="cell">{resultsElement}</span>
          </div>
        </BootstrapTooltip>
      )}
      {Boolean(anchorEl) && (
        <ContextMenu attr={props.attr} cell={cell} handleClose={handleClose} anchorEl={anchorEl} />
      )}
    </>
  );
}

//#region Private Members

function applyFormat(value: any, attr: Attribute): any {
  const type = attr?.deepDataType;
  if (type === 'boolean') return value ? 'True' : 'False';
  if (React.isValidElement(value)) return value; // FIXME: Please consider this comment: https://github.com/KLEEEN-SOFTWARE/kapitan/pull/1800/files?file-filters%5B%5D=.tsx#r600664986
  if (typeof value === 'object') return value.displayValue;

  return value;
}

function shouldTruncateText(text = ''): boolean {
  return text ? text.toString().trim().length > MAX_TEXT_LENGTH : false;
}

function labelResults({
  changeDirections,
  format,
  formatType,
  results,
  transformation,
  hasDisplayMedia,
}: LabelResultsProps): LabelResultsReturnProps {
  const labelReturn: LabelResultsReturnProps = {
    results,
    resultsElement: (
      <TextFormatter
        format={format}
        transformation={transformation || 'selfSingle'}
        formatType={formatType}
        textAlignment="flex-end"
        hasDisplayMedia={hasDisplayMedia}
      >
        {results}
      </TextFormatter>
    ),
  };

  if (transformation == 'change') {
    labelReturn.results = Math.abs(results as number);
    labelReturn.resultsElement = (
      <ArrowPoint
        changeDirections={changeDirections}
        result={results as number}
        className="context-cell-arrow"
      />
    );
  }

  return labelReturn;
}

//#endregion
