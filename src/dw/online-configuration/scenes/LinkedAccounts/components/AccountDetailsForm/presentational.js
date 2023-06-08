import React from 'react';
import { Field, Form, propTypes as reduxFormPropTypes } from 'redux-form';

import Input from 'dw/core/components/FormFields/Input';
import Checkbox from 'dw/core/components/FormFields/Checkbox';
import * as V from 'dw/core/components/FormFields/validation';

import styles from './presentational.module.css';

const AccountDetailsFormStateless = props => {
  const { handleSubmit, onSubmit, userExistsInMarketplace } = props;

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formSection}>
          <Field
            name="username"
            component={Input}
            label="Username"
            validate={[V.required]}
            fullWidth
            className={styles.usernameField}
          />
          <Field
            name="hash"
            component={Input}
            disabled
            label="Hash"
            fullWidth
            className={styles.usernameField}
          />
        </div>
        <Field
          name="removeHash"
          component={Checkbox}
          label="Remove crossplay hash from username"
        />
        <div className={styles.formSection}>
          <span
            className={`${styles.tokensLabel} ${
              !userExistsInMarketplace && styles.disabled
            }`}
          >
            Rename tokens:{' '}
          </span>
          <Field
            name="tokenCount"
            component={Input}
            label=""
            disabled={!userExistsInMarketplace}
            helperText={
              (userExistsInMarketplace === undefined &&
                'Fetching rename tokens for this user...') ||
              (!userExistsInMarketplace &&
                'Cannot change rename tokens as user does not exist in Marketplace.') ||
              ''
            }
            validate={!userExistsInMarketplace ? undefined : [V.nonNegativeInt]}
            type="number"
            className={styles.tokensField}
          />
        </div>
      </Form>
    </div>
  );
};

AccountDetailsFormStateless.propTypes = {
  ...reduxFormPropTypes.handleSubmit,
  ...reduxFormPropTypes.onSubmit,
};

AccountDetailsFormStateless.defaultProps = {};

export default AccountDetailsFormStateless;
