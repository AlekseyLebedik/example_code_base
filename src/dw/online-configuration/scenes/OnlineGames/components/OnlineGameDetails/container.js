import { connect } from 'react-redux';
import StatelessComponent from './presentational';

const stateToProps = state => ({
  elementsOrder: state.Scenes.OnlineGames.elementsOrder,
  selectedOnlineGame: state.Scenes.OnlineGames.selectedOnlineGame,
});

export default connect(stateToProps)(StatelessComponent);
