import * as React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { useDateSelect } from '../src';

afterEach(cleanup);

function Example() {
  const [date, setDate] = React.useState(() => new Date());
  const { month, onMonthChange, monthOptions } = useDateSelect({
    value: date,
    onChange: setDate,
  });
  return (
    <div>
      <select
        data-testid="month"
        value={month}
        onChange={ev => onMonthChange(ev.target.value)}
      >
        {monthOptions.map(month => (
          <option value={month} key={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}

function setupComponent() {
  const renderResult = render(<Example />);
  const { getByTestId } = renderResult;

  return {
    ...renderResult,
    changeMonth: (month: string) =>
      fireEvent.change(getByTestId('month'), { target: { value: month } }),
  };
}

describe('it', () => {
  it('renders without crashing', () => {
    const { changeMonth } = setupComponent();

    changeMonth('10');
  });
});
