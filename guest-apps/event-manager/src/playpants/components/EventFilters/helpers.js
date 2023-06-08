import sortBy from 'lodash/sortBy';
import indexOf from 'lodash/indexOf';
import get from 'lodash/get';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

import { ENV_TYPE_FILTERS } from 'dw/core/components/EventsCalendar/constants';

export const sortByOrder = (items, expectedOrder = []) => {
  if (!expectedOrder || items.length === 0) {
    return items;
  }
  const order = expectedOrder.map(i => i.toLowerCase());
  return sortBy(items, i => {
    const index = indexOf(order, i.name.toLowerCase());
    // If item is not in order, put it at the end
    return index === -1 ? order.length + 1 : index;
  });
};

const getItems = obj =>
  (obj &&
    Object.entries(obj).map(([key, value]) => ({
      name: key,
      items: typeof value === 'object' && getItems(value),
      isSubgroup: typeof value === 'object',
    }))) ||
  [];

const getGroup = (
  group,
  obj,
  disabledFilters,
  { classes, loading, subGroups = null } = {}
) => ({
  name: group,
  items: getItems(obj),
  disabled: disabledFilters[group] === false,
  isGroup: true,
  groupProps: {
    classes,
    loading,
    subGroups,
  },
});

const expectedOrder = [
  'projects',
  'environments',
  'platforms',
  'externalevents',
  'demonwareevents',
  'abtesting',
  'informationalevents',
  'eventmanager',
];

export const getGroups = ({
  filters: { environments: rawEnvs, platforms, projects, sources } = {},
  disabledFilters = {},
  eventGroups,
}) => {
  const {
    abTesting: {
      active,
      analysis,
      archived,
      config,
      killed,
      ...otherValues
    } = {},
    expyTests: { proposed, approved } = {},
    externalEvents: { pmg, holidays, ...other } = {},
  } = sources;
  const environments = Object.keys(ENV_TYPE_FILTERS).reduce(
    (acc, env) => ({ ...acc, [env]: rawEnvs[env] }),
    {}
  );
  let abTestingGroup = null;
  const abTestingEventGroup = eventGroups.find(g => g.type === 'abTesting');
  const expyTestsEventGroup = eventGroups.find(g => g.type === 'expyTests');
  if (abTestingEventGroup) {
    abTestingGroup = getGroup(
      'abTesting',
      {
        demonwareABTesting: {
          active,
          analysis,
          archived,
          config,
          killed,
        },
        ...(!isEmpty(expyTestsEventGroup) && {
          demonwareExpyTesting: {
            proposed,
            approved,
          },
        }),
        ...otherValues,
      },
      disabledFilters,
      {
        classes: {
          ...abTestingEventGroup?.classes,
          ...expyTestsEventGroup?.classes,
        },
        loading: Boolean(
          abTestingEventGroup?.loading || expyTestsEventGroup?.loading
        ),
        subGroups: {
          demonwareABTesting: abTestingEventGroup,
          ...(!isEmpty(expyTestsEventGroup) && {
            demonwareExpyTesting: expyTestsEventGroup,
          }),
        },
      }
    );
  }

  const externalEventsGroup = getGroup(
    'externalEvents',
    {
      holidays:
        typeof holidays === 'object'
          ? Object.values(holidays).every(i => i === true)
          : holidays,
      pmg:
        typeof pmg === 'object'
          ? Object.values(pmg).every(i => i === true)
          : pmg,
      ...other,
    },
    disabledFilters,
    eventGroups.find(g => g.type === 'externalEvents')
  );

  return sortByOrder(
    [
      getGroup('projects', projects, disabledFilters),
      getGroup('environments', environments, disabledFilters),
      getGroup('platforms', platforms, disabledFilters),
      abTestingGroup,
      externalEventsGroup,
      getGroup(
        'demonwareEvents',
        sources.demonwareEvents,
        disabledFilters,
        eventGroups.find(g => g.type === 'demonwareEvents')
      ),
      getGroup(
        'eventManager',
        sources.eventManager,
        disabledFilters,
        eventGroups.find(g => g.type === 'eventManager')
      ),
    ].filter(Boolean),
    expectedOrder
  );
};

const queryAliases = {
  titles: 'projects',
  environments: 'environments',
  platforms: 'platforms',
  abTesting: 'sources.abTesting',
  expyTests: 'sources.expyTests',
  demonwareEvents: 'sources.demonwareEvents',
  externalEvents: 'sources.externalEvents',
};

export const getInitialFilters = (query, defaultFilters) => {
  const filters = cloneDeep(defaultFilters);
  Object.entries(queryAliases).forEach(([alias, sourceKey]) => {
    const source = cloneDeep(get(defaultFilters, sourceKey));
    if (source && Object.keys(query).includes(alias)) {
      const queryValue = query[alias] || 'NONE';
      const possibleValues = Object.keys(source);
      let values;
      switch (queryValue) {
        case 'NONE':
          values = [];
          break;
        case 'ALL':
          values = possibleValues;
          break;
        default:
          values = queryValue
            .split(',')
            .map(v => v.trim())
            .filter(v => possibleValues.includes(v));
      }
      possibleValues.forEach(key => {
        const value = values.includes(key);
        if (typeof source[key] === 'object') {
          source[key] = Object.keys(source[key]).reduce(
            (acc, k) => ({ ...acc, [k]: value }),
            {}
          );
        } else source[key] = value;
      });
    }
    set(filters, sourceKey, source);
  });
  return filters;
};

export const updateQueryWithFilters = (
  { filters: legacy, ...query },
  filters
) => {
  const newQuery = { ...query };
  Object.entries(queryAliases).forEach(([alias, sourceKey]) => {
    const source = get(filters, sourceKey);
    if (!source) {
      return;
    }
    const possibleKeys = Object.keys(source);
    const values = Object.entries(source)
      .map(
        ([k, v]) =>
          (typeof v === 'object' ? Object.values(v).every(Boolean) : v) && k
      )
      .filter(Boolean);
    let value;
    if (values.length === 0) value = 'NONE';
    else if (values.length === possibleKeys.length) value = 'ALL';
    else value = values.join(',');
    set(newQuery, alias, value);
  });
  return newQuery;
};
