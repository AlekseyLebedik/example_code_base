export const ACTION_TYPE_PREFIX = 'ACCOUNTS_TAB_USER_TEAMS';

const MEMBERSHIP_TYPES = ['Member', 'Admin', 'Owner'];

export const COLUMNS = [
  {
    title: 'Team ID',
    dataIndex: 'teamID',
    key: 'teamID',
    type: 'number',
    width: '8%',
  },
  {
    title: 'TeamName',
    dataIndex: 'teamName',
    key: 'teamName',
    type: 'string',
    width: '12%',
  },
  {
    title: 'OwnerUserID',
    dataIndex: 'ownerUserID',
    key: 'ownerUserID',
    type: 'number',
    width: '12%',
  },
  {
    title: 'MembershipType',
    dataIndex: 'membershipType',
    key: 'membershipType',
    type: 'number',
    width: '16%',
    render: value => MEMBERSHIP_TYPES[value],
  },
  {
    title: 'Privileges',
    dataIndex: 'privileges',
    key: 'privileges',
    type: 'number',
    width: '12%',
  },
  {
    title: 'NumTeamMembers',
    dataIndex: 'numTeamMembers',
    key: 'numTeamMembers',
    type: 'number',
    width: '14%',
  },
  {
    title: 'NumMembersOnline',
    dataIndex: 'numMembersOnline',
    key: 'numMembersOnline',
    type: 'number',
    width: '14%',
  },
];
