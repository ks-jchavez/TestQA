import React, { ReactElement } from 'react';
import MuiTooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Operator } from '../FilterSection.model';
import { Chip } from '../FilterSection.styles';
import { TimestampKey } from '@kleeen/types';
import moment from 'moment';

const FilterItem = ({ option, remove }): ReactElement => (
  <MuiTooltip title={option} placement="top">
    <Chip label={option} onDelete={remove} variant="outlined" />
  </MuiTooltip>
);

const FiltersComp = ({ filters = {}, removeValue, removeCategory }): ReactElement => {
  const onRemove = (cat: string): void => {
    removeCategory(cat);
  };

  const FilterItemAdded = ({
    filter,
  }: {
    filter: [string, { _in: string[]; max?: string; min?: string }];
  }): ReactElement => {
    const [cat, { _in: values = [], max, min }]: [
      string,
      { _in: string[]; max?: string; min?: string },
    ] = filter;
    return (
      <div>
        <div className="category-section">
          {(values.length !== 0 || min || max) && (
            <>
              <p>{cat}</p>
              <div className="deleted-container">
                <MuiTooltip title="remove">
                  <span>
                    <IconButton
                      aria-label="delete"
                      className=""
                      onClick={() => onRemove(cat)}
                      disabled={false}
                    >
                      <CloseIcon className={''} />
                    </IconButton>
                  </span>
                </MuiTooltip>
              </div>
            </>
          )}
        </div>
        <div className="filters-section">
          {values.map((name, index) => {
            const auxKey = name.toString().split(TimestampKey.key);
            const auxLabel =
              auxKey.length > 1 ? moment(Number(auxKey[1])).format(TimestampKey.format) : auxKey[0];
            return (
              <FilterItem
                key={`filter-comp-item-${index}`}
                remove={() => {
                  removeValue(cat, name, Operator.in);
                }}
                option={auxLabel}
              />
            );
          })}
          {max && (
            <FilterItem
              key={`filter-comp-item-max`}
              remove={() => {
                removeValue(cat, name, Operator.max);
              }}
              option={`Max is ${max}`}
            />
          )}
          {min && (
            <FilterItem
              key={`filter-comp-item-min`}
              remove={() => {
                removeValue(cat, name, Operator.min);
              }}
              option={`Min is ${min}`}
            />
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="categories-container">
      {Object.entries(filters).map(
        (filter: [string, { _in: string[]; max?: string; min?: string }], index) => (
          <FilterItemAdded filter={filter} key={`filter-item-applied-${index}`} />
        ),
      )}
    </div>
  );
};

export default FiltersComp;
