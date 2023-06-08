import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import startCase from 'lodash/startCase';

import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { removeFalseyCountValues } from './helpers';
import { TOOLTIP } from './constants';
import * as styles from './index.module.css';

const BadgeCellRenderer = ({ classes, value }) => {
  const { deprecated, ...counts } = value;
  const filteredCounts = removeFalseyCountValues(counts);
  return (
    <div className={styles.container}>
      {deprecated && (
        <Tooltip title={TOOLTIP.deprecated} key="tooltip-deprecated">
          <Avatar
            className={classNames(classes.tpantsDeprecated, styles.avatar)}
            key="icon-deprecated"
            variant="square"
          >
            <Typography className={styles.badgeText}>!</Typography>
          </Avatar>
        </Tooltip>
      )}
      {Object.entries(filteredCounts).map(([countKey, countValue]) => (
        <Tooltip title={TOOLTIP[countKey]} key={`tooltip-${countKey}`}>
          <Avatar
            className={classNames(
              classes[`tpantsBadge${startCase(countKey)}`],
              styles.avatar
            )}
            key={`avatar-${countKey}`}
          >
            <Typography className={styles.badgeText}>{countValue}</Typography>
          </Avatar>
        </Tooltip>
      ))}
    </div>
  );
};

BadgeCellRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
};

export default BadgeCellRenderer;
