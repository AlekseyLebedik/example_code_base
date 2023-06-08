import React from 'react';
import PropTypes from 'prop-types';

import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import TabWithTable from 'dw/online-configuration/components/TabWithTable';
import {
  getSaga,
  getReducer,
  reducerInitialState,
} from 'dw/core/components/TabWithAsyncTable';
import { getSkus } from 'dw/online-configuration/services/marketplace';
import { COLUMNS } from './constants';

const actionPrefix = 'ACTIVE_STORE_TAB_SKUS';
const actionTypePrefix = {
  actionPrefix,
  serviceName: Services.Marketplace,
  endpointName: ServiceEndpoints.Marketplace.getLabelledStore,
};
const saga = getSaga(actionPrefix, getSkus);
const reducer = getReducer(actionPrefix);

const getRowId = ({ data }) => data?.skuID;

const TabSkus = props => (
  <TabWithTable
    actionTypePrefix={actionTypePrefix}
    tabState={props.tabState}
    columns={COLUMNS}
    searchPlaceHolder="Search by SKU ID"
    formatDateTime={props.formatDateTime}
    async
    gridOptions={{ getRowId }}
  />
);

TabSkus.propTypes = {
  formatDateTime: PropTypes.func.isRequired,
  tabState: PropTypes.object.isRequired,
};

export { saga, reducer, reducerInitialState };
export default TabSkus;
