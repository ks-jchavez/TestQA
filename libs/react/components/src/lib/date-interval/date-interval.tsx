import './date-interval.scss';

import { Button, Tab, Tabs } from '@material-ui/core';
import {
  DateTimeIntervalProps,
  DateTimeProps,
  DateValueIntervalProps,
  DateValueMapProps,
} from './date-interval.model';
import React, { useState } from 'react';

import { DateTimeInterval } from './components/index';
import { KUIConnect } from '@kleeen/core-react';
import { KsButton } from '../button';
import { isNil } from 'ramda';

const stepInit = [0, 0];

function DateIntervalBase(props: DateTimeIntervalProps): JSX.Element {
  const [update, setUpdate] = useState<number>();
  const { translate, datePickerState, handleFilter } = props;
  const isApply = !isNil(handleFilter);
  const [step, setStep] = useState(stepInit);
  const [value, setValue] = useState(0);
  const { from, to, setFrom, setTo } = datePickerState;

  React.useEffect(() => {
    setTimeout(() => {
      setUpdate(1);
    }, 120);
  }, []);

  const applyClick = (): void => {
    datePickerState.setTo(to);
    datePickerState.setFrom(from);
    handleFilter();
  };

  const dateValidateInterval = (date: DateTimeProps, setDate): void => {
    if (setFrom === setDate) {
      if (date > to) {
        setTo(date);
      }
    } else if (setTo === setDate) {
      if (date <= from) {
        setFrom(date);
      }
    }
    setDate(date);
  };

  const dateValue: DateValueIntervalProps[] = [
    {
      date: from,
      set: (date: DateTimeProps) => dateValidateInterval(date, setFrom),
      label: translate('app.dateInterval.from'),
      step: step[0],
      props: {
        maxDate: to,
      },
    },
    {
      date: to,
      set: (date: DateTimeProps) => dateValidateInterval(date, setTo),
      label: translate('app.dateInterval.to'),
      step: step[1],
      props: {
        minDate: from,
      },
    },
  ];

  const handleChangeTab = (event: React.ChangeEvent, newValue: number): void => {
    setValue(newValue);
  };

  const handleChangeStep = (): void => {
    step[value] = step[value] === 0 ? 1 : 0;
    setStep(step);
    setUpdate(new Date().getMilliseconds());
  };

  const formatDateTime = (date: DateTimeProps, format: string): string => {
    return date ? date.format(format) : '';
  };

  const labelHtml = ({ val, key }: DateValueMapProps): JSX.Element => {
    return (
      <Button
        onClick={() => setValue(key)}
        className={'full-width-button ' + (key === value ? 'active-button' : '')}
      >
        <div className="label-title">{val.label}</div>
        <div className={'label-date ' + (step[key] === 0 ? 'label-date-active' : '')}>
          {formatDateTime(val.date, 'DD/MM/YYYY')}
        </div>
        <div className={'label-date ' + (step[key] === 1 ? 'label-date-active' : '')}>
          {formatDateTime(val.date, 'HH:mm')}
        </div>
      </Button>
    );
  };

  return (
    <div className="date-interval-custom">
      <div className="date-interval-options">
        <Tabs
          value={value}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant="fullWidth"
        >
          {dateValue.map((val: DateValueIntervalProps, key: number) => {
            return <Tab key={key + 'date-interval-options'} component={() => labelHtml({ val, key })} />;
          })}
        </Tabs>
      </div>
      <DateTimeInterval {...dateValue[value]} />
      <div className="date-interval-step">
        {isApply && <KsButton onClick={handleFilter}>{translate('app.dateInterval.apply')}</KsButton>}
        <KsButton onClick={() => dateValue[value].set(undefined)}>
          {translate('app.dateInterval.clear')}
        </KsButton>
        <KsButton onClick={handleChangeStep}>
          {step[value] === 0 ? translate('app.dateInterval.time') : translate('app.dateInterval.date')}
        </KsButton>
      </div>
    </div>
  );
}

export const DateInterval = React.memo(KUIConnect(({ translate }) => ({ translate }))(DateIntervalBase));
