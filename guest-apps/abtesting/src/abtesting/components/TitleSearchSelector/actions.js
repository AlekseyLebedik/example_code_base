import * as AT from 'abtesting/components/BaseViewProps/actionTypes';

export const titleSearch = searchTerm => ({
  type: AT.TITLE_SEARCH,
  titleQuery: searchTerm,
});
