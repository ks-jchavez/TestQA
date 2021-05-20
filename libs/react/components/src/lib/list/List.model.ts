import { Attribute, DataListItem } from '@kleeen/types';
import { ElementType } from 'react';
import { ListItemProps } from '../listItem';

export interface ListProps {
  columns: Attribute[];
  data: DataListItem[];
  hideHeader?: boolean;
  sortBy?: string;
  ListItemComponent: ElementType;
  ListItemProps?: ListItemProps;
}
