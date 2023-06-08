import React from 'react';
import PropTypes from 'prop-types';
import Table from 'dw/core/components/TableHydrated';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {
  SECURITY_ADD_ANTICHEAT_FUNCTIONS,
  SECURITY_DELETE_ANTICHEAT_FUNCTIONS,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import Loading from 'dw/core/components/Loading';

import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import AddFunctionModal from './components/AddFunctionModal';

import { COLUMNS } from './constants';

const FunctionsStateless = ({
  functions,
  selectedRowKeys,
  deleteFunction,
  addModalProps,
}) => {
  const {
    isModalVisible,
    addOnRemoteSubmit,
    onAddFunctionHandler,
    openAddModal,
    closeAddModal,
  } = addModalProps;

  const [loadingPermission, , result] = useCurrentEnvPermission(
    [SECURITY_ADD_ANTICHEAT_FUNCTIONS, SECURITY_DELETE_ANTICHEAT_FUNCTIONS],
    false
  );
  const hasDeletePermission =
    result?.data?.[SECURITY_DELETE_ANTICHEAT_FUNCTIONS];
  const hasAddPermission = result?.data?.[SECURITY_ADD_ANTICHEAT_FUNCTIONS];

  const empty = <div className="empty">No data to display</div>;

  const renderTable = () => {
    const deleteProps = hasDeletePermission
      ? {
          getKey: k => k.functionId,
          className: 'with-permissions',
          actions: [
            {
              iconName: 'delete',
              label: 'Delete Selected',
            },
          ],
          hideActions: true,
        }
      : {};
    return <Table data={functions} columns={COLUMNS} {...deleteProps} />;
  };

  return loadingPermission ? (
    <Loading />
  ) : (
    <section className="main-container functions flex-rows-container">
      {(hasAddPermission || (hasDeletePermission && functions.length > 0)) && (
        <SectionTitle>
          {hasAddPermission && (
            <span className="add-modal-controls">
              <AddFunctionModal
                visible={isModalVisible}
                onCancel={closeAddModal}
                onRemoteSubmit={addOnRemoteSubmit}
                onSubmit={onAddFunctionHandler}
              />
              <Tooltip title="Add Function" placement="bottom">
                <IconButton color="inherit" onClick={openAddModal}>
                  <Icon>playlist_add</Icon>
                </IconButton>
              </Tooltip>
            </span>
          )}
          {hasDeletePermission && functions.length > 0 && (
            <ConfirmActionComponent
              component="IconButton"
              tooltipProps={
                selectedRowKeys.length > 0
                  ? {
                      title: 'Delete Selected Functions',
                      placement: 'bottom',
                    }
                  : null
              }
              onClick={() => deleteFunction(selectedRowKeys)}
              confirm={{
                title: 'Confirm Delete',
                confirmMsg:
                  'Are you sure you want to delete selected Functions?',
                mainButtonLabel: 'Delete',
                destructive: true,
              }}
              disabled={selectedRowKeys.length === 0}
              color="inherit"
            >
              delete
            </ConfirmActionComponent>
          )}
        </SectionTitle>
      )}
      <div className="scrollable-content with-inner-padding">
        {functions.length !== 0 ? renderTable() : empty}
      </div>
    </section>
  );
};

FunctionsStateless.propTypes = {
  functions: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  deleteFunction: PropTypes.func.isRequired,
  addModalProps: PropTypes.shape({
    isModalVisible: PropTypes.bool,
    addOnRemoteSubmit: PropTypes.func,
    onAddFunctionHandler: PropTypes.func,
    openAddModal: PropTypes.func,
    closeAddModal: PropTypes.func,
  }).isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
};

FunctionsStateless.defaultProps = {
  selectedRowKeys: [],
};

export default FunctionsStateless;
