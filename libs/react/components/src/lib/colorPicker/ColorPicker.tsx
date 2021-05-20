import './ColorPicker.scss';

import { IColorPickerProps } from './ColorPicker.model';
import { KUIConnect } from '@kleeen/core-react';
import React from 'react';
import { TextFieldColorPicker } from './components/';
import { pathOr } from 'ramda';

function ColorPickerBase({ translate, ...props }: IColorPickerProps): JSX.Element {
  const onChangeHandler = pathOr(
    () => {
      return;
    },
    ['handleOnChange'],
    props,
  );
  return (
    <div className="colorpicker-container">
      <TextFieldColorPicker {...props} handleOnChange={onChangeHandler}/>
    </div>
  );
}

export const ColorPicker = React.memo(KUIConnect(({ translate }) => ({ translate }))(ColorPickerBase));
