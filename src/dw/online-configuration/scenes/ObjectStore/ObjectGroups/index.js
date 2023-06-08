import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import Groups from './container';

export default contextAwareService(
  Services.Groups,
  ServiceEndpoints.Groups.getGroups,
  Services.ObjectStore
)(Groups);
