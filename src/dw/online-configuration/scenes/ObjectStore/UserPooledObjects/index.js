import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';

import * as fs from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureSwitches';
import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { OBJECT_STORE_DELETE_OBJECTS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import Loading from 'dw/core/components/Loading';
import UsersTagsChoice from 'dw/core/components/UsersTagsChoice';
import UserAutoComplete from 'dw/online-configuration/components/UserAutoComplete';
import { userObjectsLoadingSelector } from 'dw/online-configuration/scenes/ObjectStore/UserObjectsHOC/selectors';

import withUserObjectsContext from '../UserObjectsHOC';
import PooledObjectsTable from './components/PooledObjectsTable';
import { getPooledObjectValidTags, pooledObjectSearch } from './actions';

import './index.css';

const PooledObjectsStateless = ({
  formatDateTime,
  history,
  nextPageToken,
  onDeleteObjects,
  onGridReady,
  onSelect,
  onSelectionChanged,
  onShowMore,
  selectedRowKeys,
  userId,
  userObjects,
}) => {
  const dispatch = useDispatch();
  const hasDeletePermission = useCurrentEnvPermission(
    OBJECT_STORE_DELETE_OBJECTS
  );

  const hasPooledObjectNewSearchEnabled = useSelector(state =>
    hasFeaturesEnabledFuncSelector(state)(
      [fs.POOLED_OBJECTS_USE_NEW_SEARCH],
      false
    )
  );
  const pooledObjectNewSearchEnabledForTitleEnv = useSelector(
    state =>
      state.Components.App.currentTitleEnv.options
        ?.pooled_object_new_search_enabled
  );

  const validTags = useSelector(
    state => state.Scenes.ObjectStore.PooledObjects.tags.data
  );
  const pooledObjectSearchResults = useSelector(
    state => state.Scenes.ObjectStore.PooledObjects.pooledObjects.data
  );
  const pooledObjectSearchNextPageToken = useSelector(
    state => state.Scenes.ObjectStore.PooledObjects.pooledObjects.nextPageToken
  );
  const pooledObjectSearchIsLoading = useSelector(
    state => state.Scenes.ObjectStore.PooledObjects.pooledObjects.loading
  );
  const userObjectsLoading = useSelector(userObjectsLoadingSelector);
  const objects =
    hasPooledObjectNewSearchEnabled && pooledObjectNewSearchEnabledForTitleEnv
      ? pooledObjectSearchResults
      : userObjects;

  const onGetValidTags = () => dispatch(getPooledObjectValidTags());

  // For the UserTagChoice component
  const [users, setUsers] = useState([]);
  const [usersOperator, setUsersOperator] = useState('and');
  const [tags, setTags] = useState([]);
  const [tagsOperator, setTagsOperator] = useState('and');

  const setPooledObjectsQuery = useCallback(() => {
    const tagsList = tags
      .map(({ key, value, searchType }) => `${key}:${value}:${searchType}`)
      .join(',');
    const usersList = users.join(',');
    history.push({
      pathname: history.location.path,
      search: `?tags=${tagsList}&tagsOperator=${tagsOperator}&users=${usersList}&usersOperator=${usersOperator}`,
    });
  }, [tags, tagsOperator, users, usersOperator]);

  const onPooledObjectSearch = (
    tagExpressions,
    ownerExpressions,
    pageToken,
    append = false
  ) => {
    const jsonData = {};
    if (!isEmpty(tagExpressions.tags)) {
      jsonData.tagExpressions = [tagExpressions];
    }
    if (!isEmpty(ownerExpressions.owners)) {
      jsonData.ownerExpressions = [ownerExpressions];
    }
    dispatch(
      pooledObjectSearch({ nextPageToken: pageToken }, jsonData, append)
    );
  };

  const onSingleUserSearch = id => {
    setUsers([id]);
    setTags([]);
    const jsonData = {
      ownerExpressions: [{ operator: usersOperator, owners: [id] }],
    };
    dispatch(pooledObjectSearch({}, jsonData));
    history.push({
      location: history.location,
      search: `?users=${id}`,
    });
  };
  const onPooledObjectsScroll = scrollEvent => {
    if (
      !scrollEvent.api ||
      pooledObjectSearchIsLoading ||
      userObjectsLoading ||
      (!nextPageToken && !pooledObjectSearchNextPageToken)
    )
      return;
    if (
      scrollEvent.api.getModel().rowsToDisplay.length - 1 ===
      scrollEvent.api.getLastDisplayedRow()
    ) {
      if (nextPageToken) onShowMore();
      else if (pooledObjectSearchNextPageToken)
        onPooledObjectSearch(
          { operator: tagsOperator, tags },
          { operator: usersOperator, owners: users },
          pooledObjectSearchNextPageToken,
          true
        );
    }
  };

  useEffect(() => {
    const {
      tags: tagsList,
      tagsOperator: tagsListOperator,
      users: usersList,
      usersOperator: usersListOperator,
    } = queryString.parse(history.location.search);
    const tagsQuery = !isEmpty(tagsList)
      ? tagsList.split(',').map(t => {
          const [key, value, searchType] = t?.split(':');
          return { key, searchType, value };
        })
      : [];
    const updatedTagsOperator = tagsListOperator || 'or';
    const usersQuery = !isEmpty(usersList) ? usersList.split(',') : [];
    const updatedUsersOperator = usersListOperator || 'or';
    setTags(tagsQuery);
    if (tagsList && tagsListOperator) setTagsOperator(updatedTagsOperator);
    setUsers(usersQuery);
    if (usersList && usersListOperator) setUsersOperator(updatedUsersOperator);

    if (!isEmpty(tagsList) || !isEmpty(usersList)) {
      onPooledObjectSearch(
        { operator: updatedTagsOperator, tags: tagsQuery },
        { operator: updatedUsersOperator, owners: usersQuery }
      );
    }
  }, [history.location]);

  return (
    <section className="pooledObjects main-container flex-rows-container">
      <SectionTitle
        extraContent={
          <div className="extra-content-wrapper-pooled">
            {hasPooledObjectNewSearchEnabled &&
            pooledObjectNewSearchEnabledForTitleEnv ? (
              <UsersTagsChoice
                isClearable={false}
                onGetValidTags={onGetValidTags}
                onPooledObjectSearch={onPooledObjectSearch}
                setPooledObjectsQuery={setPooledObjectsQuery}
                size="normal"
                userId={userId}
                validTags={validTags}
                variant="box"
                users={users}
                setUsers={setUsers}
                usersOperator={usersOperator}
                setUsersOperator={setUsersOperator}
                tags={tags}
                setTags={setTags}
                tagsOperator={tagsOperator}
                setTagsOperator={setTagsOperator}
              />
            ) : (
              <UserAutoComplete
                size="normal"
                defaultValue={userId}
                isClearable={false}
                key={userId}
                onChange={onSelect}
                placeholder="Enter User ID | Username"
                variant="box"
              />
            )}
          </div>
        }
      >
        {hasDeletePermission && objects.length > 0 && (
          <ConfirmActionComponent
            component="IconButton"
            tooltipProps={
              selectedRowKeys.length > 0
                ? { title: 'Delete Selected', placement: 'bottom' }
                : null
            }
            onClick={onDeleteObjects}
            confirm={{
              title: 'Confirm Delete',
              confirmMsg: `Are you sure you want to delete the selected objects?`,
              mainButtonLabel: 'Delete',
              destructive: true,
            }}
            color="inherit"
            disabled={selectedRowKeys.length === 0}
          >
            delete
          </ConfirmActionComponent>
        )}
      </SectionTitle>
      {(pooledObjectSearchIsLoading || userObjectsLoading) &&
      !pooledObjectSearchNextPageToken &&
      !nextPageToken ? (
        <Loading />
      ) : (
        <div className="scrollable-content with-inner-padding">
          {objects.length === 0 ? (
            <div className="empty">No data to display</div>
          ) : (
            <PooledObjectsTable
              key={userId}
              formatDateTime={formatDateTime}
              hasDeletePermission={hasDeletePermission}
              objects={objects}
              onGridReady={onGridReady}
              onPooledObjectsScroll={onPooledObjectsScroll}
              onSelect={onSingleUserSearch}
              onSelectionChanged={onSelectionChanged}
              validTags={validTags}
            />
          )}
        </div>
      )}
    </section>
  );
};

PooledObjectsStateless.propTypes = {
  formatDateTime: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  nextPageToken: PropTypes.string,
  onDeleteObjects: PropTypes.func.isRequired,
  onGridReady: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSelectionChanged: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string,
  userObjects: PropTypes.arrayOf(PropTypes.object),
};

PooledObjectsStateless.defaultProps = {
  nextPageToken: undefined,
  selectedRowKeys: [],
  userId: '',
  userObjects: [],
};

export default withUserObjectsContext('PooledObjects')(PooledObjectsStateless);
