import React from 'react';
import PropTypes from 'prop-types';
import { ReactHighcharts } from 'dw/core/helpers/highcharts';

const ServerStateChart = props => (
  <div>
    <ReactHighcharts
      config={{
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        title: {
          text: 'Server Allocation',
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          pointFormat: '<strong>{point.y}</strong> ({point.percentage:.1f}%)',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
          },
        },
        series: [
          {
            data: [
              {
                name: 'Idle',
                sliced: true,
                selected: true,
                y: props.counters.idle,
              },
              { name: 'Allocated', y: props.counters.allocated },
            ],
          },
        ],
      }}
    />
  </div>
);

ServerStateChart.propTypes = {
  counters: PropTypes.shape({
    idle: PropTypes.number,
    allocated: PropTypes.number,
  }).isRequired,
};

export default ServerStateChart;
