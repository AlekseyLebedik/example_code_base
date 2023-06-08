import React from 'react';
import { shallow } from 'enzyme';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import moment from 'moment-timezone';
import { range } from 'lodash';

import { STAT_NAMES } from 'dw/reporting/constants';
import { TrendChartsComponent as TrendChart } from '../index';

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

describe('TrendChart', () => {
  const props = {
    baseUrl: '/',
    width: 'lg',
    franchiseData: {},
  };
  it('Renders Link to the Franchise report', () => {
    const wrapper = shallow(<TrendChart {...props} />);
    expect(wrapper.find('Link.header').props()).toMatchObject({
      children: 'Franchise',
      to: '/stats',
    });
  });

  describe('StatHeader', () => {
    it('rendered as a text with IconButton on wide screens', () => {
      const wrapper = shallow(<TrendChart {...props} />);
      expect(wrapper.find('StatHeader')).toHaveLength(STAT_NAMES.length);
      expect(wrapper.find('StatHeader').map(h => h.props().statName)).toEqual(
        STAT_NAMES
      );
      expect(wrapper.find('StatHeader').first().shallow()).toMatchSnapshot();
    });
    it('rendered as a Link on xs screens', () => {
      const wrapper = shallow(<TrendChart {...props} width="xs" />);
      expect(wrapper.find('StatHeader')).toHaveLength(STAT_NAMES.length);
      expect(wrapper.find('StatHeader').map(h => h.props().statName)).toEqual(
        STAT_NAMES
      );
      expect(wrapper.find('StatHeader').first().shallow()).toMatchSnapshot();
    });
  });
  describe('renders loading', () => {
    it('while no data', () => {
      const loadingCount = STAT_NAMES.length;
      const wrapper = shallow(<TrendChart {...props} />);
      expect(wrapper.find('TrendChartsLoading')).toHaveLength(loadingCount);
    });

    it('for missing stats only', () => {
      const [statName, ...statNames] = STAT_NAMES;
      const end = 1544708317000;
      const franchiseData = {
        end,
        stats: generateStats({ statNames: [statName], end }),
      };
      const loadingCount = statNames.length;
      const wrapper = shallow(
        <TrendChart {...props} franchiseData={franchiseData} />
      );
      expect(wrapper.find('TrendChartsLoading')).toHaveLength(loadingCount);
    });
  });

  it('renders Charts with ReactHighstock', () => {
    const end = 1544708317000;
    const franchiseData = {
      end,
      stats: generateStats({ end }),
    };
    const wrapper = shallow(
      <TrendChart {...props} franchiseData={franchiseData} />
    );
    expect(
      wrapper.find('Chart').first().shallow().find(ReactHighstock)
    ).toHaveLength(1);
  });

  it('renders No Data', () => {
    const franchiseData = {
      stats: Object.assign(
        {},
        ...STAT_NAMES.map(statName => ({ [statName]: { data: [] } }))
      ),
    };
    const wrapper = shallow(
      <TrendChart {...props} franchiseData={franchiseData} />
    );
    expect(wrapper.find('Chart').first().shallow().text()).toBe(
      'No data to display'
    );
  });
});
