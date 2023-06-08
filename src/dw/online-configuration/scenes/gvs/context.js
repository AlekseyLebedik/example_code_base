import { createContext } from 'react';

export const BreadcrumbsContext = createContext({
  actionsContainer: null,
  editMode: { enabled: false, toggle() {} },
});

export const RefetchQueries = createContext([[], () => {}]);

export const CurrentDraftContext = createContext([null, () => {}]);

export const ConfigurationFiltersContext = createContext([{}, () => {}]);
