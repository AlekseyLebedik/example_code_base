import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { featureSwitches as fs } from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import { useHasPIIPermissionCheck } from 'dw/player-tooling/hooks';

import AccountsAccordion from 'dw/player-tooling/components/AccountsAccordion';
import {
  GridLayout,
  GridCol,
  GridItem,
} from 'dw/player-tooling/components/GridLayout';

import ABTesting from '../ABTesting';
import Inventory from '../Inventory';
import Leaderboards from '../Leaderboards';
import Logins from './components/Logins';
import Logs from './components/Logs';
import Matchmaking from '../Matchmaking';

import styles from './index.module.css';

const StatelessRecentActivity = ({ variables }) => {
  const hasPIIPermission = useHasPIIPermissionCheck();
  const displayABTesting = useSelector(state =>
    hasFeaturesEnabledFuncSelector(state)([fs.DISPLAY_PLAYER_ABTESTING], false)
  );
  const displayLeaderboards = useSelector(state =>
    hasFeaturesEnabledFuncSelector(state)(
      [fs.DISPLAY_PLAYER_LEADERBOARDS],
      false
    )
  );

  return (
    <GridLayout>
      <GridCol>
        <GridItem>
          <AccountsAccordion
            title="Logins"
            subHeading={{
              SubHeadingComponent: () => 'Most recent within the last 2 weeks',
            }}
            defaultExpanded
            details={{
              DetailsComponent: Logins,
              detailsProps: { hasPIIPermission, variables },
            }}
          />
        </GridItem>
      </GridCol>
      <GridCol>
        <GridItem>
          <AccountsAccordion
            title="Matchmaking"
            subHeading={{
              SubHeadingComponent: () => 'Most recent within the last 2 weeks',
            }}
            defaultExpanded
            details={{
              DetailsComponent: Matchmaking,
              detailsProps: { variables },
            }}
          />
        </GridItem>
      </GridCol>
      <GridCol className={styles.spanRows}>
        <GridItem>
          <AccountsAccordion
            title="Player Inventory"
            subHeading={{
              SubHeadingComponent: () => 'Most Recent',
            }}
            details={{
              DetailsComponent: Inventory,
              detailsProps: {
                detailsProps: { recentActivity: true },
                limit: 3,
                variables,
              },
            }}
            defaultExpanded
          />
        </GridItem>
        {displayLeaderboards && (
          <GridItem>
            <AccountsAccordion
              title="Leaderboards"
              subHeading={{
                SubHeadingComponent: () => 'Most Recent',
              }}
              details={{
                DetailsComponent: Leaderboards,
                detailsProps: {
                  limit: 1,
                  variables,
                },
              }}
              defaultExpanded
            />
          </GridItem>
        )}
        {displayABTesting && (
          <GridItem>
            <AccountsAccordion
              title="A/B Testing"
              subHeading={{
                SubHeadingComponent: () => 'Currently Enrolled',
              }}
              details={{
                DetailsComponent: ABTesting,
                detailsProps: { variables },
              }}
              defaultExpanded
            />
          </GridItem>
        )}
      </GridCol>
      <GridCol>
        <GridItem>
          <AccountsAccordion
            title="Logs"
            subHeading={{
              SubHeadingComponent: () => 'Most recent within the last 2 weeks',
            }}
            details={{
              DetailsComponent: Logs,
              detailsProps: { variables },
            }}
            defaultExpanded
          />
        </GridItem>
      </GridCol>
    </GridLayout>
  );
};

StatelessRecentActivity.propTypes = {
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
  }).isRequired,
};

export default StatelessRecentActivity;
