import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dw/core/helpers/component';
import StatelessComponent from './presentational';
import {
  deletePooledFile,
  downloadPooledFile,
  deleteSummaryFile,
  pooledFilesListItemClick,
  downloadSummaryFile,
} from '../../actions';
import { selectedPooledFileFormattedSelector as selectedPooledFileFormatted } from '../../selectors';

const stateToProps = (state, props) => ({
  reduxProps: {
    elementsOrder: state.Scenes.Storage.ContentServer.PooledFiles.elementsOrder,
    selectedPooledFile: selectedPooledFileFormatted(state),
  },
  reactProps: props,
});

const dispatchToProps = dispatch => ({
  deletePooledFileHandler: fileID => dispatch(deletePooledFile(fileID)),
  downloadPooledFileHandler: fileID => dispatch(downloadPooledFile(fileID)),
  deleteSummaryFileHandler: fileID => dispatch(deleteSummaryFile(fileID)),
  downloadSummaryFileHandler: fileID => dispatch(downloadSummaryFile(fileID)),
  onLoad: pooledFile => dispatch(pooledFilesListItemClick(pooledFile)),
});

class PooledFilesDetails extends React.Component {
  componentDidMount() {
    const { onLoad, match } = this.props;
    onLoad({ fileID: match.params.id });
  }

  render() {
    return <StatelessComponent {...this.props} />;
  }
}

PooledFilesDetails.propTypes = {
  onLoad: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(stateToProps, dispatchToProps, PooledFilesDetails);
