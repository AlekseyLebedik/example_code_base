import React, { Fragment, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import {
  titleNameSelector,
  titlePlatformSelector,
} from 'dw/player-tooling/scenes/GameData/selectors';
import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';
import PaginatedTable from 'dw/player-tooling/components/PaginatedTable';
import ServiceView from '../ServiceView';
import {
  formatCurrencyNames,
  formatItemNames,
  formatRecentInventoryData,
  formatTitleInventoryData,
  PLAYER_INVENTORY_QUERY,
  useStyles,
} from './utils';

export const DetailRenderer = ({ recentActivity, values }) => {
  const classes = useStyles();
  const titlePlatform = useSelector(titlePlatformSelector);
  return recentActivity ? (
    <PaginatedTable
      displayPaginator={false}
      hideHeaders
      rows={values}
      keys={['name', row => row.amount || row.quantity, 'updated']}
    />
  ) : (
    <Grid container spacing={3} className={classes.gridContainer}>
      {values.currencies?.length ? (
        <Grid item xs={12}>
          <PaginatedTable
            displayPaginator={false}
            rows={formatCurrencyNames(values.currencies, titlePlatform)}
            titles={['Currencies', 'Units', 'Last Updated']}
            keys={['name', 'amount', 'updated']}
          />
        </Grid>
      ) : null}
      {values.items?.length ? (
        <Grid item xs={12}>
          <PaginatedTable
            displayPaginator={false}
            rows={formatItemNames(values.items, titlePlatform)}
            titles={['Items', 'Units', 'Last Updated']}
            keys={['name', 'quantity', 'updated']}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

DetailRenderer.propTypes = {
  recentActivity: PropTypes.bool,
  values: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
};
DetailRenderer.defaultProps = {
  recentActivity: false,
};

export const DetailsRenderer = ({
  data,
  hideTitles,
  recentActivity,
  unoID,
}) => {
  const classes = useStyles();
  const titleName = useSelector(titleNameSelector);
  const formattedData = useMemo(
    () =>
      Array.from(
        recentActivity
          ? formatRecentInventoryData(data)
          : formatTitleInventoryData(data)
      ),
    [recentActivity, data]
  );
  return formattedData?.map(([title, values]) => (
    <Fragment key={title}>
      {!hideTitles && (
        <Link
          className={classes.link}
          to={`/online-configuration/${title}/live/marketplace/player-inventory/inventory/${unoID}`}
        >
          {titleName(title)}
        </Link>
      )}
      <DetailRenderer recentActivity={recentActivity} values={values} />
    </Fragment>
  ));
};

DetailsRenderer.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
  hideTitles: PropTypes.bool,
  recentActivity: PropTypes.bool,
  unoID: PropTypes.string.isRequired,
};
DetailsRenderer.defaultProps = {
  hideTitles: false,
  recentActivity: false,
};

const Inventory = ({
  detailsProps,
  groupBy,
  limit,
  linkToSection,
  variables,
}) => {
  const formatData = useCallback(formatTitleInventoryData, []);
  const titleInventories = !detailsProps.recentActivity;
  const customDataCheck = useCallback(
    data =>
      titleInventories
        ? data.some(inv => inv.currencies.length || inv.items.length)
        : data.currencies.length || data.items.length,
    [titleInventories]
  );
  const graphQLProps = useMemo(
    () => ({
      customDataCheck,
      detailsProps: { ...detailsProps, unoID: variables.unoID },
      extraQueryParams: {
        fetchPolicy: 'no-cache',
      },
      noDataMsg: 'No inventory data found',
      path: titleInventories
        ? 'player.inventory.titleInventories'
        : 'player.inventory',
      query: PLAYER_INVENTORY_QUERY,
      variables: {
        ...variables,
        limit,
        titleInventories,
      },
    }),
    [customDataCheck, detailsProps, titleInventories, variables, limit]
  );
  return groupBy === 'services' ? (
    <ServiceView
      DetailRenderer={DetailRenderer}
      formatData={formatData}
      linkToSection={linkToSection}
      {...graphQLProps}
    />
  ) : (
    <GraphQLStateRenderer DetailsRenderer={DetailsRenderer} {...graphQLProps} />
  );
};

Inventory.propTypes = {
  detailsProps: PropTypes.shape({
    hideTitles: PropTypes.bool,
    recentActivity: PropTypes.bool,
  }),
  groupBy: PropTypes.string,
  limit: PropTypes.number,
  linkToSection: PropTypes.func,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
    titleId: PropTypes.string,
  }).isRequired,
};
Inventory.defaultProps = {
  detailsProps: {
    hideTitles: false,
    recentActivity: false,
  },
  groupBy: 'titles',
  limit: 5,
  linkToSection: () => {},
};

export default Inventory;
