import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import KeyValue from 'dw/core/components/KeyValue';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';
import { AccountsAccordionChild } from 'dw/player-tooling/components/AccountsAccordion';
import OpenAllBtn from 'dw/player-tooling/components/OpenAllBtn';
import ServiceView from '../ServiceView';
import {
  clanTitleEnvSelector,
  formatClanData,
  CLAN_MEMBERSHIP_QUERY,
} from './utils';

const useStyles = makeStyles(theme => ({
  accordionContent: { display: 'grid', gridTemplateColumns: '1fr 1fr' },
  link: { color: theme.palette.primary.main, marginLeft: 25 },
  empty: { paddingBottom: 16 },
  key: { padding: '0 !important', paddingLeft: '10px !important' },
  value: { padding: '0 !important' },
  expandBtn: { position: 'absolute', top: 0, right: 40 },
}));

const ClanMateSubheading = ({ classes, onSelectAccount, player }) => (
  <a
    className={classes.link}
    href="#"
    onClick={e => {
      e.preventDefault();
      onSelectAccount(player.userID);
    }}
  >
    {player.userID}
  </a>
);
ClanMateSubheading.propTypes = {
  player: PropTypes.shape({
    userID: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  onSelectAccount: PropTypes.func.isRequired,
};

export const ClanMate = ({ clanMate, expandAll, onSelectAccount }) => {
  const classes = useStyles();
  const formatDateTime = useSelector(formatDateTimeSelector);
  return (
    <AccountsAccordionChild
      classes={{ accordionContent: classes.accordionContent }}
      expandAll={expandAll}
      key={expandAll}
      title={clanMate.player.username}
      subHeading={{
        SubHeadingComponent: ClanMateSubheading,
        subHeadingProps: {
          player: clanMate.player,
          onSelectAccount,
          classes,
        },
      }}
      details={{
        DetailsComponent: KeyValue,
        detailsProps: {
          classes,
          formatDateTime,
          item: Object.entries(clanMate)
            .filter(([k]) => k !== '__typename' && k !== 'player')
            .reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key === 'memberSince' ? 'Member Since' : key]: value,
              }),
              {}
            ),
        },
      }}
    />
  );
};

ClanMate.propTypes = {
  clanMate: PropTypes.shape({
    memberSince: PropTypes.string,
    role: PropTypes.string,
    player: PropTypes.shape({
      userID: PropTypes.string,
      username: PropTypes.string,
    }),
  }).isRequired,
  expandAll: PropTypes.bool.isRequired,
  onSelectAccount: PropTypes.func.isRequired,
};

export const DetailRenderer = ({ onSelectAccount, values }) => {
  const [expandAll, setExpandAll] = useState(false);
  const classes = useStyles();
  return (
    <>
      <OpenAllBtn
        className={classes.expandBtn}
        expandAll={expandAll}
        onClick={setExpandAll}
      />
      {values.map(clanMate => (
        <ClanMate
          clanMate={clanMate}
          expandAll={expandAll}
          key={clanMate.player.userID}
          onSelectAccount={onSelectAccount}
        />
      ))}
    </>
  );
};

DetailRenderer.propTypes = {
  onSelectAccount: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Clans = ({
  detailsProps,
  groupBy,
  linkToSection,
  onSelectAccount,
  titleEnvs,
  variables,
}) => {
  const { titleId, env } = useSelector(state =>
    clanTitleEnvSelector(state, { titleEnvs })
  );
  const formatData = formatClanData(titleId);
  const clanSearchVariables = useMemo(
    () => ({
      titleId,
      env,
      members: [variables.unoID],
    }),
    [titleId, env, variables.unoID]
  );
  const graphQLProps = useMemo(
    () => ({
      detailsProps: { ...detailsProps, onSelectAccount },
      noDataMsg: 'No clan mates found',
      path: 'clanMembers[0].clan.members',
      query: CLAN_MEMBERSHIP_QUERY,
      variables: clanSearchVariables,
      skipIf: !titleId || !env || !variables.unoID,
    }),
    [clanSearchVariables, detailsProps, onSelectAccount, variables]
  );

  const details = useCallback(({ data, ...props }) => {
    return <DetailRenderer values={data} {...props} />;
  }, []);

  return groupBy === 'services' ? (
    <ServiceView
      DetailRenderer={values => (
        <DetailRenderer {...values} onSelectAccount={onSelectAccount} />
      )}
      formatData={formatData}
      linkToSection={linkToSection}
      {...graphQLProps}
    />
  ) : (
    <GraphQLStateRenderer DetailsRenderer={details} {...graphQLProps} />
  );
};

Clans.propTypes = {
  detailsProps: PropTypes.object,
  groupBy: PropTypes.string,
  linkToSection: PropTypes.func,
  onSelectAccount: PropTypes.func.isRequired,
  titleEnvs: PropTypes.arrayOf(PropTypes.object),
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
    titleId: PropTypes.string,
  }).isRequired,
};
Clans.defaultProps = {
  detailsProps: {},
  groupBy: 'titles',
  linkToSection: () => {},
  titleEnvs: [],
};

export default Clans;
