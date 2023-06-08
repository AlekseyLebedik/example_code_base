import { sortTimestampSelector } from '../selectors';

const sortFunc = values =>
  values.sort((a, b) => sortTimestampSelector({ a, b }));

describe('Selectors', () => {
  it('when we compare timestamp that comes in number format, returns the correct order', () => {
    const values_A_lowerThan_B = [
      {
        id: 1,
        timestamp_sec: 1001,
      },
      {
        id: 2,
        timestamp_sec: 1002,
      },
    ];

    expect(sortFunc(values_A_lowerThan_B)).toMatchSnapshot();

    const values_A_biggerThan_B = [
      {
        id: 1,
        timestamp_sec: 1002,
      },
      {
        id: 2,
        timestamp_sec: 1001,
      },
    ];

    expect(sortFunc(values_A_biggerThan_B)).toMatchSnapshot();
  });

  it('when we compare timestamp that comes in string format, returns the correct order', () => {
    const values_A_lowerThan_B = [
      {
        id: 1,
        timestamp_us: '1001',
      },
      {
        id: 2,
        timestamp_us: '1002',
      },
    ];

    expect(sortFunc(values_A_lowerThan_B)).toMatchSnapshot();

    const values_A_biggerThan_B = [
      {
        id: 1,
        timestamp_us: '1002',
      },
      {
        id: 2,
        timestamp_us: '1001',
      },
    ];

    expect(sortFunc(values_A_biggerThan_B)).toMatchSnapshot();
  });

  it('when we compare timestamp that comes in different formats, returns the correct order', () => {
    const values_A_lowerThan_B = [
      {
        id: 1,
        timestamp_sec: 1001,
      },
      {
        id: 2,
        timestamp_us: '1002',
      },
    ];

    expect(sortFunc(values_A_lowerThan_B)).toMatchSnapshot();

    const values_A_biggerThan_B = [
      {
        id: 1,
        timestamp_sec: 1002,
      },
      {
        id: 2,
        timestamp_us: '1001',
      },
    ];

    expect(sortFunc(values_A_biggerThan_B)).toMatchSnapshot();
  });

  it('when we compare timestamp that comes in milliseconds against one in microseconds, returns the correct order', () => {
    const values_A_lowerThan_B = [
      {
        id: 1,
        timestamp_sec: 1001,
      },
      {
        id: 2,
        timestamp_us: '1002000',
      },
    ];

    expect(sortFunc(values_A_lowerThan_B)).toMatchSnapshot();

    const values_A_biggerThan_B = [
      {
        id: 1,
        timestamp_sec: 1002,
      },
      {
        id: 2,
        timestamp_sec: '1001000',
      },
    ];

    expect(sortFunc(values_A_biggerThan_B)).toMatchSnapshot();
  });

  it('when fields have a dot inside is replaced to get the correct value and returns the correct order', () => {
    const values = [
      {
        id: 1,
        timestamp_sec: 1002,
      },
      {
        id: 2,
        headers__ts: 1001.001,
      },
    ];

    expect(sortFunc(values)).toMatchSnapshot();
  });

  it('when no fields are found, returns the same order as input', () => {
    const values = [
      {
        id: 1,
        other_prop: 'other',
      },
      {
        id: 2,
        other_prop: 'other',
      },
    ];

    expect(sortFunc(values)).toMatchSnapshot();
  });
});
