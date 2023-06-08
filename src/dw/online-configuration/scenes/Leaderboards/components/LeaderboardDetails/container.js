import { connect } from 'dw/core/helpers/component';
import { selectedRowKeysSelector } from 'dw/core/components/TableHydrated';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import {
  fetchLeaderboardData,
  deleteLeaderboardEntities,
  resetLeaderboard,
} from './actions';
import StatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  ...props,
  leaderboardDetails: state.Scenes.Leaderboards.leaderboardDetails,
  refreshId: state.Scenes.Leaderboards.refreshId,
  selectedRowKeys: selectedRowKeysSelector(state),
  formatDateTime: formatDateTimeSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoadData: (id, params) =>
    dispatch(fetchLeaderboardData(id, { ...params }, true)),
  resetLeaderboardHandler: leaderboardID =>
    dispatch(resetLeaderboard(leaderboardID)),
  deleteLeaderboardEntitiesHandler: (leaderboardID, entityIds) =>
    dispatch(deleteLeaderboardEntities(leaderboardID, entityIds)),
});

export default connect(stateToProps, dispatchToProps, StatelessComponent);
