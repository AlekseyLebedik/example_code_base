import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import PLAYLIST_NAME_MAPPING from 'dw/core/helpers/playlist-name-mapping';
import ThunderpantsLink from 'dw/online-configuration/scenes/LobbyViewer/components/ThunderpantsLink';

import { convertIp } from './convertIp';

import styles from './index.module.css';

function withShowButton(WrappedComponent, title) {
  return class extends React.Component {
    state = {
      show: false,
    };

    showButton() {
      this.setState({
        show: true,
      });
    }

    render() {
      const { show } = this.state;
      return show ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Button variant="contained" onClick={() => this.showButton()}>
          {title}
        </Button>
      );
    }
  };
}

const ShowButtonThunderPantsLink = withShowButton(
  ThunderpantsLink,
  'Show Thunderpants Link'
);

const ServerPropTypes = {
  data: PropTypes.shape({
    priority: PropTypes.string,
    registrationTime: PropTypes.string,
    freeSlots: PropTypes.string,
    playlistID: PropTypes.string,
    allocated: PropTypes.bool,
    usageInfo: PropTypes.shape({
      maxSlots: PropTypes.number,
      lobbyID: PropTypes.string,
      openStatus: PropTypes.bool,
    }),
  }).isRequired,
  userID: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // material-ui
};

const ServerCard = ({
  userID,
  data: { registrationTime, priority, allocated = false },
  data,
  classes,
}) => {
  const lobbyClosed = allocated && !data.usageInfo.openStatus;

  return (
    <Card
      elevation={0}
      className={classnames(classes.card, {
        [classes.danger]: lobbyClosed,
      })}
      square={!lobbyClosed}
    >
      <CardContent>
        <Typography
          variant="body1"
          className={classnames(classes.card, {
            [classes.danger]: lobbyClosed,
          })}
          component="div"
        >
          <div className={styles.container}>
            <div>Priority: {priority}</div>
            <div>Registration time: {registrationTime}</div>
            <div>Server User IP: {convertIp(userID)}</div>
            <div>
              <ShowButtonThunderPantsLink
                classes={{ root: styles.thunderpantsLink }}
                serverID={userID}
              />
            </div>
            {allocated && (
              <div>{data.usageInfo.openStatus ? 'open' : 'closed'}</div>
            )}

            {allocated && (
              <>
                <div>
                  Playlist:{' '}
                  {PLAYLIST_NAME_MAPPING[data.playlistID] || data.playlistID}
                </div>

                <div>
                  Lobby:{' '}
                  <Link
                    to={window.location.pathname.replace(
                      /\/matchmaking.*$/,
                      `/lobby-viewer/${data.usageInfo.lobbyID}`
                    )}
                  >
                    {data.usageInfo.lobbyID}
                  </Link>
                </div>

                <div>
                  Slots: {data.freeSlots}/{data.usageInfo.maxSlots}
                </div>
                <div>
                  Players:{' '}
                  {lobbyClosed
                    ? 'Closed'
                    : `${data.usageInfo.maxSlots - data.freeSlots} / ${
                        data.usageInfo.maxSlots
                      }`}
                </div>
                <div className={styles.serverUserLink}>
                  <label className={styles.serverUserLabel}>
                    Server User ID: {userID}
                  </label>{' '}
                </div>
              </>
            )}
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};

ServerCard.propTypes = ServerPropTypes;

const muiStyles = theme => ({
  card: {
    width: '100%',
    ...theme.logLevels.info,
  },
  danger: theme.logLevels.error,
});

const ServerListItem = withStyles(muiStyles)(ServerCard);

const ServerList = ({ servers }) => (
  <List>
    {(servers || []).map(server => (
      <ListItem key={server.userID}>
        <ServerListItem {...server} />
      </ListItem>
    ))}
  </List>
);

ServerList.propTypes = {
  servers: PropTypes.arrayOf(ServerList),
};

ServerList.defaultProps = {
  servers: [],
};

export default ServerList;
