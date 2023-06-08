import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import AdapterLink from '../../../components/RouteAdapterLink';
import IconMenu from '../../../components/IconMenu';
import styles from './index.module.css';

function Dropdown() {
  const getProfileOptions = onClose => [
    <MenuItem key="started" disabled>
      <span className={styles.label}>
        <strong>Getting Started Guide</strong>
      </span>
    </MenuItem>,
    <Divider key="divider" />,
    <MenuItem
      onClick={() => onClose()}
      component={AdapterLink}
      key="admin"
      to="/docs/demonware/admin"
    >
      Demonware Admin
    </MenuItem>,
    <MenuItem
      value="user"
      key="user"
      component={AdapterLink}
      to="/docs/devzone/users"
      onClick={() => onClose()}
    >
      Devzone User
    </MenuItem>,
    <MenuItem
      key="g-developer"
      component={AdapterLink}
      to="/docs/devzone/game-developers"
      onClick={() => onClose()}
    >
      Game Developer
    </MenuItem>,
    <MenuItem
      key="developer"
      component={AdapterLink}
      to="/docs/devzone/devzone-developers"
      onClick={() => onClose()}
    >
      Devzone Developer
    </MenuItem>,
    <MenuItem
      key="releasenotes"
      component={AdapterLink}
      to="/docs/devzone/release-notes"
      onClick={() => onClose()}
    >
      Release Notes
    </MenuItem>,
    <MenuItem
      key="upcomingfeatures"
      component={AdapterLink}
      to="/docs/devzone/upcoming-features"
      onClick={() => onClose()}
    >
      Upcoming Features
    </MenuItem>,
  ];

  return (
    <div className={styles.dropdownContainer}>
      <IconMenu
        paperStyles={{ marginTop: '8px', maxHeight: 'none' }}
        icon={
          <Tooltip title="Help">
            <Icon className={styles.iconStyle}>help_outline</Icon>
          </Tooltip>
        }
        ButtonProps={{ style: { padding: 0 } }}
      >
        {onClose => getProfileOptions(onClose)}
      </IconMenu>
    </div>
  );
}

export default Dropdown;
