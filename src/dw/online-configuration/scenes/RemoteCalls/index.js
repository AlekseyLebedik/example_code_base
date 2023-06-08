import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import RemoteCalls from './container';

export default contextAwareService(
  Services.DWPushService,
  ServiceEndpoints.DWPushService.postRemoteCall
)(RemoteCalls);
