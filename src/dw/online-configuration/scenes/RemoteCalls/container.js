import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router-dom';
import { connect } from 'dw/core/helpers/component';

import { changeUser as changeContextUser } from 'dw/online-configuration/components/ContextSelector/actions';
import { userSelector as contextUserSelector } from 'dw/online-configuration/components/ContextSelector/selectors';

import RemoteCommandsStateless from './presentational';
import { fetchRemoteCommands } from './slice';

const RemoteCommands = props => {
  const {
    match,
    contextUser,
    changeContextUser: onChangeContextUser,
    fetchRemoteCommands: fetchSavedCommands,
  } = props;
  useEffect(() => {
    if (!props.favoriteCommands || !props.recentCommands) {
      fetchSavedCommands();
    }
  });
  useEffect(() => {
    // Update Context Selector userId if not updated
    if (
      onChangeContextUser &&
      match.params.userId &&
      match.params.userId !== contextUser.userId
    ) {
      onChangeContextUser(match.params.userId);
    }
  });

  return <RemoteCommandsStateless {...props} />;
};

RemoteCommands.propTypes = {
  changeContextUser: PropTypes.func.isRequired,
  fetchRemoteCommands: PropTypes.func.isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  contextUser: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  favoriteCommands: PropTypes.array,
  recentCommands: PropTypes.array,
};

RemoteCommands.defaultProps = {
  userId: undefined,
  contextUser: {},
  match: {},
  history: {},
  location: {},
  favoriteCommands: undefined,
  recentCommands: undefined,
};

const stateToProps = (state, props) => {
  const contextUser = contextUserSelector(state);
  return {
    userId: props.match.params.userId || contextUser.userId,
    contextUser,
  };
};

const dispatchToProps = {
  changeContextUser,
  fetchRemoteCommands,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,

  onSelectUser: itemSelected => {
    const userId =
      itemSelected && itemSelected.value ? itemSelected.value : itemSelected;
    if (!userId) return;

    dispatchProps.changeContextUser(
      userId && userId.value ? userId.value : userId
    );

    const { match, history, location } = ownProps;
    const pathname = generatePath(match.path, {
      ...match.params,
      userId,
    });
    history.push({ ...location, pathname });
  },
});

export default connect(
  stateToProps,
  dispatchToProps,
  RemoteCommands,
  mergeProps
);
