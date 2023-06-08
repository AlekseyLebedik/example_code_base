import React from 'react';

import { makeUnit } from 'dw/core/helpers/unit';
import UserReplica from 'dw/core/replicas/user';
import PermissionsReplica from 'dw/core/replicas/permissions';
import SwitchesReplica from 'dw/core/replicas/switches';
import ContentTypeReplica from 'dw/core/replicas/contentType';

import graphSaga from 'dw/devzone/components/Graph/saga';

import App from './components/App';

import createStore from './store';
import scenesSagas from './scenes/sagas';
import reportingSaga from './saga';

export default makeUnit(
  <>
    <UserReplica.ConnectedReplica />
    <PermissionsReplica.ConnectedReplica />
    <SwitchesReplica.ConnectedReplica />
    <ContentTypeReplica.ConnectedReplica />

    <App />
  </>,
  createStore,
  {
    sagas: [graphSaga, reportingSaga, ...scenesSagas],
  }
);
