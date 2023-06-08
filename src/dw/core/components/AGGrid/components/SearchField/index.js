import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { useQueryParam, useDebounced } from 'dw/core/hooks';

const SearchField = ({
  gridApi,
  queryParamName,
  defaultValue,
  delay,
  ...props
}) => {
  const [query, setQuery] = useQueryParam(queryParamName, defaultValue);
  const [input, setInput] = useState(defaultValue);
  const searchTerm = useMemo(
    () => (queryParamName ? query : input),
    [queryParamName, query, input]
  );
  const setSearchTerm = useMemo(
    () => (queryParamName ? setQuery : setInput),
    [queryParamName, setQuery, setInput]
  );
  const debouncedValue = useDebounced(searchTerm, delay);
  useEffect(() => {
    if (!gridApi) return;
    gridApi.setQuickFilter(debouncedValue);
  }, [gridApi, debouncedValue]);
  return (
    <TextField
      {...props}
      value={searchTerm || ''}
      onChange={e => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon>search</Icon>
          </InputAdornment>
        ),
        endAdornment: searchTerm ? (
          <InputAdornment position="end">
            <Tooltip title="Clear Search">
              <IconButton
                onClick={() => {
                  setSearchTerm('');
                  gridApi.setQuickFilter('');
                }}
              >
                <Icon>clear</Icon>
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ) : undefined,
      }}
      fullWidth
    />
  );
};
SearchField.propTypes = {
  gridApi: PropTypes.object,
  queryParamName: PropTypes.string,
  defaultValue: PropTypes.string,
  delay: PropTypes.number,
};
SearchField.defaultProps = {
  gridApi: undefined,
  queryParamName: undefined,
  defaultValue: '',
  delay: 200,
};

export default SearchField;
