import React, { ReactElement } from 'react';

import { List } from '../list';
import { ListItem } from '../listItem';
import { SimpleListProps } from './SimpleList.model';
import { useStyles } from './SimpleList.style';

export function SimpleList({
  data,
  columns,
  hideHeader,
  listOptions,
  metadata,
}: SimpleListProps): ReactElement {
  const classes = useStyles();

  return (
    <List
      columns={columns}
      data={data}
      hideHeader={hideHeader}
      sortBy={columns[0]?.name}
      ListItemComponent={ListItem}
      ListItemProps={{ columns, metadata }}
      {...listOptions}
    ></List>
  );
}
