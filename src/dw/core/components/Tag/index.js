import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import styles from './index.module.css';

const Tag = ({ id, name, onDelete }) => (
  <div
    className={classNames(styles.tag, {
      [styles.deletable]: Boolean(onDelete),
    })}
  >
    <Tooltip title={name}>
      <div className={styles.name}>{name}</div>
    </Tooltip>
    {onDelete && (
      <Tooltip title="Delete">
        <IconButton
          className={styles.deleteButton}
          onClick={() => onDelete(id || name)}
        >
          <Icon>clear</Icon>
        </IconButton>
      </Tooltip>
    )}
  </div>
);
Tag.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};
Tag.defaultProps = {
  id: undefined,
  onDelete: undefined,
};

export default Tag;
