import React from 'react';
import { shallow } from 'enzyme';

import FranchiseStatsStateless from '../presentational';

describe('FranchiseStats presentational', () => {
  it('renders loading when no franchise', () => {
    const wrapper = shallow(<FranchiseStatsStateless />);
    expect(wrapper.find('AppLoading')).toHaveLength(1);
  });
  describe('GraphContainer', () => {
    it('includes all franchise projects in series + total', () => {
      const franchise = {
        id: 1,
        name: 'My cool report',
        projects: [
          { id: 1, name: 'Fantastic Game', shortcode: 'fg' },
          { id: 2, name: 'The Best', shortcode: 'tb' },
        ],
      };
      const wrapper = shallow(
        <FranchiseStatsStateless franchise={franchise} />
      ).find('GraphContainer');
      expect(wrapper).toHaveLength(1);
      expect(wrapper.props().series).toEqual([
        { id: 1, name: 'Fantastic Game', short: 'FG', visible: true },
        { id: 2, name: 'The Best', short: 'TB', visible: true },
        { id: 'total', name: 'Total', visible: true },
      ]);
    });
    it('no total if only one project', () => {
      const franchise = {
        id: 1,
        name: 'My cool report',
        projects: [{ id: 1, name: 'Fantastic Game', shortcode: 'fg' }],
      };
      const wrapper = shallow(
        <FranchiseStatsStateless franchise={franchise} />
      ).find('GraphContainer');
      expect(wrapper).toHaveLength(1);
      expect(wrapper.props().series).toEqual([
        { id: 1, name: 'Fantastic Game', short: 'FG', visible: true },
      ]);
    });
  });
});
