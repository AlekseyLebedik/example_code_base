import React from 'react';
import { shallow } from 'enzyme';

import GraphContainer from '../container';

describe('GraphContainer', () => {
  const series = [
    { id: 1, name: 'My cool project', short: 'mcp', color: 'red' },
    { id: 2, name: 'ghosts' },
    { id: 'total', name: 'Total' },
  ];
  const props = { source: '' };

  it('renders GraphContainerStateless', () => {
    const wrapper = shallow(<GraphContainer {...props} series={series} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('toggleSeries', () => {
    const allEnabled = visibility =>
      Object.values(visibility).every(item => !!item);
    const allDisabled = visibility =>
      Object.values(visibility).every(item => !item);
    it('single item on', () => {
      const id = 2;
      const newSeries = series.map(s =>
        s.id === id ? { ...s, visible: false } : s
      );
      const wrapper = shallow(<GraphContainer {...props} series={newSeries} />);
      expect(wrapper.state().visibility[id]).toBeFalsy();
      wrapper.instance().toggleSeries(id);
      expect(wrapper.state().visibility[id]).toBeTruthy();
    });

    it('single item off', () => {
      const id = 2;
      const wrapper = shallow(<GraphContainer {...props} series={series} />);
      expect(wrapper.state().visibility[id]).toBeTruthy();
      wrapper.instance().toggleSeries(id);
      expect(wrapper.state().visibility[id]).toBeFalsy();
    });

    it('all on', () => {
      const newSeries = series.map(s => ({ ...s, visible: false }));
      const wrapper = shallow(<GraphContainer {...props} series={newSeries} />);
      expect(allDisabled(wrapper.state().visibility)).toBeTruthy();
      wrapper.instance().toggleSeries();
      expect(allEnabled(wrapper.state().visibility)).toBeTruthy();
    });

    it('all off', () => {
      const wrapper = shallow(<GraphContainer {...props} series={series} />);
      expect(allEnabled(wrapper.state().visibility)).toBeTruthy();
      wrapper.instance().toggleSeries();
      expect(allDisabled(wrapper.state().visibility)).toBeTruthy();
    });
  });
  describe('chartRef', () => {
    it('renders correct chart instance', () => {
      const wrapper = shallow(<GraphContainer {...props} series={series} />);
      const instance = wrapper.instance();
      instance.chartRef('chart');
      expect(instance.charts).toEqual(['chart']);
    });
  });
  describe('printGraphs', () => {
    it('prints to the window', () => {
      const origPrint = window.print;
      window.print = jest.fn();
      const chart = document.createElement('div');
      document.body.appendChild(chart);
      const wrapper = shallow(<GraphContainer {...props} series={series} />);
      const instance = wrapper.instance();
      instance.chartRef(chart);
      instance.printGraphs();
      expect(window.print).toBeCalled();
      window.print = origPrint;
    });
  });
});
