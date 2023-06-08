import React from 'react';
import { connect } from 'dw/core/helpers/component';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import isBoolean from 'lodash/isBoolean';
import omit from 'lodash/omit';
import SearchFormStateless from './presentational';

import {
  LOG_LEVELS,
  SOURCE_TYPES,
  DEFAULT_FORM_VALUES,
  DEFAULT_URL_DISPLAY_TRUE,
} from './constants';
import { parseBooleanValues } from './helpers';

const stateToProps = (state, props) => {
  let initialValues = state.Scenes.Debugging.ServerLogs.query;
  if (initialValues === undefined) {
    const { dwThcnagios, ...queryValues } = queryString.parse(
      props.history.location.search
    );
    if (Object.keys(queryValues).length > 0) {
      const parseBoolean = parseBooleanValues(queryValues);
      const finalQueryValues = {
        ...DEFAULT_FORM_VALUES,
        ...queryValues,
        ...parseBoolean,
        dwThcnagios: dwThcnagios === 'true' ? true : undefined,
      };
      initialValues = finalQueryValues;
    } else {
      initialValues = DEFAULT_FORM_VALUES;
    }
  }

  initialValues.endDate = initialValues.endDate || Math.ceil(Date.now() / 1000);
  return {
    initialValues,
  };
};

const omitQueryByTypes = (query, types) =>
  omit(
    query,
    Object.entries(query)
      .filter(
        ([key, value]) =>
          types.includes(key) &&
          ((isBoolean(value) &&
            value &&
            !DEFAULT_URL_DISPLAY_TRUE.includes(key)) ||
            value === null ||
            value === undefined ||
            value === '')
      )
      .map(([key]) => key)
  );

const dispatchToProps = (dispatch, props) => ({
  onSearch: query => {
    const urlString = queryString.stringify(
      omitQueryByTypes(query, [
        'userId',
        'message',
        'transId',
        'startDate',
        'endDate',
        'connId',
        ...LOG_LEVELS,
        ...SOURCE_TYPES,
      ])
    );
    props.history.replace(`?${urlString}`);
  },
});

class SearchForm extends React.Component {
  componentDidMount() {
    const { location } = this.props;
    const queryObject = queryString.parse(location.search);

    const parseBoolean = parseBooleanValues(queryObject);
    const finalQueryObj = {
      ...DEFAULT_FORM_VALUES,
      ...queryObject,
      ...parseBoolean,
    };
    this.props.onSearch(finalQueryObj);
  }

  render() {
    return <SearchFormStateless {...this.props} />;
  }
}

export default connect(stateToProps, dispatchToProps, SearchForm);

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  location: PropTypes.object,
};

SearchForm.defaultProps = {
  location: {},
};
