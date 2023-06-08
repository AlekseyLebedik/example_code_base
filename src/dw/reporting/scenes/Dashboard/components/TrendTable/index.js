import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import moment from 'moment';
import { Link as DomLink } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Col, Row } from 'antd';

import { joinPath } from 'dw/core/helpers/path';
import AdapterLink from 'dw/core/components/AdapterLink';

import Loading from 'dw/core/components/LoadingSkeleton';
import Container from 'dw/reporting/components/ContainerWithBackground';
import { STAT_NAMES } from 'dw/reporting/constants';
import {
  STAT_LABELS,
  STAT_LABELS_SHORT,
} from 'dw/online-configuration/scenes/TitleEnvStats/constants';

import { WEEKS_NO } from '../../constants';

import styles from './index.module.css';

const getStatValue = (franchiseData, statName, start, end) => {
  if (!(franchiseData.stats && franchiseData.stats[statName] && start))
    return <Loading key={statName} width={40} />;
  const data = franchiseData.stats[statName].data
    .filter(d => d[0] >= start.valueOf() && d[0] < end.valueOf())
    .map(d => d[1]);
  return data.length > 0 ? Math.max(...data).toLocaleString('en-US') : null;
};

const weeklyDates = end =>
  range(WEEKS_NO)
    .map(idx => {
      const date = end ? moment(end).subtract(idx, 'weeks') : null;
      const startDate = moment(date).startOf('isoWeek').startOf('day');
      const endDate = moment(date).endOf('isoWeek').endOf('day');
      return date
        ? {
            date: date.valueOf(),
            startDay: startDate.format('YYYY-MM-DD'),
            endDay: endDate.format('YYYY-MM-DD'),
            start: startDate,
            end: endDate,
            key: idx,
          }
        : { key: idx };
    })
    .reverse();

export const TrendTableComponent = props => {
  const { franchiseData, baseUrl, width } = props;
  const mobile = width === 'xs';
  const weekLabels = weeklyDates(franchiseData.end);
  return (
    <div key="TrendTable" className={styles.container}>
      <Row className={styles.headers}>
        <Col xs={6} lg={6}>
          <Container type="light">Week</Container>
        </Col>
        {STAT_NAMES.map(statName => (
          <Col key={statName} xs={6} lg={6}>
            {mobile ? STAT_LABELS_SHORT[statName] : STAT_LABELS[statName]}
          </Col>
        ))}
      </Row>
      {weekLabels.map(l => (
        <Row key={l.key} className={styles.row}>
          <Col xs={6} lg={6} className={styles.weeklyDate}>
            {l.date ? `${l.startDay} to ${l.endDay}` : <Loading width={70} />}
          </Col>
          {STAT_NAMES.map(statName => {
            const getLink = () =>
              joinPath(
                baseUrl,
                'stats',
                statName,
                l.start ? l.start.valueOf() : null,
                l.end ? l.end.valueOf() : null
              );
            const value = getStatValue(franchiseData, statName, l.start, l.end);
            return (
              <Col key={statName} xs={6} lg={6} className={styles.trendValue}>
                {value === null && 'N/A'}
                {value && mobile ? (
                  <DomLink to={getLink()}>{value}</DomLink>
                ) : (
                  [
                    value,
                    l.date && (
                      <Tooltip
                        key="link"
                        title="View full report"
                        placement="top"
                      >
                        <IconButton
                          component={AdapterLink}
                          to={getLink()}
                          className="hoverable"
                        >
                          <Icon>assessment</Icon>
                        </IconButton>
                      </Tooltip>
                    ),
                  ]
                )}
              </Col>
            );
          })}
        </Row>
      ))}
    </div>
  );
};

TrendTableComponent.propTypes = {
  width: PropTypes.string.isRequired,
  franchiseData: PropTypes.object,
  baseUrl: PropTypes.string.isRequired,
};

TrendTableComponent.defaultProps = {
  franchiseData: {},
};

export default withWidth()(TrendTableComponent);
