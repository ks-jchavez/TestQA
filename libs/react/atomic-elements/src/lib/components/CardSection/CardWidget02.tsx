import './CardSection02.scss';

import { CardTitle } from './components/CardTitle';
import { CardWidgetProps } from './CardWidget.model';
import React from 'react';
import classnames from 'classnames';

export const CardWidget02 = ({
  children,
  hideTitle,
  icon,
  title,
  widgetSelector = null,
  disabled,
}: CardWidgetProps): JSX.Element => {

  return (
    <div className={classnames('card-widget', { 'disabled': disabled })}>
      {!hideTitle && <CardTitle title={title} icon={icon} />}
      <div className="content">
        {children}
        {widgetSelector}
      </div>
    </div>
  );
};
export default CardWidget02;
