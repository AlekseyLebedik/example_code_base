import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ModalForm from 'dw/core/components/ModalForm';
import AccountDetailsForm from '../AccountDetailsForm';
import { CHANGE_ACCOUNT_DETAILS_FORM_NAME } from '../../constants';
import styles from './index.module.css';

const RenamePlayerModal = props => {
  const { account } = props;
  // eslint-disable-next-line react/prop-types
  const OpenModalButton = ({ onClick }) => (
    <Button
      key="cancel"
      onClick={onClick}
      variant="contained"
      className={styles.renameButton}
    >
      RENAME
    </Button>
  );

  return (
    <>
      <span className={styles.grow} />
      <ModalForm
        formName={CHANGE_ACCOUNT_DETAILS_FORM_NAME}
        FormComponent={AccountDetailsForm}
        OpenModalComponent={OpenModalButton}
        title="Update Account Details"
        submittingText="Updating..."
        submitText="Update"
        account={account}
        fullWidth
        maxWidth="md"
      />
    </>
  );
};

RenamePlayerModal.propTypes = {
  account: PropTypes.object.isRequired,
};

export default RenamePlayerModal;
