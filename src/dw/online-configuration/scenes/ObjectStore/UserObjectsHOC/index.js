import React from 'react';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router-dom';
import { connect } from 'dw/core/helpers/component';
import { bindActionCreators } from 'redux';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import contextAwareService from 'dw/online-configuration/components/ContextSelector';

import {
  deletePooledObjects,
  deleteUserObjects,
  downloadUserObject,
  fetchPooledObjects,
  fetchUserObjects,
  restoreUserObjectBackup,
  uploadUserObject,
  unloadUserObjects,
  unloadPooledObjects,
} from './actions';
import {
  userObjectsSelector,
  userObjectsNextPageTokenSelector,
} from './selectors';

class UserObjects extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    onDeleteObjects: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    onUnload: PropTypes.func.isRequired,
    userId: PropTypes.string,
  };

  static defaultProps = { userId: null };

  state = { selectedRowKeys: [] };

  componentDidMount() {
    const { onLoad, userId } = this.props;
    if (userId) {
      onLoad(userId);
    }
  }

  componentWillUnmount() {
    const { onUnload } = this.props;
    onUnload();
  }

  onGridReady = params => {
    this.gridApi = params.api;
  };

  onSelectionChanged = ({ api }) => {
    this.setState({
      selectedRowKeys: api.getSelectedRows().map(({ name }) => name),
    });
  };

  onDeleteObjects = () => {
    const { userId, onDeleteObjects } = this.props;
    onDeleteObjects(userId, this.state.selectedRowKeys);
    this.setState({ selectedRowKeys: [] }, () => this.gridApi.deselectAll());
  };

  render() {
    const { children, ...passThroughProps } = this.props;
    const props = {
      ...passThroughProps,
      onGridReady: this.onGridReady,
      onFilterChanged: this.onFilterChanged,
      onFilterTextBoxChange: this.onFilterTextBoxChange,
      onSelectionChanged: this.onSelectionChanged,
      selectedRowKeys: this.state.selectedRowKeys,
      onDeleteObjects: this.onDeleteObjects,
    };
    return children(props);
  }
}

const stateToProps = (state, props) => {
  const userId = props.match.params.id;
  return {
    userId,
    userObjects: userObjectsSelector(state, { userId }),
    nextPageToken: userObjectsNextPageTokenSelector(state),
    formatDateTime: formatDateTimeSelector(state),
  };
};

const userObjectsDispatch = {
  onLoad: fetchUserObjects,
  onUnload: unloadUserObjects,
  onSelect: fetchUserObjects,
  onDownload: downloadUserObject,
  onRestore: restoreUserObjectBackup,
  onDeleteObjects: deleteUserObjects,
  onUploadFile: uploadUserObject,
};

const pooledObjectsDispatch = {
  onLoad: fetchPooledObjects,
  onUnload: unloadPooledObjects,
  onSelect: fetchPooledObjects,
  onDeleteObjects: deletePooledObjects,
};

const dispatchToProps = (dispatch, ownProps) => {
  const dispatchActions =
    ownProps.resource === 'UserObjects'
      ? userObjectsDispatch
      : pooledObjectsDispatch;
  return bindActionCreators(dispatchActions, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,

  /**
   * onUploadFile in a specific way so that ReduxFrom understand that it
   * returns a promise and wait for it to resolve.
   */
  onUploadFile: values => dispatchProps.onUploadFile(values),
  onDownload: (name, objectVersion) =>
    dispatchProps.onDownload(stateProps.userId, name, objectVersion),
  onRestore: (name, objectVersion) =>
    dispatchProps.onRestore(stateProps.userId, name, objectVersion),
  onSelect: itemSelected => {
    const userId = itemSelected;
    if (!userId) return;

    dispatchProps.onSelect(userId);

    const { match, history, location } = ownProps;
    const pathname = generatePath(match.path, {
      ...match.params,
      id: userId,
    });
    history.push({ ...location, pathname });
  },
  onShowMore: () =>
    dispatchProps.onLoad(stateProps.userId, {
      nextPageToken: stateProps.nextPageToken,
    }),
});

const ConnectedUserObjects = connect(
  stateToProps,
  dispatchToProps,
  UserObjects,
  mergeProps
);

const UserObjectsController = endpoint =>
  contextAwareService(Services.ObjectStore, endpoint, [
    Services.DDLTranslation,
  ])(ConnectedUserObjects);

const withUserObjectsContext = resource => Component => {
  const endpoint =
    resource === 'UserObjects'
      ? ServiceEndpoints.ObjectStore.getUserObjects
      : ServiceEndpoints.ObjectStore.getPooledObjects;
  const ContextWrapper = UserObjectsController(endpoint);
  const WrappedComponent = () => (
    <ContextWrapper resource={resource}>
      {props => <Component {...props} />}
    </ContextWrapper>
  );
  const name = Component.name || Component.displayName;
  WrappedComponent.displayName = `withUserObjectsContext(${name})`;
  return WrappedComponent;
};

export default withUserObjectsContext;
