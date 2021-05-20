import React, { ReactElement } from 'react';

import { ContextCell } from '../contextCell';
import { DataListItem } from '@kleeen/types';
import { ListItemProps } from './ListItem.model';
import { useStyles } from './listItem.style';

export function ListItem({ item, columns }: ListItemProps): ReactElement {
  const classes = useStyles();
  const getKey = (dataItem: DataListItem, columnName: string): string =>
    `${dataItem[columnName]?.id} ${dataItem[columnName]?.displayValue}`;

  return (
    <li className={classes.item}>
      {columns.map((column) => {
        return (
          <div key={getKey(item, column?.name)} className={classes.cell}>
            <ContextCell attr={column} cell={item[column.name]} format={column.format} />
          </div>
        );
      })}
    </li>
  );
}
