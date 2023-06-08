import React from 'react';
import PropTypes from 'prop-types';

import AccountsAccordion from 'dw/player-tooling/components/AccountsAccordion';
import Empty from 'dw/core/components/Empty';
import HelpIcon from 'dw/player-tooling/components/HelpIcon';
import {
  GridLayout,
  GridCol,
  GridItem,
} from 'dw/player-tooling/components/GridLayout';

import UnoAccountSelector from 'dw/player-tooling/components/UnoAccountSelector';
import LinkedAccountDetails from 'dw/player-tooling/components/AccountSections/LinkedAccountsDetails';
import PIIDetails from 'dw/player-tooling/components/AccountSections//PIIDetails';
import Player2FA from 'dw/player-tooling/components/AccountSections/Player2FA';
import Friends from 'dw/player-tooling/components/AccountSections/Friends';
import Clans from 'dw/player-tooling/components/AccountSections/Clans';
import PlayerActivity from 'dw/player-tooling/components/AccountSections/PlayerActivity';
import RecentLogins from 'dw/player-tooling/components/AccountSections/RecentLogins';
import Bans from 'dw/player-tooling/components/Bans/index';
import FeatureSwitchesCheck, {
  featureSwitches,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import { useHasPIIPermissionCheck } from 'dw/player-tooling/hooks';

import { GraphQLErrorsDisplay } from '../../components/GraphQLStateRenderer/components/ErrorMessageDisplay';
import styles from './presentational.module.css';

const AccountsGridCol = props => <GridCol {...props} variant="accounts" />;
const AccountsGridItem = props => <GridItem {...props} variant="accounts" />;

const StatelessPlayerAccounts = ({
  accountsServiceConfigId,
  onSelectAccount,
  playerAccounts,
  playerDataLoading,
  playerBans,
  unoID,
  unoUserData,
  playerError,
}) => {
  const hasPIIPermission = useHasPIIPermissionCheck();
  const unoSelectProps = {
    accountsServiceConfigId,
    onSelectAccount,
    unoUserData,
  };
  const variables = { accountsServiceConfigId, unoID };
  return (
    <GridLayout className={styles.gridWrapper} type="accounts">
      {playerError && (
        <AccountsGridItem className={styles.playerError}>
          <GraphQLErrorsDisplay error={playerError} />
        </AccountsGridItem>
      )}
      {unoID && playerAccounts.length ? (
        <>
          <AccountsGridCol className={styles.spanRows}>
            <AccountsGridItem className={styles.selector}>
              <UnoAccountSelector {...unoSelectProps} />
            </AccountsGridItem>
            <AccountsGridItem>
              <AccountsAccordion
                title="Activision (Uno) Account"
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
              />
            </AccountsGridItem>
            {hasPIIPermission && (
              <FeatureSwitchesCheck
                featureSwitches={[featureSwitches.SHOW_PLAYER_BANS]}
                isStaffAllowed={false}
              >
                <AccountsGridItem>
                  <Bans
                    accountsServiceConfigId={accountsServiceConfigId}
                    unoID={unoID}
                  />
                </AccountsGridItem>
              </FeatureSwitchesCheck>
            )}
            <AccountsGridItem>
              <AccountsAccordion
                title="Clans"
                defaultExpanded
                details={{
                  DetailsComponent: Clans,
                  detailsProps: {
                    variables,
                  },
                }}
              />
            </AccountsGridItem>
          </AccountsGridCol>
          <AccountsGridCol>
            <AccountsGridItem>
              <AccountsAccordion
                title="Linked Accounts"
                defaultExpanded
                subHeading={{
                  SubHeadingComponent: 'OpenAllBtn',
                }}
                details={{
                  DetailsComponent: LinkedAccountDetails,
                  detailsProps: { variables },
                }}
              />
            </AccountsGridItem>
          </AccountsGridCol>
          <AccountsGridCol className={styles.spanRows}>
            <AccountsGridItem className={styles.player2FA}>
              <Player2FA
                accountsServiceConfigId={accountsServiceConfigId}
                unoID={unoID}
              />
            </AccountsGridItem>
            <AccountsGridItem>
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
            </AccountsGridItem>
            <AccountsGridItem>
              <AccountsAccordion
                title="Recent Title Logins"
                defaultExpanded
                details={{
                  DetailsComponent: RecentLogins,
                  detailsProps: { variables },
                }}
              />
            </AccountsGridItem>
          </AccountsGridCol>
          <AccountsGridCol>
            <AccountsGridItem>
              <AccountsAccordion
                title="Activision Friends"
                defaultExpanded
                subHeading={{
                  SubHeadingComponent: 'OpenAllBtn',
                }}
                details={{
                  DetailsComponent: Friends,
                  detailsProps: {
                    changePlayer: onSelectAccount,
                    variables,
                  },
                }}
              />
            </AccountsGridItem>
          </AccountsGridCol>
        </>
      ) : (
        <>
          <AccountsGridItem className={styles.selector}>
            <UnoAccountSelector {...unoSelectProps} />
          </AccountsGridItem>
          <div className={styles.emptyGrid}>
            <Empty emptyText="Please enter an Activision (Uno) Account ID or First Party ID or Gamertag or Email" />
          </div>
        </>
      )}
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
  playerError: PropTypes.object,
};
StatelessPlayerAccounts.defaultProps = {
  playerAccounts: [],
  unoID: null,
  playerBans: [],
  playerError: undefined,
};

export default StatelessPlayerAccounts;
