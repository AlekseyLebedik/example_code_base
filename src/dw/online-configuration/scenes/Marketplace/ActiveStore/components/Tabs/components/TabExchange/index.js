import React from 'react';
import PropTypes from 'prop-types';
import keyBy from 'lodash/keyBy';

import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { getExchangeItems } from 'dw/online-configuration/services/marketplace';

import TabWithTable from 'dw/online-configuration/components/TabWithTable';
import {
  getReducer,
  reducerInitialState,
  getSaga,
} from 'dw/core/components/TabWithAsyncTable';

import { components } from '../TabProducts';
import { COLUMNS } from './constants';

const EXCHANGE_ITEMS_FETCH = 'marketplace/ACTIVE_STORE_TAB_EXCHANGE';
const serviceName = Services.ExchangeMarketplace;
const endpointName = ServiceEndpoints.ExchangeMarketplace.getExchangeItems;

const actionTypePrefix = {
  actionPrefix: EXCHANGE_ITEMS_FETCH,
  serviceName,
  endpointName,
};
const saga = getSaga(EXCHANGE_ITEMS_FETCH, getExchangeItems);
const reducer = getReducer(EXCHANGE_ITEMS_FETCH);

const getRowId = ({ data }) => data?.fpsku_id;

const TabExchange = props => (
  <TabWithTable
    actionTypePrefix={actionTypePrefix}
    async
    columns={COLUMNS}
    gridOptions={{ components, getRowId }}
    mergeData={keyBy(props.mergeData, 'productID')}
    mergeKey="product_id"
    searchPlaceHolder="Search by Store / First Party"
    tabState={props.tabState}
  />
);

TabExchange.propTypes = {
  tabState: PropTypes.object.isRequired,
  mergeData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export { saga, reducer, reducerInitialState };

export default contextAwareService(serviceName, endpointName)(TabExchange);
