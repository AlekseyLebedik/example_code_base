import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, Form, reduxForm, reset, submit } from 'redux-form';
import { Prompt } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AutocompleteGeneral from 'dw/core/components/FormFields/AutocompleteGeneral';
import { GROUP_TYPE } from 'playpants/scenes/ProjectSettings/components/Responsibilities/components/Groups/constants';
import { formatGroups } from '../../helpers';
import * as actions from './actions';
import styles from './index.module.css';

export const ResponsibilityUserGroupsForm = ({
  addUserToGroup,
  defaultValue,
  form,
  handleSubmit,
  onAsyncFetchGroupList,
  onReset,
  onSubmit,
  pristine,
  project,
  submitting,
}) => {
  const [updated, setUpdated] = useState(0);
  const onResetAll = () => {
    onReset(form);
    setUpdated(updated + 1);
  };

  const formatThenCallback = callback => result => {
    callback(formatGroups(result));
  };

  const loadOptions = (groupName, callback) => {
    onAsyncFetchGroupList(formatThenCallback(callback), project, groupName);
  };

  const handleAddUserToGroup = (groups, _action, formProps) => {
    if (!formProps.pristine) {
      addUserToGroup(groups);
    }
  };

  return (
    <>
      {!pristine && (
        <Prompt message="Changes you made won't be saved. Are you sure you want to leave?" />
      )}
      <Form onSubmit={handleSubmit(handleAddUserToGroup)}>
        <Field
          component={AutocompleteGeneral}
          defaultValue={defaultValue}
          fullWidth
          isClearable={false}
          isMulti
          key={`${defaultValue}-${updated}`}
          label="Groups"
          name="groups"
          placeholder="Click to add user to a new group"
          loadOptions={loadOptions}
        />
      </Form>

      <div className={styles.buttons}>
        <Button
          disabled={pristine || submitting}
          onClick={onResetAll}
          size="small"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          className={styles.footerButton}
          color="primary"
          disabled={pristine || submitting}
          onClick={() => onSubmit(form)}
          size="small"
          variant="contained"
        >
          {submitting ? 'Saving' : 'Save'}
        </Button>
      </div>
    </>
  );
};

ResponsibilityUserGroupsForm.propTypes = {
  addUserToGroup: PropTypes.func.isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.object).isRequired,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  project: PropTypes.number.isRequired,
  onAsyncFetchGroupList: PropTypes.func.isRequired,
};

const dispatchToProps = dispatch => ({
  onSubmit: form => dispatch(submit(form)),
  onReset: form => dispatch(reset(form)),
  onAsyncFetchGroupList: (callback, project, name) =>
    dispatch(
      actions.asyncFetchGroupList({
        callback,
        name__icontains: name,
        project,
        type: GROUP_TYPE,
      })
    ),
});

const ResponsibilityUserGroupsFormConnected = reduxForm({
  enableReinitialize: true,
})(connect(null, dispatchToProps)(ResponsibilityUserGroupsForm));

export default ResponsibilityUserGroupsFormConnected;
