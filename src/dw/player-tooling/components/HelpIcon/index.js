import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './index.module.css';

const HelpIcon = ({ heading, tooltip }) => (
  <>
    {heading}
    <Tooltip title={tooltip}>
      <Icon className={styles.helpIcon}>help_outline</Icon>
    </Tooltip>
  </>
);

HelpIcon.propTypes = {
  heading: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default HelpIcon;
