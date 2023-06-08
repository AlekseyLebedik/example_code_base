import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';

import KeyValue from 'dw/core/components/KeyValue';
import {
  dateToUTCTimestamp,
  formatDateTimeSelector,
} from 'dw/core/helpers/date-time';
import { AccountsAccordionChild } from 'dw/player-tooling/components/AccountsAccordion';
import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';

const DATE_TIME_FIELDS = { created: 'datetime', updated: 'datetime' };
const FILTERED_FIELDS = ['accountID', 'provider', 'username'];

const useStyles = makeStyles({
  key: {
    padding: '0 !important',
    paddingLeft: '10px !important',
  },
  value: {
    padding: '0 !important',
  },
  empty: {
    paddingBottom: 16,
  },
});

const getAccountsSorted = accounts => [
  ...accounts
    .filter(a => a.provider !== 'uno')
    .sort((a, b) => a.provider.localeCompare(b.provider)),
];

const formatLinkedAccounts = (accounts = []) =>
  accounts.map(
    ({
      accountID,
      accountType,
      created,
      secondaryAccountID,
      updated,
      username,
    }) => ({
      [`${accountType.toUpperCase()} ID`]: secondaryAccountID || accountID,
      accountID,
      provider: accountType,
      created,
      updated,
      username: username || accountID,
    })
  );

const DetailsRenderer = ({ data, expandAll }) => {
  const formatDateTime = useSelector(formatDateTimeSelector);
  const classes = useStyles();
  return getAccountsSorted(formatLinkedAccounts(data)).map(account => (
    <Fragment key={account.accountID}>
      <AccountsAccordionChild
        expandAll={expandAll}
        key={expandAll}
        title={account.provider.toUpperCase()}
        subHeading={{
          SubHeadingComponent: () => account.username,
        }}
        details={{
          DetailsComponent: KeyValue,
          detailsProps: {
            boldEntries: [Object.keys(account)[0]],
            classes,
            item: Object.entries(account)
              .filter(([key]) => !FILTERED_FIELDS.includes(key))
              .reduce(
                (acc, [key, value]) => ({
                  ...acc,
                  [key]:
                    DATE_TIME_FIELDS[key] && value
                      ? formatDateTime(dateToUTCTimestamp(value))
                      : value,
                }),
                {}
              ),
          },
        }}
      />
    </Fragment>
  ));
};

const LINKED_ACCOUNTS_QUERY = gql`
  query PlayerLinkedAccounts($unoID: ID!, $accountsServiceConfigId: ID!) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      linkedAccounts {
        accountID
        secondaryAccountID
        username
        created
        updated
        accountType
      }
    }
  }
`;

const LinkedAccountDetails = ({ variables, expandAll }) => {
  const classes = useStyles();
  return (
    <GraphQLStateRenderer
      classes={{ empty: classes.empty }}
      detailsProps={{ expandAll }}
      DetailsRenderer={DetailsRenderer}
      noDataMsg="No linked accounts found"
      path="player.linkedAccounts"
      query={LINKED_ACCOUNTS_QUERY}
      variables={variables}
    />
  );
};

LinkedAccountDetails.propTypes = {
  expandAll: PropTypes.bool,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
  }).isRequired,
};
LinkedAccountDetails.defaultProps = {
  expandAll: false,
};

export default LinkedAccountDetails;
