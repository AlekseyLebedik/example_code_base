import moment from 'moment-timezone';
import { timestampToLocalDate } from 'playpants/helpers/dateTime';
import { setStartDate, setEndDate } from '../helpers';

describe('Schedule Helpers:', () => {
  describe('setStartDate()', () => {
    it('handles select action', () => {
      const timestamp = 1318781876;
      const event = {
        action: 'select',
        start: timestampToLocalDate(timestamp),
      };
      const offset = 100;
      const timezone = 'UTC';
      expect(setStartDate(event, offset, timezone)).toEqual(timestamp + offset);
    });
  });

  describe('setEndDate()', () => {
    it('handles select action', () => {
      const timestamp = 1318781876;
      const event = {
        action: 'select',
        start: moment.unix(timestamp).toDate(),
        end: moment.unix(timestamp).toDate(),
      };
      const offset = 100;
      const timezone = 'UTC';
      expect(setEndDate(event, offset, timezone)).toEqual(timestamp + offset);
    });
  });
});
