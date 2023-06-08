import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PlayerSelector from 'dw/online-configuration/components/PlayerSelector';
import FavoriteCommands from './components/FavoriteCommands';
import RecentCommands from './components/RecentCommands';
import CommandSender from './components/CommandSender';
import PanelContainer from './components/PanelContainer';
import styles from './presentational.module.css';

const RemoteCommandsStateless = ({ userId, onSelectUser }) => (
  <div className={styles.container}>
    <div className={styles.headerContainer}>
      <PlayerSelector playerId={userId} onPlayerChange={onSelectUser} />
    </div>
    <div className={styles.content}>
      <div className={classNames(styles.flexContainer, styles.commandGroup)}>
        <div className={styles.flexContainer}>
          <PanelContainer
            header="New command"
            Component={() => (
              <div className={styles.flexContainer}>
                <CommandSender label="Select user and type new command" />
              </div>
            )}
          />
        </div>
        <div className={styles.flexContainer}>
          <PanelContainer
            header="Recent commands"
            Component={() => (
              <div className={styles.flexContainer}>
                <RecentCommands />
              </div>
            )}
          />
        </div>
      </div>
      <div className={classNames(styles.flexContainer, styles.favoritesGroup)}>
        <PanelContainer
          header="Favorite commands"
          Component={() => (
            <div className={styles.flexContainer}>
              <FavoriteCommands />
            </div>
          )}
        />
      </div>
    </div>
  </div>
);

RemoteCommandsStateless.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSelectUser: PropTypes.func,
};

RemoteCommandsStateless.defaultProps = {
  userId: null,
  onSelectUser: () => {},
};

export default RemoteCommandsStateless;
