import { AggregationType, Cell } from '@kleeen/types';
import { CellInputProps } from './CellInput.model';
import { KsAutocomplete } from '../../autocomplete';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import TextFormatter from '../../textFormatter/TextFormatter';

const FreeFormCellInput = ({
  amendCellUpdate,
  attr,
  autocomplete,
  cell,
  editingCell,
  setEditingCell,
}: CellInputProps) => {
  let changed = false;
  const singleValueCell = cell as Cell;
  return (
    <KsAutocomplete
      loading={autocomplete.isLoading}
      blurOnSelect
      openOnFocus
      freeSolo
      options={autocomplete.data}
      renderOption={(option) => (
        <TextFormatter
          format={attr.format}
          formatType={attr.formatType}
          transformation={AggregationType.SelfSingle}
        >
          {option.displayValue}
        </TextFormatter>
      )}
      getOptionLabel={({ displayValue }) => (displayValue ? String(displayValue) : '')}
      getOptionSelected={(option, value) => option.displayValue === value || option.id === value}
      onInputChange={(_, value, signal) => {
        if (signal === 'clear' || (signal === 'input' && value === '')) {
          setEditingCell({ ...editingCell, temporaryValue: '' });
        } else if (value) {
          setEditingCell({ ...editingCell, temporaryValue: value });
        }
      }}
      value={String(singleValueCell?.displayValue) || ''}
      inputValue={editingCell.temporaryValue}
      onChange={(e, option) => {
        if (option) {
          amendCellUpdate({
            attributeName: editingCell.attributeName,
            rowId: editingCell.rowId,
            value: option,
          });
          changed = true;
        }
      }}
      onBlur={(e) => {
        // TODO @cafe how do we prevent this event from triggering (on the same render cycle)
        // if the onChange was triggered.
        if (!changed) {
          amendCellUpdate({
            attributeName: editingCell.attributeName,
            rowId: editingCell.rowId,
            value: { displayValue: editingCell.temporaryValue },
          });
        }
        setEditingCell({});
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{ ...params.InputProps, disableUnderline: true, autoFocus: true }}
        />
      )}
    />
  );
};

export default FreeFormCellInput;
