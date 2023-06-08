import React from 'react';
import { Link } from 'react-router-dom';
import { formatTitleLogs, formatTitleLog } from '../index';

const data = {
  player: {
    logs: [
      {
        connectionId: '1345332142351344',
        env: 'auth_dev_las',
        message: 'test message',
        source: 'auth3',
        time: 1617749040,
        transactionId: '21342432513241',
        title: {
          titleId: '5830',
          env: 'DEV',
          name: 'BO5-CrossPlay-Reveal-Dev',
        },
      },
    ],
  },
};

describe('RecentActivity Logs', () => {
  describe('formatTitleLogs', () => {
    const result = formatTitleLogs({}, data.player.logs);
    const log = result[0];
    it('returns correct number of logs', () => {
      expect(result).toMatchSnapshot();
      expect(result.length).toEqual(1);
    });
    it('returns formated keys', () => {
      expect(log['Connection ID']).toEqual(
        <Link to="/online-configuration/5830/dev/debugging/server-logs?uno=true&connId=1345332142351344">
          1345332142351344
        </Link>
      );
      expect(log['Transaction ID']).toEqual(
        <Link to="/online-configuration/5830/dev/debugging/server-logs?uno=true&transId=21342432513241">
          21342432513241
        </Link>
      );
    });
    it('returns correct number of key-value pairs', () => {
      expect(Object.keys(log).length).toEqual(7);
    });
  });
  describe('formatTitleLog', () => {
    const logs = formatTitleLogs({}, data.player.logs);
    const result = formatTitleLog(logs[0]);
    it('returns data', () => {
      expect(result).toMatchSnapshot();
    });
    it('filters out title', () => {
      expect(result.title).toBe(undefined);
    });
  });
});
