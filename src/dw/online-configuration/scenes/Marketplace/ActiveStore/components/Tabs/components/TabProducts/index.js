import React from 'react';
import PropTypes from 'prop-types';

import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import TabWithTable from 'dw/online-configuration/components/TabWithTable';
import {
  getSaga,
  getReducer,
  reducerInitialState,
} from 'dw/core/components/TabWithAsyncTable';
import TooltipWithTable from 'dw/core/components/TooltipWithTable';
import { getProducts } from 'dw/online-configuration/services/marketplace';
import { COLUMNS } from './constants';

const actionPrefix = 'ACTIVE_STORE_TAB_PRODUCTS';
const actionTypePrefix = {
  actionPrefix,
  serviceName: Services.Marketplace,
  endpointName: ServiceEndpoints.Marketplace.getLabelledStore,
};
const saga = getSaga(actionPrefix, getProducts);
const reducer = getReducer(actionPrefix);

const tooltipRenderer = ({ value: { label, elements = [], columns } }) => {
  if (elements.length > 0)
    return (
      <TooltipWithTable label={label} elements={elements} columns={columns} />
    );

  return 'None';
};

export const components = {
  tooltipRenderer,
};

const getRowId = ({ data }) => data?.productID;

const TabProducts = props => (
  <TabWithTable
    actionTypePrefix={actionTypePrefix}
    tabState={props.tabState}
    columns={COLUMNS}
    async
    searchPlaceHolder="Search by Product ID or Product Name"
    gridOptions={{ components, getRowId }}
  />
);

TabProducts.propTypes = {
  tabState: PropTypes.object.isRequired,
};

export { saga, reducer, reducerInitialState };
export default TabProducts;
