import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'dw/core/hooks';

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { getPlayerBalances } from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/PlayerBalances/actions';
import { getPlayerItems } from '../../../actions';
import {
  isLoadingSelector,
  errorSelector,
} from '../../../PlayerInventory/selectors';

const RefreshPlayerInventory = ({ userId }) => {
  const dispatch = useDispatch();
  const snackbarActions = useSnackbar();

  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isLoading && !error && refreshing) {
      snackbarActions.success('Inventory refresh successful');
      setRefreshing(false);
    }
  }, [isLoading, refreshing, error]);

  const fetchPlayerInventory = () => {
    dispatch(getPlayerItems(userId));
    dispatch(getPlayerBalances(userId));
    setRefreshing(true);
  };
  return (
    <Tooltip title="Refresh Player Inventory">
      <IconButton onClick={fetchPlayerInventory} data-cy="refresh-inventory">
        <Icon>refresh</Icon>
      </IconButton>
    </Tooltip>
  );
};
RefreshPlayerInventory.propTypes = {
  userId: PropTypes.string,
};
RefreshPlayerInventory.defaultProps = {
  userId: undefined,
};

export default RefreshPlayerInventory;
