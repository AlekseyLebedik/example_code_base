import React from 'react';
import omit from 'lodash/omit';
import isBoolean from 'lodash/isBoolean';
import { connect } from 'dw/core/helpers/component';
import queryString from 'query-string';

import SearchFormStateless from './presentational';

import { fetchTournaments } from '../../actions';

import { searchQuerySelector } from '../../selectors';

const SearchForm = props => <SearchFormStateless {...props} />;

const omitQueryByTypes = (query, types) =>
  omit(
    query,
    Object.entries(query)
      .filter(
        ([key, value]) =>
          types.includes(key) &&
          ((isBoolean(value) && value) ||
            value === null ||
            value === undefined ||
            value === '')
      )
      .map(([key]) => key)
  );

const stateProps = state => {
  const initialValues = searchQuerySelector(state);
  return {
    initialValues,
  };
};
const dispatchProps = (dispatch, props) => ({
  onSearch: ({ tournament_id: id, start, end }) => {
    const query = { tournament_id: id, start, end };
    const urlString = queryString.stringify(
      omitQueryByTypes(query, ['tournament_id', 'start', 'end'])
    );
    const finalQuery = omitQueryByTypes(query, [
      'tournament_id',
      'start',
      'end',
    ]);
    props.history.replace(`?${urlString}`);
    props.clearSelected();
    dispatch(fetchTournaments(finalQuery));
  },
});
export default connect(stateProps, dispatchProps, SearchForm);
