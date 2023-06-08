import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import TabWithTableBase from 'dw/core/components/TabWithTable';
import TabWithAsyncTable from 'dw/core/components/TabWithAsyncTable';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';

const TabWithTable = ({ actionTypePrefix, async, ...props }) => {
  const actionPrefix = useMemo(() => {
    if (typeof actionTypePrefix === 'string') return actionTypePrefix;
    return {
      ...actionTypePrefix,
      fetchAction:
        (urlID, params, append = false) =>
        (dispatch, getState) => {
          const {
            serviceName,
            endpointName,
            actionPrefix: prefix,
          } = actionTypePrefix;
          const context = makeContextToUseSelector(getState(), {
            serviceName,
            endpoint: endpointName,
          });
          dispatch({
            type: `${prefix}_FETCH`,
            urlID,
            params: { ...params, context },
            append,
          });
        },
    };
  }, [actionTypePrefix]);
  return async ? (
    <TabWithAsyncTable {...props} actionTypePrefix={actionPrefix} />
  ) : (
    <TabWithTableBase {...props} actionTypePrefix={actionPrefix} />
  );
};
TabWithTable.propTypes = {
  ...TabWithTableBase.propTypes,
  async: PropTypes.bool,
};
TabWithTable.defaultProps = {
  ...TabWithTableBase.defaultProps,
  async: false,
};

export * from 'dw/core/components/TabWithTable';
export default TabWithTable;
