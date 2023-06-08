import React, { useEffect, useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import NavigationBarStateless from './presentational';
import { BookmarksContext } from './context';
import SectionTitleWrapper from './components/SectionTitleWrapper';
import { groupSections } from './helpers';
import {
  bookmarksRoutesSelector,
  routesSelector,
  suitesSelector,
  companyOwnColumnsSelector,
} from './selectors';
import {
  bookmarkCountSelector,
  bookmarkLoadingSelector,
  bookmarkLoadingKeysSelector,
  currentProjectSelector,
  currentTitleEnvSelector,
} from '../modules/user/selectors';
import {
  devzoneMostRecentReleaseNoteSelector,
  frameworkMostRecentReleaseNoteSelector,
  eventManagerMostRecentReleaseNoteSelector,
  maintenanceSelector,
} from '../modules/notifications/selectors';

import { actions } from '../modules/user';
import { hasFeaturesEnabledFuncSelector } from '../access/FeatureSwitchesCheck/selectors';

import { fetchReleaseNotes } from '../modules/notifications/actions';
import { connect } from '../AppStore';

import { fetchPermissions } from '../access/CheckPermissions';

export function makePermissionObjectName(
  obj,
  id,
  currentProject,
  currentTitleEnv
) {
  if (obj === 'company' && id === 'all') {
    return 'company.all';
  }
  switch (obj) {
    case 'project': {
      if (id === '*') {
        return 'project.*';
      }
      // id == 'current'
      return `project.${currentProject.id}`;
    }
    case 'titleenv': {
      if (id === '*') {
        return 'titleenv.*';
      }
      // id == 'current'
      return `titleenv.${currentTitleEnv.id}`;
    }
    case 'company': {
      if (id === '*') {
        return 'company.*';
      }
      throw new Error(`Permissions on object of ${obj} type not supported`);
    }
    default: {
      throw new Error(`Permissions on object of ${obj} type not supported`);
    }
  }
}

export function getPermissionCheckFromRoute(s) {
  let perms = [];
  if (s.items) {
    perms = perms.concat(
      s.items.reduce((acc, c) => acc.concat(getPermissionCheckFromRoute(c)), [])
    );
  }
  if (s.permissionCheck) {
    perms = perms.concat(s.permissionCheck);
  }
  return perms;
}

export function addPermsToPermsObject(
  current,
  acc,
  currentProject,
  currentTitleEnv
) {
  const [obj, id] = current.target.split('.');
  const key = makePermissionObjectName(
    obj,
    id,
    currentProject,
    currentTitleEnv
  );
  if (!acc[key]) {
    acc[key] = new Set();
  }
  (current.ANY || current.ALL).forEach(item => acc[key].add(item));
  return acc;
}

export function getPermissionQuestions(
  routes,
  currentProject,
  currentTitleEnv
) {
  const menuPermissions = routes.reduce(
    (acc, current) => acc.concat(getPermissionCheckFromRoute(current)),
    []
  );
  const permissionQuestions = menuPermissions.reduce((acc, current) => {
    if (!current.target) {
      (current.ANY || current.ALL).forEach(c =>
        addPermsToPermsObject(c, acc, currentProject, currentTitleEnv)
      );
    } else {
      addPermsToPermsObject(current, acc, currentProject, currentTitleEnv);
    }
    return acc;
  }, {});
  return permissionQuestions;
}

export function isRouteVisible(permissionCheck, permissions) {
  const { ANY, ALL, target } = permissionCheck;
  if (target) {
    const [object] = target.split('.');
    if (ANY) {
      return ANY.some(
        permName =>
          permissions[object].includes(permName) ||
          permissions[object].includes('permission')
      ); // At least one permission that is in permissions
    }
    if (ALL) {
      return !ALL.some(
        permName =>
          !permissions[object].includes(permName) &&
          !permissions[object].includes('permission')
      ); // No permission that is not in permissions
    }
  } else {
    if (ANY) {
      return ANY.some(p => isRouteVisible(p, permissions)); // Any isRouteVisible true
    }
    if (ALL) {
      return !ALL.some(p => !isRouteVisible(p, permissions)); // No isRouteVisible falses
    }
  }
  return true;
}

export function getFilteredRoutes(routes, permissions) {
  return routes.reduce((filteredRoutes, route) => {
    const { items, permissionCheck } = route;
    if (!permissionCheck) {
      filteredRoutes.push(route);
    } else {
      const isVisible = isRouteVisible(permissionCheck, permissions);
      const routeClone = { ...route };
      if (items) {
        routeClone.items = route.items.filter(item =>
          item.permissionCheck
            ? isRouteVisible(item.permissionCheck, permissions)
            : true
        );
      }
      if (isVisible) {
        filteredRoutes.push(routeClone);
      }
    }
    return filteredRoutes;
  }, []);
}

export function getPermissionsFromResponses(questionsList, responses) {
  return questionsList.reduce((acc, [object], index) => {
    const [key] = object.split('.');
    acc[key] = Object.entries(responses[index].data).reduce(
      (perms, [perm, isAllowed]) => {
        if (isAllowed) {
          perms.push(perm);
        }
        return perms;
      },
      []
    );
    return acc;
  }, {});
}

const NavigationBar = props => {
  const { fetchReleaseNotesFn } = props;
  useEffect(() => {
    fetchReleaseNotesFn();
  }, []);

  const getChildren = (key, routes) =>
    routes
      .find(route => route.key === key)
      .items.reduce((acc, item) => {
        const itemKey = item.key || item.title;
        if (item.items) {
          return [
            ...acc,
            itemKey,
            ...item.items.map(subItem => subItem.key || subItem.title),
          ];
        }
        return [...acc, itemKey];
      }, []);

  const {
    bookmarksRoutes,
    addBookmarkFn,
    deleteBookmarkFn,
    routes,
    suites,
    companyOwnColumns,
    devzoneReleaseNote,
    eventManagerReleaseNote,
    frameworkReleaseNote,
    currentMaintenanceList,
    bookmarkCount,
    bookmarkCounterResetFn,
    bookmarkLoading,
    bookmarkLoadingKeys,
    currentProject,
    currentTitleEnv,
  } = props;

  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [filteredSuites, setFilteredSuites] = useState([]);

  useEffect(() => {
    const permissionQuestions = getPermissionQuestions(
      routes,
      currentProject,
      currentTitleEnv
    );
    const questionsList = Object.entries(permissionQuestions);

    Promise.all(
      questionsList.map(([object, predicates]) =>
        fetchPermissions(Array.from(predicates), object)
      )
    ).then(responses => {
      const permissions = getPermissionsFromResponses(questionsList, responses);
      setFilteredRoutes(getFilteredRoutes(routes, permissions));
    });
  }, [routes]);

  useEffect(() => {
    const permissionQuestions = getPermissionQuestions(
      suites,
      currentProject,
      currentTitleEnv
    );
    const questionsList = Object.entries(permissionQuestions);

    Promise.all(
      questionsList.map(([object, predicates]) =>
        fetchPermissions(Array.from(predicates), object)
      )
    ).then(responses => {
      const permissions = getPermissionsFromResponses(questionsList, responses);
      setFilteredSuites(getFilteredRoutes(suites, permissions));
    });
  }, [suites]);

  // Group routes with groupings schemas
  const groupedCompanyColumns = useMemo(
    () =>
      groupSections({
        groups: companyOwnColumns,
        sections: filteredRoutes,
      }),
    [groupSections, companyOwnColumns, filteredRoutes]
  );

  const addBookmark = useCallback(
    (key, parentKey) => addBookmarkFn({ key: parentKey, children: [{ key }] }),
    [addBookmarkFn]
  );

  const deleteBookmark = useCallback(
    (key, parentKey) =>
      deleteBookmarkFn({ key: parentKey, children: [{ key }] }),
    [deleteBookmarkFn]
  );

  const addSectionBookmark = useCallback(
    key =>
      addBookmarkFn({
        key,
        children: getChildren(key, routes).map(child => ({
          key: child,
        })),
        parent_bookmark: true,
      }),
    [addBookmarkFn, getChildren]
  );

  const deleteSectionBookmark = useCallback(
    key =>
      deleteBookmarkFn({
        key,
        children: getChildren(key, routes).map(child => ({
          key: child,
        })),
        parent_bookmark: true,
      }),
    [deleteBookmarkFn, getChildren]
  );

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks: {
          routes: bookmarksRoutes,
          count: bookmarkCount,
          loading: bookmarkLoading,
          loadingKeys: bookmarkLoadingKeys,
          bookmarkCounterReset: () => bookmarkCounterResetFn(),
          addBookmark,
          deleteBookmark,
          addSectionBookmark,
          deleteSectionBookmark,
        },
      }}
    >
      <SectionTitleWrapper routes={routes}>
        <NavigationBarStateless
          {...props}
          companyColumnRoutes={groupedCompanyColumns}
          suites={filteredSuites}
          routes={routes}
          devzoneReleaseNote={devzoneReleaseNote}
          eventManagerReleaseNote={eventManagerReleaseNote}
          frameworkReleaseNote={frameworkReleaseNote}
          currentMaintenanceList={currentMaintenanceList}
          bookmarksRoutes={bookmarksRoutes}
        />
      </SectionTitleWrapper>
    </BookmarksContext.Provider>
  );
};

