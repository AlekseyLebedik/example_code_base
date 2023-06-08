import get from 'lodash/get';

export const getUnoId = ({ data }) =>
  get(data, 'matchStart.player.uno_id') ||
  get(data, 'playerMatchStarts[0].client.uno_id');

const getFirstPartyAccount = row =>
  row.firstPartyAccounts?.find(
    a =>
      a.provider === row.network ||
      (a.provider === 'battle' && row.network === 'battlenet')
  );

export const getFirstPartyId = row =>
  get(row, 'matchStart.player.first_party_user_id') ||
  getFirstPartyAccount(row)?.accountID;

export const getFirstPartyUsername = row => getFirstPartyAccount(row)?.username;

export const COLUMNS = [
  {
    headerName: 'UNO ID',
    minWidth: 200,
    valueGetter: params => (params.data ? getUnoId(params) : null),
  },
  {
    headerName: 'UNO Username',
    field: 'userName',
    minWidth: 400,
    flex: 2,
  },
  {
    headerName: 'First Party ID',
    minWidth: 200,
    valueGetter: params => (params.data ? getFirstPartyId(params.data) : null),
  },
  {
    headerName: 'First Party Username',
    minWidth: 200,
    valueGetter: params =>
      params.data ? getFirstPartyUsername(params.data) : null,
  },
  {
    headerName: 'Platform',
    field: 'platform',
    minWidth: 100,
  },
];
