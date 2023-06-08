import { connect } from 'dw/core/helpers/component';

import {
  deleteUserContextStorageFile,
  downloadUserContextStorageFile,
} from './actions';
import StatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  ...props,
});

const dispatchToProps = dispatch => ({
  deleteFileHandler: params => dispatch(deleteUserContextStorageFile(params)),
  downloadFileHandler: params =>
    dispatch(downloadUserContextStorageFile(params)),
});

export default connect(stateToProps, dispatchToProps, StatelessComponent);
