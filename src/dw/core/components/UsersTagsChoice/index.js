import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import IconButton from 'dw/core/components/IconButton';
import KeyValueChip from 'dw/core/components/KeyValueChip';

import UserTagEntryModal from './components/UserTagEntryModal';
import UserTagSearchErrorModal from './components/UserTagSearchErrorModal';

import { getTagDisplay } from './helpers';

import styles from './index.module.css';

const UsersRenderer = ({ onDeleteUser, users }) =>
  users.length > 0
    ? users.map(user => (
        <Chip
          className={styles.userTagSearchTerm}
          key={`${user}`}
          label={`${user}`}
          onDelete={() => onDeleteUser(user)}
          size="small"
        />
      ))
    : null;

const TagsRenderer = ({ onDeleteTag, tags, validTags }) =>
  tags.length > 0
    ? tags.map(({ key, searchType, value }) => (
        <KeyValueChip
          className={styles.userTagSearchTerm}
          key={`${searchType}_${key}_${value}`}
          chipKey={getTagDisplay(validTags, key)}
          chipValue={value}
          avatar={<Avatar>{searchType === 'equals' ? '=' : '*'}</Avatar>}
          onDelete={() => onDeleteTag({ key, searchType, value })}
          size="small"
        />
      ))
    : null;

const operatorsRenderer = (value, setOperator) => (
  <Select
    className={styles.operatorSelect}
    disableUnderline
    onChange={e => setOperator(e.target.value)}
    value={value}
  >
    <MenuItem value="and">Match ALL</MenuItem>
    <MenuItem value="or">Match ANY</MenuItem>
  </Select>
);

const UsersTagsChoice = props => {
  const {
    onGetValidTags,
    onPooledObjectSearch,
    setPooledObjectsQuery,
    validTags,
    users,
    setUsers,
    usersOperator,
    setUsersOperator,
    tags,
    setTags,
    tagsOperator,
    setTagsOperator,
  } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const onDeleteUser = deletedUser =>
    setUsers(users.filter(user => user !== deletedUser));
  const onDeleteTag = deletedTag =>
    setTags(tags.filter(tag => !isEqual(tag, deletedTag)));

  const onClickSearch = () => {
    if (!isEmpty(tags) || !isEmpty(users)) {
      setPooledObjectsQuery();
      onPooledObjectSearch(
        { operator: tagsOperator, tags },
        { operator: usersOperator, owners: users }
      );
    } else setErrorDialogOpen(true);
  };

  useEffect(() => {
    onGetValidTags();
  }, [dialogOpen]);

  return (
    <div className={classNames(styles.root, styles.userTagEntryContainer)}>
      <UserTagEntryModal
        {...props}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        setTags={setTags}
        setUsers={setUsers}
        tags={tags}
        users={users}
      />
      <UserTagSearchErrorModal
        errorDialogOpen={errorDialogOpen}
        setErrorDialogOpen={setErrorDialogOpen}
      />
      <IconButton
        color="inherit"
        dataCy="pooledObjectsSearch"
        icon="search"
        onClick={onClickSearch}
        tooltip="Search"
      />
      <IconButton
        color="inherit"
        dataCy="userTagEntryModalButtom"
        icon="playlist_add"
        onClick={() => setDialogOpen(true)}
        tooltip="Add User or Tag to Search Query"
      />
      <div className={styles.renderedTags}>
        <div className={styles.usersTagsContainer}>
          <span className={styles.usersTagsLabel}>Users </span>
          {operatorsRenderer(usersOperator, setUsersOperator)}
          <div className={styles.chipContainer}>
            <UsersRenderer onDeleteUser={onDeleteUser} users={users} />
          </div>
        </div>
        <div className={styles.usersTagsContainer}>
          <span className={styles.usersTagsLabel}>Tags </span>
          {operatorsRenderer(tagsOperator, setTagsOperator)}
          <div className={styles.chipContainer}>
            <TagsRenderer
              onDeleteTag={onDeleteTag}
              tags={tags}
              validTags={validTags}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

UsersTagsChoice.propTypes = {
  onGetValidTags: PropTypes.func.isRequired,
  onPooledObjectSearch: PropTypes.func.isRequired,
  setPooledObjectsQuery: PropTypes.func.isRequired,
  validTags: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
  usersOperator: PropTypes.string.isRequired,
  setUsersOperator: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
  tagsOperator: PropTypes.string.isRequired,
  setTagsOperator: PropTypes.func.isRequired,
};

UsersTagsChoice.defaultProps = {
  validTags: [],
};

export default UsersTagsChoice;
