import { connect } from 'dw/core/helpers/component';

import {
  deletePublisherStorageFile,
  downloadPublisherStorageFile,
} from './actions';
import StatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  ...props,
});

const dispatchToProps = dispatch => ({
  deleteFileHandler: fileID => dispatch(deletePublisherStorageFile(fileID)),
  downloadFileHandler: fileID => dispatch(downloadPublisherStorageFile(fileID)),
});

export default connect(stateToProps, dispatchToProps, StatelessComponent);
