import moment from 'moment-timezone';
import * as helpers from '../helpers';

const mockNowTimestamp = 1614935098;

jest.mock('dw/core/helpers/date-time', () => ({
  ...jest.requireActual('dw/core/helpers/date-time'),
  getNowTimestamp: () => mockNowTimestamp,
}));

describe('Timeline helpers', () => {
  it('timestampToMilliseconds', () => {
    const timestamp = mockNowTimestamp;
    const expectedValue = 1614935098000;
    expect(helpers.timestampToMilliseconds(timestamp)).toEqual(expectedValue);
  });
  it('timestampToSeconds', () => {
    const timestamp = 1614935098123;
    const expectedValue = mockNowTimestamp;
    expect(helpers.timestampToSeconds(timestamp)).toEqual(expectedValue);
  });
  it('getNowMillisecondsTimestamp', () => {
    const expectedValue = 1614935098000;
    expect(helpers.getNowMillisecondsTimestamp()).toEqual(expectedValue);
  });
  it('getDayDiffFromTimestamps', () => {
    const expectedValue = 10;
    const start = moment().valueOf();
    const end = moment(start).add(expectedValue, 'days');
    expect(helpers.getDayDiffFromTimestamps(start, end)).toEqual(expectedValue);
  });
  it('getMillisecondsTimestamp', () => {
    const timestamp = 1614935098123;
    const date = moment(timestamp);
    const expectedValue = 1614935098000;
    const timezone = 'Europe/Kiev';
    expect(helpers.getMillisecondsTimestamp(date, timezone)).toEqual(
      expectedValue
    );
  });
  it('getMomentFromMillisecondTimestamp', () => {
    const timestamp = 1614935098000;
    const timezone = 'Europe/Kiev';
    const expectedValue = moment.tz(timestamp, timezone);
    expect(
      helpers
        .getMomentFromMillisecondTimestamp(timestamp, timezone)
        .isSame(expectedValue)
    ).toEqual(true);
  });
  it('formatNavigatorItems', () => {
    const start = mockNowTimestamp;
    const end = moment.unix(mockNowTimestamp).add(3, 'days').unix();
    const events = [
      {
        name: 'ABTesting Event',
        catchStart: start,
        catchEnd: end,
        type: 'abTesting',
      },
      {
        name: 'Event with end date',
        publish_at: start,
        end_at: end,
        type: 'em',
      },
      {
        name: 'Event without end date',
        publish_at: start,
        type: 'em',
      },
    ];
    const expectedEvents = [
      {
        end: 1615194298000,
        name: 'ABTesting Event',
        start: 1614935098000,
      },
      {
        end: 1615194298000,
        name: 'Event with end date',
        start: 1614935098000,
      },
      {
        end: 1614938698000,
        name: 'Event without end date',
        start: 1614935098000,
      },
    ];
    expect(helpers.formatNavigatorItems(events, 'name')).toEqual(
      expectedEvents
    );
  });
});
