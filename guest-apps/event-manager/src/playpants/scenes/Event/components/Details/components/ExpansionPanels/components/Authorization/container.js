import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import {
  AUTH_STATUS,
  STATUS_STATE,
  AUTHORIZATION_DETAIL_ID,
} from '../../constants';

import AuthorizationStateless from './presentational';

const Authorization = props => {
  const { eventData, currentUser, onSave } = props;

  const handleAuthorizationChange = status => {
    const { id, name } = currentUser;
    onSave('authorizations', {
      status,
      user: {
        id,
        name,
      },
    });
  };

  // count only authorizations that are relevant to authorized users
  const { authorizations = [], authorizers = [] } = eventData;
  const authsDisplayCount = authorizations.filter(auth =>
    authorizers.some(authorizer => authorizer.id === auth.user.id)
  ).length;
  const authStatus = AUTH_STATUS[eventData.status];
  const statusState = STATUS_STATE[eventData.status];
  const isPending = authStatus === AUTH_STATUS.pending;
  const eventUserAuthorizations = authorizations.map(
    authorization => authorization.user
  );
  const filteredAuthorizers = isPending ? authorizers : eventUserAuthorizations;
  return (
    <AuthorizationStateless
      {...props}
      authsDisplayCount={authsDisplayCount}
      authStatus={authStatus}
      handleAuthorizationChange={handleAuthorizationChange}
      statusState={statusState}
      filteredAuthorizers={filteredAuthorizers}
    />
  );
};

const dispatchToProps = dispatch => ({
  onCancel: () => {
    dispatch(ModalHandlers.close(AUTHORIZATION_DETAIL_ID));
  },
});

Authorization.propTypes = {
  currentUser: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  eventData: PropTypes.object.isRequired,
};

export default connect(null, dispatchToProps)(Authorization);
