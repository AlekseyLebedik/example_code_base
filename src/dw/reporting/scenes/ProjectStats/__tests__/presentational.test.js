import React from 'react';
import { shallow } from 'enzyme';

import ProjectStatsStateless from '../presentational';

describe('ProjectStats presentational', () => {
  const getProjectPlatforms = jest.fn();
  getProjectPlatforms.mockReturnValue([
    { id: 1, platform: 'PS4' },
    { id: 2, platform: 'XBox One' },
    { id: 3, platform: 'PC-BNet' },
    { id: 4, platform: 'Wii' },
  ]);
  const expectedSeries = [
    {
      id: 1,
      name: 'PS4',
      platform: 'PS4',
      visible: true,
    },
    {
      id: 2,
      name: 'XBox One',
      platform: 'XBox One',
      visible: true,
    },
    {
      id: 3,
      name: 'PC-BNet',
      platform: 'PC-BNet',
      visible: true,
    },
    {
      id: 4,
      name: 'Wii',
      platform: 'Wii',
      visible: true,
    },
    {
      id: 'total',
      name: 'Total',
      visible: true,
    },
  ];
  const props = {
    getProjectPlatforms,
  };
  it('renders loading when no project', () => {
    const wrapper = shallow(<ProjectStatsStateless {...props} />);
    expect(wrapper.find('AppLoading')).toHaveLength(1);
  });
  describe('GraphContainer', () => {
    it('all series visible by default', () => {
      const wrapper = shallow(
        <ProjectStatsStateless {...props} project={{ id: 1 }} />
      ).find('GraphContainer');
      expect(wrapper).toHaveLength(1);
      expect(wrapper.props().series).toEqual(expectedSeries);
    });
    it('only one platform visible if specified', () => {
      const platform = 'PC-BNet';
      const wrapper = shallow(
        <ProjectStatsStateless
          {...props}
          project={{ id: 1 }}
          platform={platform}
        />
      ).find('GraphContainer');
      expect(wrapper).toHaveLength(1);
      expect(wrapper.props().series).toEqual(
        expectedSeries.map(p => ({
          ...p,
          visible: p.name === platform,
        }))
      );
    });
    it('no total if only one platform in project', () => {
      const newProps = { getProjectPlatforms: jest.fn() };
      newProps.getProjectPlatforms.mockReturnValue([
        { id: 1, platform: 'PS4' },
      ]);
      const wrapper = shallow(
        <ProjectStatsStateless {...newProps} project={{ id: 1 }} />
      ).find('GraphContainer');
      expect(wrapper).toHaveLength(1);
      expect(wrapper.props().series).toEqual([
        { id: 1, name: 'PS4', platform: 'PS4', visible: true },
      ]);
    });
  });
});
