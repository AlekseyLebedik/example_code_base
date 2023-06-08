import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { useSnackbar } from 'dw/core/hooks';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { deleteStore } from 'dw/online-configuration/services/marketplace';
import { fetchStores } from 'dw/online-configuration/scenes/Marketplace/Stores/actions';

const DeleteStore = ({ label }) => {
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { Marketplace: endpoints } = ServiceEndpoints;
  const context = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.Marketplace,
      endpoint: endpoints.deleteStore,
    })
  );

  const onDelete = useCallback(async () => {
    try {
      await deleteStore(label, context);
      const split = location.pathname.split('/');
      history.push({
        pathname: split.slice(0, split.length - 1).join('/'),
      });
      dispatch(fetchStores());
      snackbar.success('Store has been successfully deleted');
    } catch (err) {
      const {
        response: { data },
      } = err;
      // eslint-disable-next-line
      console.log(data?.error);
      snackbar.error('Something went wrong, see logs for details.');
    }
  }, [snackbar, deleteStore]);

  return (
    <ConfirmActionComponent
      component="IconButton"
      container="details"
      onClick={onDelete}
      confirm={{
        title: 'Confirm Delete',
        confirmMsg: 'Are you sure you want to delete this store?',
        mainButtonLabel: 'Delete',
        destructive: true,
      }}
      tooltip="Delete"
      color="inherit"
    >
      delete
    </ConfirmActionComponent>
  );
};
DeleteStore.propTypes = {
  label: PropTypes.string.isRequired,
};

export default DeleteStore;
