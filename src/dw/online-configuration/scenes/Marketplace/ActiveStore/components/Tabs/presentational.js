import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import classNames from 'classnames';

import FeatureSwitchesCheck, {
  featureSwitches as fs,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import AsyncComponent from 'dw/core/components/AsyncComponent';
import { TAB_KEYS } from './constants';
import './presentational.css';

const { TabPane } = Tabs;

const AsyncTabCurrencies = AsyncComponent(() =>
  import('./components/TabCurrencies')
);
const AsyncTabItems = AsyncComponent(() => import('./components/TabItems'));
const AsyncTabEntitlements = AsyncComponent(() =>
  import('./components/TabEntitlements')
);
const AsyncTabProducts = AsyncComponent(() =>
  import('./components/TabProducts')
);
const AsyncTabSkus = AsyncComponent(() => import('./components/TabSkus'));
const AsyncTabPawnableItems = AsyncComponent(() =>
  import('./components/TabPawnableItems')
);
const AsyncTabConversionRules = AsyncComponent(() =>
  import('./components/TabConversionRules')
);
const AsyncTabExchange = AsyncComponent(() =>
  import('./components/TabExchange')
);

const createLabel = (label, list = []) =>
  list.length ? `${label} (${list.length})` : label;

const TabsComponent = props => {
  const {
    activeStoreDetails,
    currenciesState,
    entitlementsState,
    exchangeState,
    exchangeServiceEnabled,
    formatDateTime,
    itemsState,
    onChange,
    pawnableItemsState,
    productsState,
    skusState,
  } = props;

  return (
    <div
      className={classNames(
        'active-store__tabs-container',
        'tabs-container',
        'tabs-container-reworked'
      )}
    >
      <Tabs defaultActiveKey={TAB_KEYS.CURRENCIES} onChange={onChange}>
        <TabPane
          tab={createLabel(TAB_KEYS.CURRENCIES, activeStoreDetails.currencies)}
          key={TAB_KEYS.CURRENCIES}
        >
          <AsyncTabCurrencies tabState={currenciesState} />
        </TabPane>
        <TabPane
          tab={createLabel(TAB_KEYS.ITEMS, activeStoreDetails.items)}
          key={TAB_KEYS.ITEMS}
        >
          <AsyncTabItems tabState={itemsState} />
        </TabPane>
        <TabPane
          tab={createLabel(
            TAB_KEYS.ENTITLEMENTS,
            activeStoreDetails.entitlements
          )}
          key={TAB_KEYS.ENTITLEMENTS}
        >
          <AsyncTabEntitlements tabState={entitlementsState} />
        </TabPane>
        <TabPane
          tab={createLabel(TAB_KEYS.PRODUCTS, activeStoreDetails.products)}
          key={TAB_KEYS.PRODUCTS}
        >
          <AsyncTabProducts tabState={productsState} />
        </TabPane>
        <TabPane
          tab={createLabel(TAB_KEYS.SKUS, activeStoreDetails.skus)}
          key={TAB_KEYS.SKUS}
        >
          <AsyncTabSkus tabState={skusState} formatDateTime={formatDateTime} />
        </TabPane>
        <TabPane
          tab={createLabel(
            TAB_KEYS.PAWNABLE_ITEMS,
            activeStoreDetails.pawnableItems
          )}
          key={TAB_KEYS.PAWNABLE_ITEMS}
        >
          <AsyncTabPawnableItems tabState={pawnableItemsState} />
        </TabPane>
        <TabPane
          tab={TAB_KEYS.CONVERSION_RULES}
          key={TAB_KEYS.CONVERSION_RULES}
        >
          <AsyncTabConversionRules />
        </TabPane>
        {exchangeServiceEnabled && (
          <TabPane
            tab={createLabel(TAB_KEYS.EXCHANGE, activeStoreDetails.products)}
            key={TAB_KEYS.EXCHANGE}
          >
            <FeatureSwitchesCheck
              featureSwitches={[fs.EXCHANGE_MARKETPLACE_ENABLED]}
            >
              <AsyncTabExchange
                tabState={exchangeState}
                mergeData={activeStoreDetails.products}
              />
            </FeatureSwitchesCheck>
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

TabsComponent.propTypes = {
  activeStoreDetails: PropTypes.object.isRequired,
  currenciesState: PropTypes.object.isRequired,
  entitlementsState: PropTypes.object.isRequired,
  exchangeServiceEnabled: PropTypes.bool.isRequired,
  exchangeState: PropTypes.object.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  itemsState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  pawnableItemsState: PropTypes.object.isRequired,
  productsState: PropTypes.object.isRequired,
  skusState: PropTypes.object.isRequired,
};

export default TabsComponent;
