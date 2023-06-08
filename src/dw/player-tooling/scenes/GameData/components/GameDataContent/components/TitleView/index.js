import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Tooltip } from '@material-ui/core';

import AccountsAccordion from 'dw/player-tooling/components/AccountsAccordion';
import {
  GridLayout,
  GridCol,
  GridItem,
} from 'dw/player-tooling/components/GridLayout';

import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { featureSwitches as fs } from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import { clanTitleEnvSelector, CLAN_MEMBERSHIP_QUERY } from '../Clans/utils';

import ABTesting from '../ABTesting';
import Achievements from '../Achievements';
import Battlepass from '../Battlepass';
import Clans from '../Clans';
import Inventory from '../Inventory';
import Leaderboards from '../Leaderboards';
import Matchmaking from '../Matchmaking';
import Storage from '../Storage';
import TitleSummary from '../TitleSummary';

import { useStyles } from '../TitleLink';

const TitleView = ({ onSelectAccount, titleEnvs, variables }) => {
  const classes = useStyles();
  const titleEnv = useMemo(
    () => titleEnvs.find(env => env.title.id === variables.titleId) || {},
    [titleEnvs, variables.titleId]
  );
  const baseUrl = `/online-configuration/${variables.titleId}/${titleEnv.shortType}`;
  const detailsProps = { hideTitles: true };
  const { titleId: clanTitleId, env: clanEnv } = useSelector(state =>
    clanTitleEnvSelector(state, { titleEnvs })
  );
  const { data: clanData } = useQuery(CLAN_MEMBERSHIP_QUERY, {
    variables: {
      titleId: clanTitleId,
      env: clanEnv,
      members: [variables.unoID],
    },
    skip: !clanTitleId || !clanEnv,
  });
  const clanID = clanData?.clanMembers && clanData.clanMembers[0]?.clan?.id;

  const displayABTesting = useSelector(state =>
    hasFeaturesEnabledFuncSelector(state)([fs.DISPLAY_PLAYER_ABTESTING], false)
  );
  const displayLeaderboards = useSelector(state =>
    hasFeaturesEnabledFuncSelector(state)(
      [fs.DISPLAY_PLAYER_LEADERBOARDS],
      false
    )
  );
  const displayTitleSummary = useSelector(state =>
    hasFeaturesEnabledFuncSelector(state)(
      [fs.DISPLAY_PLAYER_TITLE_SUMMARY],
      false
    )
  );
  const mostRecentSubHeading = {
    SubHeadingComponent: () => 'Most Recent',
  };
  return (
    <GridLayout>
      <GridCol>
        {displayTitleSummary && (
          <GridItem>
            <AccountsAccordion
              title="Summary"
              details={{
                DetailsComponent: TitleSummary,
                detailsProps: {
                  detailsProps: {
                    hideTitles: true,
                    titleId: variables.titleId,
                  },
                  variables,
                },
              }}
              defaultExpanded
            />
          </GridItem>
        )}
        <GridItem>
          <AccountsAccordion
            title={
              <Tooltip title="Go to Battlepass">
                <Link
                  className={classes.link}
                  to={`${baseUrl}/player-battle-pass/${variables.unoID}`}
                >
                  Battlepass State
                </Link>
              </Tooltip>
            }
            details={{
              DetailsComponent: Battlepass,
              detailsProps: {
                detailsProps: { hideTitles: true, titleId: variables.titleId },
                variables,
              },
            }}
            defaultExpanded
          />
        </GridItem>
        <GridItem>
          <AccountsAccordion
            title={
              clanID ? (
                <Tooltip title="Go to Clan">
                  <Link
                    className={classes.link}
                    to={`/clans/members?clanId=${clanID}&env=${clanEnv}`}
                  >
                    Clan Mates
                  </Link>
                </Tooltip>
              ) : (
                <>Clan Mates</>
              )
            }
            details={{
              DetailsComponent: Clans,
              detailsProps: {
                onSelectAccount,
                titleEnvs,
                titleId: variables.titleId,
                variables,
              },
            }}
            defaultExpanded
          />
        </GridItem>
      </GridCol>
      <GridCol>
        <GridItem>
          <AccountsAccordion
            title={
              <Tooltip title="Go to Matchmaking">
                <Link
                  className={classes.link}
                  to={`${baseUrl}/mmp-trace/${variables.unoID}`}
                >
                  Matchmaking
                </Link>
              </Tooltip>
            }
            subHeading={mostRecentSubHeading}
            details={{
              DetailsComponent: Matchmaking,
              detailsProps: {
                detailsProps,
                variables,
                titleEnvs,
              },
            }}
            defaultExpanded
          />
        </GridItem>
        <GridItem>
          <AccountsAccordion
            title={
              <Tooltip title="Go to Player Inventory">
                <Link
                  className={classes.link}
                  to={`${baseUrl}/marketplace/player-inventory/inventory/${variables.unoID}`}
                >
                  Player Inventory
                </Link>
              </Tooltip>
            }
            subHeading={mostRecentSubHeading}
            details={{
              DetailsComponent: Inventory,
              detailsProps: {
                detailsProps,
                variables,
              },
            }}
            defaultExpanded
          />
        </GridItem>
      </GridCol>
      <GridCol>
        <GridItem>
          <AccountsAccordion
            title={
              <Tooltip title="Go to User Objects">
                <Link
                  className={classes.link}
                  to={`${baseUrl}/object-store/user/${variables.unoID}`}
                >
                  Storage
                </Link>
              </Tooltip>
            }
            subHeading={mostRecentSubHeading}
            details={{
              DetailsComponent: Storage,
              detailsProps: {
                detailsProps,
                variables,
              },
            }}
            defaultExpanded
          />
        </GridItem>
        {displayLeaderboards && (
          <GridItem>
            <AccountsAccordion
              title={
                <Tooltip title="Go to Leaderboards">
                  <Link className={classes.link} to={`${baseUrl}/leaderboards`}>
                    Leaderboards
                  </Link>
                </Tooltip>
              }
              subHeading={mostRecentSubHeading}
              details={{
                DetailsComponent: Leaderboards,
                detailsProps: {
                  detailsProps,
                  variables,
                },
              }}
              defaultExpanded
            />
          </GridItem>
        )}
      </GridCol>
      <GridCol>
        <GridItem>
          <AccountsAccordion
            title={
              <Tooltip title="Go to Player Achievements">
                <Link
                  className={classes.link}
                  to={`${baseUrl}/achievements/player-achievements/${variables.unoID}`}
                >
                  Achievements
                </Link>
              </Tooltip>
            }
            subHeading={mostRecentSubHeading}
            details={{
              DetailsComponent: Achievements,
              detailsProps: {
                detailsProps,
                variables,
              },
            }}
            defaultExpanded
          />
        </GridItem>
        {displayABTesting && (
          <GridItem>
            <AccountsAccordion
              title={
                <Tooltip title="Go to A/B Testing">
                  <Link
                    className={classes.link}
                    to={`${baseUrl}/abtesting/schedule`}
                  >
                    A/B Testing
                  </Link>
                </Tooltip>
              }
              subHeading={mostRecentSubHeading}
              details={{
                DetailsComponent: ABTesting,
                detailsProps: {
                  detailsProps,
                  variables,
                },
              }}
              defaultExpanded
            />
          </GridItem>
        )}
      </GridCol>
    </GridLayout>
  );
};

TitleView.propTypes = {
  onSelectAccount: PropTypes.func.isRequired,
  titleEnvs: PropTypes.arrayOf(PropTypes.object).isRequired,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
    titleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
};

export default TitleView;
