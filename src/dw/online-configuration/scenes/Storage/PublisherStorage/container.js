import { useState, useEffect } from 'react';
import queryString from 'query-string';
import { generatePath } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'dw/core/helpers/component';
import { joinQueryParam } from 'dw/core/helpers/path';

import {
  publisherFilesFormattedSelector as publisherFilesSelector,
  selectedFileFormattedSelector as selectedFileSelector,
} from './selectors';
import {
  fetchPublisherStorage,
  publisherStorageListItemClick,
  uploadPublisherStorageFile,
  bulkDeletePublisherStorageFiles,
  bulkDownloadPublisherStorageFiles,
} from './actions';
import StatelessComponent from './presentational';

function PublisherStorage(props) {
  const { history, onLoad, match, entries } = props;
  const {
    location: { search },
  } = history;
  const [uploadFileModalVisible, setUploadFileModalVisible] = useState(false);

  const openUploadFileModalHandler = () => setUploadFileModalVisible(true);

  const closeUploadFileModalHandler = () => setUploadFileModalVisible(false);

  useEffect(() => {
    const { q } = queryString.parse(search);
    const { id } = match.params;
    onLoad(q || id);
  }, [onLoad]);

  useEffect(() => {
    if (entries.length === 1) {
      const path = generatePath(match.path, {
        ...match.params,
        id: entries[0].fileID,
      });
      history.replace(path);
    }
  }, [entries.length]);

  const onUploadFileHandler = values => {
    props.onUploadFileHandler(values);
    closeUploadFileModalHandler();
  };

  const newProps = {
    reduxProps: props,
    reactProps: {
      onSearch: props.onSearch,
    },
    uploadFileModalProps: {
      uploadFileModalVisible,
      openUploadFileModalHandler,
      closeUploadFileModalHandler,
      onUploadFileHandler,
    },
  };
  return <StatelessComponent {...newProps} />;
}

const stateToProps = (state, props) => ({
  history: props.history,
  match: props.match,
  entries: publisherFilesSelector(state),
  nextPageToken: state.Scenes.Storage.PublisherStorage.nextPageToken,
  selectedFile: selectedFileSelector(state),
  elementsOrder: state.Scenes.Storage.PublisherStorage.elementsOrder,
  q: state.Scenes.Storage.PublisherStorage.q,
});

const dispatchToProps = dispatch => ({
  onLoad: query => {
    dispatch(fetchPublisherStorage(!query ? {} : { q: query }));
  },
  onSearch: payload => dispatch(fetchPublisherStorage({ q: payload.q })),
  onShowMore: (nextPageToken, q) =>
    dispatch(fetchPublisherStorage({ nextPageToken, q }, true)),
  onClickListItem: file => dispatch(publisherStorageListItemClick(file)),
  onUploadFileHandler: values => dispatch(uploadPublisherStorageFile(values)),
  onBulkDelete: items => dispatch(bulkDeletePublisherStorageFiles(items)),
  onBulkDownload: items => dispatch(bulkDownloadPublisherStorageFiles(items)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onSearch: payload => {
    const { history, match } = stateProps;
    const path = !payload.q
      ? match.url
      : joinQueryParam(match.url, 'q', payload.q);
    history.replace(path);
    dispatchProps.onSearch(payload);
  },
});

PublisherStorage.propTypes = {
  match: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object,
  onLoad: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onUploadFileHandler: PropTypes.func.isRequired,
};
PublisherStorage.defaultProps = {
  location: undefined,
};

export default connect(
  stateToProps,
  dispatchToProps,
  PublisherStorage,
  mergeProps
);
