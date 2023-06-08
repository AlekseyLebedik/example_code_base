import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';

import ActiveStore from './container';
import * as ActiveStoreActions from './actions';
import * as ActiveStoreActionTypes from './actionTypes';

export { ActiveStoreActions, ActiveStoreActionTypes };

export default contextAwareService(
  Services.Marketplace,
  ServiceEndpoints.Marketplace.getDefaultStore
)(ActiveStore);
