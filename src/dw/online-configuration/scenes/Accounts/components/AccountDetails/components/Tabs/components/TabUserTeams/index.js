import React from 'react';
import PropTypes from 'prop-types';

import TabWithTable, {
  getSaga,
  getReducer,
  reducerInitialState,
} from 'dw/online-configuration/components/TabWithTable';
import { getUserTeams } from 'dw/online-configuration/services/accounts';
import { COLUMNS, ACTION_TYPE_PREFIX } from './constants';

const saga = getSaga(ACTION_TYPE_PREFIX, getUserTeams);
const reducer = getReducer(ACTION_TYPE_PREFIX);

const TabUserTeams = props => (
  <TabWithTable
    actionTypePrefix={ACTION_TYPE_PREFIX}
    tabState={props.tabState}
    columns={COLUMNS}
  />
);

TabUserTeams.propTypes = {
  tabState: PropTypes.object.isRequired,
};

export { saga, reducer, reducerInitialState };
export default TabUserTeams;
