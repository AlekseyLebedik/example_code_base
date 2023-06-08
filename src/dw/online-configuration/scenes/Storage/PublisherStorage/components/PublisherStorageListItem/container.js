import { connect } from 'dw/core/helpers/component';
import StatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  ...props,
  selectedFile: state.Scenes.Storage.PublisherStorage.selectedFile,
});

const dispatchToProps = () => ({});

export default connect(stateToProps, dispatchToProps, StatelessComponent);
