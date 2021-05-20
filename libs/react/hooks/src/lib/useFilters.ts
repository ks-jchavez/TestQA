import { IntervalDate, TimestampKey } from '@kleeen/types';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';

import queryString from 'query-string';
import { useHistory } from 'react-router';
import useUrlQueryParams from './useUrlQueryParams';

enum Operator {
  max = 'max',
  min = 'min',
  in = '_in',
}

interface FilterAdded {
  [Operator.in]?: Array<string | number>;
  [Operator.min]?: number;
  [Operator.max]?: number;
}

interface FiltersAddedState {
  [category: string]: FilterAdded;
}

const getFromValueOf = (paramsBasedOnRoute): undefined | Moment => {
  return paramsBasedOnRoute?.Timestamp?.from ? moment(paramsBasedOnRoute?.Timestamp?.from) : undefined;
};

const getToValueOf = (paramsBasedOnRoute): undefined | Moment => {
  return paramsBasedOnRoute?.Timestamp?.to ? moment(paramsBasedOnRoute?.Timestamp?.to) : undefined;
};

const getRelativeDateValueOf = (paramsBasedOnRoute): undefined | string => {
  return paramsBasedOnRoute?.Timestamp?.relativeDate;
};

export const useFilters = (hasDateFilter = false) => {
  const { paramsBasedOnRoute } = useUrlQueryParams({ useNestedObjects: true });
  const [isApplyDisabled, setIsApplyDisabled] = useState(true);
  const [isApplyWithoutTimeDisabled, setIsApplyWithoutTime] = useState(true);
  const [isTimeApplyDisabled, setIsTimeApplyDisabled] = useState(true);
  const [from, setStateFrom] = useState<Moment>(() => getFromValueOf(paramsBasedOnRoute));
  const [to, setStateTo] = useState<Moment>(() => getToValueOf(paramsBasedOnRoute));
  const [relativeDate, setRelativeDate] = useState<string>(() => getRelativeDateValueOf(paramsBasedOnRoute));

  const setFrom = (date: Moment): void => {
    setStateFrom(date);
    if (date) setRelativeDate(undefined);
  };

  const setTo = (date: Moment): void => {
    setStateTo(date);
    if (date) setRelativeDate(undefined);
  };

  const datePickerState = { from, setFrom, to, setTo, relativeDate, setRelativeDate };

  useEffect(() => {
    const fromMs = from?.valueOf();
    const urlFromMs = getFromValueOf(paramsBasedOnRoute)?.valueOf();
    const toMs = to?.valueOf();
    const urlToMs = getToValueOf(paramsBasedOnRoute)?.valueOf();
    const relativeDateMs = relativeDate;
    const urlRelativeDateMs = getRelativeDateValueOf(paramsBasedOnRoute);

    if (urlFromMs !== fromMs || urlToMs !== toMs || urlRelativeDateMs !== relativeDateMs) {
      setIsApplyDisabled(false);
      setIsTimeApplyDisabled(false);
    }
  }, [to, from, relativeDate]);

  useEffect(() => {
    if (Object.entries(paramsBasedOnRoute).length === 0 && isApplyDisabled && !from && !to && !relativeDate) {
      setIsApplyDisabled(true);
      setIsApplyWithoutTime(true);
    }
  }, [paramsBasedOnRoute, isApplyDisabled]);

  const [filtersAdded, setFilters]: [FiltersAddedState, (filtersAdded: FiltersAddedState) => void] = useState(
    () => {
      let initialState = {};
      Object.keys(paramsBasedOnRoute).forEach((key) => {
        initialState = {
          ...initialState,
          [key]: paramsBasedOnRoute[key],
        };
      });
      return initialState;
    },
  );
  const navigation = useHistory();

  const clearFilters = () => {
    setFilters({});
  };

  const getTimeAndCommonFilters = (): {
    timeFilters: { Timestamp: { from?: number; to?: number; relativeDate?: string } };
    parsedFilters: FiltersAddedState;
  } => {
    const Timestamp: { from?: number; to?: number; relativeDate?: string } = {};
    if (hasDateFilter && (from || to || relativeDate)) {
      if (from) Timestamp.from = moment.utc(from).valueOf();
      if (to) Timestamp.to = moment.utc(to).valueOf();
      if (relativeDate) Timestamp.relativeDate = relativeDate;
    }
    const timeFilters =
      hasDateFilter && Object.keys(Timestamp).length ? { Timestamp } : { Timestamp: undefined };

    if (hasDateFilter && !Object.keys(Timestamp).length) {
      timeFilters.Timestamp = { relativeDate: IntervalDate.allTime };
      setRelativeDate(IntervalDate.allTime);
    }

    const regExp = new RegExp(`${TimestampKey.key}`, 'gi');
    const parsedFilters = JSON.parse(JSON.stringify(filtersAdded).replace(regExp, ''));

    return { timeFilters, parsedFilters };
  };

  const applyFilterIntoUrl = (filtersToApply: Record<string, any>): void => {
    const mapWithStringify = Object.keys(filtersToApply).reduce(
      (acc, key) => ({
        ...acc,
        [key]: JSON.stringify(filtersToApply[key]),
      }),
      {},
    );
    const urlQuery = queryString.stringify(mapWithStringify);
    navigation.push(`?${urlQuery}`);
  };

  const handleFilterWithoutTimestamp = () => {
    const { parsedFilters } = getTimeAndCommonFilters();
    const { Timestamp } = paramsBasedOnRoute;
    const possibleUrlTimestamp = Timestamp ? { Timestamp } : {};
    applyFilterIntoUrl({ ...possibleUrlTimestamp, ...parsedFilters });
    setIsApplyWithoutTime(true);
  };

  const handleTimestampFilter = () => {
    const { timeFilters } = getTimeAndCommonFilters();
    applyFilterIntoUrl({ ...paramsBasedOnRoute, ...timeFilters });
    setIsTimeApplyDisabled(true);
  };

  const handleFilter = (): void => {
    const { timeFilters, parsedFilters } = getTimeAndCommonFilters();

    const filtersToApply = {
      ...parsedFilters,
      ...timeFilters,
    };

    applyFilterIntoUrl(filtersToApply);
    setIsApplyDisabled(true);
  };

  useEffect(() => {
    const urlFromMs = getFromValueOf(paramsBasedOnRoute)?.valueOf();
    const urlToMs = getToValueOf(paramsBasedOnRoute)?.valueOf();
    const urlRelativeDateMs = getRelativeDateValueOf(paramsBasedOnRoute);
    if (!urlFromMs && !urlToMs && !urlRelativeDateMs && hasDateFilter) {
      handleFilter();
    }
  });

  const manageOperations = (operator: Operator, value: string | number, operators): any => {
    if (Array.isArray(operators) || operator === Operator.in) {
      return [...(operators || []), value];
    }
    return value;
  };

  const addFilter = (category: string, operator: Operator, value: string | number): void => {
    const newCategory = filtersAdded[category] || {};
    const newOperator = manageOperations(operator, value, newCategory[operator]);
    setFilters({
      ...filtersAdded,
      [category]: { ...newCategory, [operator]: newOperator },
    });
    setIsApplyDisabled(false);
    setIsApplyWithoutTime(false);
  };

  const removeCategory = (category: string): void => {
    delete filtersAdded[category];
    setFilters({
      ...filtersAdded,
    });
    setIsApplyDisabled(false);
    setIsApplyWithoutTime(false);
  };

  const removeValue = (category: string, name: string, operator: Operator): void => {
    const newCategory = { ...filtersAdded[category] };
    if (operator === Operator.in) {
      // TODO: should check if is the last item of a category remove also the category
      const currentOperatorValues = newCategory[operator] || [];
      const newOperatorValues = currentOperatorValues.filter((value) => name !== value);
      newCategory[operator] = newOperatorValues;

      if (newOperatorValues.length === 0) {
        delete newCategory[operator];
      }
    } else if (operator === Operator.max || operator === Operator.min) {
      delete newCategory[operator];
    }

    if (Object.keys(newCategory).length === 0) {
      removeCategory(category);
    } else {
      setFilters({
        ...filtersAdded,
        [category]: newCategory,
      });
    }

    setIsApplyDisabled(false);
    setIsApplyWithoutTime(false);
  };

  return {
    handleFilter,
    removeValue,
    addFilter,
    removeCategory,
    paramsBasedOnRoute,
    isApplyDisabled,
    filtersAdded,
    setIsApplyDisabled,
    clearFilters,
    datePickerState,
    handleFilterWithoutTimestamp,
    handleTimestampFilter,
    isTimeApplyDisabled,
    isApplyWithoutTimeDisabled,
    setIsApplyWithoutTime,
  };
};
