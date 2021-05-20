import React, { ReactElement } from 'react';

import { ListHeader } from './ListHeader';
import { ListProps } from './List.model';
import { isEmpty } from 'ramda';
import { styleList } from './list.style';

function categoricalSort(a: string, b: string): number {
  return a.localeCompare(b);
}

function numericalSort(a: number, b: number): number {
  return b - a;
}

const sortByType: { [key in 'string' | 'number']: (a: any, b: any) => number } = {
  string: categoricalSort,
  number: numericalSort,
};

export function List({
  columns,
  data,
  hideHeader,
  sortBy,
  ListItemComponent,
  ListItemProps,
}: ListProps): ReactElement {
  const classesStyleList = styleList();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchKey, setSearchKey] = React.useState('');
  let [sortedData, setSearchResults] = React.useState(data);

  React.useEffect(() => {
    renderData(searchTerm);
  }, [searchTerm]);

  function renderData(searchTerm) {
    let results = sortBy
      ? data.sort(function (a, b) {
          const aValue = a[sortBy].displayValue;
          const bValue = b[sortBy].displayValue;
          return sortByType[typeof aValue](aValue, bValue);
        })
      : data;
    if (searchTerm) {
      results = results.filter((dataPoint) => {
        return String(dataPoint[searchKey]?.displayValue).toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    setSearchResults(results);
  }
  if (isEmpty(sortedData) && !searchTerm) sortedData = data;

  return (
    <ul className={classesStyleList.list}>
      {!hideHeader ? (
        <ListHeader columns={columns} setSearchTerm={setSearchTerm} setSearchKey={setSearchKey}></ListHeader>
      ) : (
        ''
      )}
      {sortedData.map((dataPoint, i) => (
        <ListItemComponent key={i} {...ListItemProps} item={dataPoint} />
      ))}
    </ul>
  );
}
