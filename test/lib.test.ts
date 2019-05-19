import { getYears } from '../src/lib';

describe('getYears', () => {
  test('with only numOfFutureYears and numOfPreviousYears', () => {
    const years = getYears({
      numOfPreviousYears: 2,
      numOfFutureYears: 10,
    });

    expect(years.length).toBe(13);
  });

  test('with minDate', () => {
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    const years = getYears({
      numOfPreviousYears: 2,
      numOfFutureYears: 0,
      minDate: fiveYearsAgo,
    });

    expect(years.length).toBe(6);
  });

  test('with maxDate', () => {
    const fiveYearsLater = new Date();
    fiveYearsLater.setFullYear(fiveYearsLater.getFullYear() + 5);
    const years = getYears({
      numOfPreviousYears: 0,
      numOfFutureYears: 2,
      maxDate: fiveYearsLater,
    });

    expect(years.length).toBe(6);
  });

  test('with minDate and maxDate', () => {
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    const fiveYearsLater = new Date();
    fiveYearsLater.setFullYear(fiveYearsLater.getFullYear() + 5);
    const years = getYears({
      numOfPreviousYears: 5,
      numOfFutureYears: 2,
      minDate: fiveYearsAgo,
      maxDate: fiveYearsLater,
    });

    expect(years.length).toBe(11);
  });
});
