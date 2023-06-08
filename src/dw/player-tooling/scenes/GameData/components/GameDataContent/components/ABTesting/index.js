import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import KeyValue from 'dw/core/components/KeyValue';
import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';
import ServiceView from '../ServiceView';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main,
  },
  keyValueContainer: {
    margin: '10px 0',
  },
  key: {
    padding: '0 !important',
    paddingLeft: '10px !important',
  },
  value: {
    padding: '0 !important',
  },
  categories: {
    textTransform: 'capitalize',
  },
}));

const DetailsRenderer = ({ values }) => {
  const classes = useStyles();
  const formatDateTime = useSelector(formatDateTimeSelector);
  return values?.map(
    ({ name, testId, start, end, categories, titleId, titleEnv }) => {
      const url = `/abtesting/view/${titleId}/${titleEnv || 'live'}/${testId}`;
      const categoryKey = categories?.length > 1 ? 'categories' : 'category';
      return (
        <KeyValue
          classes={classes}
          customFormats={{
            start: 'datetime',
            end: 'datetime',
            name: value => (
              <Link className={classes.link} to={url}>
                {value}
              </Link>
            ),
            ID: value => (
              <Link className={classes.link} to={url}>
                {value}
              </Link>
            ),
            [categoryKey]: value => (
              <span className={classes.categories}>{value}</span>
            ),
          }}
          formatDateTime={formatDateTime}
          item={{
            name,
            ID: testId,
            start,
            end,
            [categoryKey]: categories?.join(', '),
          }}
        />
      );
    }
  );
};

const AB_TESTING_QUERY = gql`
  query PlayerAbTests(
    $unoID: ID!
    $accountsServiceConfigId: ID!
    $titleId: Int
  ) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      abTests(titleId: $titleId) {
        name
        testId
        start
        end
        categories
        titleId
      }
    }
  }
`;

const ABTesting = ({ detailsProps, groupBy, linkToSection, variables }) => {
  const formatData = useCallback(
    data =>
      data.reduce(
        (map, abTest) =>
          map.set(abTest.titleId, [...(map.get(abTest.titleId) || []), abTest]),
        new Map()
      ),
    []
  );
  const details = useCallback(
    ({ data, ...props }) => <DetailsRenderer values={data} {...props} />,
    []
  );
  const graphQLProps = useMemo(
    () => ({
      detailsProps,
      noDataMsg: 'No testing data found',
      path: 'player.abTests',
      query: AB_TESTING_QUERY,
      variables,
    }),
    [detailsProps, variables]
  );
  return groupBy === 'services' ? (
    <ServiceView
      DetailRenderer={DetailsRenderer}
      formatData={formatData}
      linkToSection={linkToSection}
      {...graphQLProps}
    />
  ) : (
    <GraphQLStateRenderer DetailsRenderer={details} {...graphQLProps} />
  );
};

ABTesting.propTypes = {
  detailsProps: PropTypes.object,
  groupBy: PropTypes.string,
  linkToSection: PropTypes.func,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
    titleId: PropTypes.string,
  }).isRequired,
};
ABTesting.defaultProps = {
  detailsProps: {},
  groupBy: 'titles',
  linkToSection: () => {},
};

export default ABTesting;
