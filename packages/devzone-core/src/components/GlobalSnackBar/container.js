import { connect } from '../../AppStore';
import GlobalSnackBarStateless from './presentational';
import * as actions from './actions';

const stateToProps = state => ({
  messages: state.Core.GlobalSnackBar.messages,
});

const dispatchToProps = actions;

export default connect(stateToProps, dispatchToProps)(GlobalSnackBarStateless);
