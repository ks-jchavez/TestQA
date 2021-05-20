import './ButtonSelect.scss';

import React, { useState } from 'react';

import { ButtonSelectProps } from './ButtonSelect.model';
import { ButtonSubHeader } from '../ButtonHeader/ButtonSubHeader';
import { SelectList } from '../../../SelectList/SelectList';
import classNames from 'classnames';

const defaultIconKey = 'Apps';
export const ButtonSelect = ({
  viewOptions,
  handleChangeTab,
  value,
  translate,
  taskName,
}: ButtonSelectProps): React.ReactElement | null => {
  const [iconView, setIconView] = useState(viewOptions[value]?.viewId || defaultIconKey);
  const options = viewOptions.map(({ name }, index) => ({ label: name, value: index }));
  const navigation = viewOptions[value]?.name;
  const hasViewSwitch = options?.length > 1;
  const viewSwitchText = hasViewSwitch ? 'View switch' : undefined;

  if (!navigation) return null;

  const handleOnChangeOverride = (optionValue) => {
    if (viewOptions[optionValue]?.viewId) setIconView(viewOptions[optionValue]?.viewId || defaultIconKey);
    handleChangeTab(optionValue);
  };

  return (
    <ButtonSubHeader
      icon={iconView}
      className={classNames('element-button-select', { 'has-view-switch': hasViewSwitch })}
      name={navigation}
      subName={viewSwitchText}
      translate={translate}
      isDisabled={!hasViewSwitch}
    >
      <SelectList onChange={handleOnChangeOverride} options={options} value={value} taskName={taskName} />
      {hasViewSwitch && (
        <div className="icon-outlined">
          <svg className="MuiSvgIcon-root element-select-arrow">
            <path d="M7 10l5 5 5-5z"></path>
          </svg>
        </div>
      )}
    </ButtonSubHeader>
  );
};
