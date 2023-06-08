import React from 'react';
import { shallow } from 'enzyme';

import { GraphsStateful } from '../container';

describe('GraphsStateful component', () => {
  let component;
  let instance;
  let props;
  const statName = 'users-online';
  const onLoadMock = jest.fn();
  Date.now = jest.fn(() => 1536034845768);

  beforeEach(() => {
    props = {
      statName,
      timezone: 'UTC',
      getTimezoneOffset: jest.fn(),
      clearChart: jest.fn(),
      onLoad: onLoadMock,
      setColors: jest.fn(),
      source: '/stats/',
      series: [{}],
      externalSeries: [{}],
      graphConfig: {
        series: ['one'],
        data: [{ data: [], name: 'one' }],
        navigatorData: [[1, 2, 3, 4]],
        min: 0,
        max: 100,
      },
    };

    component = shallow(<GraphsStateful {...props} />);
  });

  it('should render LoadingComponent if graphConfig is null', () => {
    component.setProps({
      graphConfig: null,
    });
    expect(component).toMatchSnapshot();
  });

  it('should render GraphsStatelessComponent if store has graphConfig', () => {
    expect(component).toMatchSnapshot();
  });

  describe('render should', () => {
    beforeEach(() => {
      instance = component.instance();
      instance.render = jest.fn();
    });
    it('be called when graphConfig set to null', () => {
      component.setProps({
        ...props,
        graphConfig: null,
      });
      component.update();
      expect(instance.render).toBeCalled();
    });
    it('not be called when other props changed', () => {
      component.setProps({
        ...props,
        graphConfig: { ...instance.props.graphConfig, data: [{}, {}] },
      });
      component.update();
      expect(instance.render).not.toBeCalled();
    });
  });

  describe('onLoad should', () => {
    beforeEach(() => {
      onLoadMock.mockReset();
      instance.chart = {
        getChart: jest.fn(() => ({ showLoading: jest.fn() })),
      };
    });
    it('be called when min and max props are out of existing loaded range', () => {
      const e = { min: 0, max: 1000 };
      instance.afterSetExtremes(e);
      expect(instance.props.onLoad).toBeCalled();
    });
    it('not to be called when min and max props are in loaded range', () => {
      const e = { min: 1, max: 10 };
      instance.afterSetExtremes(e);
      expect(instance.props.onLoad).not.toBeCalled();
    });
  });

  describe('method', () => {
    const ids = [1, 2];
    const setData = jest.fn();
    const setVisible = jest.fn();
    const updateChart = jest.fn();
    beforeEach(() => {
      instance.chart = {
        getChart: jest.fn(() => ({
          stopLoading: jest.fn(),
          series: ids.map(id => ({
            id,
            setData,
            setVisible,
          })),
          update: updateChart,
          hideLoading: jest.fn(),
          redraw: jest.fn(),
        })),
      };
    });
    it('shouldChartUpdate should return true when series visibility changed', () => {
      expect(
        instance.shouldChartUpdate(props, {
          ...props,
          series: [{ id: 1, visible: true }],
        })
      ).toBe(true);
    });
    it('shouldChartUpdate should return true when external series visibility changed', () => {
      expect(
        instance.shouldChartUpdate(props, {
          ...props,
          externalSeries: [{ id: 2, visible: true }],
        })
      ).toBe(true);
    });
    it('shouldChartUpdate should return true when series min or max changed', () => {
      expect(
        instance.shouldChartUpdate(props, {
          ...props,
          graphConfig: { ...props.graphConfig, min: 25, max: 111 },
        })
      ).toBe(true);
    });
    it('shouldChartUpdate should return true when timezone changed', () => {
      expect(
        instance.shouldChartUpdate(props, {
          ...props,
          timezone: 'IST',
        })
      ).toBe(true);
    });
    it('shouldChartUpdate should return false when other props changed', () => {
      expect(
        instance.shouldChartUpdate(props, {
          ...props,
          min: 123,
          max: 123,
        })
      ).toBe(false);
    });
    it('updateChart sets series data, visibility and updates chart', () => {
      const update = false;
      const seriesData = [1, 2, 3, 4, 5];
      const externalSeriesData = [100, 200];
      const seriesVisibility = true;
      const externalSeriesVisibility = false;
      const newMin = 11;
      const newMax = 55;
      instance.updateChart({
        ...props,
        series: [{ id: 1, visible: seriesVisibility }],
        externalSeries: [
          {
            id: 2,
            visible: externalSeriesVisibility,
            data: externalSeriesData,
          },
        ],
        graphConfig: {
          ...props.graphConfig,
          data: [{ id: 1, data: seriesData }],
          min: newMin,
          max: newMax,
        },
      });
      expect(setData.mock.calls).toEqual([
        [seriesData, update],
        [externalSeriesData, update],
      ]);
      expect(setVisible.mock.calls).toEqual([
        [seriesVisibility, update],
        [externalSeriesVisibility, update],
      ]);
      expect(updateChart).toBeCalledWith(
        {
          navigator: {
            adaptToUpdatedData: false,
            series: { data: [[1, 2, 3, 4]] },
          },
          time: { getTimezoneOffset: props.getTimezoneOffset },
          xAxis: { max: newMax, min: newMin },
        },
        update
      );
    });
  });
});
