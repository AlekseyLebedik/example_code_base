import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';
import ServiceView from '../ServiceView';

import styles from './index.module.css';

export const formatStorageData = data => {
  const titles = new Map();
  // eslint-disable-next-line no-unused-expressions
  data?.userObjects.forEach(({ titleId, ...userObject }) => {
    const title = titles.get(titleId) || {};
    titles.set(titleId, {
      ...title,
      userObjects: [...(title.userObjects || []), userObject],
    });
  });
  // eslint-disable-next-line no-unused-expressions
  data?.groupOverrides.forEach(({ titleId, ...item }) => {
    const title = titles.get(titleId) || {};
    titles.set(titleId, {
      ...title,
      groupOverrides: [...(title.groupOverrides || []), item],
    });
  });
  return titles;
};

export const DetailRenderer = ({ values }) => (
  <div className={styles.container}>
    {values.userObjects?.length > 0 ? (
      <>
        <div className={styles.detailHeading}>Objects</div>
        <div className="flex flex-col">
          {values.userObjects.map(({ objectID, name }) => (
            <div key={objectID}>{name}</div>
          ))}
        </div>
      </>
    ) : null}
    {values.groupOverrides?.length > 0 ? (
      <>
        <div className={styles.detailHeading}>Object Groups</div>
        <div className="flex flex-col">
          {values.groupOverrides.map(({ objectID, name }) => (
            <div key={objectID}>{name}</div>
          ))}
        </div>
      </>
    ) : null}
  </div>
);

DetailRenderer.propTypes = { values: PropTypes.object.isRequired };

export const STORAGE_QUERY = gql`
  query Storage($unoID: ID!, $accountsServiceConfigId: ID!, $titleId: Int) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      storage(titleId: $titleId) {
        userObjects {
          objectID
          name
          modified
          titleId
        }
        groupOverrides {
          objectID
          name
          modified
          titleId
        }
      }
    }
  }
`;

const Storage = ({ detailsProps, groupBy, linkToSection, variables }) => {
  const formatData = useCallback(formatStorageData, []);
  const details = useCallback(
    ({ data, ...props }) => <DetailRenderer values={data} {...props} />,
    []
  );
  const graphQLProps = useMemo(
    () => ({
      detailsProps,
      noDataMsg: 'No storage data found',
      path: 'player.storage',
      query: STORAGE_QUERY,
      variables,
    }),
    [detailsProps, variables]
  );
  const customDataCheck = useCallback(
    data => data.userObjects.length || data.groupOverrides.length,
    []
  );
  return groupBy === 'services' ? (
    <ServiceView
      addMostRecent
      DetailRenderer={DetailRenderer}
      formatData={formatData}
      linkToSection={linkToSection}
      {...graphQLProps}
    />
  ) : (
    <GraphQLStateRenderer
      customDataCheck={customDataCheck}
      DetailsRenderer={details}
      {...graphQLProps}
    />
  );
};

Storage.propTypes = {
  detailsProps: PropTypes.object,
  groupBy: PropTypes.string,
  linkToSection: PropTypes.func,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
    titleId: PropTypes.string,
  }).isRequired,
};
Storage.defaultProps = {
  detailsProps: {},
  groupBy: 'titles',
  linkToSection: () => {},
};

export default Storage;
