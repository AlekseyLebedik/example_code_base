import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import { NavbarChildContainer } from '@demonware/devzone-core/NavigationBar';

import './index.css';
import styles from './index.module.css';

function NavigationBar({
  setContextContainer,
  showAdminSettings,
  TitleSelectorComponent,
  AdminSettingsComponent,
}) {
  const isLocked = useSelector(
    state => state.Components.App?.currentTitleEnv?.locked
  );
  return (
    <NavbarChildContainer>
      <TitleSelectorComponent className={styles.titleSelector} />
      {showAdminSettings ? <AdminSettingsComponent /> : null}
      {isLocked ? (
        <Tooltip title="This title environment is locked. Some changes will not be allowed (such as Login Queue open state).">
          <Icon className={styles.lockIcon}>lock</Icon>
        </Tooltip>
      ) : null}
      <div
        className={classNames('context-selector', styles.contextSelector)}
        ref={setContextContainer}
      />
    </NavbarChildContainer>
  );
}

NavigationBar.propTypes = {
  setContextContainer: PropTypes.func,
  showAdminSettings: PropTypes.bool,
  TitleSelectorComponent: PropTypes.elementType,
  AdminSettingsComponent: PropTypes.elementType,
};
NavigationBar.defaultProps = {
  setContextContainer: () => {},
  showAdminSettings: false,
  TitleSelectorComponent() {
    return null;
  },
  AdminSettingsComponent() {
    return null;
  },
};

export default NavigationBar;
