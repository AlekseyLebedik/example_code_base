import PropTypes from 'prop-types';

export const PRIVACY_LEVELS = {
  OPEN: 1,
  BY_APPLICATION: 2,
  INVITE_ONLY: 3,
};

export const ROLES = {
  NORMAL: 1,
  ADMIN: 2,
  SUPERADMIN: 3,
  OWNER: 4,
};

export const PLAYER_PROPTYPE = PropTypes.shape({
  userID: PropTypes.string,
  username: PropTypes.string,
  accountType: PropTypes.string,
});

export const MEMBERS_PROP = PropTypes.arrayOf(
  PropTypes.shape({
    lastUpdated: PropTypes.string,
    memberSince: PropTypes.string,
    player: PLAYER_PROPTYPE,
    role: PropTypes.string,
  })
);

export const PROPOSALS_PROP = PropTypes.arrayOf(
  PropTypes.shape({
    cooldownTimestamp: PropTypes.string,
    createdTimestamp: PropTypes.string,
    message: PropTypes.string,
    proposingPlayer: PLAYER_PROPTYPE,
    targetPlayer: PLAYER_PROPTYPE,
    type: PropTypes.string,
  })
);

export const BANS_PROP = PropTypes.arrayOf(
  PropTypes.shape({
    banEndTimestamp: PropTypes.string,
    banTimestamp: PropTypes.string,
    player: PLAYER_PROPTYPE,
  })
);

export const CLANS_PERMISSIONS = PropTypes.shape({
  canEditClans: PropTypes.bool,
  canCreateClans: PropTypes.bool,
  canDisbandClans: PropTypes.bool,
});

export const CLAN_DATA_PROPTYPE = PropTypes.shape({
  bans: BANS_PROP.isRequired,
  createdTimestamp: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  memberCount: PropTypes.number.isRequired,
  members: MEMBERS_PROP.isRequired,
  name: PropTypes.string.isRequired,
  owner: PLAYER_PROPTYPE.isRequired,
  privacyLevel: PropTypes.string.isRequired,
  proposalCount: PropTypes.number.isRequired,
  proposals: PROPOSALS_PROP.isRequired,
  tag: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
});
