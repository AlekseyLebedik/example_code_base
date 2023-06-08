import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import BulkInventoryUpdate from './container';

export default contextAwareService(
  Services.Marketplace,
  ServiceEndpoints.Marketplace.inventoryBulkUpdate
)(BulkInventoryUpdate);
