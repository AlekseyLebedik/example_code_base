import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import Graph from 'dw/devzone/components/Graph';

import { PlatformIcon, ProjectIcon } from 'dw/core/components/Icons';
import Container from 'dw/reporting/components/ContainerWithBackground';

import { STAT_NAMES } from 'dw/reporting/constants';
import {
  STAT_LABELS,
  STAT_LABELS_SHORT,
} from 'dw/online-configuration/scenes/TitleEnvStats/constants';

import styles from './index.module.css';

const getAvatar = ({ id, name, short, platform }) => {
  if (id === 'total') return null;
  if (platform) {
    return (
      <Avatar className={styles.avatar}>
        <PlatformIcon platform={platform} className={styles.icon} />
      </Avatar>
    );
  }
  return (
    <Avatar className={styles.avatar}>
      <ProjectIcon name={short || name} className={styles.icon} size={18} />
    </Avatar>
  );
};
getAvatar.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  short: PropTypes.string,
  platform: PropTypes.string,
};
getAvatar.defaultProps = {
  short: null,
  platform: null,
};

const getGraph = props => {
  const { statName, chartRef, source, series, start, end } = props;
  const header = (
    <Container className={styles.header}>
      <div className={`${styles.name} mobile-hidden`}>
        {STAT_LABELS[statName]}
      </div>
      <div className={`${styles['name-short']} mobile-only`}>
        {STAT_LABELS_SHORT[statName]}
      </div>
    </Container>
  );
  return (
    <div className={styles.Graph__container} key={statName} ref={chartRef}>
      {header}
      <Graph
        statName={statName}
        source={source}
        series={series}
        start={start}
        end={end}
        chartRef={chartRef}
      />
    </div>
  );
};

getGraph.propTypes = {
  statName: PropTypes.string.isRequired,
  chartRef: PropTypes.func.isRequired,
  source: PropTypes.string.isRequired,
  series: PropTypes.arrayOf(PropTypes.object),
  start: PropTypes.number,
  end: PropTypes.number,
};
getGraph.defaultProps = {
  series: null,
  start: null,
  end: null,
};

const Chips = props => {
  const { series, toggleSeries } = props;
  const chips = series
    ? series.map(s => (
        <Chip
          key={s.id}
          className={classNames(styles.chip, { active: s.visible })}
          color={s.visible ? 'primary' : undefined}
          variant={!s.visible ? 'outlined' : undefined}
          avatar={getAvatar(s)}
          onClick={() => toggleSeries(s.id)}
          onDelete={() => toggleSeries(s.id)}
          label={
            <>
              <span className="mobile-hidden">{s.name}</span>
              <span className="mobile-only">{s.short}</span>
            </>
          }
          deleteIcon={
            <Icon
              style={{
                color: s.color,
              }}
            >
              timeline
            </Icon>
          }
        />
      ))
    : [];

  if (series && series.length > 1) {
    chips.splice(
      0,
      0,
      <Chip
        key="select-all"
        className={classNames(styles.chip, 'select-all')}
        onClick={() => props.toggleSeries()}
        label={props.series.every(s => s.visible) ? 'Hide All' : 'Select All'}
        variant="outlined"
      />
    );
  }
  return <div className={styles.chips}>{chips}</div>;
};

Chips.propTypes = {
  toggleSeries: PropTypes.func.isRequired,
  series: PropTypes.arrayOf(PropTypes.object),
};
Chips.defaultProps = {
  series: null,
};

const GraphContainerStateless = props => (
  <div className={styles.container}>
    <div>
      <div className="flex justify-between items-end">
        <Chips {...props} />
        <IconButton className={styles.printBtn} onClick={props.printGraphs}>
          <Icon>print</Icon>
        </IconButton>
      </div>
    </div>
    <div className={styles.graphs}>
      {props.stats.map(statName => getGraph({ ...props, statName }))}
    </div>
  </div>
);

GraphContainerStateless.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.string),
  printGraphs: PropTypes.func.isRequired,
};

GraphContainerStateless.defaultProps = {
  stats: STAT_NAMES,
};

export default GraphContainerStateless;
