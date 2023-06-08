import { connect } from 'dw/core/helpers/component';
import StatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  ...props,
  selectedPooledFile:
    state.Scenes.Storage.ContentServer.PooledFiles.selectedFile,
});

const dispatchToProps = () => ({});

export default connect(stateToProps, dispatchToProps, StatelessComponent);
