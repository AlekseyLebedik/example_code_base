import React from 'react';
import PropTypes from 'prop-types';

import AccountsAccordion from 'dw/player-tooling/components/AccountsAccordion';
import HelpIcon from 'dw/player-tooling/components/HelpIcon';
import {
  GridLayout,
  GridCol,
  GridItem,
} from 'dw/player-tooling/components/GridLayout';

import LinkedAccountDetails from 'dw/player-tooling/components/AccountSections/LinkedAccountsDetails';
import PIIDetails from 'dw/player-tooling/components/AccountSections/PIIDetails';
import Player2FA from 'dw/player-tooling/components/AccountSections/Player2FA';
import Friends from 'dw/player-tooling/components/AccountSections/Friends';
import PlayerActivity from 'dw/player-tooling/components/AccountSections/PlayerActivity';
import RecentLogins from 'dw/player-tooling/components/AccountSections/RecentLogins';
import { useHasPIIPermissionCheck } from 'dw/player-tooling/hooks';

import styles from './index.module.css';

const StatelessPlayerAccounts = ({
  accountsServiceConfigId,
  onSelectAccount,
  playerAccounts,
  playerDataLoading,
  playerBans,
  unoID,
  unoUserData,
}) => {
  const hasPIIPermission = useHasPIIPermissionCheck();
  const variables = { accountsServiceConfigId, unoID };
  return (
    <GridLayout>
      <GridCol className={styles.spanRows}>
        <GridItem>
          <AccountsAccordion
            defaultExpanded
            details={{
              DetailsComponent: PIIDetails,
              detailsProps: {
                accountsServiceConfigId,
                hasPIIPermission,
                playerAccounts,
                playerDataLoading,
                playerBans,
                unoUserData,
              },
            }}
            title="Activision (Uno) Account"
          />
        </GridItem>
      </GridCol>
      <GridCol>
        <GridItem>
          <AccountsAccordion
            defaultExpanded
            details={{
              DetailsComponent: LinkedAccountDetails,
              detailsProps: { variables },
            }}
            subHeading={{
              SubHeadingComponent: 'OpenAllBtn',
            }}
            title="Linked Accounts"
          />
        </GridItem>
      </GridCol>
      <GridCol className={styles.spanRows}>
        <GridItem className={styles.player2FA}>
          <Player2FA
            accountsServiceConfigId={accountsServiceConfigId}
            unoID={unoID}
          />
        </GridItem>
        <GridItem>
          <AccountsAccordion
            title={
              <HelpIcon
                heading="Player Activity"
                tooltip="Based on Activision (Uno) retention policy of 14 days"
              />
            }
            defaultExpanded
            details={{
              DetailsComponent: PlayerActivity,
              detailsProps: { hasPIIPermission, variables },
            }}
          />
        </GridItem>
        <GridItem>
          <AccountsAccordion
            defaultExpanded
            details={{
              DetailsComponent: RecentLogins,
              detailsProps: { variables },
            }}
            subHeading={{
              SubHeadingComponent: () => 'Most recent within the last 2 weeks',
            }}
            title="Recent Title Logins"
          />
        </GridItem>
      </GridCol>
      <GridCol>
        <GridItem>
          <AccountsAccordion
            defaultExpanded
            details={{
              DetailsComponent: Friends,
              detailsProps: {
                changePlayer: onSelectAccount,
                variables,
              },
            }}
            subHeading={{
              SubHeadingComponent: 'OpenAllBtn',
            }}
            title="Activision Friends"
          />
        </GridItem>
      </GridCol>
    </GridLayout>
  );
};

StatelessPlayerAccounts.propTypes = {
  accountsServiceConfigId: PropTypes.string.isRequired,
  onSelectAccount: PropTypes.func.isRequired,
  playerAccounts: PropTypes.arrayOf(PropTypes.object),
  playerDataLoading: PropTypes.bool.isRequired,
  playerBans: PropTypes.array,
  unoID: PropTypes.string,
  unoUserData: PropTypes.object.isRequired,
};
StatelessPlayerAccounts.defaultProps = {
  playerAccounts: [],
  unoID: null,
  playerBans: [],
};

export default StatelessPlayerAccounts;
