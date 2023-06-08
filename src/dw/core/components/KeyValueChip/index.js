import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Chip from '@material-ui/core/Chip';

import styles from './index.module.css';

const KeyValueChip = ({ chipKey, chipValue, ...props }) => (
  <Chip
    className={classNames(styles.tagChip)}
    label={`${chipKey}: ${chipValue}`}
    {...props}
  />
);

KeyValueChip.propTypes = {
  chipKey: PropTypes.string.isRequired,
  chipValue: PropTypes.string.isRequired,
};

export default KeyValueChip;