NavigationBar.propTypes = {
  bookmarksRoutes: PropTypes.arrayOf(PropTypes.object),
  currentProject: PropTypes.object,
  currentTitleEnv: PropTypes.object,
  devzoneReleaseNote: PropTypes.object,
  eventManagerReleaseNote: PropTypes.object,
  frameworkReleaseNote: PropTypes.object,
  fetchReleaseNotesFn: PropTypes.func.isRequired,
  hasFeatureSwitch: PropTypes.func.isRequired,
  addBookmarkFn: PropTypes.func.isRequired,
  deleteBookmarkFn: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object),
  suites: PropTypes.arrayOf(PropTypes.object),
  companyOwnColumns: PropTypes.arrayOf(PropTypes.object),
  currentMaintenanceList: PropTypes.arrayOf(PropTypes.object),
  bookmarkCount: PropTypes.number,
  bookmarkCounterResetFn: PropTypes.func,
  bookmarkLoading: PropTypes.bool,
  bookmarkLoadingKeys: PropTypes.arrayOf(PropTypes.string),
};

NavigationBar.defaultProps = {
  bookmarksRoutes: [],
  currentProject: {},
  currentTitleEnv: {},
  devzoneReleaseNote: {},
  eventManagerReleaseNote: {},
  frameworkReleaseNote: {},
  routes: [],
  suites: [],
  companyOwnColumns: [],
  currentMaintenanceList: [],
  bookmarkCount: 0,
  bookmarkCounterResetFn: () => {},
  bookmarkLoading: false,
  bookmarkLoadingKeys: [],
};

