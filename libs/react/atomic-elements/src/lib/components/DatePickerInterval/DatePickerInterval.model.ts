import { Dispatch, SetStateAction } from 'react';

import { Moment } from 'moment';

export type DateProps = Moment;
export interface DatePickerProps {
  from: DateProps;
  to: DateProps;
  relativeDate: string;
}
export interface DatePickerStateObject extends DatePickerProps {
  setFrom: Dispatch<SetStateAction<DateProps>>;
  setTo: Dispatch<SetStateAction<DateProps>>;
  setRelativeDate: Dispatch<SetStateAction<string>>;
}
export interface DatePickerIntervalProps {
  datePickerState: DatePickerStateObject;
  translate?: (e: string) => string;
  isOpen?: boolean;
  isSetOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
  handleFilter?: () => void;
}

export enum IntervalDate {
  minute = '1,m',
  oneHours = '1,h',
  sixHours = '6,h',
  twentyFourHours = '24,h',
  oneWeek = '1,w',
  oneMonth = '1,M',
  threeMonth = '3,M',
}
