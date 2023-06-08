import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import queryString from 'query-string';
import { connect } from 'dw/core/helpers/component';

import { pooledFilesFormattedSelector as pooledFilesSelector } from './selectors';
import {
  fetchPooledFiles,
  uploadPooledFile,
  pooledFilesListItemClick,
} from './actions';
import StatelessComponent from './presentational';

function PooledFiles(props) {
  const [uploadFileModalVisible, setUploadFileModalVisible] = useState(false);

  const openUploadFileModalHandler = () => setUploadFileModalVisible(true);

  const closeUploadFileModalHandler = () => setUploadFileModalVisible(false);

  useEffect(() => {
    const { q } = queryString.parse(props.location.search);
    props.onLoad(q);
  }, []);

  useEffect(() => {
    closeUploadFileModalHandler();
  }, [props.pooledFiles.length]);

  const search = payload => {
    props.onSearch(payload);
  };

  const onUploadFileHandler = () => props.onUploadFileHandler;

  return (
    <StatelessComponent
      reduxProps={props}
      reactProps={{ onSearch: payload => search(payload) }}
      uploadFileModalProps={{
        uploadFileModalVisible,
        openUploadFileModalHandler,
        closeUploadFileModalHandler,
        onUploadFileHandler,
      }}
    />
  );
}
PooledFiles.propTypes = {
  location: PropTypes.object.isRequired,
  pooledFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLoad: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onUploadFileHandler: PropTypes.func.isRequired,
};

const stateToProps = state => ({
  pooledFiles: pooledFilesSelector(state),
  nextPageToken: state.Scenes.Storage.ContentServer.PooledFiles.nextPageToken,
  elementsOrder: state.Scenes.Storage.ContentServer.PooledFiles.elementsOrder,
  q: state.Scenes.Storage.ContentServer.PooledFiles.q,
});

const dispatchToProps = dispatch => ({
  onLoad: query => {
    dispatch(fetchPooledFiles(!query ? {} : { q: query }));
  },
  onSearch: payload => dispatch(fetchPooledFiles({ q: payload.q })),
  onShowMore: (nextPageToken, q) =>
    dispatch(fetchPooledFiles({ nextPageToken, q }, true)),
  onClickListItem: pooledFile => dispatch(pooledFilesListItemClick(pooledFile)),
  onUploadFileHandler: values => dispatch(uploadPooledFile(values)),
});

export default connect(stateToProps, dispatchToProps, PooledFiles);
