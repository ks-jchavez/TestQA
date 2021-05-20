import './CardTitle.scss';

import { CardTitleProps } from '../CardWidget.model';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from 'react';

export const CardTitle = ({ title, icon }: CardTitleProps): JSX.Element =>
  typeof title === 'string' ? (
    <div className="cardTitle">
      <h3 className="title">{title}</h3>
      {icon && <MoreHorizIcon className="icon" />}
    </div>
  ) : (
    title
  );
