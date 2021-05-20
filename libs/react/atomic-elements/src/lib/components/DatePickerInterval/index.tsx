import './DatePickerInterval.scss';

import { DatePickerIntervalProps, DateProps } from './DatePickerInterval.model';
import React, { useState } from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';

import { ButtonSubHeaderEnum } from '../SubHeader/component/ButtonHeader/ButtonSubHeader.enum';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { DateFilterButton } from './components/DateFilterButton';
import { DateInterval } from '@kleeen/react/components';
import { IntervalDate } from '@kleeen/types';
import { RelativeTimePicker } from './components/relativeTimePicker/index';
import Tooltip from '@material-ui/core/Tooltip';
import { isNil } from 'ramda';
import { useTheme } from '@kleeen/react/hooks';

const StyledTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    maxWidth: 'fit-content',
    pointerEvents: 'all',
    padding: '0px',
    zIndex: 1501,
  },
}))(Tooltip);

export const DatePickerInterval = ({
  datePickerState,
  isOpen,
  isSetOpen,
  className,
  handleFilter,
}: DatePickerIntervalProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [openCustomRange, setOpenCustomRange] = useState(false);
  const { themeClass } = useTheme();
  const isApply = !isNil(handleFilter);

  if (!isNil(isOpen) && isApply) {
    React.useEffect(() => {
      setOpen(isOpen);
    }, [isOpen]);
  }

  const handleCloseDateFilter = (e = null): void => {
    if (e?.path[0].classList.contains(ButtonSubHeaderEnum.elementButtonGenericHeader)) return;

    if (open) {
      if (isApply) {
        isSetOpen(false);
      }
      setOpen(false);
      setTimeout(() => {
        setOpenCustomRange(false);
      }, 250);
    }
  };

  const handleClickFilterButton = (): void => {
    setOpen(!open);
  };

  const setRelativeDate = (interval: IntervalDate): void => {
    datePickerState.setRelativeDate(interval);
    datePickerState.setTo(undefined);
    datePickerState.setFrom(undefined);
    if (!isApply) {
      setTimeout(() => {
        handleCloseDateFilter();
      }, 250);
    }
  };

  const handleOpenCustomRange = (): void => {
    setTimeout(() => {
      setOpenCustomRange(true);
    }, 250);
  };

  return (
    <div className="date-picker-interval-container">
      <ClickAwayListener onClickAway={handleCloseDateFilter}>
        <div>
          <StyledTooltip
            onClose={handleCloseDateFilter}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            PopperProps={{
              className: `${themeClass} ${className} tooltip-date-range-picker`,
            }}
            title={
              openCustomRange ? (
                <DateInterval
                  datePickerState={datePickerState}
                  handleFilter={
                    isApply
                      ? () => {
                          handleCloseDateFilter();
                          handleFilter();
                        }
                      : handleFilter
                  }
                />
              ) : (
                <RelativeTimePicker
                  handleOpenCustomRange={handleOpenCustomRange}
                  setRelativeDate={setRelativeDate}
                  datePickerState={datePickerState}
                  handleCloseDateFilter={handleCloseDateFilter}
                  handleFilter={handleFilter}
                />
              )
            }
          >
            <div>
              <DateFilterButton onClick={handleClickFilterButton} datePickerState={datePickerState} />
            </div>
          </StyledTooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
};
