import { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';

import { joinPath } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import PropTypes from 'prop-types';

import {
  userContextStorageFilesFormattedSelector as userContextStorageFilesSelector,
  selectedUserContextStorageFileFormattedSelector as selectedUserContextStorageFileSelector,
} from './selectors';
import {
  fetchUserContextStorage,
  userContextStorageListItemClick,
  uploadUserContextStorageFile,
  getStorageContexts,
  openUploadModal,
  closeUploadModal,
  reloadDetails,
} from './actions';
import StatelessComponent from './presentational';

const NOT_SET = '--';

const normalizeUrl = (url, baseUrl) => {
  if (url === null) {
    return url;
  }
  let path = url;
  if (path.indexOf(baseUrl) === -1) {
    path = joinPath(baseUrl, url);
  }
  while (path && path.indexOf('//') !== -1) {
    path = path.replace('//', `/${NOT_SET}/`);
  }
  return path;
};

const normalizeMatchParam = value =>
  value === undefined || value === NOT_SET ? null : value;

function UserContextStorage(props) {
  const { history, location, match, onLoad, onSearch, reloadDetailPath, url } =
    props;
  const [context, setContext] = useState('');
  const [accountType, setAccountType] = useState('');
  const [fileId, setFileId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    onLoad(location.pathname);
  }, [location.pathname, onLoad]);

  useEffect(() => {
    const newPath = normalizeUrl(reloadDetailPath, match.url);
    if (newPath) {
      const pattern = `${match.path}/:userId/:context/:accountType/:fileId`;
      const newMatch = matchPath(
        joinPath(newPath, `${NOT_SET}/${NOT_SET}/${NOT_SET}/${NOT_SET}`),
        {
          path: pattern,
          exact: false,
        }
      );
      if (newMatch) {
        const {
          context: newContext,
          accountType: newAccountType,
          userID: newUserId,
          fileId: newFileId,
        } = normalizeMatchParam(newMatch.params);
        if (
          newContext !== context ||
          newAccountType !== accountType ||
          newFileId !== fileId ||
          newUserId !== userId
        ) {
          setContext(newContext);
          setAccountType(newAccountType);
          setFileId(newFileId);
          setUserId(newUserId);
        }
      }
      history.replace(newPath);
    }
  }, [reloadDetailPath, url]);

  useEffect(() => {
    const newFileId = fileId || null;
    let path = match.url;
    if (userId || context || accountType) {
      [userId, context, accountType].forEach(item => {
        path = joinPath(path, item || NOT_SET);
      });
      if (newFileId) {
        path = joinPath(path, newFileId);
      }
    }
    history.replace(path);
    onSearch(
      {
        q: userId,
      },
      context,
      accountType,
      newFileId
    );
  }, [context, accountType, fileId, userId, onSearch]);

  const onAccountTypeChange = event => {
    setAccountType(event.target.value);
  };

  const onContextChange = event => {
    setContext(event.target.value);
  };

  const getItemBaseUrl = item =>
    joinPath(
      match.url,
      `${item.userID}/${item.context || NOT_SET}/${item.accountType || NOT_SET}`
    );

  const handleOnSearch = payload => {
    setUserId(payload.q);
  };

  const newProps = {
    reduxProps: {
      ...props,
      userId,
      context,
      accountType,
      onAccountTypeChange,
      onContextChange,
      getItemBaseUrl,
    },
    reactProps: {
      onSearch: handleOnSearch,
    },
    uploadFileModalProps: {
      uploadFileModalVisible: props.uploadModalVisible,
      openUploadFileModalHandler: props.openUploadModal,
      closeUploadFileModalHandler: props.closeUploadModal,
      onUploadFileHandler: props.onUploadFileHandler,
    },
  };
  return <StatelessComponent {...newProps} />;
}
UserContextStorage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  uploadModalVisible: PropTypes.bool.isRequired,
  openUploadModal: PropTypes.func.isRequired,
  closeUploadModal: PropTypes.func.isRequired,
  onUploadFileHandler: PropTypes.func.isRequired,
  reloadDetailPath: PropTypes.string,
  url: PropTypes.string,
};
UserContextStorage.defaultProps = {
  reloadDetailPath: null,
  url: undefined,
};
const stateToProps = state => ({
  reloadDetailPath: state.Scenes.Storage.UserContextStorage.reloadDetailPath,
  uploadModalVisible:
    state.Scenes.Storage.UserContextStorage.uploadModalVisible,
  entries: userContextStorageFilesSelector(state),
  selectedFile: selectedUserContextStorageFileSelector(state),
  elementsOrder: state.Scenes.Storage.UserContextStorage.elementsOrder,
  contextsList: state.Scenes.Storage.UserContextStorage.contextsList,
});

const dispatchToProps = dispatch => ({
  onLoad: path => {
    dispatch(getStorageContexts());
    dispatch(reloadDetails(path));
  },
  onSearch: (payload, context, accountType, fileId) =>
    dispatch(
      fetchUserContextStorage({ q: payload.q, context, accountType, fileId })
    ),
  onClickListItem: file => dispatch(userContextStorageListItemClick(file)),
  onUploadFileHandler: values => dispatch(uploadUserContextStorageFile(values)),
  openUploadModal: () => dispatch(openUploadModal()),
  closeUploadModal: () => dispatch(closeUploadModal()),
});

export default connect(stateToProps, dispatchToProps, UserContextStorage);
