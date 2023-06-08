import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { GAMEMODES_STAT } from 'dw/reporting/constants';

import CircularProgress from '@material-ui/core/CircularProgress';
import debounce from 'lodash/debounce';
import {
  timezoneOrDefaultSelector,
  getTimezoneOffsetSelector,
} from 'dw/core/helpers/date-time';

import { clearChart, fetchStatsData } from './actions';
import graphSelector, {
  enabledSeriesSelector,
  findSeries,
  sourceSelector,
} from './selectors';
import GraphsStatelessComponent from './presentational';
import { BASE_GRAPH_CONFIG, TOTAL_COLOR } from './constants';

import styles from './index.module.css';

const GAMEMODE_SERIES = [
  { id: 'multiplayer', name: 'Multiplayer' },
  { id: 'zombies', name: 'Zombies' },
  { id: 'blackout', name: 'Blackout' },
  { id: 'in-menu', name: 'In-Menu' },
];

const stateToProps = (state, props) => {
  const graphConfig = graphSelector(state)(props.statName);
  let { series } = props;
  if (
    graphConfig &&
    graphConfig.series &&
    graphConfig.series.length > props.series.length
  ) {
    series = graphConfig.series.map(gsName => {
      const s = props.series.find(ps => [ps.id, ps.name].includes(gsName));
      return s || { id: gsName, name: gsName, visible: true };
    });
  }
  return {
    graphConfig,
    source: sourceSelector(props.source),
    getTimezoneOffset: getTimezoneOffsetSelector(state),
    timezone: timezoneOrDefaultSelector(state),
    initialSeries: props.series,
    series: props.statName === GAMEMODES_STAT ? GAMEMODE_SERIES : series,
  };
};

const dispatchToProps = dispatch => ({
  onLoad: (statName, source, props) => {
    dispatch(fetchStatsData(statName, source, props));
  },
  clearChart: statName => dispatch(clearChart(statName)),
});

class Graph extends Component {
  componentDidMount() {
    this.props.onLoad(this.props.statName, this.props.source);
  }

  shouldComponentUpdate(nextProps) {
    if (!(nextProps.graphConfig && this.props.graphConfig)) {
      return true;
    }
    if (this.shouldChartUpdate(this.props, nextProps)) {
      this.updateChart(nextProps);
    }
    return false;
  }

  componentWillUnmount() {
    this.props.clearChart(this.props.statName);
  }

  getRef = el => {
    this.chart = el;
  };

  shouldChartUpdate = (prevProps, nextProps) => {
    const { min, max } = nextProps.graphConfig;
    return (
      prevProps.graphConfig.min !== min || // Range Selector changed
      prevProps.graphConfig.max !== max ||
      enabledSeriesSelector(prevProps.externalSeries) !==
        enabledSeriesSelector(nextProps.externalSeries) || // Changed external series visibility
      enabledSeriesSelector(prevProps.series) !==
        enabledSeriesSelector(nextProps.series) || // Changed series visibility
      (prevProps.statName === GAMEMODES_STAT &&
        enabledSeriesSelector(prevProps.initialSeries) !==
          enabledSeriesSelector(nextProps.initialSeries)) || // Changed global series visibility
      prevProps.timezone !== nextProps.timezone // Changed timezone
    );
  };

  updateChart = props => {
    const { data, min, max } = props.graphConfig;
    if (!this.chart) return;

    const chart = this.chart.getChart();
    if (props.statName === GAMEMODES_STAT) {
      const enabledSeries = props.initialSeries
        .filter(el => el.visible)
        .map(el => el.id);
      const filteredData = data.filter(item =>
        item.title
          ? enabledSeries.indexOf(item.title) > -1
          : enabledSeries.indexOf(item.id) > -1
      );
      const groupedData = d3
        .nest()
        .key(d => d.id)
        .entries(filteredData)
        .map(d => ({
          id: d.key,
          data: d3
            .nest()
            .key(d1 => d1[0])
            .rollup(leaves => leaves.map(l => l[1]).reduce((a, b) => a + b, 0))
            .entries([].concat(...d.values.map(series => series.data)))
            .map(d1 => [parseInt(d1.key, 10), d1.value]),
        }));
      if (groupedData.length === 0) {
        chart.series.forEach(series => {
          series.setVisible(false, false);
        });
      } else {
        groupedData.forEach(el => {
          const series = chart.get(el.id);
          if (series) {
            series.setVisible(true, false);
            if (el.data) {
              series.setData(
                el.data.sort((a, b) => a[0] - b[0]),
                false
              );
            }
          }
        });
      }
    } else {
      [...data, ...props.externalSeries].forEach(el => {
        const series = findSeries(el, chart.series);
        const seriesCfg = findSeries(el, props.series) || el;
        if (series && seriesCfg) {
          series.setVisible(seriesCfg.visible, false);
          if (el.data) {
            series.setData(
              el.data.sort((a, b) => a[0] - b[0]),
              false
            );
          }
        }
      });
    }
    chart.update(
      {
        time: {
          getTimezoneOffset: props.getTimezoneOffset,
        },
        xAxis: { min, max },
        navigator: {
          adaptToUpdatedData: false,
          series: {
            data: props.graphConfig.navigatorData.sort((a, b) => a[0] - b[0]),
          },
        },
      },
      false
    );
    if (this.props.timezone !== props.timezone) {
      const rangeSelector = BASE_GRAPH_CONFIG.rangeSelector(props.timezone);
      chart.update(
        {
          tooltip: BASE_GRAPH_CONFIG.tooltip(props.timezone),
        },
        false
      );
      chart.rangeSelector.options.inputDateParser =
        rangeSelector.inputDateParser;
    }
    chart.redraw();
    chart.hideLoading();
  };

