import { connect } from 'react-redux';
import StatelessComponent from './presentational';

const stateToProps = state => ({
  selectedOnlineGame: state.Scenes.OnlineGames.selectedOnlineGame,
});

export default connect(stateToProps)(StatelessComponent);
