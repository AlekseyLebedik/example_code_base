import { formatDateTime, getTimezoneOffset } from 'dw/core/helpers/date-time';

export const TOTAL_COLOR = '#AA4643';

export const COLORS_MAP = {
  t8: '#EE7127',
  ww2: '#9E9034',
  s2: '#9E9034',
  iw: '#000000',
  ops3: '#FEC000',
  aw: '#CC9822',
  ghosts: '#5F82A2',
  ops2: '#C8C8C8',
  ps4: '#1174CB',
  ps3: '#C8C8C8',
  'xbox one': '#1A7C1B',
  xbox360: '#8CC249',
  'pc-steam': '#000000',
  'pc-bnet': '#1C87C8',
  wii: '#999999',
  'wii-u': '#1AA3CD',
};

export const COLORS = [
  '#7cb5ec',
  '#90ed7d',
  '#f7a35c',
  '#8085e9',
  '#f15c80',
  '#e4d354',
  '#2b908f',
  '#f45b5b',
  '#91e8e1',
];

export const BASE_GRAPH_CONFIG = {
  colors: COLORS,
  credits: {
    enabled: false,
  },
  legend: {
    enabled: true,
  },
  tooltip: timezone => ({
    split: false,
    shared: true,
    /* eslint-disable-next-line */
    formatter: function () {
      const tmp = this.points;
      let txt = '';

      tmp.sort((a, b) => a.y < b.y);

      tmp.forEach(point => {
        if (!txt) {
          txt += `<span style="font-weight: 900; font-size: 10px">${formatDateTime(
            point.x / 1000,
            undefined,
            timezone
          )}</span></br>`;
        }
        txt += `<span style="color:${point.series.color}">●</span> ${
          point.series.name
        }: <b>${point.y.toLocaleString('en-US')}</b><br/>`;
      });

      return txt;
    },
    valueDecimals: 0,
    useHTML: true,
    style: {
      width: '240px',
    },
  }),
  yAxis: {
    opposite: false,
    labels: {
      /* eslint-disable-next-line */
      formatter: function () {
        if (this.value >= 1e6) {
          return `${this.value / 1e6}M`;
        }
        if (this.value >= 1e3) {
          return `${this.value / 1e3}k`;
        }
        return this.value;
      },
    },
  },
  rangeSelector: timezone => ({
    selected: 1,
    allButtonsEnabled: true,
    buttons: [
      {
        type: 'day',
        count: 1,
        text: '1d',
      },
      {
        type: 'week',
        count: 1,
        text: '1w',
      },
      {
        type: 'month',
        count: 1,
        text: '1m',
      },
      {
        type: 'month',
        count: 3,
        text: '3m',
      },
      {
        type: 'month',
        count: 6,
        text: '6m',
      },
      {
        type: 'ytd',
        text: 'YTD',
      },
      {
        type: 'year',
        count: 1,
        text: '1y',
      },
      {
        type: 'all',
        text: 'All',
      },
    ],
    inputDateFormat: '%b %e, %Y %H:%M',
    inputEditDateFormat: '%Y-%m-%d %H:%M',
    inputBoxWidth: 120,
    inputDateParser(value) {
      const timestamp = Date.parse(value);
      const getOffset = getTimezoneOffset(timezone);
      const offset =
        getOffset(timestamp) - new Date(timestamp).getTimezoneOffset();
      return timestamp + offset * 60 * 1000;
    },
  }),
  plotOptions: {
    line: {
      pointInterval: 600,
      dataGrouping: { enabled: false },
    },
  },
};
