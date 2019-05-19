const now = new Date();

export function parseDate(date: Date): [number, number, number] {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day];
}

export function isNumberString(value: string) {
  return typeof value === 'string' && !isNaN(value as any);
}

export function isDefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}

export function getValue(value: string | number) {
  if (typeof value === 'number') {
    return value;
  }

  if (isNumberString(value)) {
    return parseInt(value);
  }

  return null;
}

interface CreateNumbersOptions {
  length?: number;
  min?: number;
  max?: number;
}

function createNumbers({ length, min, max }: CreateNumbersOptions) {
  const result: number[] = [];
  if (isDefined(length)) {
    if (isDefined(min)) {
      for (let index = 0; index < length; index++) {
        result.push(index + min);
      }
      return result;
    } else if (isDefined(max)) {
      for (let index = 0; index < length; index++) {
        result.push(max - index);
        return result.reverse();
      }
    }
  }

  if (isDefined(min) && isDefined(max)) {
    for (let index = 0; index + min <= max; index++) {
      result.push(index + min);
    }
    return result;
  }
  return result;
}

export function getDays(currentDate: Date): readonly number[] {
  const numOfDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  return createNumbers({ length: numOfDays, min: 1 });
}

const months = createNumbers({ length: 12, min: 1 });

export function getMonths(): readonly number[] {
  return months;
}

interface GetYearsOptions {
  minDate?: Date;
  maxDate?: Date;
  numOfFutureYears: number;
  numOfPreviousYears: number;
}

export function getYears({
  numOfFutureYears,
  numOfPreviousYears,
  minDate,
  maxDate,
}: GetYearsOptions): readonly number[] {
  const thisYear = now.getFullYear();

  if (isDefined(minDate) && isDefined(maxDate)) {
    return createNumbers({
      min: minDate.getFullYear(),
      max: maxDate.getFullYear(),
    });
  }

  const previousYears = isDefined(minDate)
    ? createNumbers({
        min: minDate.getFullYear(),
        max: now.getFullYear() - 1,
      })
    : createNumbers({
        length: numOfPreviousYears,
        min: thisYear - numOfPreviousYears,
      });

  const futureYears = isDefined(maxDate)
    ? createNumbers({
        min: now.getFullYear() - 1,
        max: maxDate.getFullYear(),
      })
    : createNumbers({
        length: numOfFutureYears,
        min: thisYear + 1,
      });

  return previousYears.concat(thisYear).concat(futureYears);
}