  afterSetExtremes = e => {
    if (!this.chart) return;
    const { min, max } = e;
    const chart = this.chart.getChart();
    // Once we have requested range we don't need to request another one which is subset of previous one.
    if (
      this.props.graphConfig.min === undefined ||
      this.props.graphConfig.max === undefined ||
      min < this.props.graphConfig.min ||
      max > this.props.graphConfig.max
    ) {
      chart.showLoading('Loading data from server...');
      this.props.onLoad(this.props.statName, this.props.source, {
        start: min,
        end: max,
        params: this.props.params,
      });
    }
    this.props.setColors(chart);
  };

  graphConfig = () => {
    const series = this.props.series.map(line => {
      const seriesStats =
        this.props.graphConfig &&
        this.props.graphConfig.data.find(s => s.id === line.id);
      return {
        ...line,
        color: line.id === 'total' ? TOTAL_COLOR : line.color,
        name: line.id === 'total' ? 'Total' : line.name,
        data:
          (seriesStats && [
            ...seriesStats.data.sort((a, b) => a[0] - b[0]),
            [Date.now(), null],
          ]) ||
          [],
      };
    });
    const config = {
      ...BASE_GRAPH_CONFIG,
      tooltip: BASE_GRAPH_CONFIG.tooltip(this.props.timezone),
      rangeSelector: BASE_GRAPH_CONFIG.rangeSelector(this.props.timezone),
      time: {
        getTimezoneOffset: this.props.getTimezoneOffset,
      },
      navigator: {
        adaptToUpdatedData: false,
        series: {
          lineColor: TOTAL_COLOR,
          data:
            (this.props.graphConfig && [
              ...this.props.graphConfig.navigatorData.sort(
                (a, b) => a[0] - b[0]
              ),
              [Date.now(), null],
            ]) ||
            [],
        },
      },
      series: [...series, ...this.props.externalSeries],
      xAxis: {
        type: 'datetime',
        min: this.props.start || this.props.graphConfig.min,
        max: this.props.end || this.props.graphConfig.max,
        events: {
          afterSetExtremes: debounce(this.afterSetExtremes, 500),
        },
        minRange: 3600 * 1000, // one hour
      },
    };
    return config;
  };

  render() {
    const LoadingComponent = () => (
      <div className={styles.loading}>
        <CircularProgress size={80} thickness={5} />
      </div>
    );
    const NoDataComponent = () => (
      <div className="no-data">No data to display</div>
    );
    if (!this.props.graphConfig) {
      return <LoadingComponent />;
    }
    return this.props.graphConfig.navigatorData &&
      this.props.graphConfig.navigatorData.length > 0 ? (
      <GraphsStatelessComponent
        {...this.props}
        getRef={this.getRef}
        config={this.graphConfig()}
      />
    ) : (
      <NoDataComponent />
    );
  }
}

Graph.propTypes = {
  onLoad: PropTypes.func.isRequired,
  clearChart: PropTypes.func.isRequired,
  statName: PropTypes.string.isRequired,
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      resource: PropTypes.string,
      withTitleEnv: PropTypes.bool,
    }),
  ]).isRequired,
  params: PropTypes.object,
  graphConfig: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    series: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.object),
    navigatorData: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      )
    ),
  }),
  externalSeries: PropTypes.arrayOf(PropTypes.object),
  series: PropTypes.arrayOf(PropTypes.object),
  getTimezoneOffset: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
  setColors: PropTypes.func,
  start: PropTypes.number,
  end: PropTypes.number,
};

Graph.defaultProps = {
  graphConfig: null,
  params: {},
  series: null,
  externalSeries: [],
  setColors: () => {},
  start: null,
  end: null,
};

export default connect(stateToProps, dispatchToProps)(Graph);

export { Graph as GraphsStateful };
