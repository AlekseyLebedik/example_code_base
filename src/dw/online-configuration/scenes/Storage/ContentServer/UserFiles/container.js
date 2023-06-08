import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { connect } from 'dw/core/helpers/component';

import {
  fetchUserFiles,
  uploadUserFile,
  userFilesListItemClick,
} from './actions';
import { userFilesFormattedSelector as userFilesSelector } from './selectors';
import StatelessComponent from './presentational';

function UserFiles(props) {
  const [uploadFileModalVisible, setUploadFileModalVisible] = useState(false);

  const openUploadFileModalHandler = () => setUploadFileModalVisible(true);

  const closeUploadFileModalHandler = () => setUploadFileModalVisible(false);

  useEffect(() => {
    const { q } = queryString.parse(props.location.search);
    props.onLoad(q);
  }, []);

  useEffect(() => {
    closeUploadFileModalHandler();
  }, [props.userFiles.length]);

  const search = payload => {
    props.onSearch(payload);
  };

  const onUploadFileHandler = () => props.onUploadFileHandler;

  return (
    <StatelessComponent
      reduxProps={props}
      reactProps={{ onSearch: search }}
      uploadFileModalProps={{
        uploadFileModalVisible,
        openUploadFileModalHandler,
        closeUploadFileModalHandler,
        onUploadFileHandler,
      }}
    />
  );
}
UserFiles.propTypes = {
  userFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onUploadFileHandler: PropTypes.func.isRequired,
};

const stateToProps = state => ({
  userFiles: userFilesSelector(state),
  nextPageToken: state.Scenes.Storage.ContentServer.UserFiles.nextPageToken,
  elementsOrder: state.Scenes.Storage.ContentServer.UserFiles.elementsOrder,
  q: state.Scenes.Storage.ContentServer.UserFiles.q,
});

const dispatchToProps = dispatch => ({
  onLoad: query => {
    dispatch(fetchUserFiles(!query ? {} : { q: query }));
  },
  onSearch: payload => dispatch(fetchUserFiles({ q: payload.q })),
  onShowMore: (nextPageToken, q) =>
    dispatch(fetchUserFiles({ nextPageToken, q }, true)),
  onClickListItem: userFile => dispatch(userFilesListItemClick(userFile)),
  onUploadFileHandler: values => dispatch(uploadUserFile(values)),
});

export default connect(stateToProps, dispatchToProps, UserFiles);
