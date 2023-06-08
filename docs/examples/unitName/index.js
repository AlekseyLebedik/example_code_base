import React from 'react';

import { makeUnit } from 'dw/core/helpers/unit';
import WaitFor from 'dw/core/components/WaitFor';
import UserReplica from 'dw/core/replicas/user';
import PermissionsReplica from 'dw/core/replicas/permissions';

import App from './components/App';

import createStore from './store';
import scenesSagas from './scenes/sagas';

const userProfileSelector = state => state.user.profile;
const userProjectSelector = state => state.user.projects;

export default makeUnit(
  <>
    <UserReplica.ConnectedReplica />
    <PermissionsReplica.ConnectedReplica />

    {/* Wait for the replicated data to be set in the store */}
    <WaitFor selectors={[userProfileSelector, userProjectSelector]}>
      <App />
    </WaitFor>
  </>,
  createStore,
  {
    sagas: [...scenesSagas],
  }
);
