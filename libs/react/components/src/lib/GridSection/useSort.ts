import React from 'react';
import { Order } from './stableSort';

const getNextSortDirection = (order: Order): Order => {
  if (order === Order.none) return Order.asc;

  return order === Order.asc ? Order.desc : Order.none;
};

const useSort = (): [{ order: Order; orderBy: string }, (name: string) => void] => {
  const [order, setSort] = React.useState<Order>(Order.asc);
  const [orderBy, setOrderBy] = React.useState('');

  const onSort = (name: string): void => {
    const newSortDirection = getNextSortDirection(order);

    if (newSortDirection === Order.none) {
      setSort(Order.none);
      setOrderBy('');
      return;
    }

    setSort(newSortDirection);
    setOrderBy(name);
  };

  return [{ order, orderBy }, onSort];
};

export default useSort;
