import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FeatureSwitchesCheck, {
  featureSwitches as fs,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import { getAccounts } from 'dw/online-configuration/services/accounts';
import SourceSelect from 'dw/core/components/SourceSelect';
import OCFeatureFlags from 'dw/core/components/OCFeatureFlags';

import { hasData } from 'dw/core/helpers/object';
import { OC_SV_PLAYLIST_ID_MAPPING } from 'dw/core/components/ConfigFeatureFlags/configFeatureFlags';
import PLAYLIST_NAME_MAPPING from 'dw/core/helpers/playlist-name-mapping';

import DetailSection from 'dw/online-configuration/components/SessionViewer';

import LobbiesDetailEmpty from './components/LobbiesDetailEmpty';
import PlaylistListEmpty from './components/PlaylistListEmpty';
import './presentational.css';

const useStyles = makeStyles(() => ({
  listItem: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ListItem = ({ label, count, playlistSelected, onSelectPlaylist }) => {
  const classes = useStyles();
  return (
    <div
      className={cn(classes.listItem, {
        ListItem: playlistSelected !== label,
        'ListItem selected': playlistSelected === label,
      })}
      onClick={() => onSelectPlaylist(label)}
    >
      <div className="left-el">
        {label === '' ? (
          'n/a'
        ) : (
          <span className="label">
            <OCFeatureFlags
              configFeatureFlags={OC_SV_PLAYLIST_ID_MAPPING}
              noAccessComponent={() => label}
            >
              {PLAYLIST_NAME_MAPPING[label] || `Playlist ${label}`}
            </OCFeatureFlags>
          </span>
        )}
      </div>
      <div className="right-el">{count}</div>
    </div>
  );
};

ListItem.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number,
  playlistSelected: PropTypes.string,
  onSelectPlaylist: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  count: 0,
  playlistSelected: undefined,
};

const DCListItem = ({
  label,
  count,
  playlistSelected,
  selectedDatacenter,
  onSelectDatacenter,
}) => {
  const classes = useStyles();
  return (
    <div
      className={cn(classes.listItem, {
        DCListItem: selectedDatacenter !== label,
        'DCListItem selected': selectedDatacenter === label,
      })}
      key={label}
      onClick={() => onSelectDatacenter(playlistSelected, label)}
    >
      <div className="left-el">
        <span className="label">{label}</span>
      </div>
      <div className="right-el">{count}</div>
    </div>
  );
};

DCListItem.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number,
  playlistSelected: PropTypes.string,
  selectedDatacenter: PropTypes.string,
  onSelectDatacenter: PropTypes.func.isRequired,
};

DCListItem.defaultProps = {
  count: 0,
  playlistSelected: undefined,
  selectedDatacenter: undefined,
};

const SessionViewer = props => {
  const {
    loading,
    backgroundLoading,
    lobbies,
    playlists,
    playlistCount,
    playlistSelected,
    selectedDatacenter,
    onSelectPlaylist,
    onSelectDatacenter,
    onLoad,
    onSearch,
    onClearSearch,
    search,
    formatDateTime,
  } = props;

  const BackgroundLoading = !loading && backgroundLoading && (
    <div className="background-loading">
      <CircularProgress size={30} thickness={2} />
    </div>
  );

  const selectedPlaylistInfo = playlists.find(
    playlist => playlist.id.toString() === playlistSelected
  );

  const getDatacentersBreakdown = selectedPlaylistInfo ? (
    <div>
      <div className="listen-wrapper">
        {Object.keys(selectedPlaylistInfo.playerDistribution)
          .filter(key => key.indexOf('listen_') > -1)
          .map(k => (
            <DCListItem
              key={k}
              label={k}
              count={selectedPlaylistInfo.playerDistribution[k]}
              playlistSelected={playlistSelected}
              selectedDatacenter={selectedDatacenter}
              onSelectDatacenter={onSelectDatacenter}
            />
          ))}
      </div>
      <div className="dcs-wrapper">
        {Object.keys(selectedPlaylistInfo.playerDistribution)
          .filter(key => key.indexOf('listen_') === -1)
          .sort()
          .map(k => (
            <DCListItem
              key={k}
              label={k}
              count={selectedPlaylistInfo.playerDistribution[k]}
              playlistSelected={playlistSelected}
              selectedDatacenter={selectedDatacenter}
              onSelectDatacenter={onSelectDatacenter}
            />
          ))}
      </div>
    </div>
  ) : null;

  const getDetail =
    playlistSelected !== undefined ? (
      <DetailSection
        lobbies={lobbies.filter(lobby => {
          let dcCriteria = true;
          if (selectedDatacenter && playlists.length > 0) {
            if (selectedDatacenter.startsWith('listen_')) {
              dcCriteria = lobby.datacenter === null;
            } else if (selectedDatacenter.startsWith('tournament_')) {
              dcCriteria =
                lobby.datacenter === null && lobby.listenServerInfo === null;
            } else {
              dcCriteria = lobby.datacenter === selectedDatacenter;
            }
          }
          return lobby.playlistId === playlistSelected && dcCriteria;
        })}
        formatDateTime={formatDateTime}
        excludeColumns={['roundId']}
      />
    ) : (
      <LobbiesDetailEmpty />
    );

  const getList = hasData(playlistCount) ? (
    <div className="playlist-collection">
      {Object.keys(playlistCount).map(k => (
        <ListItem
          key={k}
          label={k}
          count={playlistCount[k]}
          playlistSelected={playlistSelected}
          onSelectPlaylist={onSelectPlaylist}
        />
      ))}
    </div>
  ) : (
    <PlaylistListEmpty loading={loading} />
  );

  const titleRow = (
    <div className="title">
      <span className="text">Playlists</span>
      <span className="refresh">
        <Tooltip title="Refresh">
          <IconButton
            onClick={() => {
              onLoad();
              if (playlistSelected && selectedDatacenter) {
                onSelectDatacenter(playlistSelected, selectedDatacenter);
              }
            }}
          >
            <Icon>refresh</Icon>
          </IconButton>
        </Tooltip>
      </span>
      {search && (
        <span className="clear-filter">
          <Tooltip title="Clear">
            <IconButton onClick={onClearSearch}>
              <Icon>cancel</Icon>
            </IconButton>
          </Tooltip>
        </span>
      )}
    </div>
  );

  const searchRow = (
    <SourceSelect
      placeholder="Enter Player ID"
      renderOption={item => `${item.userName} | ${item.userID}`}
      apiCall={input => getAccounts({ q: input })}
      onSelect={onSearch}
    />
  );

  return (
    <div className="Session-Viewer__container">
      <div className="left">
        {titleRow}
        <FeatureSwitchesCheck
          featureSwitches={[fs.ENABLE_PLAYER_ID_SEARCH]}
          isStaffAllowed={false}
        >
          {searchRow}
        </FeatureSwitchesCheck>
        {getList}
        {BackgroundLoading}
      </div>
      {selectedPlaylistInfo && (
        <div className="middle">{getDatacentersBreakdown}</div>
      )}
      <div className="right">{getDetail}</div>
    </div>
  );
};

SessionViewer.propTypes = {
  loading: PropTypes.bool,
  backgroundLoading: PropTypes.bool,
  lobbies: PropTypes.arrayOf(PropTypes.object),
  playlists: PropTypes.arrayOf(PropTypes.object),
  playlistCount: PropTypes.object,
  playlistSelected: PropTypes.string,
  selectedDatacenter: PropTypes.string,
  onSelectPlaylist: PropTypes.func.isRequired,
  onSelectDatacenter: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
  search: PropTypes.string,
  formatDateTime: PropTypes.func.isRequired,
};

SessionViewer.defaultProps = {
  loading: false,
  backgroundLoading: false,
  lobbies: [],
  playlists: [],
  playlistCount: {},
  playlistSelected: undefined,
  selectedDatacenter: undefined,
  search: undefined,
};

export default SessionViewer;
