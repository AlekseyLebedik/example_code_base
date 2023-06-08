import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';

// eslint-disable-next-line
import { getAccounts as apiGetAccounts } from 'dw/online-configuration/services/accounts';
import { makeCancelable } from 'dw/core/helpers/promise';

import Table from 'dw/core/components/TableHydrated';

import { COLUMNS, PLAYER_STATUS } from './constants';
import './index.css';

const getPlayerTeam = (teams, playerId) => {
  const team = teams.find(t => t.players.includes(parseInt(playerId, 10)));
  return !team ? 'n/a' : team.id;
};

const remapData = (currentPlayerState, recordTeams, accounts) => {
  const teams = recordTeams.map((t, index) => ({ id: index + 1, players: t }));
  const players = Object.keys(currentPlayerState).map(playerId => {
    const account = accounts.data.find(a => a && a.userID === playerId);

    return {
      playerId,
      playerName: !account ? 'n/a' : account.userName,
      state: PLAYER_STATUS[currentPlayerState[playerId]],
      team: getPlayerTeam(teams, playerId),
    };
  });

  return players;
};

class ExpandedRow extends Component {
  state = {
    data: [],
    isLoading: true,
  };

  componentDidMount() {
    if (this.emptyPlayers()) return;

    const { currentPlayerState, teams } = this.props.record;
    const playerIds = Object.keys(currentPlayerState);

    this.getAccountsPromise = makeCancelable(this.getAccountDetails(playerIds));

    this.getAccountsPromise.promise
      .then(accounts => {
        this.setState({
          data: remapData(currentPlayerState, teams, accounts.data),
          isLoading: false,
        });
        this.getAccountsPromise = undefined;
      })
      .catch(reason => {
        // eslint-disable-next-line
        console.log('Promise canceled', reason.isCanceled);
      });
  }

  componentWillUnmount() {
    if (this.getAccountsPromise) this.getAccountsPromise.cancel();
  }

  // eslint-disable-next-line
  async getAccountDetails(ids) {
    return apiGetAccounts({ id: ids.join(',') });
  }

  emptyPlayers = () => {
    const { record } = this.props;
    const { currentPlayerState } = this.props.record;

    return !record || !currentPlayerState || currentPlayerState.length === 0;
  };

  render() {
    const noPlayers = () => <div className="no-data">No Players Available</div>;

    const card = () => (
      <Card>
        <CardHeader
          className="expanded-row-card-header"
          title={
            this.state.isLoading
              ? 'Players loading ...'
              : 'Players in the lobby'
          }
        />
        {this.state.isLoading ? (
          <CircularProgress className="progress" size={20} thickness={2} />
        ) : (
          <Table
            data={this.state.data.sort((a, b) => a.team - b.team)}
            getKey={row => row.playerId}
            columns={COLUMNS}
            className="table-lobbies-players"
          />
        )}
      </Card>
    );

    return this.emptyPlayers() ? noPlayers() : card();
  }
}

ExpandedRow.propTypes = {
  record: PropTypes.shape({
    currentPlayerState: PropTypes.object.isRequired,
    teams: PropTypes.array.isRequired,
  }).isRequired,
};

export default ExpandedRow;
