import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import cn from 'classnames';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { makeStyles } from '@material-ui/core/styles';

import Empty from 'dw/core/components/Empty';
import Loading from 'dw/core/components/Loading';

import ErrorMessageDisplay from './components/ErrorMessageDisplay';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: 50,
  },
  graphQLErrorContainer: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: '24px',
    margin: 'auto',
  },
  loading: {
    minHeight: 115,
  },
});

const GraphQLStateRenderer = ({
  classes,
  customDataCheck,
  detailsProps,
  DetailsRenderer,
  extraQueryParams,
  noDataMsg,
  path,
  query,
  skipIf,
  variables,
}) => {
  const styles = useStyles();
  const { error, loading, data } = useQuery(query, {
    ...extraQueryParams,
    variables,
    skip: skipIf,
  });
  const queryData = useMemo(() => get(data, path), [data, path]);
  const noDataDisplay = () => (
    <Empty classes={{ root: classes.empty }}>{noDataMsg}</Empty>
  );
  return (
    <div className={styles.container}>
      {error && <ErrorMessageDisplay error={error} />}
      {!error && (
        <>
          {loading && (
            <Loading
              classes={{
                loadingContainer: cn(styles.loading, classes.loading),
              }}
            />
          )}
          {!loading && (
            <>
              {!isEmpty(queryData) && customDataCheck(queryData) ? (
                <DetailsRenderer
                  data={queryData}
                  noDataMsg={noDataMsg}
                  {...detailsProps}
                />
              ) : (
                noDataDisplay()
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

GraphQLStateRenderer.propTypes = {
  classes: PropTypes.object,
  customDataCheck: PropTypes.func,
  detailsProps: PropTypes.object,
  DetailsRenderer: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  extraQueryParams: PropTypes.object,
  noDataMsg: PropTypes.string,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  query: PropTypes.object.isRequired,
  skipIf: PropTypes.bool,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string,
    unoID: PropTypes.string,
  }).isRequired,
};
GraphQLStateRenderer.defaultProps = {
  classes: {},
  customDataCheck: () => true,
  detailsProps: {},
  extraQueryParams: {},
  noDataMsg: 'No data found',
  skipIf: undefined,
};

export default GraphQLStateRenderer;
