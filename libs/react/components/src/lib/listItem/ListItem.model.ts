import { Attribute, DataListItem, DataListMetaData } from '@kleeen/types';

export interface ListItemProps {
  columns: Attribute[];
  item?: DataListItem;
  metadata?: DataListMetaData;
}
