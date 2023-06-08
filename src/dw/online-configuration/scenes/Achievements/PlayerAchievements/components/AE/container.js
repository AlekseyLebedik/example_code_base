import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';
import Empty from 'dw/core/components/Empty';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { uuid } from 'dw/core/helpers/uuid';

import { fetchUserAchievements, deleteUserAchievements } from './actions';
import { fetchActiveRulesetAchievements } from '../../../ActiveRuleset/actions';
import { isClanSelector } from '../../selectors';

import PlayerAchievementsStateless from './presentational';

const defaultSortModel = [
  {
    colId: 'noPlayerData',
    sort: 'asc',
  },
  {
    colId: 'activationTimestamp',
    sort: 'desc',
  },
  {
    colId: 'name',
    sort: 'asc',
  },
];

const mapStateToProps = (state, props) => ({
  formatDateTime: formatDateTimeSelector(state),
  achievements: state.Scenes.Achievements.ActiveRuleset.achievements,
  isClan: isClanSelector(state, props),
});

const dispatchToProps = {
  fetchUserAchievements,
  fetchActiveRulesetAchievements,
  deleteUserAchievements,
};

class PlayerAchievements extends Component {
  state = {
    event: null,
    refreshKeys: {},
  };

  componentDidMount() {
    this.isComponentMounted = true;
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  onGridReady = ({ api, setWarning, toggleLoading, columnApi }) => {
    this.api = api;
    this.setWarning = setWarning;
    this.toggleLoading = toggleLoading;
    columnApi.applyColumnState(defaultSortModel);
  };

  onLoadData = (_, params) => {
    const { isClan } = this.props;
    let data = [];
    const updateRulesetData = (rows, lastPage) => {
      const achievements = rows?.map(a => ({ ...a, noPlayerData: true })) || [];
      params.successCallback(achievements);
      this.toggleLoading(!lastPage);
      if (achievements.length <= 0)
        this.setWarning(
          'The ruleset achievements cannot be loaded, see logs for details'
        );
    };
    const successCallback = (rows, nextPageToken) => {
      data = [...data, ...rows];
      if (nextPageToken)
        this.props.fetchUserAchievements(
          this.props.playerId,
          nextPageToken,
          false,
          { ...params, successCallback, isClan }
        );
      else {
        const achievements =
          data?.map(a => ({ ...a, noPlayerData: false })) || data;
        params.successCallback(achievements);
        this.toggleLoading(true);
        this.props.fetchUserAchievements(this.props.playerId, null, false, {
          ...params,
          format: 'raw',
          successCallback: rawRows => {
            rawRows.forEach(row => {
              const achievement =
                achievements.find(a => a.name === row.name) || {};
              achievement.raw = omit(row, ['name']);
            });
            this.api.applyTransaction({ update: achievements });
            this.props.fetchActiveRulesetAchievements({
              updateRulesetData,
              activeCheck: () => this.isComponentMounted,
            });
          },
          failCallback() {
            params.successCallback(achievements);
          },
          isClan,
        });
      }
    };
    this.props.fetchUserAchievements(this.props.playerId, null, false, {
      ...params,
      successCallback,
      failCallback: () => successCallback([]),
      isClan,
    });
  };

  onDelete = values => {
    const achievements = Array.isArray(values) ? values : [values];
    const { playerId, isClan } = this.props;
    this.props.deleteUserAchievements(playerId, achievements, {
      successCallback: () => this.onRefresh('table'),
      isClan,
    });
  };

  onDeleteUserData = () => {
    this.props.deleteUserAchievements(this.props.playerId, [], {
      successCallback: () => {
        this.onRefresh('table');
        this.onRefresh('userState');
        this.setCreatingBackup(true);
      },
    });
  };

  setCreatingBackup = backupBool => {
    this.setState({
      backupCreated: backupBool,
    });
  };

  onRefresh = target =>
    this.setState(state => ({
      refreshKeys: {
        table:
          target === 'table' || target === 'all'
            ? uuid()
            : state.refreshKeys.table,
        userState:
          target === 'userState' || target === 'all'
            ? uuid()
            : state.refreshKeys.userState,
      },
    }));

  setEvent = item =>
    this.setState({
      event: { name: item.name, data: JSON.stringify(item, null, 2) },
    });

  render() {
    if (this.props?.achievements?.length === 0)
      return <Empty>There are no Achievements in the Active Ruleset.</Empty>;
    return (
      <PlayerAchievementsStateless
        {...this.props}
        onLoadData={this.onLoadData}
        onChangeUser={this.onChangeUser}
        event={this.state.event}
        setEvent={this.setEvent}
        onDelete={this.onDelete}
        onDeleteUserData={this.onDeleteUserData}
        onGridReady={this.onGridReady}
        refreshKeys={this.state.refreshKeys}
        onRefresh={this.onRefresh}
        setCreatingBackup={this.setCreatingBackup}
        backupCreated={this.state.backupCreated}
      />
    );
  }
}

PlayerAchievements.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.object),
  fetchUserAchievements: PropTypes.func.isRequired,
  deleteUserAchievements: PropTypes.func.isRequired,
  fetchActiveRulesetAchievements: PropTypes.func.isRequired,
  playerId: PropTypes.string,
  isClan: PropTypes.bool.isRequired,
};
PlayerAchievements.defaultProps = {
  achievements: undefined,
  playerId: undefined,
};

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(PlayerAchievements)
);
