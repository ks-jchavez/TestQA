import { ListingModalProps, ListingModalSettings } from './ListingModal.model';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { listingModalStyles as KsDialog } from './ListingModal.style';
import { Icon as KsIcon } from '../Icon';
import { Loader } from '../Loader/Loader';
import React from 'react';
import { SimpleList } from '../simpleList/';
import { iconStyles } from './ListingModal.style';
import { parseAttributes } from '@kleeen/frontend/utils';
import { useTheme } from '@kleeen/react/hooks';

function ListingModal({
  attribute,
  columnLabel,
  data,
  format,
  isOpen,
  onClose,
  rowDisplayValue,
}: ListingModalProps): JSX.Element {
  const { themeClass } = useTheme();
  const iconClasses = iconStyles();

  function CloseButton(): JSX.Element {
    return (
      <div className={iconClasses.iconFilter} onClick={handleClose}>
        <div className={iconClasses.iconWrapper}>
          <KsIcon icon="ks-close" />
        </div>
      </div>
    );
  }

  function handleClose(): void {
    onClose();
  }

  const parsedAttributes = parseAttributes([attribute], format);
  const parsedData = data.map((item) => ({ [attribute.name]: item }));

  return (
    <KsDialog aria-labelledby="form-dialog-title" className={themeClass} onClose={handleClose} open={isOpen}>
      <DialogTitle id="form-dialog-title">
        {`${rowDisplayValue} - | ${columnLabel}`}
        <CloseButton />
      </DialogTitle>
      <DialogContent>
        {parsedData ? <SimpleList data={parsedData} columns={parsedAttributes}></SimpleList> : <Loader />}
      </DialogContent>
    </KsDialog>
  );
}

export { ListingModal, ListingModalSettings, ListingModalProps };
