import { Attribute, DataListItem, DataListMetaData } from '@kleeen/types';

import { ListProps } from '../list/List.model';

export interface SimpleListProps {
  columns: Attribute[];
  data: DataListItem[];
  hideHeader?: boolean;
  listOptions?: Partial<ListProps>;
  metadata?: DataListMetaData;
}
