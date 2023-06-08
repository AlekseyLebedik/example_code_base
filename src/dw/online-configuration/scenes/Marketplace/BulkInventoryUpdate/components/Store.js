import StoreItems from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/StoreItems';
import StoreProducts from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/StoreProducts';
import StoreCurrencies from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/StoreBalances';

import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';

export const Items = contextAwareService(
  Services.Marketplace,
  ServiceEndpoints.Marketplace.getDefaultStore
)(StoreItems);

export const Products = contextAwareService(
  Services.Marketplace,
  ServiceEndpoints.Marketplace.getDefaultStore
)(StoreProducts);

export const Currencies = contextAwareService(
  Services.Marketplace,
  ServiceEndpoints.Marketplace.getDefaultStore
)(StoreCurrencies);
