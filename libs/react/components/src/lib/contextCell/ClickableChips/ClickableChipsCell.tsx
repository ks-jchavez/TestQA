import './ClickableChipsCell.scss';

import { Attribute, Cell, FormatProps } from '@kleeen/types';
import { ClickableChipsCellProps, PreviewChipsProps } from './clickable-chips-cell.model';

import { BootstrapTooltip } from '../bootstrap-tooltip';
import { KUIConnect } from '@kleeen/core-react';
import { useCrosslinking } from '@kleeen/react/hooks';
import { isLinkFilterableByEntityType } from '../../contextMenu/ContextMenu';
import { KsChip } from '../../chip';
import React from 'react';
import TextFormatter from '../../textFormatter/TextFormatter';
import { isNil } from 'ramda';

const generateFormattedElements = ({
  label,
  attribute,
  format,
}: {
  format: FormatProps;
  attribute: Attribute;
  label: string | number;
}) => {
  return (
    <span>
      <TextFormatter
        format={format}
        transformation={attribute?.aggregation || 'selfSingle'}
        formatType={attribute?.formatType}
      >
        {label}
      </TextFormatter>
    </span>
  );
};

const PreviewChips = ({ items, attribute, format, translate, crossLink }: PreviewChipsProps) => {
  return (
    <div className="chips-container">
      {items.length ? (
        items.map((label, i) => {
          if (isNil(label)) return;
          const FormattedElements = generateFormattedElements({
            label: label.displayValue as string,
            attribute,
            format,
          });
          return (
            label && (
              <BootstrapTooltip key={i} placement="top" title={FormattedElements}>
                <KsChip
                  label={FormattedElements}
                  className={crossLink.hasCrossLink && 'clickable'}
                  onClick={
                    crossLink.onClick
                      ? () => {
                          crossLink.onClick(label);
                        }
                      : () => null
                  }
                />
              </BootstrapTooltip>
            )
          );
        })
      ) : (
        <span className="no-chips-label">{`${translate('app.no')} ${attribute?.name}`}</span>
      )}
    </div>
  );
};

const ClickableChipsCellBase = ({
  cellItems,
  format,
  attribute,
  columnLabel,
  rowDisplayValue,
  openShowMoreModal,
  translate,
  cellEntityType,
  isIdTemporary,
}: ClickableChipsCellProps) => {
  const { crosslink } = useCrosslinking();
  const validCrosslinks =
    (!isIdTemporary &&
      Array.isArray(attribute?.crossLinking) &&
      attribute?.crossLinking?.length > 0 &&
      attribute.crossLinking.filter((link) => isLinkFilterableByEntityType(cellEntityType, link))) ||
    [];
  function onCrosslinkClick(item) {
    if (validCrosslinks.length === 1 && !attribute?.isFilterable?.in) {
      const [onlyValidLink] = validCrosslinks;
      crosslink(onlyValidLink.slug, item, attribute);
    }
  }
  const cellItemsArray = cellItems as Cell[];
  const [firstPreviewItem, secondPreviewItem] = cellItemsArray;
  const onClick = () => {
    openShowMoreModal({
      format,
      attribute,
      data: cellItemsArray,
      columnLabel,
      rowDisplayValue,
      isOpen: true,
    });
  };

  const chips = [];
  if (firstPreviewItem) {
    chips.push(firstPreviewItem);
  }
  if (secondPreviewItem) {
    chips.push(secondPreviewItem);
  }
  const shouldDisplayMoreModal = cellItemsArray.length > 2;
  return (
    <div className="clickable-chips">
      <PreviewChips
        items={chips}
        attribute={attribute}
        format={format}
        translate={translate}
        crossLink={{
          onClick: onCrosslinkClick,
          hasCrossLink: validCrosslinks.length === 1 && !attribute?.isFilterable?.in,
        }}
      />
      {shouldDisplayMoreModal && (
        <div className="show-more-label" onClick={onClick}>
          <div className="numbers-label-container">{cellItemsArray.length}</div>
          <span>{translate('app.total')}</span>
        </div>
      )}
    </div>
  );
};

export const ClickableChipsCell = React.memo(
  KUIConnect(({ translate }) => ({ translate }))(ClickableChipsCellBase),
);
