import React from 'react';
import PropTypes from 'prop-types';

import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import TabWithTable from 'dw/online-configuration/components/TabWithTable';
import {
  getSaga,
  getReducer,
  reducerInitialState,
} from 'dw/core/components/TabWithAsyncTable';
import { getCurrencies } from 'dw/online-configuration/services/marketplace';
import { COLUMNS } from './constants';

const actionPrefix = 'ACTIVE_STORE_TAB_CURRENCIES';
const actionTypePrefix = {
  actionPrefix,
  serviceName: Services.Marketplace,
  endpointName: ServiceEndpoints.Marketplace.getLabelledStore,
};
const saga = getSaga(actionPrefix, getCurrencies);
const reducer = getReducer(actionPrefix);

const getRowId = ({ data }) => data?.currencyID;

const TabCurrencies = props => (
  <TabWithTable
    actionTypePrefix={actionTypePrefix}
    tabState={props.tabState}
    columns={COLUMNS}
    searchPlaceHolder="Search by Currency ID or Currency Code"
    async
    gridOptions={{ getRowId }}
  />
);

TabCurrencies.propTypes = {
  tabState: PropTypes.object.isRequired,
};

export { saga, reducer, reducerInitialState };
export default TabCurrencies;
