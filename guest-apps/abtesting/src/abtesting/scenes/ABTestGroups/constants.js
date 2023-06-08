import styles from 'abtesting/scenes/ABTestGroups/components/ABTestsList/index.module.css';

export const GROUPS_LIST_PREFIX = 'scenes/ABTestGroups/GROUPS_LIST';
export const GROUPS_DETAILS_PREFIX = 'scenes/ABTestGroups/GROUPS_DETAILS';
export const GROUPS_DETAILS_TESTS_PREFIX =
  'scenes/ABTestGroups/GROUPS_DETAILS_TESTS';
export const GROUPS_DETAILS_CONFIGS_PREFIX =
  'scenes/ABTestGroups/GROUPS_DETAILS_CONFIGS';
export const FORM_NAME = 'ABTestGroups/CREATE_GROUP';
export const REPLACE_USERS_FORM_NAME = 'ABTestGroups/REPLACE_USERS_FORM_NAME';

export const GROUPS_SERVICE = 'abtesting';

export const COLUMN_DEFINITIONS = {
  master: [
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      filter: 'agTextColumnFilter',
      cellRenderer: 'agGroupCellRenderer',
      width: 280,
      suppressSizeToFit: true,
      cellRendererParams: {
        innerRenderer: 'nameRenderer',
      },
    },
    {
      headerName: 'Title',
      field: 'title',
    },
    {
      headerName: 'Platform',
      field: 'platform',
    },
    {
      headerName: 'Env',
      field: 'environment',
    },
    {
      headerName: 'Target',
      field: 'target',
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: 'statusRenderer',
      width: 140,
      suppressSizeToFit: true,
    },
  ],
  detail: [
    {
      headerName: 'Cohort',
      field: 'cohort',
      rowSpan: ({ data }) => (data.cohort ? data.span : 1),
      cellClassRules: { [styles.cellSpan]: 'data.span > 1' },
    },
    {
      headerName: 'Date From',
      field: 'dateFrom',
      width: 210,
    },
    {
      headerName: 'Date To',
      field: 'dateTo',
      width: 210,
    },
    {
      headerName: 'Config',
      field: 'config',
      cellRenderer: 'configRenderer',
      width: 400,
    },
  ],
};
