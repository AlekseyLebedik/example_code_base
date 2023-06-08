import React from 'react';
import { shallow } from 'enzyme';
import { STAT_NAMES } from 'dw/reporting/constants';

import GraphContainerStateless from '../presentational';

describe('GraphContainerStateless', () => {
  const series = [
    {
      id: 1,
      name: 'My cool project',
      short: 'mcp',
      color: 'green',
      visible: true,
    },
    { id: 2, name: 'ghosts', color: 'blue', visible: false },
    { id: 'total', name: 'Total', color: 'red', visible: true },
  ];
  const props = {
    source: '',
    toggleSeries: jest.fn(),
    chartRef: jest.fn(),
    printGraphs: jest.fn(),
  };

  describe('print button', () => {
    it('is rendered', () => {
      const wrapper = shallow(
        <GraphContainerStateless {...props} series={series} />
      );
      expect(wrapper.find('.printBtn')).toHaveLength(1);
    });

    it('is clickable', () => {
      const wrapper = shallow(
        <GraphContainerStateless {...props} series={series} />
      );
      wrapper.find('.printBtn').simulate('click');
      expect(props.printGraphs).toBeCalled();
    });
  });

  describe('graph stats', () => {
    it('renders all stats by default', () => {
      const wrapper = shallow(
        <GraphContainerStateless {...props} series={series} />
      );
      expect(wrapper.find('.Graph__container')).toHaveLength(STAT_NAMES.length);
    });

    it('renders stats from props', () => {
      const wrapper = shallow(
        <GraphContainerStateless
          {...props}
          series={series}
          stats={[STAT_NAMES[0]]}
        />
      );
      expect(wrapper.find('.Graph__container')).toHaveLength(1);
    });
  });

  describe('chips', () => {
    const getChips = wrapper => wrapper.find('Chips').shallow();
    it('renders chips for series and select all chip', () => {
      const wrapper = shallow(
        <GraphContainerStateless {...props} series={series} />
      );
      const chips = getChips(wrapper);
      expect(chips.find('.chip')).toHaveLength(series.length + 1);
    });

    it('renders Select All if at least one chip unchecked', () => {
      const wrapper = shallow(
        <GraphContainerStateless {...props} series={series} />
      );
      const chips = getChips(wrapper);
      const allChip = chips.find('.select-all');
      expect(allChip.props().label).toBe('Select All');
    });

    it('renders Hide All if all checked', () => {
      const newSeries = series.map(s => ({ ...s, visible: true }));
      const wrapper = shallow(
        <GraphContainerStateless {...props} series={newSeries} />
      );
      const chips = getChips(wrapper);
      const allChip = chips.find('.select-all');
      expect(allChip.props().label).toBe('Hide All');
    });

    it('click on Select All triggers toggleSeries', () => {
      const wrapper = shallow(
        <GraphContainerStateless {...props} series={series} />
      );
      const chips = getChips(wrapper);
      const allChip = chips.find('.select-all');
      allChip.simulate('click');
      expect(props.toggleSeries).toBeCalledWith();
    });

    it('click on chip triggers toggleSeries with id', () => {
      const wrapper = shallow(
        <GraphContainerStateless {...props} series={series} />
      );
      const chips = getChips(wrapper);
      const chip = chips.find('.chip').not('.select-all').first();
      chip.simulate('click');
      expect(props.toggleSeries).toBeCalledWith(series[0].id);
    });

    it('renders selected chips as active', () => {
      const wrapper = shallow(
        <GraphContainerStateless {...props} series={series} />
      );
      const chips = getChips(wrapper).find('.chip.active');
      expect(chips).toHaveLength(series.filter(s => s.visible).length);
    });

    it('renders non selected chips', () => {
      const wrapper = shallow(
        <GraphContainerStateless {...props} series={series} />
      );
      const chips = getChips(wrapper)
        .find('.chip')
        .not('.active')
        .not('.select-all');
      expect(chips).toHaveLength(series.filter(s => !s.visible).length);
    });
  });
});
