import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { getVariableMapping, printVariableMapping } from './helpers';

import styles from './index.module.css';

const CustomVariableRenderer = ({ value, activitySettings }) => {
  const variableMapping = getVariableMapping(activitySettings);
  const displayValue = printVariableMapping(value, variableMapping);
  return (
    <Tooltip title={displayValue}>
      <span className={styles.valueField}>{displayValue}</span>
    </Tooltip>
  );
};

CustomVariableRenderer.propTypes = {
  value: PropTypes.string.isRequired,
  activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CustomVariableRenderer;
