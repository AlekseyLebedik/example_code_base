import { createSelector } from 'reselect';
import { getRoutes, getSuites, getCompanyOwnColumns } from './routes';
import {
  currentEnvSelector,
  currentEnvDetailsSelector,
  bookmarksSelector,
} from '../modules/user/selectors';
import { tasksSelector } from '../modules/tasks/selectors';
import { serviceEnabledSelector } from '../access/ServiceAvailability/selectors';
import { hasFeaturesEnabledFuncSelector } from '../access/FeatureSwitchesCheck/selectors';

const featureCheckFnSelector = createSelector(
  hasFeaturesEnabledFuncSelector,
  hasFeatureSwitch => route => {
    if (!route.featureCheckProps) return true;
    const { feature, isStaffAllowed, reverseCheck } = route.featureCheckProps;
    const check = hasFeatureSwitch([feature], isStaffAllowed);
    return reverseCheck ? !check : check;
  }
);

const titleEnvOptionCheckFnSelector = createSelector(
  currentEnvDetailsSelector,
  currentEnv => route => {
    if (!route.titleEnvOption) return true;
    return currentEnv && currentEnv.options[route.titleEnvOption];
  }
);

const serviceAvailabilityCheckFnSelector = createSelector(
  serviceEnabledSelector,
  currentEnvDetailsSelector,
  (isServiceAvailable, currentEnv) => route => {
    if (!route.availabilityCheck) return true;
    if (typeof route.availabilityCheck === 'object') {
      const { target, fn } = route.availabilityCheck;
      let targetObj;
      switch (target) {
        case 'titleenv.current':
          if (!currentEnv) return true;
          targetObj = currentEnv;
          break;
        default:
          throw new Error(`The check for ${target} is not implemented`);
      }
      return fn(targetObj);
    }
    return isServiceAvailable
      ? isServiceAvailable(route.availabilityCheck)
      : true;
  }
);

const filterRoutesFnSelector = createSelector(
  featureCheckFnSelector,
  titleEnvOptionCheckFnSelector,
  serviceAvailabilityCheckFnSelector,
  (featureCheckFn, flagCheckFn, serviceAvailabilityCheckFn) => route => {
    // Do not allow empty parent
    if (route.items && route.items.length === 0) return false;
    return (
      featureCheckFn(route) &&
      flagCheckFn(route) &&
      serviceAvailabilityCheckFn(route) &&
      !route.disabled
    );
  }
);

const filterRoutesSelector = createSelector(
  filterRoutesFnSelector,
  state => state,
  (_, props) => props,
  (filterRoutesFn, state, props) => routes => {
    if (!routes) return routes;
    const newRoutes = routes.map(route =>
      !route.items
        ? route
        : {
            ...route,
            items: filterRoutesSelector(state, props)(route.items),
          }
    );
    return newRoutes.filter(filterRoutesFn);
  }
);

export const routesSelector = createSelector(
  filterRoutesSelector,
  currentEnvSelector,
  (filterRoutes, currentEnv) => filterRoutes(getRoutes(currentEnv))
);

export const suitesSelector = createSelector(
  filterRoutesSelector,
  currentEnvSelector,
  (filterRoutes, currentEnv) => filterRoutes(getSuites(currentEnv))
);

export const companyOwnColumnsSelector = createSelector(
  filterRoutesSelector,
  filterRoutes => filterRoutes(getCompanyOwnColumns())
);

export const bookmarksRoutesSelector = createSelector(
  routesSelector,
  bookmarksSelector,
  (routes, bookmarksList) =>
    routes &&
    routes.length > 0 &&
    bookmarksList &&
    routes.reduce((acc, route) => {
      const newRoute = { ...route };
      const bookmarkedSection = bookmarksList.find(b => b.key === newRoute.key);
      if (bookmarkedSection) {
        if (newRoute.items) {
          newRoute.items = newRoute.items.reduce((subRouteAcc, subRoute) => {
            const newSubRoute = { ...subRoute };
            let itemsFound = false;
            if (newSubRoute.items) {
              newSubRoute.items = newSubRoute.items.filter(subSubRoute => {
                if (
                  bookmarkedSection.children &&
                  bookmarkedSection.children.some(child =>
                    [subSubRoute.key, subSubRoute.title].includes(child.key)
                  )
                ) {
                  itemsFound = true; // Skip unecessary searches later
                  return itemsFound;
                }
                return false;
              });
            }
            if (
              bookmarkedSection &&
              bookmarkedSection.children &&
              ((newSubRoute.items && itemsFound) ||
                bookmarkedSection.children.some(child =>
                  [newSubRoute.key, newSubRoute.title].includes(child.key)
                ))
            ) {
              return [...subRouteAcc, newSubRoute];
            }
            return subRouteAcc;
          }, []);
        }
        return [
          ...acc,
          { parentBookmark: bookmarkedSection.parentBookmark, ...newRoute },
        ];
      }
      return acc;
    }, [])
);

export const tasksDataSelector = createSelector(
  tasksSelector,
  tasksState => tasksState?.data
);

export const tasksParamsSelector = createSelector(
  tasksSelector,
  tasksState => tasksState?.params
);
