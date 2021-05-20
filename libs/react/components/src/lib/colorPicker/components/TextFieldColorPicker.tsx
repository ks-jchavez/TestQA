import 'react-colorful/dist/index.css';

import { IColorPickerProps, IVariant } from '../ColorPicker.model';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { darkenColor, exportColorToHex, isValidColor, useClickOutside } from '@kleeen/frontend/utils';
import { path, pathOr } from 'ramda';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { HexColorPicker } from 'react-colorful';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputProps } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getThemeColor } from './TextFieldColorPicker.utils';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './TextFieldColorPicker.styles';
import { GenericFunction } from '@kleeen/types';

export function TextFieldColorPicker(props: IColorPickerProps): JSX.Element {
  const defaultColor = getThemeColor();
  const defaultValue = String(path(['defaultValue'], props));

  const isDisabled: boolean = pathOr(false, ['disabled'], props);
  const variant: IVariant = pathOr(isDisabled ? 'standard' : 'outlined', ['variant'], props);
  const onChangeHandler: GenericFunction = pathOr<GenericFunction>(
    () => {
      return;
    },
    ['handleOnChange'],
    props,
  );

  const textareaLabel: string = pathOr('', ['label'], props);
  const [currentColor, setValue] = React.useState(
    !isNilOrEmpty(defaultValue) && isValidColor(defaultValue) ? exportColorToHex(defaultValue) : defaultColor,
  );
  useEffect(() => {
    if (defaultValue && currentColor === defaultColor && currentColor !== defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue, currentColor]);
  const [isColorPicker, toggleColorPicker] = useState(false);
  const [focusClass, setFocusClass] = React.useState('');

  const classes = useStyles();
  const colorPickerPopOver = useRef();

  const close = useCallback(() => {
    toggleColorPicker(false);
    setFocusClass('');
  }, []);
  useClickOutside(colorPickerPopOver, close);

  const handleColorChange = (value: string): void => {
    if (!isNilOrEmpty(value)) {
      onChangeHandler(value);
      setValue(value);
    }
  };

  const inputProps: InputProps = {
    disableUnderline: isDisabled,
    startAdornment: (
      <InputAdornment position="start">
        <div className="picker">
          <div
            className="preview-color"
            style={{ backgroundColor: currentColor, borderColor: darkenColor(currentColor, 50) }}
          ></div>
          {isColorPicker && (
            <div className="popover" ref={colorPickerPopOver}>
              <HexColorPicker color={currentColor} onChange={handleColorChange} />
            </div>
          )}
        </div>
      </InputAdornment>
    ),
  };

  if (!isDisabled) {
    inputProps.endAdornment = (
      <InputAdornment position="end">
        <ArrowDropDownIcon />
      </InputAdornment>
    );
  }

  return (
    <TextField
      label={textareaLabel}
      placeholder={textareaLabel}
      value={currentColor}
      disabled={isDisabled}
      className={`${classes.root} color-picker-component ${focusClass} ${isDisabled ? 'is-disabled' : ''}`}
      fullWidth={true}
      variant={variant}
      onClick={() => {
        if (!isDisabled) {
          toggleColorPicker(true);
          setFocusClass('focused');
        }
      }}
      InputProps={inputProps}
    />
  );
}
