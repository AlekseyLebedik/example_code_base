import React from 'react';
import Tooltip from 'dw/__mocks__/@material-ui/Tooltip';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import { range } from 'lodash';

import { STAT_NAMES } from 'dw/reporting/constants';
import { TrendTableComponent as TrendTable } from '../index';

// eslint-disable-next-line
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const generateStats = ({ end, statNames = STAT_NAMES } = {}) =>
  Object.assign(
    {},
    ...statNames.map(statName => ({
      [statName]: {
        data: range(5).map(idx => [
          moment(end).subtract(idx, 'weeks').valueOf(),
          10 ** 6 + idx,
        ]),
      },
    }))
  );

const thousandDelimitedValue = /[0-9]{1,3}(,[0-9]{3})/; // Ensures value is a number with thousand separators.

describe('TrendTable', () => {
  const props = {
    baseUrl: '/',
    width: 'lg',
  };

  describe('header', () => {
    it('renders normal stat names for large screens', () => {
      const wrapper = shallow(<TrendTable {...props} />);
      expect(
        wrapper.find('.headers Col').map(e => e.children().text())
      ).toEqual([
        'Week',
        'Max Concurrent Online Users',
        'Max Daily Unique Users',
      ]);
    });
    it('renders shortened stat names for xs screens', () => {
      const wrapper = shallow(<TrendTable {...props} width="xs" />);
      expect(
        wrapper.find('.headers Col').map(e => e.children().text())
      ).toEqual(['Week', 'Max Concurrent Users', 'Max Daily Unique Users']);
    });
  });
  describe('renders loading', () => {
    it('while no data', () => {
      const loadingCount = (STAT_NAMES.length + 1) * 5;
      const wrapper = shallow(<TrendTable {...props} />);
      expect(wrapper.find('LoadingSkeleton')).toHaveLength(loadingCount);
    });

    it('for missing stats only', () => {
      const [statName, ...statNames] = STAT_NAMES;
      const end = 1544708317000;
      const franchiseData = {
        end,
        stats: generateStats({ statNames: [statName], end }),
      };
      const loadingCount = statNames.length * 5;
      const wrapper = shallow(
        <TrendTable {...props} franchiseData={franchiseData} />
      );
      expect(wrapper.find('LoadingSkeleton')).toHaveLength(loadingCount);
    });
  });

  it('renders week dates', () => {
    const franchiseData = {
      end: 1544708317000,
    };
    const loadingCount = STAT_NAMES.length * 5;
    const wrapper = shallow(
      <TrendTable {...props} franchiseData={franchiseData} />
    );
    expect(wrapper.find('.weeklyDate').map(d => d.children().text())).toEqual([
      '2018-11-12 to 2018-11-18',
      '2018-11-19 to 2018-11-25',
      '2018-11-26 to 2018-12-02',
      '2018-12-03 to 2018-12-09',
      '2018-12-10 to 2018-12-16',
    ]);
    expect(wrapper.find('LoadingSkeleton')).toHaveLength(loadingCount);
  });

  it('renders numbers with hoverable link buttons with tooltips for large screens', () => {
    const end = 1544708317000;
    const franchiseData = {
      end,
      stats: generateStats({ end }),
    };
    const wrapper = shallow(
      <TrendTable {...props} franchiseData={franchiseData} />
    );
    wrapper.find('.trendValue').forEach(cell => {
      const value = cell.children();
      expect(value.first().text()).toMatch(thousandDelimitedValue);
      expect(value.find(Tooltip)).toHaveLength(1);
      expect(
        value.find(Tooltip, 'WithStyles(IconButton).hoverable')
      ).toHaveLength(1);
    });
  });

  it('renders numbers as links for xs screens', () => {
    const end = 1544708317000;
    const franchiseData = {
      end,
      stats: generateStats({ end }),
    };
    const wrapper = shallow(
      <TrendTable {...props} franchiseData={franchiseData} />
    );
    wrapper.find('.trendValue Link').forEach(link => {
      const value = link.shallow();
      expect(value.text()).toMatch(thousandDelimitedValue);
    });
  });
});
