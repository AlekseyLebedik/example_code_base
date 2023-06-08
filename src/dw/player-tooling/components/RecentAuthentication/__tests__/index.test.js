import React from 'react';
import { shallow } from 'enzyme';
import { ReduxProvider } from 'dw/core/helpers/__tests__';

import RecentLoginAccordion, { formatTitleLogins } from '../index';

const data = [
  {
    tid: 5862,
    timestamp: 1617749040,
    title: {
      name: 'BO5-CrossPlay-Reveal-Dev',
    },
    client: {
      ips: ['185.34.107.111'],
      geo: {
        countryIsoCode: 'IE',
      },
    },
    firstParty: {
      platform: 'studio',
    },
  },
];

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('dw/core/helpers/date-time', () => ({
  ...jest.requireActual('dw/core/helpers/date-time'),
  formatDateTimeSelector: () => 'Apr 06, 2021 03:44 pm PDT',
}));

describe('RecentLoginAccordion', () => {
  describe('RecentLoginAccordion', () => {
    const wrapper = shallow(
      <ReduxProvider>
        <RecentLoginAccordion data={data} hasPIIPermission />
      </ReduxProvider>
    );
    it('renders default values', () => {
      expect(wrapper.find('RecentLoginAccordion')).toMatchSnapshot();
    });
  });

  describe('formatTitleLogins', () => {
    const formatDateTime = () => 'Apr 06, 2021 03:44 pm PDT';
    const result = formatTitleLogins(formatDateTime, true, data);
    const login = result[0];
    it('returns correct number of logins', () => {
      expect(result).toMatchSnapshot();
      expect(result.length).toEqual(1);
    });
    it('returns PII info when permission enabled', () => {
      expect(login['Country/IP']).toEqual('IE/185.34.107.111');
    });
    it('hides PII permission otherwise', () => {
      const noPermission = formatTitleLogins(formatDateTime, false, data);
      expect(noPermission[0]['Country/IP']).toBe(undefined);
    });
    it('returns correct number of key-value pairs', () => {
      expect(Object.keys(login).length).toEqual(5);
    });
  });
});
