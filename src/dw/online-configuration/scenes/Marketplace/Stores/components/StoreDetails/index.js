import React from 'react';
import { useSelector } from 'react-redux';
import download from 'downloadjs';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import AsyncComponent from 'dw/core/components/AsyncComponent';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { ACTIVATE_MARKETPLACE_STORES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';
import PropagateLoading from 'dw/core/components/BackdropLoading';

import SectionTitle from 'dw/core/components/SectionTitle';
import PropagateStoreModal from './components/PropagateStoreModal';
import DeleteStore from './components/DeleteStore';

import './index.css';

const Monaco = AsyncComponent(() =>
  import(
    /* webpackChunkName: "MonacoEditor" */ 'dw/core/components/FormFields/Monaco'
  )
);

const StoreDetails = props => {
  const { selectedStore, onSetActiveStore, onClearStoreCache } = props;
  const { propagateStoreModalVisible, submitting } =
    props.propagateStoreModalProps;
  const {
    openPropagateStoreModalHandler,
    closePropagateStoreModalHandler,
    propagateOnRemoteSubmit,
    onPropagateStoreHandler,
  } = props.propagateStoreEvents;
  const { isPropagateStoreLoading, propagateValues } = props.propagateData;
  const {
    label: propagateLabel,
    environment: propagateEnvironment,
    context: propagateContext,
  } = propagateValues;

  const currentEnv = useSelector(currentEnvDetailsSelector);

  const stringStoreCode = () =>
    JSON.stringify(selectedStore.code, undefined, 2);

  const Actions = isActive => (
    <>
      {!isActive && (
        <ConfirmActionComponent
          component="IconButton"
          container="details"
          onClick={() => onSetActiveStore(selectedStore.label)}
          disabled={!selectedStore.code}
          confirm={{
            title: 'Confirm Activation',
            confirmMsg:
              'Are you sure you want to activate this store? This will deactivate the currently active store.',
            mainButtonLabel: 'Activate',
          }}
          tooltip="Activate"
          color="inherit"
        >
          settings_power
        </ConfirmActionComponent>
      )}
      <Tooltip title="Propagate">
        <IconButton
          color="inherit"
          onClick={openPropagateStoreModalHandler}
          disabled={!selectedStore.code}
        >
          <Icon>call_split</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Download">
        <IconButton
          color="inherit"
          onClick={() =>
            download(stringStoreCode(), `${selectedStore.label}.json.txt`)
          }
          disabled={!selectedStore.code}
        >
          <Icon>file_download</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Clear Cache">
        <IconButton
          color="inherit"
          onClick={() => onClearStoreCache(selectedStore.label)}
          disabled={!selectedStore.code}
        >
          <Icon>autorenew</Icon>
        </IconButton>
      </Tooltip>
      {!isActive && <DeleteStore label={selectedStore.label} />}
    </>
  );

  const PropagatingMsg = () => {
    if (propagateEnvironment) {
      const { key, label: env } = propagateEnvironment;
      const context = propagateContext[key];
      return (
        <div className="propagate-loading-msg">
          <div>{`Propagating '${propagateLabel}' to '${context} in ${env}'`}</div>
          <div>Please note this may take several minutes for large stores.</div>
        </div>
      );
    }
    return null;
  };

  const Maincomponent = () => (
    <div className="details__container store flex-rows-container">
      <PropagateLoading
        open={isPropagateStoreLoading}
        MsgComponent={PropagatingMsg}
      />
      <PropagateStoreModal
        storeLabel={selectedStore.label}
        visible={propagateStoreModalVisible}
        submitting={submitting}
        onCancel={closePropagateStoreModalHandler}
        onRemoteSubmit={propagateOnRemoteSubmit}
        onSubmit={values => onPropagateStoreHandler(values)}
      />

      <SectionTitle extraContent={<div />}>
        <CheckPermission
          predicate={ACTIVATE_MARKETPLACE_STORES}
          object={`titleenv.${currentEnv.id}`}
        >
          {Actions(selectedStore.isActive)}
        </CheckPermission>
      </SectionTitle>
      <div className="scrollable-content store-code-mirror">
        <Monaco
          options={{
            fontSize: 12,
            minimap: { enabled: false },
            readOnly: true,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            wrappingIndent: 'indent',
          }}
          language="json"
          value={stringStoreCode()}
        />
      </div>
    </div>
  );

  const emptyComponent = (
    <div className="store-details__empty-container">
      Select a Store to see more details
    </div>
  );

  return !selectedStore ? emptyComponent : Maincomponent();
};

StoreDetails.propTypes = {
  // to be completed
};

export default StoreDetails;
