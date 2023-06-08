import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
import Table from 'dw/core/components/TableHydrated';
import { CHANGE_TITLE_ENV_ACCOUNTS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';

import Typography from '@material-ui/core/Typography';
import { COLUMNS, ADD_USER_KEY_MODAL_TITLE } from './constants';
import './presentational.css';

import AddKeyModal from './components/AddKeyModal';

const TabUserKeysStateless = props => {
  const {
    userKeys,
    openAddKeyModalHandler,
    closeAddKeyModalHandler,
    addKeyFormRemoteSubmitHandler,
    addKeyFormSubmitHandler,
  } = props;
  const { addKeyModalVisible, addKeyModalLoading } = props.addKeyModal;
  const { dedicated, nonDedicated } = userKeys;
  const currentEnv = useSelector(currentEnvDetailsSelector);

  return (
    <div className="scrollable-content user-keys with-inner-padding">
      <CheckPermission
        predicate={CHANGE_TITLE_ENV_ACCOUNTS}
        object={`titleenv.${currentEnv.id}`}
      >
        <AddKeyModal
          title={ADD_USER_KEY_MODAL_TITLE}
          visible={addKeyModalVisible}
          loading={addKeyModalLoading}
          onCancel={closeAddKeyModalHandler}
          onRemoteSubmit={addKeyFormRemoteSubmitHandler}
          onSubmit={addKeyFormSubmitHandler}
        />

        <Tooltip title="Add" placement="bottom">
          <IconButton
            className="add-user-key primary-text-color"
            onClick={() => openAddKeyModalHandler()}
          >
            <Icon>playlist_add</Icon>
          </IconButton>
        </Tooltip>
      </CheckPermission>
      <Typography variant="subtitle1">Dedicated Keys</Typography>
      <Table data={dedicated} columns={COLUMNS} size="small" />
      <Typography className="second--row" variant="subtitle1">
        Non-dedicated Keys
      </Typography>
      <Table data={nonDedicated} columns={COLUMNS} size="small" />
    </div>
  );
};

TabUserKeysStateless.propTypes = {
  userKeys: PropTypes.shape({
    dedicated: PropTypes.arrayOf(PropTypes.object),
    nonDedicated: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  openAddKeyModalHandler: PropTypes.func.isRequired,
  closeAddKeyModalHandler: PropTypes.func.isRequired,
  addKeyFormRemoteSubmitHandler: PropTypes.func.isRequired,
  addKeyFormSubmitHandler: PropTypes.func.isRequired,
  addKeyModal: PropTypes.node.isRequired,
};

export default TabUserKeysStateless;
