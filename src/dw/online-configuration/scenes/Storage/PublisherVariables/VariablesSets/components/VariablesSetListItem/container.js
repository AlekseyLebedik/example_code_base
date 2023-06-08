import { connect } from 'dw/core/helpers/component';
import StatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  ...props,
  selectedListItem:
    state.Scenes.Storage.PublisherVariables.VariablesSets.selectedListItem,
});

const dispatchToProps = () => ({});

export default connect(stateToProps, dispatchToProps, StatelessComponent);
