import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDateSelect } from '../.';

const MonthMap = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const App = () => {
  const [date, setDate] = React.useState(() => new Date());
  const {
    year,
    onYearChange,
    month,
    onMonthChange,
    day,
    onDayChange,
    monthOptions,
    dayOptions,
    yearOptions,
  } = useDateSelect({
    value: date,
    onChange: setDate,
    numOfPreviousYears: 1,
    minDate: new Date(2013, 1, 1),
    maxDate: new Date(2030, 1, 1),
  });

  return (
    <div>
      <select value={year} onChange={ev => onYearChange(ev.target.value)}>
        {yearOptions.map(year => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
      <select value={month} onChange={ev => onMonthChange(ev.target.value)}>
        {monthOptions.map((monthVal, index) => (
          <option value={monthVal} key={monthVal}>
            {MonthMap[index]}
          </option>
        ))}
      </select>
      <select value={day} onChange={ev => onDayChange(ev.target.value)}>
        {dayOptions.map(day => (
          <option value={day} key={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
