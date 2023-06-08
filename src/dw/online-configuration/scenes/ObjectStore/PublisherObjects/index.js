import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import PublisherObjects from './container';
import * as PublisherObjectsActions from './actions';
import * as PublisherObjectsActionTypes from './actionTypes';

export { PublisherObjectsActions, PublisherObjectsActionTypes };

export default contextAwareService(
  Services.ObjectStore,
  ServiceEndpoints.ObjectStore.getPublisherObjects,
  Services.Groups
)(PublisherObjects);
