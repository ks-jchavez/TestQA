import './dateTimeInterval.scss';

import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/moment';
import { DateValueIntervalProps } from '../../date-interval.model';
import React from 'react';

export const DateTimeInterval = (value: DateValueIntervalProps): JSX.Element => {
  const { date, set, props, step } = value;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={'date-interval-detail'}>
        {step === 0 && (
          <DatePicker
            autoOk
            variant="static"
            openTo="date"
            value={date}
            onChange={set}
            showTodayButton={false}
            {...props}
          />
        )}
        {step === 1 && (
          <TimePicker
            autoOk
            ampm={false}
            variant="static"
            openTo="hours"
            views={['hours', 'minutes']}
            format="HH:mm"
            minutesStep={5}
            value={date}
            onChange={set}
            readOnly={false}
          />
        )}
      </div>
    </MuiPickersUtilsProvider>
  );
};
