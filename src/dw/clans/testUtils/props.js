export const clanData = {
  id: '937017732286401048',
  tag: 'wfe w',
  name: 'g ergwefg',
  createdTimestamp: '1624480992',
  memberCount: 1,
  owner: {
    accountType: 'uno',
    userID: '5151811586893775373',
    username: 'test-owner',
  },
  privacyLevel: 'INVITE_ONLY',
  proposalCount: 0,
  bans: [],
  members: [
    {
      player: {
        userID: '5151811586893775373',
        accountType: 'uno',
        username: 'test-member',
      },
      role: 'OWNER',
      memberSince: '1624480992',
      lastUpdated: '1624480992',
    },
  ],
  proposals: [],
  tags: [],
};

export const bannedData = [
  {
    clanID: '937017732286401048',
    player: {
      userID: '5779243048524473608',
      accountType: 'uno',
      username: 'banned-user',
    },
    banEndTimestamp: '1626328073',
    banTimestamp: '1626228073',
  },
  {
    clanID: '937017732286401048',
    player: {
      userID: '7307022213772839286',
      accountType: 'uno',
      username: 'banned-user-2',
    },
    banEndTimestamp: '1627228114',
    banTimestamp: '1626228114',
  },
];

export const clanTableCommonProps = {
  classes: {},
  formatDateTime: jest.fn(),
  handleSelectMember: jest.fn(),
  apiRef: { current: jest.fn() },
  getRowId: jest.fn(),
};

export const clansPermissions = {
  canEditClans: true,
  canCreateClans: true,
  canDisbandClans: true,
};
