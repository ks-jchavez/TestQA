import './FilterSection.scss';

import { KsButton as Button, KsIcon, KsIconButton } from '@kleeen/react/components';
import {
  Filter,
  FilterOption,
  FilterSectionEnum,
  FilterSectionProps,
  Operator,
  Params,
} from './FilterSection.model';
import { Paper, useStyles } from './FilterSection.styles';
import React, { ReactElement } from 'react';
import { useFilterContext, useFilters } from '@kleeen/react/hooks';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import FilterCreator from './components/FilterCreator';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import FilterTooltip from './components/FilterTooltip';
import FiltersComp from './components/FilterChipsAndCategories';
import Grid from '@material-ui/core/Grid';
import { KUIConnect } from '@kleeen/core-react';
import { Loader } from '@kleeen/react/components';
import MuiTypography from '@material-ui/core/Typography';
import { DatePickerInterval } from '../DatePickerInterval/index';

const parseToFilterOptions = (options: string[]): FilterOption[] =>
  options.map((option) => ({
    name: option,
    section: FilterSectionEnum.Values,
    operator: Operator.in,
  }));

export const FilterSection = (props: FilterSectionProps): ReactElement => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const availableAttributesToFilter = props.filters;
  const categoryFilterOptions: FilterOption[] = availableAttributesToFilter.map(
    ({ name, statisticalType }) => ({
      name,
      section: FilterSectionEnum.FilterBy,
      statisticalType,
    }),
  );

  const params: Params = {
    baseModel: 'filters',
    attributes: availableAttributesToFilter.map(({ name }) => name).join(),
    operationName: 'filters',
  };
  const widgetData = useFilterContext({ taskName: props.taskName, widgetId: 'filters', params });
  const { results: filters }: Filter = (widgetData && widgetData.data) || {};
  const filterOptionsByCategory = filters
    ? filters.reduce(
        (acc, [filterName, options]) => ((acc[filterName] = parseToFilterOptions(options)), acc),
        {},
      )
    : {};

  const handleDrawerOpen = (): void => {
    setOpen(true);
    props.onChangeFilterVisible && props.onChangeFilterVisible(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
    props.onChangeFilterVisible && props.onChangeFilterVisible(false);
  };

  const {
    handleFilter,
    removeValue,
    addFilter,
    removeCategory,
    paramsBasedOnRoute,
    isApplyDisabled,
    filtersAdded,
    setIsApplyDisabled,
    datePickerState,
  } = useFilters(props.hasDateFilter);

  return (
    <>
      {open ? (
        <Paper elevation={3} className="filter-section">
          <div className="filter-container">
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <MuiTypography className="L2TitleSection">FILTERS</MuiTypography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  className="button-widget"
                  onClick={handleFilter}
                  disabled={isApplyDisabled}
                >
                  APPLY
                </Button>
              </Grid>
            </Grid>
            {props.hasDateFilter && (
              <Grid container spacing={0} className="grid-date-filter-container">
                <Grid item xs={12}>
                  <DatePickerInterval datePickerState={datePickerState} />
                </Grid>
              </Grid>
            )}
            {!widgetData || widgetData.isLoading ? (
              <Loader />
            ) : (
              <>
                <FilterCreator
                  categoryFilterOptions={categoryFilterOptions}
                  filterOptionsByCategory={filterOptionsByCategory}
                  addFilter={addFilter}
                  filtersAdded={filtersAdded}
                  setIsApplyDisabled={setIsApplyDisabled}
                />
                <FiltersComp
                  filters={filtersAdded}
                  removeValue={removeValue}
                  removeCategory={removeCategory}
                />
              </>
            )}
          </div>
          <div className={classes.closeContainer} onClick={handleDrawerClose}>
            <ArrowLeftIcon className={classes.iconClose} />
          </div>
        </Paper>
      ) : (
        <Paper elevation={3} className={classes.drawerClose}>
          <FilterTooltip paramsBasedOnRoute={paramsBasedOnRoute}>
            <KsIconButton onClick={handleDrawerOpen}>
              <KsIcon icon="ks-filter" />
            </KsIconButton>
          </FilterTooltip>
        </Paper>
      )}
    </>
  );
};

export default KUIConnect(({ translate }) => ({ translate }))(FilterSection);
