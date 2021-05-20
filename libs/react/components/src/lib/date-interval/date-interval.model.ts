import { Moment } from 'moment';

export type DateTimeProps = Moment;

export interface DateTimeIntervalProps {
  translate: (e: string) => string;
  handleFilter?: () => void;
  datePickerState: {
    from: DateTimeProps;
    to: DateTimeProps;
    setFrom: (e: DateTimeProps) => void;
    setTo: (e: DateTimeProps) => void;
    setRelativeDate: (e: string) => void;
  };
}

export interface DateValueIntervalProps {
  date: DateTimeProps;
  set: (e: DateTimeProps) => void;
  label: string;
  step: number;
  props: {
    minDate?: DateTimeProps;
    maxDate?: DateTimeProps;
  };
}

export interface DateValueMapProps {
  key: number;
  val: DateValueIntervalProps;
}
