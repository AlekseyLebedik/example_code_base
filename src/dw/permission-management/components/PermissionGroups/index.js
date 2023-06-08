import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Form, Field, submit, reset } from 'redux-form';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Select from 'dw/core/components/FormFields/Select';
import Loading from 'dw/core/components/Loading';
import {
  companyMembershipsSelector,
  companyAndMembershipSelector,
} from 'dw/permission-management/scenes/Users/selectors';
import { saveUserCompaniesAndGroups } from 'dw/permission-management/scenes/Users/actions';
import CompanyGroups from './components/CompanyGroups';
import { assignedGroupsSelector, loadingSelector } from './selectors';

import styles from './index.module.css';

export class PermissionGroups extends Component {
  saveUserCompaniesAndGroups = values =>
    this.props.saveUserCompaniesAndGroups(this.props.userID, values);

  render() {
    const {
      handleSubmit,
      onSubmit,
      onReset,
      classes,
      form,
      companies,
      change,
    } = this.props;

    if (this.props.loading) return <Loading />;

    return (
      <>
        <Form onSubmit={handleSubmit(this.saveUserCompaniesAndGroups)}>
          <div className={classNames(styles.form, classes.form)}>
            <strong>Associated Companies</strong>{' '}
            <span className={styles.hint}>
              (User has permissions to view everything in Devzone for these
              companies)
            </span>
            <Field
              component={Select}
              fullWidth
              multiple
              name="companies"
              options={companies.map(({ id, name }) => ({
                value: id,
                label: name,
              }))}
            />
          </div>
          <div className={classNames(styles.form, classes.form)}>
            <strong>Permission Groups</strong>{' '}
            <span className={styles.hint}>
              (create permission{' '}
              <Link to="/permission-management/groups">group</Link> first to
              define the permission set)
            </span>
            <Field
              component={CompanyGroups}
              fullWidth
              multiple
              name="groups"
              label="Click to add user to a new group (company-wide view permissions enabled by default)"
              changeGroups={groups => change('groups', groups)}
            />
          </div>
        </Form>
        <div className={styles.buttons}>
          <Button
            variant="contained"
            onClick={() => onReset(form)}
            size="small"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={styles.footerButton}
            onClick={() => onSubmit(form)}
            size="small"
          >
            Save
          </Button>
        </div>
      </>
    );
  }
}

PermissionGroups.propTypes = {
  userID: PropTypes.number,
  saveUserCompaniesAndGroups: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  form: PropTypes.string,
  companies: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  change: PropTypes.func.isRequired,
};

PermissionGroups.defaultProps = {
  userID: undefined,
  form: null,
  companies: [],
  loading: false,
};

const stateToProps = state => ({
  companies: companyAndMembershipSelector(state),
  loading: loadingSelector(state),
  initialValues: {
    groups: assignedGroupsSelector(state),
    companies: companyMembershipsSelector(state, { flat: true }),
  },
});

const dispatchToProps = {
  onSubmit: form => submit(form),
  onReset: form => reset(form),
  saveUserCompaniesAndGroups,
};

const PermissionGroupsConnected = compose(
  connect(stateToProps, dispatchToProps),
  reduxForm({
    enableReinitialize: true,
  }),
  withStyles(theme => ({
    form: {
      backgroundColor: theme.palette.grey['100'],
    },
  }))
)(PermissionGroups);

export default PermissionGroupsConnected;
