import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { makeUnit } from 'dw/core/helpers/unit';
import WaitFor from 'dw/core/components/WaitFor';
import UserReplica from 'dw/core/replicas/user';
import PermissionsReplica from 'dw/core/replicas/permissions';
import SwitchesReplica from 'dw/core/replicas/switches';
import ContentTypeReplica from 'dw/core/replicas/contentType';

import sourceSelectSaga from 'dw/core/components/SourceSelect/saga';
import RedirectToDefault from 'dw/core/components/RedirectToDefault';

import { projectsSelector } from 'dw/core/helpers/title-env-selectors';

import App from './components/App';

import createStore from './store';

import componentsSagas from './components/sagas';
import scenesSagas from './scenes/sagas';

const userProfileSelector = state => state.user.profile;

export default makeUnit(
  <>
    <UserReplica.ConnectedReplica />
    <PermissionsReplica.ConnectedReplica />
    <SwitchesReplica.ConnectedReplica />
    <ContentTypeReplica.ConnectedReplica />

    {/* Wait for the replicated data to be set in the store */}
    <WaitFor selectors={[userProfileSelector, projectsSelector]}>
      <Switch>
        <Route path="/online-configuration/:titleId/:env" component={App} />
        <Route component={RedirectToDefault} />
      </Switch>
    </WaitFor>
  </>,
  createStore,
  {
    sagas: [...componentsSagas, ...scenesSagas, sourceSelectSaga],
  }
);
