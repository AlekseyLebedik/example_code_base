import React from 'react';
import PropTypes from 'prop-types';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import { Link as DomLink } from 'react-router-dom';

import Tooltip from '@material-ui/core/Tooltip';
import withWidth from '@material-ui/core/withWidth';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';

import { joinPath } from 'dw/core/helpers/path';
import AdapterLink from 'dw/core/components/AdapterLink';

import { STAT_NAMES } from 'dw/reporting/constants';
import { STAT_LABELS } from 'dw/online-configuration/scenes/TitleEnvStats/constants';

import TrendChartsLoading from './components/TrendChartsLoading';

import { GRAPH_CONFIG, LINE_COLOR } from './constants';

import './index.css';
import styles from './index.module.css';

const StatHeader = ({ statName, baseUrl, width }) => {
  const mobile = width === 'xs';
  return (
    <div className={styles.chartHeader}>
      {mobile ? (
        <DomLink to={joinPath(baseUrl, 'stats', statName)}>
          {STAT_LABELS[statName]}
        </DomLink>
      ) : (
        <>
          {STAT_LABELS[statName]}
          <Tooltip title="View full report">
            <IconButton
              component={AdapterLink}
              to={joinPath(baseUrl, 'stats', statName)}
              className="hoverable"
            >
              <Icon>visibility</Icon>
            </IconButton>
          </Tooltip>
        </>
      )}
    </div>
  );
};

StatHeader.propTypes = {
  statName: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

const Chart = ({ franchiseData, statName }) => {
  if (franchiseData.stats[statName].data.length === 0) {
    return <div className={styles.nodata}>No data to display</div>;
  }
  const today = moment({ h: 0, m: 0, s: 0, ms: 0 }).valueOf();
  const data = franchiseData.stats[statName].data.filter(s => s[0] < today);
  const config = {
    ...GRAPH_CONFIG,
    plotOptions: {
      line: {
        dataGrouping: { enabled: false },
      },
    },
    series: [
      {
        ...franchiseData.stats[statName],
        data,
        name: STAT_LABELS[statName],
        color: LINE_COLOR,
      },
    ],
  };
  return <ReactHighstock config={config} />;
};

Chart.propTypes = {
  statName: PropTypes.string.isRequired,
  franchiseData: PropTypes.object,
};

Chart.defaultProps = {
  franchiseData: null,
};

export const TrendChartsComponent = ({ franchiseData, baseUrl, width }) => (
  <div className={styles.trendCharts}>
    <DomLink className={styles.header} to={joinPath(baseUrl, 'stats')}>
      Franchise
    </DomLink>
    {STAT_NAMES.map(statName => (
      <div key={statName}>
        <StatHeader statName={statName} baseUrl={baseUrl} width={width} />
        {franchiseData.stats && franchiseData.stats[statName] ? (
          <Chart statName={statName} franchiseData={franchiseData} />
        ) : (
          <TrendChartsLoading />
        )}
      </div>
    ))}
  </div>
);

TrendChartsComponent.propTypes = {
  franchiseData: PropTypes.object,
  baseUrl: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

TrendChartsComponent.defaultProps = {
  franchiseData: null,
};

export default withWidth()(TrendChartsComponent);
