import { connect } from 'react-redux';
import StatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  ...props,
  selectedAccount: state.Scenes.Accounts.selectedAccount,
});

export default connect(stateToProps)(StatelessComponent);
