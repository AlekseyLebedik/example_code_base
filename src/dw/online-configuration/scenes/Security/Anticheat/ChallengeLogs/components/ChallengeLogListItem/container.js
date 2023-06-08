import { connect } from 'react-redux';
import StatelessComponent from './presentational';

const stateToProps = state => ({
  selectedChallengeLog:
    state.Scenes.Security.Anticheat.ChallengeLogs.selectedLog,
});

export default connect(stateToProps)(StatelessComponent);
