import { Badge, Tooltip } from '../FilterSection.styles';
import { FilterAdded, Operator } from '../FilterSection.model';
import React, { ReactElement } from 'react';

import { IntervalDate } from '@kleeen/types';
import { KUIConnect } from '@kleeen/core-react';
import moment from 'moment';
import { useTheme } from '@kleeen/react/hooks';

export const filterTooltipFunc = (
  paramsBasedOnRoute,
  translate,
): {
  title: ReactElement;
  PopperProps: { className?: string; style?: { [key: string]: any } };
  badgeContent: number;
} => {
  if (!paramsBasedOnRoute) {
    return {
      PopperProps: {},
      badgeContent: 0,
      title: <></>,
    };
  }

  const filterTitles = Object.keys(paramsBasedOnRoute);
  const filtersMap: FilterAdded[] = Object.values(paramsBasedOnRoute).map((filter) => filter);
  const { themeClass } = useTheme();

  const getIntervalDateKey = (value: string): string => {
    let auxKey = '';
    Object.keys(IntervalDate).forEach((key) => {
      if (value === IntervalDate[key]) {
        auxKey = key;
      }
    });
    return auxKey;
  };

  return {
    PopperProps: { className: `${themeClass}`, style: { zIndex: 2 } },
    badgeContent: filterTitles.length,
    title: (
      <ul>
        <li>{`${filterTitles.length} Filters Applied`}</li>

        {filterTitles.map((title, i) => (
          <>
            <span>{title}:</span>
            {filtersMap[i][Operator.in]?.map((filter) => (
              <li>• {filter}</li>
            ))}
            {filtersMap[i][Operator.max] && <li>• Maximum is {filtersMap[i][Operator.max]}</li>}
            {filtersMap[i][Operator.min] && <li>• Minimum is {filtersMap[i][Operator.min]}</li>}
            {filtersMap[i][Operator.from] && (
              <li>• From {moment(filtersMap[i][Operator.from]).format('DD/MM/YYYY HH:ss')}</li>
            )}
            {filtersMap[i][Operator.to] && (
              <li>• To {moment(filtersMap[i][Operator.to]).format('DD/MM/YYYY HH:ss')}</li>
            )}
            {filtersMap[i][Operator.relativeDate] && (
              <li>
                {translate(
                  'app.dateInterval.interval.' + getIntervalDateKey(filtersMap[i][Operator.relativeDate]),
                )}
              </li>
            )}
          </>
        ))}
      </ul>
    ),
  };
};

const FilterTooltipComponent = (props: { children; paramsBasedOnRoute; translate }): ReactElement => {
  const filter = filterTooltipFunc(props.paramsBasedOnRoute, props.translate);

  return (
    <Tooltip title={filter.title} PopperProps={filter.PopperProps} placement="right" interactive>
      <Badge badgeContent={filter.badgeContent} color="primary">
        {props.children}
      </Badge>
    </Tooltip>
  );
};

const FilterTooltip = React.memo(KUIConnect(({ translate }) => ({ translate }))(FilterTooltipComponent));

export default FilterTooltip;
