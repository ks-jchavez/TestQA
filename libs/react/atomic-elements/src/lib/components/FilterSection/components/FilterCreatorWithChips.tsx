import './styles/FilterCreatorWithChips.scss';

import { Chip, IconButton } from '@material-ui/core';
import {
  FilterOption,
  FilterSectionEnum,
  FiltersAddedState,
  Operator,
  addFilterText,
  materialAutocompleteClearSignal,
  optionsByStatisticalType,
} from '../FilterSection.model';
import React, { ReactElement, useEffect, useState } from 'react';
import { TimestampKey } from '@kleeen/types';

import { ChipsGroupByCategoryProps } from './FilterCreatorWithChips.model';
import CloseIcon from '@material-ui/icons/Close';
import FilterAutocomplete from '../../FilterAutocomplete/FilterAutocomplete';
import MuiTooltip from '@material-ui/core/Tooltip';
import { useStyles } from './styles/FilterCreatorWithChips.style';
import moment from 'moment';

const ChipsGroupByCategory = ({
  filters,
  getTagProps,
  removeCategory,
  removeValue,
}: ChipsGroupByCategoryProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      {Object.entries(filters).map(([key, values], i) => (
        <div key={key}>
          <div>
            <div className={classes.categoryTitle}>{key}</div>
            <div className={classes.categoryContent}>
              {(values._in || []).map((option: string, index) => {
                const auxKey = option.toString().split(TimestampKey.key);
                const auxLabel =
                  auxKey.length > 1 ? moment(Number(auxKey[1])).format(TimestampKey.format) : auxKey[0];
                return (
                  <MuiTooltip title={auxLabel} key={`${key}-${auxLabel}`}>
                    <Chip
                      {...getTagProps({ index })}
                      size="small"
                      label={auxLabel}
                      onDelete={() => {
                        removeValue(key, option, Operator.in);
                      }}
                      deleteIcon={
                        <IconButton>
                          <CloseIcon />
                        </IconButton>
                      }
                    />
                  </MuiTooltip>
                );
              })}
              {values.max && (
                <Chip
                  size="small"
                  label={`Max is ${values.max}`}
                  onDelete={() => {
                    removeValue(key, values.max, Operator.max);
                  }}
                  deleteIcon={
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                  }
                />
              )}
              {values.min && (
                <Chip
                  size="small"
                  label={`Min is ${values.min}`}
                  onDelete={() => {
                    removeValue(key, values.min, Operator.min);
                  }}
                  deleteIcon={
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                  }
                />
              )}
              <MuiTooltip title="remove category">
                <span>
                  <IconButton
                    aria-label="delete"
                    className={classes.categorybutton}
                    onClick={() => removeCategory(key)}
                    disabled={false}
                  >
                    <CloseIcon />
                  </IconButton>
                </span>
              </MuiTooltip>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

let lastCategorySelected;

const FilterCreatorWithChips = ({
  categoryFilterOptions,
  filterOptionsByCategory,
  addFilter,
  setIsApplyDisabled,
  filtersAdded,
  removeValue,
  removeCategory,
}: {
  categoryFilterOptions: FilterOption[];
  filterOptionsByCategory: Record<string, FilterOption[]>;
  addFilter: (category: string, operator: Operator, value: string | number) => void;
  setIsApplyDisabled: (value: boolean) => void;
  filtersAdded: FiltersAddedState;
  removeValue;
  removeCategory;
}): ReactElement => {
  const [label, setLabel] = useState(addFilterText);
  const [value, setValue] = useState(filtersAdded.length ? [] : [{}]);
  const [inputValue, setInputValue] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [isCategory, setIsCategory] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const isSelectingCategory = !currentCategory;
    if (isSelectingCategory) {
      // validation when the category have all the values added should not appear?
      setOptions(categoryFilterOptions);
    }
  }, [currentCategory]);

  const handleCategoryClick = (all: FilterOption[]): void => {
    const { name, statisticalType = '' } = all[all.length - 1];
    setIsCategory(!isCategory);
    setCurrentCategory(name);
    setLabel(name);
    lastCategorySelected = name;

    const { options: filterOptionsByType } = optionsByStatisticalType.find(({ included }) =>
      included.includes(statisticalType),
    ) || { options: [] };
    let auxOptionsByCategory = filterOptionsByCategory[name];
    if (statisticalType === 'Data - Numeric - Temporal') {
      auxOptionsByCategory = filterOptionsByCategory[name]?.map((option) => {
        return {
          ...option,
          name: moment(option.name).format(TimestampKey.format),
          value: option.name,
        };
      });
    }
    setOptions([...filterOptionsByType, ...auxOptionsByCategory]);
  };

  const handleValueClick = (all: FilterOption[]): void => {
    const { name, operator, section, value: valueTimestamp } = all[all.length - 1];
    setLabel(addFilterText);
    setIsCategory(!isCategory);
    // TODO close modal on this clicks
    if (section === FilterSectionEnum.Bounds) {
      addFilter(currentCategory, operator, inputValue);
    } else if (name) {
      // * We use the timestamp key to know that the value in the query string is timestamp type
      const auxName = valueTimestamp ? `${TimestampKey.key}${valueTimestamp}` : name;
      addFilter(currentCategory, Operator.in, auxName);
    }
    setOptions(categoryFilterOptions);
    setCurrentCategory('');
  };

  const getOptionLabel = ({ name, section }: FilterOption): string => {
    if (section === FilterSectionEnum.Bounds) {
      return !inputValue ? name : `${name} is ${inputValue}`;
    }
    return Number.isInteger(name) ? String(name) : name || '';
  };

  const getOptionDisabled = ({ section }: FilterOption): boolean =>
    section === FilterSectionEnum.Bounds && isNaN(parseInt(inputValue));

  const getOptions = (currentOptions: FilterOption[]): FilterOption[] => {
    if (!currentCategory || !filtersAdded[currentCategory]) return options;
    return currentOptions.filter(
      (option) => !filtersAdded[currentCategory][Operator.in]?.includes(option.name),
    );
  };

  return (
    <FilterAutocomplete
      multiple
      disableCloseOnSelect={!currentCategory}
      disableClearable
      withoutMenuTransform
      getOptionLabel={getOptionLabel}
      getOptionDisabled={getOptionDisabled}
      inputValue={inputValue}
      value={value}
      filterOptions={(filterOptions, state) => {
        const filteredOptions = filterOptions.filter(({ name, section }) => {
          if (section === FilterSectionEnum.Bounds) return true;
          return String(name).toLowerCase()?.includes(state.inputValue?.toLowerCase());
        });

        return filteredOptions;
      }}
      renderTags={(tagValue, getTagProps) => {
        return (
          <ChipsGroupByCategory
            filters={filtersAdded}
            getTagProps={getTagProps}
            removeValue={removeValue}
            removeCategory={removeCategory}
          />
        );
      }}
      onInputChange={(e, changeValue, type) => {
        if (type === materialAutocompleteClearSignal) {
          setValue([]);
          setCurrentCategory('');
          setIsCategory(true);
          setLabel(addFilterText);
        }
        setInputValue(changeValue);
      }}
      onChange={(_, options: FilterOption[], reason) => {
        if (reason === 'remove-option') return;
        setInputValue('');
        const isSelectingCategory = !currentCategory && options;
        if (!options) return;

        const latestAdded = options[options.length - 1];

        if (isSelectingCategory) {
          handleCategoryClick(options);
        } else {
          options[options.length - 1] = { ...latestAdded, category: lastCategorySelected };
          setValue(options);

          handleValueClick(options);
        }
      }}
      options={getOptions(options)}
      groupBy={({ section }) => section}
      noHelperText={true}
      placeholder={'Add filters'}
    />
  );
};

export default FilterCreatorWithChips;
