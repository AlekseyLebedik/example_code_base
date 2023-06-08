import React from 'react';
import PropTypes from 'prop-types';

import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import TabWithTable from 'dw/online-configuration/components/TabWithTable';
import {
  getSaga,
  getReducer,
  reducerInitialState,
} from 'dw/core/components/TabWithAsyncTable';
import { getPawnableItems } from 'dw/online-configuration/services/marketplace';
import { COLUMNS } from './constants';

const actionPrefix = 'ACTIVE_STORE_TAB_PAWNABLE_ITEMS';
const actionTypePrefix = {
  actionPrefix,
  serviceName: Services.Marketplace,
  endpointName: ServiceEndpoints.Marketplace.getLabelledStore,
};
const saga = getSaga(actionPrefix, getPawnableItems);
const reducer = getReducer(actionPrefix);

const TabPawnableItems = props => (
  <TabWithTable
    actionTypePrefix={actionTypePrefix}
    tabState={props.tabState}
    columns={COLUMNS}
    async
    useQuickFilter={false}
  />
);
TabPawnableItems.propTypes = {
  tabState: PropTypes.object.isRequired,
};

export { saga, reducer, reducerInitialState };
export default TabPawnableItems;