const stateToProps = (state, ownProps) => ({
  devzoneReleaseNote: devzoneMostRecentReleaseNoteSelector(state),
  frameworkReleaseNote: frameworkMostRecentReleaseNoteSelector(state),
  eventManagerReleaseNote: eventManagerMostRecentReleaseNoteSelector(state),
  currentMaintenanceList: maintenanceSelector(state),
  currentProject: currentProjectSelector(state),
  currentTitleEnv: currentTitleEnvSelector(state),
  bookmarksRoutes: bookmarksRoutesSelector(state, ownProps),
  bookmarkLoading: bookmarkLoadingSelector(state),
  bookmarkLoadingKeys: bookmarkLoadingKeysSelector(state),
  bookmarkCount: bookmarkCountSelector(state),
  hasFeatureSwitch: hasFeaturesEnabledFuncSelector(state),
  routes: routesSelector(state, ownProps),
  suites: suitesSelector(state, ownProps),
  companyOwnColumns: companyOwnColumnsSelector(state, ownProps),
});

const dispatchToProps = {
  addBookmarkFn: actions.addBookmark,
  deleteBookmarkFn: actions.deleteBookmark,
  bookmarkCounterResetFn: actions.bookmarkCounterReset,
  fetchReleaseNotesFn: fetchReleaseNotes,
};

const NavigationBarConnected = connect(
  stateToProps,
  dispatchToProps
)(NavigationBar);

export default NavigationBarConnected;
