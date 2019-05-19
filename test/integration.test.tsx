import { useDateSelect } from '../src';

describe('useDateSelect', () => {
  it('calls onChange every value change', () => {
    const onChange = jest.fn();
    const { onMonthChange, onDayChange, onYearChange } = useDateSelect({
      onChange,
      value: new Date(),
    });

    onMonthChange('12');
    onDayChange('10');
    onYearChange('2020');

    expect(onChange).toHaveBeenCalledTimes(3);
  });
});
