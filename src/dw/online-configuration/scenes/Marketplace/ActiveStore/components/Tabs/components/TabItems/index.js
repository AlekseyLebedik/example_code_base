import React from 'react';
import PropTypes from 'prop-types';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';

import { useConfigOption } from 'dw/online-configuration/hooks';
import TabWithTable from 'dw/online-configuration/components/TabWithTable';
import {
  getSaga,
  getReducer,
  reducerInitialState,
} from 'dw/core/components/TabWithAsyncTable';
import { getItems } from 'dw/online-configuration/services/marketplace';
import { COLUMNS } from './constants';

const actionPrefix = 'ACTIVE_STORE_TAB_ITEMS';
const actionTypePrefix = {
  actionPrefix,
  serviceName: Services.Marketplace,
  endpointName: ServiceEndpoints.Marketplace.getLabelledStore,
};
const saga = getSaga(actionPrefix, getItems);
const reducer = getReducer(actionPrefix);

const getRowId = ({ data }) => data?.itemID;

const TabItems = props => {
  const itemTypeConfigOptions = useConfigOption('MARKETPLACE_ITEM_TYPE');
  return (
    <TabWithTable
      actionTypePrefix={actionTypePrefix}
      tabState={props.tabState}
      columns={COLUMNS}
      searchPlaceHolder="Search by Item ID or Item Name"
      async
      gridOptions={{ getRowId, context: { itemTypeConfigOptions } }}
    />
  );
};

TabItems.propTypes = {
  tabState: PropTypes.object.isRequired,
};

export { saga, reducer, reducerInitialState };
export default TabItems;
