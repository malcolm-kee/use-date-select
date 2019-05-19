// import * as React from 'react';
import { getDays, getMonths, getValue, getYears, parseDate } from './lib';

interface DateSelectOptions {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  /**
   * If `maxDate` is not provided, set how many future year options you want to allow.
   * Default to 10.
   */
  numOfFutureYears?: number;
  /**
   * If `minDate` is not provided, set how many previous year options you want to allow.
   * Default to 0.
   */
  numOfPreviousYears?: number;
}

interface DateSelectReturns {
  year: number;
  month: number;
  day: number;
  onYearChange: (year: number | string) => void;
  onMonthChange: (month: number | string) => void;
  onDayChange: (day: number | string) => void;
  monthOptions: readonly number[];
  dayOptions: readonly number[];
  yearOptions: readonly number[];
}

export const useDateSelect = ({
  value,
  onChange,
  numOfFutureYears = 10,
  numOfPreviousYears = 0,
  minDate,
  maxDate,
}: DateSelectOptions): DateSelectReturns => {
  const date = new Date(value);
  const [year, month, day] = parseDate(value);

  function onYearChange(newYear: number | string) {
    const value = getValue(newYear);
    if (value) {
      date.setFullYear(value);
      onChange(date);
    }
  }

  function onMonthChange(newMonth: number | string) {
    const value = getValue(newMonth);
    if (value) {
      date.setMonth(value - 1);
      onChange(date);
    }
  }

  function onDayChange(newDay: number | string) {
    const value = getValue(newDay);
    if (value) {
      date.setDate(value);
      onChange(date);
    }
  }

  return {
    year,
    month,
    day,
    onYearChange,
    onMonthChange,
    onDayChange,
    monthOptions: getMonths(),
    dayOptions: getDays(date),
    yearOptions: getYears({
      numOfFutureYears,
      numOfPreviousYears,
      minDate,
      maxDate,
    }),
  };
};
