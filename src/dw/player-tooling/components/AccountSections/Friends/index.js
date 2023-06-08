import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';

import KeyValue from 'dw/core/components/KeyValue';
import { AccountsAccordionChild } from 'dw/player-tooling/components/AccountsAccordion';
import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';

const useStyles = makeStyles(theme => ({
  accordionContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  link: {
    color: theme.palette.primary.main,
  },
  empty: {
    paddingBottom: 16,
  },
  key: {
    padding: '0 !important',
    paddingLeft: '10px !important',
  },
  value: {
    padding: '0 !important',
  },
}));

const FriendSubheading = ({ account, changePlayer, classes }) =>
  account.accountType === 'uno' ? (
    <a
      className={classes.link}
      href="#"
      onClick={e => {
        e.preventDefault();
        changePlayer(account.userID);
      }}
    >
      {account.userID}
    </a>
  ) : (
    account.userID
  );
FriendSubheading.propTypes = {
  account: PropTypes.object.isRequired,
  changePlayer: PropTypes.func.isRequired,
  classes: PropTypes.object,
};
FriendSubheading.defaultProps = {
  classes: {},
};

const Friend = ({ account, changePlayer, expandAll }) => {
  const classes = useStyles();
  return (
    <AccountsAccordionChild
      classes={{ accordionContent: classes.accordionContent }}
      expandAll={expandAll}
      key={expandAll}
      title={account.username}
      subHeading={{
        SubHeadingComponent: FriendSubheading,
        subHeadingProps: {
          account,
          changePlayer,
          classes,
        },
      }}
      details={{
        DetailsComponent: KeyValue,
        detailsProps: {
          classes,
          item: Object.entries(account)
            .filter(([k]) => k !== '__typename')
            .reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: value,
              }),
              {}
            ),
        },
      }}
    />
  );
};
Friend.propTypes = {
  account: PropTypes.shape({
    accountType: PropTypes.string,
    userID: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  changePlayer: PropTypes.func.isRequired,
  expandAll: PropTypes.bool.isRequired,
};

const DetailsRenderer = ({ changePlayer, data, expandAll }) =>
  data?.map(account => (
    <Friend
      account={account}
      changePlayer={changePlayer}
      expandAll={expandAll}
      key={account.userID}
    />
  ));

const FRIENDS_QUERY = gql`
  query PlayerFriends($unoID: ID!, $accountsServiceConfigId: ID!) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      friends {
        accountType
        userID
        username
      }
    }
  }
`;

const Friends = ({ variables, changePlayer, expandAll }) => {
  const classes = useStyles();
  return (
    <GraphQLStateRenderer
      classes={{ empty: classes.empty }}
      detailsProps={{ changePlayer, expandAll }}
      DetailsRenderer={DetailsRenderer}
      path="player.friends"
      query={FRIENDS_QUERY}
      variables={variables}
    />
  );
};

Friends.propTypes = {
  changePlayer: PropTypes.func.isRequired,
  expandAll: PropTypes.bool,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
  }).isRequired,
};
Friends.defaultProps = {
  expandAll: false,
};

export default Friends;
