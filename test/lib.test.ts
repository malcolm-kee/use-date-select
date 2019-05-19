import { getYears } from '../src/lib';

describe('getYears', () => {
  test('with only numOfFutureYears and numOfPreviousYears', () => {
    const years = getYears({
      numOfPreviousYears: 2,
      numOfFutureYears: 10,
    });

    expect(years.length).toBe(13);
  });
});
