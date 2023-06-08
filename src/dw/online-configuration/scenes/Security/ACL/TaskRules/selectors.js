import { createSelector } from 'reselect';

const sortSelector = item => [item.service, item.task, item.clientType];

export const taskRulesSelector = state => {
  const taskRules = state.Scenes.Security.ACL.TaskRules.taskRules.map(item => ({
    ...item,
    clientType: item.clientType === '*' ? '*' : parseInt(item.clientType, 10),
  }));
  taskRules.sort((a, b) => {
    const aSelector = sortSelector(a);
    const bSelector = sortSelector(b);
    if (aSelector === bSelector) {
      return 0;
    }
    return aSelector > bSelector ? 1 : -1;
  });
  return taskRules;
};

export const searchParams = state => state.Scenes.Security.ACL.TaskRules.q;

export const filteredTaskRules = createSelector(
  taskRulesSelector,
  searchParams,
  (items, q) => {
    const newItems = [...items];
    if (q) {
      const values = Object.entries(q.default ? { task: q.q } : q.values);
      return newItems.filter(item =>
        values.reduce((currentValue, [key, value]) => {
          switch (typeof item[key]) {
            case 'string':
              return (
                currentValue &&
                item[key].toLowerCase().indexOf(value.toLowerCase()) !== -1
              );
            case 'boolean':
              return currentValue && !!item[key] === !!value;
            case 'number':
              return currentValue && item[key] === parseInt(value, 10);
            default:
              return currentValue && item[key] === value;
          }
        }, true)
      );
    }
    return newItems;
  }
);

export const formattedTaskRules = createSelector(filteredTaskRules, items => {
  const formatted = [];
  let service = null;
  items.forEach(item => {
    if (service !== item.service) {
      service = item.service;
      formatted.push(service);
    }
    formatted.push(item);
  });
  return formatted;
});
