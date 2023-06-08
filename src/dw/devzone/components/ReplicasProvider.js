import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '@demonware/devzone-core';

import * as CoreReplicas from 'dw/core/replicas';

const { UserReplica, PermissionsReplica, SwitchesReplica, ContentTypeReplica } =
  CoreReplicas;

window.CoreReplicas = CoreReplicas;

function ReplicasProvider({
  children,
  user,
  permissions,
  contentType,
  switches,
}) {
  return (
    <UserReplica.Context.Provider value={user}>
      <PermissionsReplica.Context.Provider value={permissions}>
        <ContentTypeReplica.Context.Provider value={contentType}>
          <SwitchesReplica.Context.Provider value={switches}>
            {children}
          </SwitchesReplica.Context.Provider>
        </ContentTypeReplica.Context.Provider>
      </PermissionsReplica.Context.Provider>
    </UserReplica.Context.Provider>
  );
}

window.Replicas = {
  UserReplica,
  PermissionsReplica,
  ContentTypeReplica,
  SwitchesReplica,
};

ReplicasProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object.isRequired,
  permissions: PropTypes.object.isRequired,
  switches: PropTypes.object.isRequired,
  contentType: PropTypes.object.isRequired,
};

const stateToProps = state => ({
  user: { data: state.user },
  permissions: { data: state.permissions },
  switches: { data: state.switches },
  contentType: { data: state.contentType },
});

export default connect(stateToProps)(ReplicasProvider);
