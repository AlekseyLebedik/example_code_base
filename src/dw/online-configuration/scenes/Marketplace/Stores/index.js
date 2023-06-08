import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import Stores from './container';
import * as StoresActions from './actions';
import * as StoresActionTypes from './actionTypes';

export { StoresActions, StoresActionTypes };

export default contextAwareService(
  Services.Marketplace,
  ServiceEndpoints.Marketplace.getStores
)(Stores);
