import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Markdown from 'markdown-to-jsx';
import moment from 'moment';
import { CriticalEvents, Maintenance } from './components/Events';
import { RedBadge, OrangeBadge } from './components/ColorBadges';
import * as fs from '../../../access/FeatureSwitchesCheck/featureSwitches';
import IconMenu from '../../../components/IconMenu';
import styles from './index.module.css';

function NotificationStateless({
  devzoneReleaseNote,
  eventManagerReleaseNote,
  frameworkReleaseNote,
  criticalEventsList,
  currentMaintenanceList,
  toggleBadge,
  setToggleBadge,
  badgeCount,
  showUnread,
  setUnread,
  hasFeatureSwitch,
}) {
  const getCorrectComponentOrder = [
    eventManagerReleaseNote,
    frameworkReleaseNote,
  ]
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    .map(item => (
      <div className={styles.rnContainer} key={`${item.component}Rn`}>
        {item && Object.keys(item).length > 0 && (
          <>
            <span className={styles.releaseHeader}>
              {item.component} - Release {item.version} -{' '}
              {moment(item.release_date).format('Do MMMM YYYY')}
            </span>
            {showUnread[item.component] ? (
              <span className={styles.unreadBanner}>Unread</span>
            ) : null}
            <Markdown
              options={{
                overrides: {
                  ul: {
                    props: {
                      className: styles.ulStyles,
                    },
                  },
                  h2: {
                    props: {
                      className: styles.heading,
                    },
                  },
                  li: {
                    props: {
                      className: styles.list,
                    },
                  },
                },
              }}
            >
              {item.description}
            </Markdown>
          </>
        )}
      </div>
    ));

  const getProfileOptions = onClose => [
    <Icon className={styles.close} onClick={() => onClose()} key="close-icon">
      close
    </Icon>,
    hasFeatureSwitch([fs.NOTIFICATIONS_CRITICAL_EVENTS], false) ? (
      <CriticalEvents
        key="critical-events-component"
        criticalEventsList={criticalEventsList}
        showUnread={showUnread}
      />
    ) : null,
    hasFeatureSwitch([fs.MAINTENANCE_ACTIVE], false) ? (
      <Maintenance
        key="maintenance-component"
        maintenanceList={currentMaintenanceList}
        showUnread={showUnread}
      />
    ) : null,
    <div className={styles.rnContainer} key="devzoneRN">
      {devzoneReleaseNote && Object.keys(devzoneReleaseNote).length > 0 && (
        <>
          <span className={styles.releaseHeader}>
            Devzone - Release - {devzoneReleaseNote.version} -{' '}
            {moment(devzoneReleaseNote.release_date).format('Do MMMM YYYY')}
          </span>
          {showUnread.devzone ? (
            <span className={styles.unreadBanner}>Unread</span>
          ) : null}
          <Markdown
            options={{
              overrides: {
                ul: { props: { className: styles.ulStyles } },
                h2: { props: { className: styles.heading } },
                li: { props: { className: styles.list } },
              },
            }}
          >
            {devzoneReleaseNote.description}
          </Markdown>
        </>
      )}
    </div>,
    ...getCorrectComponentOrder,
    <MenuItem
      value="view-more"
      key="view-more"
      component={Link}
      to="/docs/devzone/release-notes"
      onClick={() => onClose()}
      style={{
        color: '#4AC0F1',
        fontSize: '10px',
        opacity: '1',
        textAlign: 'center',
        marginRight: 'auto',
        textTransform: 'uppercase',
        fontWeight: 'bolder',
      }}
    >
      View More Release Notes
    </MenuItem>,
  ];

  return (
    <div className={styles.dropdownContainer}>
      <IconMenu
        paperStyles={{
          margin: '8px',
          backgroundColor: '#282c34',
          color: '#fff',
          overflowX: 'hidden',
          maxHeight: 'auto',
          width: '400px',
        }}
        onClick={() => {
          setToggleBadge(true);
          setUnread({
            devzone: false,
            EventManager: false,
            Frameworks: false,
            Maintenance: false,
          });
        }}
        icon={
          <Tooltip title="Notifications">
            {showUnread.Maintenance &&
            !showUnread.devzone &&
            !showUnread.EventManager &&
            !showUnread.Frameworks ? (
              <OrangeBadge invisible={toggleBadge} badgeContent={badgeCount}>
                <Icon className={styles.iconStyle}>notifications</Icon>
              </OrangeBadge>
            ) : (
              <RedBadge invisible={toggleBadge} badgeContent={badgeCount}>
                <Icon className={styles.iconStyle}>notifications</Icon>
              </RedBadge>
            )}
          </Tooltip>
        }
        ButtonProps={{ style: { padding: 0 } }}
      >
        {onClose => getProfileOptions(onClose)}
      </IconMenu>
    </div>
  );
}

NotificationStateless.propTypes = {
  badgeCount: PropTypes.number,
  criticalEventsList: PropTypes.arrayOf(PropTypes.object),
  currentMaintenanceList: PropTypes.arrayOf(PropTypes.object),
  devzoneReleaseNote: PropTypes.object,
  eventManagerReleaseNote: PropTypes.object,
  frameworkReleaseNote: PropTypes.object,
  hasFeatureSwitch: PropTypes.func.isRequired,
  setToggleBadge: PropTypes.func,
  setUnread: PropTypes.func,
  showUnread: PropTypes.object,
  toggleBadge: PropTypes.bool,
};

NotificationStateless.defaultProps = {
  badgeCount: null,
  criticalEventsList: [],
  currentMaintenanceList: [],
  devzoneReleaseNote: {},
  eventManagerReleaseNote: {},
  frameworkReleaseNote: {},
  setToggleBadge: () => {},
  setUnread: () => {},
  showUnread: {},
  toggleBadge: false,
};

export default NotificationStateless;
