import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Input from 'dw/core/components/FormFields/Input';
import ModalForm from 'dw/core/components/ModalForm';
import { EDIT_MARKETPLACE_PLAYER_BALANCES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import CurrenciesTable from '../components/CurrenciesTable';
import ActionBar from '../components/ActionBar';
import CurrencyChangeForm from '../components/CurrencyChangeForm';
import ActionButtons from './components/ActionButtons';

import { SINGLE_BALANCE_EDIT_FORM } from './constants';
import styles from './presentational.module.css';

export function OpenModalButton({ onClick }) {
  const hasEditPermission = useCurrentEnvPermission(
    EDIT_MARKETPLACE_PLAYER_BALANCES
  );
  return (
    <Tooltip title="Add/Remove" placement="bottom">
      <div>
        <IconButton onClick={onClick} disabled={!hasEditPermission}>
          <Icon>exposure</Icon>
        </IconButton>
      </div>
    </Tooltip>
  );
}
OpenModalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const PlayerBalancesStateless = props => {
  const {
    playerBalances,
    onSelectItems,
    selectedBalances,
    onToggleDeleteModal,
    onSubmitDelete,
    onToggleEdit,
    onSubmitEdit,
    isEditing,
    isDeleteModalOpen,
    onGridReady,
    isLoading,
    hasEditPermission,
    userId,
    reset,
    pristine,
    handleSubmit,
    submitting,
    formatDate,
  } = props;

  const inputRenderer = ({ data = {} }) => (
    <div className={styles.editFieldContainer} key={data.currencyID}>
      <Field
        component={Input}
        name={`balances.${data.currencyID}`}
        type="number"
        inputProps={{ min: 0, className: styles.currenciesInput }}
      />
    </div>
  );

  const addRemoveRenderer = ({ data = {} }) => (
    <ModalForm
      form={`${SINGLE_BALANCE_EDIT_FORM}_${data.currencyID}`}
      formName={`${SINGLE_BALANCE_EDIT_FORM}_${data.currencyID}`}
      FormComponent={CurrencyChangeForm}
      OpenModalComponent={OpenModalButton}
      title={`Add/Remove currency: ${data.currencyCode}`}
      submittingText="Sumbitting..."
      submitText="Submit"
      maxWidth="md"
      fieldName={`balances.${data.currencyID}`}
      currencyID={data.currencyID}
      userId={userId}
      onToggleEdit={onToggleEdit}
    />
  );

  const components = {
    inputRenderer,
    addRemoveRenderer,
  };

  const extraColumns = [
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: 'addRemoveRenderer',
      minWidth: 100,
      pinned: 'right',
    },
  ];

  return (
    <div className={styles.container}>
      <ActionBar
        ActionButtonComponent={ActionButtons}
        actionButtonComponentProps={{
          hasEditPermission,
          selectedBalances,
          isEditing,
          onToggleEdit,
          onSubmitEdit,
          onToggleDeleteModal,
          onSubmitDelete,
          isDeleteModalOpen,
          reset,
          pristine,
          submitting,
          handleSubmit,
        }}
        label={userId}
        inventoryContext="player"
      />

      <div className={styles.table}>
        <CurrenciesTable
          isLoading={isLoading}
          selectable={!isEditing}
          data={playerBalances}
          onGridReady={onGridReady}
          onSelectionChanged={e => {
            if (!isEditing) {
              onSelectItems(e.api.getSelectedRows());
            }
          }}
          inventoryContext="player"
          components={components}
          isEditing={isEditing}
          extraColumns={extraColumns}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
};

PlayerBalancesStateless.propTypes = {
  playerBalances: PropTypes.array.isRequired,
  onSelectItems: PropTypes.func,
  selectedBalances: PropTypes.array,
  onToggleDeleteModal: PropTypes.func,
  onSubmitDelete: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onSubmitEdit: PropTypes.func,
  isEditing: PropTypes.bool,
  isDeleteModalOpen: PropTypes.bool,
  onGridReady: PropTypes.func,
  isLoading: PropTypes.bool,
  hasEditPermission: PropTypes.bool,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  formatDate: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

PlayerBalancesStateless.defaultProps = {
  onSelectItems: () => {},
  selectedBalances: null,
  onToggleDeleteModal: () => {},
  onSubmitDelete: () => {},
  onToggleEdit: () => {},
  onSubmitEdit: () => {},
  isEditing: false,
  isDeleteModalOpen: false,
  onGridReady: () => {},
  isLoading: false,
  hasEditPermission: false,
  userId: undefined,
  pristine: null,
  reset: null,
  submitting: null,
  formatDate() {},
};

export default PlayerBalancesStateless;
