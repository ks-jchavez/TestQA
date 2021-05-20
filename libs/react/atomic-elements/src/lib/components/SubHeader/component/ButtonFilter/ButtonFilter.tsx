import './ButtonFilter.scss';

import {
  Filter,
  FilterOption,
  FilterSectionEnum,
  Operator,
  Params,
} from '../../../FilterSection/FilterSection.model';
import { useFilterContext, useFilters } from '@kleeen/react/hooks';

import { ButtonFilterProps } from './ButtonFilter.model';
import { ButtonSubHeader } from '../ButtonHeader/ButtonSubHeader';
import { ContainerHeader } from '../ContainerHeader/ContainerHeader';
import FilterCreatorWithChips from '../../../FilterSection/components/FilterCreatorWithChips';
import React from 'react';
import { Tooltip } from '../../../FilterSection/FilterSection.styles';
import { filterTooltipFunc } from '../../../FilterSection/components/FilterTooltip';
import { isNil } from 'ramda';

const parseToFilterOptions = (options: string[]): FilterOption[] =>
  options.map((option) => ({
    name: option,
    section: FilterSectionEnum.Values,
    operator: Operator.in,
  }));

export const ButtonFilter = ({
  outContainer,
  filters: filtersProps,
  taskName,
  translate,
}: ButtonFilterProps): React.ReactElement => {
  const [isShow, setIsShow] = React.useState(false);

  const {
    handleFilterWithoutTimestamp,
    removeValue,
    addFilter,
    removeCategory,
    paramsBasedOnRoute,
    isApplyWithoutTimeDisabled,
    filtersAdded,
    clearFilters,
    setIsApplyWithoutTime,
  } = useFilters();

  const [filtersAddedClone, setFiltersAddedClone] = React.useState(filtersAdded);
  const [paramsBasedOnRouteClone, setParamsBasedOnRouteClone] = React.useState(paramsBasedOnRoute);
  const handleFilterWithoutTimestampClone = (): void => {
    handleFilterWithoutTimestamp();
    setParamsBasedOnRouteClone(filtersAddedClone);
  };

  React.useEffect(() => {
    setFiltersAddedClone(filtersAdded);
    if (!isNil(filtersAddedClone?.Timestamp)) {
      delete filtersAddedClone.Timestamp;
    }
  }, [filtersAdded]);

  React.useEffect(() => {
    if (!isNil(paramsBasedOnRouteClone?.Timestamp)) {
      delete paramsBasedOnRouteClone.Timestamp;
    }
  }, [paramsBasedOnRouteClone]);

  const availableAttributesToFilter = filtersProps || [];
  const filterSummary = filterTooltipFunc(paramsBasedOnRouteClone, translate);

  const categoryFilterOptions = availableAttributesToFilter.map(({ name, statisticalType }) => ({
    name,
    section: FilterSectionEnum.FilterBy,
    statisticalType,
  }));

  const params: Params = {
    baseModel: 'filters',
    attributes: availableAttributesToFilter.map(({ name }) => name).join(),
    operationName: 'filters',
  };
  const widgetData = useFilterContext({ taskName, widgetId: 'filters', params });
  const { results: filters }: Filter = (widgetData && widgetData.data) || {};
  const filterOptionsByCategory = filters
    ? filters.reduce(
        (acc, [filterName, options]) => ((acc[filterName] = parseToFilterOptions(options)), acc),
        {},
      )
    : {};

  const onClearFilters = (e): void => {
    clearFilters();
    Object.keys(filtersAdded).map((key) => {
      removeCategory(key);
    });
    handleFilterWithoutTimestampClone();
  };

  return (
    <>
      <Tooltip
        title={filterSummary.title}
        PopperProps={filterSummary.PopperProps}
        placement="right"
        interactive
      >
        <div className="button-tooltip">
          <ButtonSubHeader
            icon="ks-filter"
            className="element-button-filter"
            name={translate('app.subHeader.buttonFilter.appliedFilters')}
            countElement={filterSummary.badgeContent}
            setIsShow={setIsShow}
            translate={translate}
            isShow={isShow}
          />
        </div>
      </Tooltip>
      <ContainerHeader
        className="button-container-filter-actions"
        filtersAdded={filtersAddedClone}
        isApplyDisabled={isApplyWithoutTimeDisabled}
        isShow={isShow}
        onClearFilters={onClearFilters}
        onFilter={handleFilterWithoutTimestampClone}
        outContainer={outContainer}
        setIsShow={setIsShow}
        translate={translate}
        container={
          <FilterCreatorWithChips
            categoryFilterOptions={categoryFilterOptions}
            filterOptionsByCategory={filterOptionsByCategory}
            addFilter={addFilter}
            filtersAdded={filtersAddedClone}
            setIsApplyDisabled={setIsApplyWithoutTime}
            removeValue={removeValue}
            removeCategory={removeCategory}
          />
        }
      />
    </>
  );
};
