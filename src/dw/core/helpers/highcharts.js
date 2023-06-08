/* eslint global-require:"off", import/no-extraneous-dependencies:"off" */
import ReactHighcharts from 'react-highcharts';
import ReactHighstock from 'react-highcharts/ReactHighstock';

import debug from 'debug';

const log = debug('devzone:helper:highcharts');

const Extensions = {
  Highcharts: [
    require('highcharts-exporting'),
    require('highcharts/modules/vector'),
    require('highcharts/modules/heatmap'),
    require('highcharts/modules/treemap'),
    require('highcharts/modules/no-data-to-display'),
    require('highcharts/modules/histogram-bellcurve'),
    require('highcharts/highcharts-more'),
  ],
  Highstock: [require('highcharts/modules/exporting')],
};

// Import Highcharts extensions
Extensions.Highcharts.map(ext => ext(ReactHighcharts.Highcharts));

// Import Highstock extnesions
Extensions.Highstock.map(ext => ext(ReactHighstock.Highcharts));

// Temp workaround to deal with highcharts errors
ReactHighcharts.Highcharts.error = function errorHandler(code, error) {
  log('Error in highcharts', code, error);
  // eslint-disable-next-line
  console.error(`http://highcharts.com/errors/${code}`);
};

export { ReactHighcharts, ReactHighstock };
