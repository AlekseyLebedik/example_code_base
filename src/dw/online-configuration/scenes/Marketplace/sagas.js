import activeStoreSaga from './ActiveStore/saga';
import { saga as activeStoreTabCurrenciesSaga } from './ActiveStore/components/Tabs/components/TabCurrencies';
import { saga as activeStoreTabItemsSaga } from './ActiveStore/components/Tabs/components/TabItems';
import { saga as activeStoreTabEntitlementsSaga } from './ActiveStore/components/Tabs/components/TabEntitlements';
import { saga as activeStoreTabExchangeSaga } from './ActiveStore/components/Tabs/components/TabExchange';
import { saga as activeStoreTabProductsSaga } from './ActiveStore/components/Tabs/components/TabProducts';
import { saga as activeStoreTabSkusSaga } from './ActiveStore/components/Tabs/components/TabSkus';
import { saga as activeStoreTabPawnableItemsSaga } from './ActiveStore/components/Tabs/components/TabPawnableItems';
import activeStoreTabConversionRulesSaga from './ActiveStore/components/Tabs/components/TabConversionRules/saga';
import storesSaga from './Stores/saga';
import playerInventorySagas from './PlayerAssets/sagas';

export const sagas = [
  activeStoreSaga,
  activeStoreTabCurrenciesSaga,
  activeStoreTabItemsSaga,
  activeStoreTabEntitlementsSaga,
  activeStoreTabExchangeSaga,
  activeStoreTabProductsSaga,
  activeStoreTabSkusSaga,
  activeStoreTabPawnableItemsSaga,
  activeStoreTabConversionRulesSaga,
  storesSaga,
  ...playerInventorySagas,
];
