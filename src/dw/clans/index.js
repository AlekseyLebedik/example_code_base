import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import setupApollo from 'dw/core/helpers/setupApollo';

import { makeUnit } from 'dw/core/helpers/unit';
import UserReplica from 'dw/core/replicas/user';
import PermissionsReplica from 'dw/core/replicas/permissions';
import SwitchesReplica from 'dw/core/replicas/switches';
import ContentTypeReplica from 'dw/core/replicas/contentType';

import App from './components/App';

import createStore from './store';

export default makeUnit(
  <ApolloProvider client={setupApollo()}>
    <UserReplica.ConnectedReplica />
    <PermissionsReplica.ConnectedReplica />
    <SwitchesReplica.ConnectedReplica />
    <ContentTypeReplica.ConnectedReplica />
    <App />
  </ApolloProvider>,
  createStore
);
