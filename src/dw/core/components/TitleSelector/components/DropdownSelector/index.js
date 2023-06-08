import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '@material-ui/core/Icon';
import { PlatformIcon } from 'dw/core/components/Icons';

import styles from './index.module.css';

const DropdownSelector = ({
  currentTitle,
  currentEnv,
  toggleDropdown,
  usesMulticontext,
}) => (
  <div
    className={classNames(styles.dropdownSelector, 'row-flex')}
    onClick={toggleDropdown}
  >
    <div className={styles.title_details}>
      ({currentTitle.id}) - {currentTitle.name}
    </div>
    {!usesMulticontext && (
      <PlatformIcon platform={currentTitle.platform} size={22} />
    )}
    <div className={styles.env}>{currentEnv.shortType}</div>
    <Icon fontSize="small">arrow_drop_down</Icon>
  </div>
);

DropdownSelector.propTypes = {
  toggleDropdown: PropTypes.func.isRequired,
  currentTitle: PropTypes.object,
  currentEnv: PropTypes.object,
  usesMulticontext: PropTypes.bool,
};

DropdownSelector.defaultProps = {
  currentTitle: null,
  currentEnv: null,
  usesMulticontext: false,
};

export default DropdownSelector;
