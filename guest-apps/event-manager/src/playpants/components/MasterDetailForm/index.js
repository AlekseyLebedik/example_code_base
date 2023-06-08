import React from 'react';
import { connect } from 'react-redux';
import {
  initialize,
  isPristine,
  propTypes as reduxFormPropTypes,
  reduxForm,
  submit,
} from 'redux-form';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import SectionTitle from 'dw/core/components/SectionTitle';
import Loading from 'dw/core/components/Loading';

import styles from './index.module.css';

const MasterDetailForm = ({
  dispatch,
  extraContent,
  form,
  formFields,
  handleSubmit,
  isLoading,
  pristine,
  reset,
  selectedItem,
  submitting,
  title,
}) => {
  if (!selectedItem) return null;
  if (isLoading) return <Loading />;
  return (
    <div className={styles.container}>
      <SectionTitle
        title={`${title} (${selectedItem.id})`}
        extraContent={
          <>
            {selectedItem.description}
            {extraContent}
          </>
        }
      />
      <div className="scrollable-content">
        {!pristine && (
          <Prompt message="Changes you made won't be saved. Are you sure you want to leave?" />
        )}
        <form onSubmit={handleSubmit}>{formFields}</form>
      </div>
      <div className={styles.footer}>
        <Button
          className={styles.footerButton}
          disabled={pristine || submitting}
          onClick={reset}
          variant="contained"
        >
          Reset
        </Button>
        <Button
          className={styles.footerButton}
          color="primary"
          disabled={pristine || submitting}
          onClick={() => dispatch(submit(form))}
          variant="contained"
        >
          {submitting ? 'Saving' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

MasterDetailForm.propTypes = {
  formFields: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  isLoading: PropTypes.bool,
  selectedItem: PropTypes.object,
  title: PropTypes.string,
  ...reduxFormPropTypes.dispatch,
  ...reduxFormPropTypes.form,
  ...reduxFormPropTypes.handleSubmit,
  ...reduxFormPropTypes.pristine,
  ...reduxFormPropTypes.reset,
  ...reduxFormPropTypes.submitting,
};

MasterDetailForm.defaultProps = {
  isLoading: false,
  selectedItem: null,
  title: '',
};

const mapStateToProps = (state, ownProps) => ({
  pristine: isPristine(ownProps.form)(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: value => ownProps.onSave(value),
  onSubmitSuccess: (_, dispatchSuccessSubmit, { values }) =>
    dispatchSuccessSubmit(initialize(ownProps.form, values)),
});

const MasterDetailsForm = reduxForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(MasterDetailForm);

export default connect(mapStateToProps, mapDispatchToProps)(MasterDetailsForm);
