import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { Localization } from './GridSection.model';
import './ToolBarForm.scss';
interface ToolBarFormProps {
  localization: Localization;
  handleChange: Function;
  widgetId: string | number;
}

const SearchContainer = (props: ToolBarFormProps) => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const {
    localization: { searchTooltip, clearSearchAriaLabel, searchPlaceholder },
    handleChange,
  } = props;
  return (
    <TextField
      placeholder={searchPlaceholder}
      value={searchInputValue}
      onChange={(e) => {
        const { value } = e.target;
        setSearchInputValue(value);
        handleChange('all', value);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Tooltip title={searchTooltip} onClick={() => setSearchInputValue('')}>
              <SearchIcon fontSize="small" />
            </Tooltip>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setSearchInputValue('');
                handleChange('all', '');
              }}
              aria-label={clearSearchAriaLabel}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
const ToolBarForm = (props: ToolBarFormProps) => {
  const {
    localization = {
      searchPlaceholder: '',
      searchTooltip: '',
      clearSearchAriaLabel: '',
      addButtonAriaLabel: '',
      actionsTableHeaderRow: '',
      editButtonAriaLabel: '',
      deleteButtonAriaLabel: '',
      confirmArialLabel: '',
      rejectAriaLabel: '',
      confirmDeleteLabel: '',
    },
    widgetId,
    handleChange,
  } = props;
  return (
    <Toolbar id={`search-form-container_${widgetId}`} className="search-form-container">
      <SearchContainer handleChange={handleChange} localization={localization} widgetId={widgetId} />
    </Toolbar>
  );
};

export default ToolBarForm;
