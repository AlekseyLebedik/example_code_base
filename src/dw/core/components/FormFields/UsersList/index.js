import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'dw/core/helpers/uuid';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import pick from 'lodash/pick';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import UsersTable from './UsersTable';

import styles from './index.module.css';

class AddUser extends Component {
  state = {
    selectedUser: null,
    key: uuid(),
  };

  onSelectUser = selectedUser => {
    this.setState({
      selectedUser,
    });
  };

  onUserAdd = () => {
    const { onAdd, batch } = this.props;
    const { selectedUser } = this.state;
    this.setState({ selectedUser: null, key: uuid() }, () => {
      let users = Array.isArray(selectedUser) ? selectedUser : [selectedUser];
      users = users.map(user => {
        const newUser = user.hasOwnProperty('value')
          ? {
              ...user,
              id: user.id || user.value,
              username: user.username || user.label,
            }
          : user;
        return pick(newUser, ['id', 'name', 'username', 'email']);
      });
      if (batch) onAdd(users);
      else {
        users.forEach(user => onAdd(user));
      }
    });
  };

  onChange = event => {
    const { availableUsers } = this.props;
    const { value: userId } = event.target;
    const selectedUser = availableUsers.find(user => user.id === userId);
    this.onSelectUser(selectedUser);
  };

  getGroupIds = () => {
    const { items } = this.props;
    return items.map(item => item.id.toString());
  };

  getUserOptions = groupUserIDs => {
    const { availableUsers } = this.props;
    return availableUsers
      ? availableUsers.filter(
          user => !groupUserIDs.includes(user.id.toString())
        )
      : [];
  };

  onShowMore = () => {
    const { availableUsersNext, onMenuScrollToBottom } = this.props;
    if (availableUsersNext) {
      onMenuScrollToBottom(availableUsersNext);
    }
  };

  render() {
    const { key, selectedUser } = this.state;
    let UserInput;
    if (this.props.userInputComponent) {
      const groupUserIDs = this.getGroupIds();
      const userOptions = this.getUserOptions(groupUserIDs);
      const UserInputComponent = this.props.userInputComponent;
      const { onInputChange } = this.props;
      UserInput = (
        <UserInputComponent
          onChange={this.onSelectUser}
          onInputChange={e => {
            onInputChange(e);
          }}
          onMenuScrollToBottom={this.onShowMore}
          key={key}
          value={selectedUser}
          valuesOnly={false}
          isMulti={this.props.isMulti}
          context={this.props.context}
          options={userOptions}
          placeholder="Select/Search User"
          className={styles.select}
          fullWidth
        />
      );
    } else {
      const groupUserIDs = this.getGroupIds();
      let userOptions = this.getUserOptions(groupUserIDs);
      if (userOptions.length > 0) {
        userOptions = userOptions.map(user => (
          <MenuItem key={user.id} value={user.id}>
            {user.name || user.username}
          </MenuItem>
        ));
      }
      if (userOptions.length === 0) {
        userOptions.push(
          <MenuItem key="disabled" disabled>
            No Users Available
          </MenuItem>
        );
      }
      UserInput = (
        <TextField
          select
          value={(selectedUser && selectedUser.id) || ''}
          label="Name"
          fullWidth
          onChange={this.onChange}
          className={styles.select}
        >
          {userOptions}
        </TextField>
      );
    }
    const disabledButton = !selectedUser;

    return (
      <div className={styles.addUserContainer}>
        {UserInput}
        <Tooltip title={disabledButton ? 'Select User first' : 'Add User'}>
          <div>
            <Fab
              variant="extended"
              onClick={this.onUserAdd}
              color="primary"
              aria-label="Add"
              className={styles.addUser}
              disabled={disabledButton}
            >
              <Icon>add</Icon>
              ADD USER
            </Fab>
          </div>
        </Tooltip>
      </div>
    );
  }
}

AddUser.propTypes = {
  userInputComponent: PropTypes.elementType,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
  availableUsers: PropTypes.arrayOf(PropTypes.object),
  availableUsersNext: PropTypes.string,
  isMulti: PropTypes.bool,
  batch: PropTypes.bool,
  context: PropTypes.string,
  onInputChange: PropTypes.func,
  onMenuScrollToBottom: PropTypes.func,
};

AddUser.defaultProps = {
  userInputComponent: undefined,
  availableUsers: [],
  availableUsersNext: null,
  isMulti: true,
  batch: false,
  context: undefined,
  onInputChange: () => {},
  onMenuScrollToBottom: undefined,
};

const UsersList = props => {
  const { items, expanded } = props;
  return (
    <Accordion className={styles.container} defaultExpanded={expanded}>
      <AccordionSummary
        expandIcon={<Icon>expand_more</Icon>}
        classes={{
          content: styles.titleContent,
          expandIcon: styles.expandIcon,
        }}
      >
        <div className={styles.primaryHeading}>Users</div>
        <div className={styles.secondaryHeading}>
          {items.length > 0
            ? `${items.length} ${items.length === 1 ? 'User' : 'Users'}`
            : 'No Users'}
        </div>
      </AccordionSummary>
      <AccordionDetails classes={{ root: styles.details }}>
        <AddUser {...props} />
        <UsersTable {...props} />
      </AccordionDetails>
    </Accordion>
  );
};

UsersList.propTypes = {
  expanded: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

UsersList.defaultProps = {
  expanded: false,
};

const dispatchToProps = {
  change: (form, name, values) => change(form, name, values),
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { fields, meta, items, onAdd, onRemove } = ownProps;
  return {
    ...ownProps,
    ...dispatchProps,
    ...stateProps,
    onAdd: item =>
      fields === undefined ? onAdd(item) : fields.insert(0, item),
    onRemove: removeItems => {
      if (fields === undefined) {
        onRemove(removeItems);
        return;
      }
      if (removeItems.length === 1) {
        fields.remove(removeItems[0].idx);
      } else {
        const ids = removeItems.map(i => i.id);
        const values = fields.getAll().filter(i => !ids.includes(i.id));
        dispatchProps.change(meta.form, fields.name, values);
      }
    },
    items: fields === undefined ? items : fields.getAll() || [],
  };
};

export default connect(null, dispatchToProps, mergeProps)(UsersList);
