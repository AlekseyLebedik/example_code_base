import React from 'react';
import Icon from '@material-ui/core/Icon';

import styles from './index.module.css';

const NOTIFICATIONS_TYPE_MAP = {
  success: { icon: 'done', classname: styles.notificationSuccess },
  info: { icon: 'info_outline', classname: styles.notificationInfo },
  error: { icon: 'warning', classname: styles.notificationError },
};

export default (type, msg) => {
  const { icon, classname } = NOTIFICATIONS_TYPE_MAP[type];
  return (
    <div className={classname} data-cy={`notifications-${type}`}>
      <Icon className={styles.icon} fontSize="small">
        {icon}
      </Icon>
      <div>{msg}</div>
    </div>
  );
};
