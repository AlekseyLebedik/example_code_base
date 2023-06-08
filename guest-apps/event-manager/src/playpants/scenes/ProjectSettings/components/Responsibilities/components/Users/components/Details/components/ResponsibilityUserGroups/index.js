import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { RESP_REDIRECT_URL } from 'playpants/scenes/ProjectSettings/constants';
import ResponsibilityUserGroupsFormConnected from './components/ResponsibilityUserGroupsForm';
import { formatGroups } from './helpers';
import styles from './index.module.css';

export class ResponsibilityUserGroups extends Component {
  static propTypes = {
    addUserToGroup: PropTypes.func.isRequired,
    assignedGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
    baseUrl: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    fetchAssignedGroups: PropTypes.func.isRequired,
    form: PropTypes.string,
    initialValues: PropTypes.object.isRequired,
    project: PropTypes.number.isRequired,
    userID: PropTypes.number.isRequired,
  };

  static defaultProps = {
    form: null,
  };

  componentDidMount() {
    const { userID, fetchAssignedGroups, project } = this.props;
    fetchAssignedGroups(userID, project);
  }

  componentDidUpdate(prevProps) {
    const { userID, fetchAssignedGroups, project } = this.props;
    if (userID !== prevProps.userID) {
      fetchAssignedGroups(userID, project);
    }
  }

  addUserToGroup = values => {
    const { addUserToGroup, project, userID } = this.props;
    return addUserToGroup(userID, values, project);
  };

  render() {
    const { assignedGroups, baseUrl, classes, form, initialValues, project } =
      this.props;
    return (
      <div className={classNames(styles.form, classes.form)}>
        <strong>Responsibility Groups</strong>{' '}
        <span className={styles.hint}>
          (create a responsibility{' '}
          <Link to={`${baseUrl}${RESP_REDIRECT_URL}`}>group</Link> first to
          define the responsibility set)
        </span>
        <ResponsibilityUserGroupsFormConnected
          addUserToGroup={this.addUserToGroup}
          project={project}
          defaultValue={formatGroups(assignedGroups)}
          form={form}
          initialValues={initialValues}
        />
      </div>
    );
  }
}

const ResponsibilityUserGroupsStyled = withStyles(theme => ({
  form: {
    backgroundColor: theme.palette.grey['100'],
  },
}))(ResponsibilityUserGroups);

export default ResponsibilityUserGroupsStyled;
