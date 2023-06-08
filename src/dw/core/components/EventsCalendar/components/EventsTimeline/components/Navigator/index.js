import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from '@playpants/highcharts/highcharts-gantt';
import HighchartMore from '@playpants/highcharts/highcharts-more';

import {
  formatTooltipDateTime,
  getNowMillisecondsTimestamp,
} from '../../helpers';
import { DAY, HOUR } from '../../constants';

import styles from './index.module.css';

HighchartMore(Highcharts);
// Needed to pass time: { timezone: userTimezone }
window.moment = moment;

const Navigator = forwardRef(
  (
    {
      data,
      groupKey,
      loading,
      numberOfDays,
      range,
      setRange,
      startDay,
      userTimezone,
    },
    ref
  ) => {
    const today = getNowMillisecondsTimestamp();
    const fiveDaysPast = today - 5 * DAY;
    // keep all options in the state to avoid unnecessary updates
    const [chartOptions, setChartOptions] = useState({
      chart: {
        height: 93,
        spacing: [0, 15, 5, 15],
        marginBottom: -65,
      },
      credits: { enabled: false },
      navigator: {
        enabled: true,
        adaptToUpdatedData: false,
        liveRedraw: false,
        height: 75,
        margin: 0,
        series: { id: 'navigator', type: 'xrange', visible: true },
        yAxis: {
          type: 'treegrid',
          grid: { enabled: false },
          reversed: true,
          uniqueNames: true,
        },
        xAxis: {
          min: fiveDaysPast,
          type: 'datetime',
          currentDateIndicator: {
            label: {
              formatter() {
                return formatTooltipDateTime(chartOptions.value, userTimezone);
              },
            },
          },
        },
      },
      rangeSelector: { enabled: false },
      scrollbar: { enabled: true, liveRedraw: false, margin: 0 },
      series: [
        {
          data,
          colors: ['#bbb', '#bbb', '#bbb'],
          visible: false,
        },
      ],
      time: { timezone: userTimezone },
      tooltip: { enabled: false },
      xAxis: [{ visible: false, minRange: HOUR }, { visible: false }],
      yAxis: { visible: false, uniqueNames: true },
    });

    // make sure chart data range in state is always up to date
    const handleAfterSetExtremes = ({ min, max }) => setRange([min, max]);

    // handle state updates to series data only to prevent unnecessary updates to chart
    useEffect(() => {
      if (!loading) {
        setChartOptions({ series: [{ data }] });
        // TODO: Try to update nav as sidebar filters change... bug free
        const { chart } = ref.current;
        const nav = chart.get('navigator');
        nav.updateData(data);
      }
    }, [data.length, groupKey, loading, ref]);

    // handle range updates from outside
    useEffect(() => {
      const { chart } = ref.current;
      chart.xAxis[0].setExtremes(...range);
    }, [range, ref]);

    // Update navigator extremes view width dynamically with numberOfDays and range
    useEffect(() => {
      const { chart } = ref.current;
      const nav = chart.get('navigator');
      const dayRange = Math.max(numberOfDays, 30);
      const min = Math.min(range[0], fiveDaysPast);
      nav.xAxis.update({ min, max: startDay + dayRange * DAY });
      nav.updateData(data);
    }, [numberOfDays, range, ref]);

    // Add event listener to range slider updates
    useEffect(() => {
      const { chart } = ref.current;
      Highcharts.addEvent(
        chart.xAxis[0],
        'afterSetExtremes',
        handleAfterSetExtremes
      );
      return () => {
        Highcharts.removeEvent(
          chart.xAxis[0],
          'afterSetExtremes',
          handleAfterSetExtremes
        );
      };
    }, []);

    return (
      <HighchartsReact
        constructorType="ganttChart"
        containerProps={{ className: styles.navigatorContainer }}
        highcharts={Highcharts}
        options={chartOptions}
        ref={ref}
      />
    );
  }
);

Navigator.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  numberOfDays: PropTypes.number.isRequired,
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
  setRange: PropTypes.func.isRequired,
  userTimezone: PropTypes.string.isRequired,
  groupKey: PropTypes.string.isRequired,
  startDay: PropTypes.number.isRequired,
};

export default Navigator;
