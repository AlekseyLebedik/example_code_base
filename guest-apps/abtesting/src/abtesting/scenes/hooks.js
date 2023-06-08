import { useSelector } from 'react-redux';
import flattenDeep from 'lodash/flattenDeep';
import uniq from 'lodash/uniq';
import compact from 'lodash/compact';
import get from 'lodash/get';
import find from 'lodash/find';
import {
  environmentsUsesABTestingSelector,
  viewOnlyPropSelector,
} from 'abtesting/scenes/ABTestForm/selectors';
import {
  detailsSelector,
  contextSelector,
} from 'abtesting/scenes/ABTestGroups/selectors';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { hasData } from 'dw/core/helpers/object';
import { serviceEnabledEnvsListSelector } from 'dw/core/helpers/title-env-selectors';
import {
  testStartSelector,
  testEndSelector,
  determineTestStatus,
} from 'dw/abtesting-utils';

import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import { usePermissions } from '@demonware/devzone-core/access/CheckPermissions';
import { ABTESTING_ADD_ENTITIES } from '@demonware/devzone-core/access/PermissionCheck/permissions';

const environmentsUsesGroupsSelector = state =>
  serviceEnabledEnvsListSelector(state)(SERVICE_NAMES.GROUPS);

export function useContextListHook(props) {
  const envsProp = useSelector(environmentsUsesABTestingSelector);
  const listIds = envsProp.map(k => `project.${k.project.id}`) || [];
  const [loading, , result] = usePermissions(ABTESTING_ADD_ENTITIES, listIds);
  const viewOnly = viewOnlyPropSelector(props);
  let envs = envsProp;
  if (!loading && result && !viewOnly) {
    envs = envsProp.filter(k => result?.data?.[`project.${k.project.id}`]);
  }
  return [
    loading,
    envs?.map(env => ({
      id: [env.title.id, env.environment.shortType].join(':'),
      name: [
        env.title.name,
        env.title.platform,
        env.environment.shortType,
      ].join(' / '),
      project: {
        id: env.project.id,
        contentTypeId: env.project.contentTypeId,
      },
    })),
  ];
}

export function useTestsListHook() {
  const tests = useSelector(state => state.Scenes.ABTestGroups.tests.data);
  const context = useSelector(contextSelector);
  const [loading, contextList] = useContextListHook();
  const group = useSelector(detailsSelector);
  const configs = useSelector(state => state.Scenes.ABTestGroups.configs.data);
  const formatDateTime = useSelector(formatDateTimeSelector);
  const { groupID } = group;
  let testList = [];
  if (context && groupID && !loading && hasData(contextList)) {
    // eslint-disable-next-line
    const [titleID, _] = context.split(':');
    const [titleName, platform, environment] = contextList
      .find(c => c.id === context)
      .name.split('/');
    testList = tests
      .filter(test =>
        test.cohorts.some(
          cohort =>
            cohort.groups && cohort.groups.find(g => g.groupID === groupID)
        )
      )
      .map(test => {
        const start = testStartSelector(test);
        const end = testEndSelector(test);
        const newStatus = determineTestStatus(test, start, end);
        const cohortGroup = test.cohorts.find(cohort =>
          cohort.groups.find(g => g.groupID === groupID)
        );
        const testConfigs = cohortGroup.treatments.map(
          treatment => treatment.configs
        );
        const configsID = uniq(flattenDeep(testConfigs));
        const target = uniq(
          compact(
            configsID.map(configID =>
              get(find(configs, { configID }), 'serviceID', false)
            )
          )
        );
        const cohorts = cohortGroup.treatments.map((treatment, idx) => ({
          ...(idx === 0 && {
            cohort: cohortGroup.name,
            span: cohortGroup.treatments.length,
          }),
          dateFrom: formatDateTime(treatment.start),
          dateTo: formatDateTime(treatment.end),
          config: treatment.configs.map(configID =>
            find(configs, { configID })
          ),
        }));
        return {
          id: test.testID,
          name: test.name,
          title: titleName.trim(),
          titleID,
          platform: platform.trim(),
          environment: environment.trim(),
          target,
          status: newStatus,
          cohorts,
        };
      });
  }
  return [loading, testList];
}

export function useContextListHookWithGroups() {
  const [loading, contextList] = useContextListHook();

  const environmentsUsesGroups = useSelector(environmentsUsesGroupsSelector);
  const contextGroups = environmentsUsesGroups.map(env =>
    [env.title.id, env.environment.shortType].join(':')
  );
  return [
    loading,
    contextList?.filter(context => contextGroups.includes(context.id)),
  ];
}
