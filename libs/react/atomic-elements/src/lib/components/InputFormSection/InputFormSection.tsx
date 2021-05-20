import './InputFormSection.scss';

import React, { ReactElement, useState } from 'react';

import { StatisticalType } from '@kleeen/render-utils';
import { TransformToElement } from '../Widgets/ConfigInputWidget/components/transform-to-element';
interface InputFormSectionProps {
  inputValue?: any;
  setInputValue?: any;
  autoCompleteValues?: any;
  icon?: JSX.Element;
  name?: string;
  connector?: string;
  defaultValue?: any;
  inputRef?: any;
  isTextField?: boolean;
  setSelectedOption?;
  placeholder?;
  errors?: any;
  setValue?: any;
  value?: any;
  helpText?: string;
  component?: any;
}

export const InputFormSection = ({ ...props }: InputFormSectionProps): ReactElement => {
  const {
    autoCompleteValues,
    setSelectedOption,
    isTextField,
    icon,
    name,
    connector,
    defaultValue,
    inputRef,
    placeholder,
    errors,
    setValue,
    value,
    helpText,
    component,
  } = props;
  const [inputValue, setInputValue] = useState(defaultValue ? defaultValue.displayValue : '');
  const onSetInputValue = (event) => {
    setValue ? setValue(event) : setInputValue(event);
  };

  return (
    <div className="input-form-section">
      <div className="input-form-section-label">
        <div className="icon-container">{icon}</div>
        <div className="name-container">{name}</div>
        <div className="connector-container">{connector}</div>
      </div>
      <div className={isTextField ? `input-form-section-input input-field` : `input-form-section-input`}>
        {component ? (
          component
        ) : (
          <TransformToElement
            attrLabel={placeholder}
            autoCompleteValues={autoCompleteValues}
            canAddValues={isTextField}
            disabled={false}
            elementToUse="Field Can Add Values and Not Have Many"
            format={{}}
            formatType={''}
            inputValue={value ? value : inputValue}
            setInputValue={onSetInputValue}
            setSelectedOption={setSelectedOption}
            statisticalType={StatisticalType.Data}
            hideTitle={false}
            inSummaryDetails={false}
            refValue={inputRef}
            errors={errors}
            helpText={helpText}
          />
        )}
      </div>
    </div>
  );
};

export default InputFormSection;
