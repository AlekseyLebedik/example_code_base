import React from 'react';
import PropTypes from 'prop-types';
import {
  FieldArray,
  propTypes as reduxFormPropTypes,
  submit,
} from 'redux-form';

import { Prompt } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import SectionTitle from 'dw/core/components/SectionTitle';
import Loading from 'dw/core/components/Loading';
import PermissionsList from './components/PermissionsList';
import ExportUsers from './components/ExportUsers';

import styles from './presentational.module.css';

const PermissionsFormStateLess = ({
  selectedItem,
  isLoading,
  title,
  form,
  contentTypes,
  selectedItemId,
  isPristine,
  extraFields,
  handleSubmit,
  submitting,
  dispatch,
  onMove,
  reset,
  dragTypeObjectPerm,
  dragTypeDetails,
  exportUsers,
}) => {
  if (!selectedItem) return null;
  if (isLoading) return <Loading />;
  return (
    <div className={styles.container}>
      <SectionTitle title={`${title} | ${selectedItemId}`}>
        {exportUsers && <ExportUsers item={selectedItem} />}
      </SectionTitle>
      <div className="scrollable-content">
        {!isPristine ? (
          <Prompt message="Changes you made won't be saved. Are you sure you want to leave?" />
        ) : null}
        <form onSubmit={handleSubmit}>
          {extraFields}
          {contentTypes.map((cType, index) => (
            <div key={cType.id}>
              <FieldArray
                name={`contentTypes[${index}].selections`}
                props={{
                  contentType: cType,
                  dragTypeObjectPerm,
                  dragTypeDetails,
                  form,
                }}
                component={PermissionsList}
                onMove={onMove}
                dragTypeObjectPerm={dragTypeObjectPerm}
                dragTypeDetails={dragTypeDetails}
              />
            </div>
          ))}
        </form>
      </div>
      <div className={styles.footer}>
        <Button
          variant="contained"
          className={styles.footerButton}
          disabled={isPristine || submitting}
          onClick={reset}
          data-cy="reset-form-button"
        >
          Reset
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={styles.footerButton}
          disabled={isPristine || submitting}
          onClick={() => dispatch(submit(form))}
          data-cy="save-form-button"
        >
          {submitting ? 'Saving' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

PermissionsFormStateLess.propTypes = {
  selectedItem: PropTypes.object,
  selectedItemId: PropTypes.string,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  onMove: PropTypes.func,
  extraFields: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  contentTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      appLabel: PropTypes.string,
      model: PropTypes.string,
      details: PropTypes.array,
      permissions: PropTypes.array,
    })
  ),
  isPristine: PropTypes.bool.isRequired,
  ...reduxFormPropTypes.form,
  ...reduxFormPropTypes.handleSubmit,
  ...reduxFormPropTypes.submitting,
  ...reduxFormPropTypes.dispatch,
  ...reduxFormPropTypes.reset,
  exportUsers: PropTypes.bool,
};

PermissionsFormStateLess.defaultProps = {
  selectedItem: null,
  selectedItemId: null,
  title: '',
  extraFields: <></>,
  onMove: () => {},
  contentTypes: [],
  isLoading: false,
  exportUsers: false,
};

export default PermissionsFormStateLess;
