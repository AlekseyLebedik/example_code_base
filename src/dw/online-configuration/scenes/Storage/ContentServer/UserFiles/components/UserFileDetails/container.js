import { connect } from 'dw/core/helpers/component';
import StatelessComponent from './presentational';
import { deleteUserFile, downloadUserFile } from '../../actions';
import { selectedUserFileFormattedSelector as selectedUserFileFormatted } from '../../selectors';

const stateToProps = (state, props) => ({
  reduxProps: {
    elementsOrder: state.Scenes.Storage.ContentServer.UserFiles.elementsOrder,
    selectedUserFile: selectedUserFileFormatted(state),
  },
  reactProps: props,
});

const dispatchToProps = dispatch => ({
  deleteUserFileHandler: fileID => dispatch(deleteUserFile(fileID)),
  downloadUserFileHandler: fileID => dispatch(downloadUserFile(fileID)),
});

export default connect(stateToProps, dispatchToProps, StatelessComponent);
