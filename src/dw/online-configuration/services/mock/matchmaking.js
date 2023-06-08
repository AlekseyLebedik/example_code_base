/* eslint-disable */

import { range, random, startsWith } from 'lodash';

import { decode } from 'dw/core/helpers/base64';
import { randHex, randomUsername } from 'dw/core/helpers/random';
import { hasData } from 'dw/core/helpers/object';

const ITEMS_KEY = 'MATCHMAKING.LIST';
const SOURCE_KEY = 'MATCHMAKING.SOURCE';
const ACTIVE_ID = 7;
const SIZE = 100;

const readItems = () => {
  let items = localStorage.getItem(ITEMS_KEY);
  if (items) {
    try {
      return JSON.parse(items);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const getRulesets = (params = {}) =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve({ data: getItems(params) }), 5000)
  );

export const getRuleset = id => {
  const response = getItems({ q: id });
  const data =
    response.data.length > 0
      ? {
          ...response.data[0],
          source: decode(localStorage.getItem(SOURCE_KEY) || ''),
        }
      : {};

  return new Promise((resolve, reject) =>
    setTimeout(() => resolve({ data }), 500)
  );
};

export const activateRuleset = id => {
  let items = readItems() || [];

  items = items.map(item => ({
    ...item,
    status: item.id === id ? 'active' : item.status,
    appliedAt:
      item.id === id ? Math.round(Date.now().valueOf() / 1000) : item.appliedAt,
  }));

  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));

  return new Promise((resolve, reject) => setTimeout(() => resolve(), 500));
};

export const uploadRuleset = code => {
  const error = startsWith(decode(code), 'ERROR');
  let item = null;
  if (!error) {
    localStorage.setItem(SOURCE_KEY, code);
    const items = readItems() || [];
    item = createNewItem();
    items.push(item);
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (error)
        return reject({
          response: {
            status: 400,
            data: {
              error: {
                name: 'Error:ClientError:InvalidRequest',
                invalid: [
                  {
                    field: 'source',
                    msg: 'Invalid value provided',
                  },
                ],
              },
            },
          },
        });
      else return resolve({ data: item });
    }, 2000)
  );
};

const createNewItem = (idx = -1) => {
  const name = `T8_v${[random(20), random(20), random(20)].join('_')}`;
  return {
    id: `${name}:${randHex(8)}`,
    name: name,
    createdAt: Math.round(Date.now().valueOf() / 1000),
    appliedAt:
      idx === ACTIVE_ID ? Math.round(Date.now().valueOf() / 1000) : null,
    sourceHash: randHex(32),
    status: idx === ACTIVE_ID ? 'active' : 'inactive',
  };
};

const getItems = ({ nextPageToken = 0, q = null }) => {
  let items = readItems();
  if (!items) {
    items = range(27).map(idx => createNewItem(idx));
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    items = readItems();
  }

  if (q) {
    const data = [];
    const item = items.find(item => item.id === q || item.name === q);
    if (item) data.push(item);
    return {
      data,
      nextPageToken: null,
    };
  }
  const page = parseInt(nextPageToken || 0, 10);
  const start = page * SIZE;

  if (start > items.length) {
    return {
      data: [],
      nextPageToken: null,
    };
  }
  const end = Math.min(start + SIZE, items.length);
  return {
    data: items.slice(start, end),
    nextPageToken: end < items.length ? String(page + 1) : null,
  };
};

const random_item = items => items[Math.floor(Math.random() * items.length)];

const DATACENTERS = [
  'gs-los-angeles',
  'gs-london',
  'gs-new-york',
  'gs-frankfurt',
  'gs-amsterdam',
  'gs-denmark',
  'gs-warsaw',
  'gs-moscow',
  'gs-madrid',
  'gs-new-jersey',
  'gs-miami',
  'mp-tokyo',
  'mp-paris',
  'mp-seattle',
  'mp-dallas',
];
const CONTEXTS = ['t8-mp', 't8-xb1-mp', 't8-xb1-wz-100', 't8-xb1-wz-42'];
const BUILDS = [
  'iw7-ps4-ship-prod-1440574@22004',
  't8-ps4-ship-prod-1221257@32767',
  't8-debug-3222505-TU8-43-16-1e@3213',
  't8-debug-4572305-TD0-43-6-1e@6583',
  't8-ps4-ship-prod-34587654@2747',
];
const STATUSES = ['idle', 'allocated'];
const createNewServerAllocation = () => {
  return {
    dataCenter: random_item(DATACENTERS),
    buildName: random_item(BUILDS),
    context: random_item(CONTEXTS),
    status: random_item(STATUSES),
    count: Math.floor(Math.random() * 100),
  };
};

export const serversAllocations = range(195).map(() =>
  createNewServerAllocation()
);

export const getServersAllocation = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve({ data: { data: serversAllocations } }), 5000)
  );

const createNewServer = (
  dataCenters = [],
  buildNames = [],
  context = '',
  serverStates = []
) => {
  const state = hasData(serverStates)
    ? random_item(serverStates)
    : random_item(STATUSES);
  return range(Math.floor(Math.random() * 30)).map(() => ({
    data: {
      dataCenter: hasData(dataCenters)
        ? random_item(dataCenters)
        : random_item(DATACENTERS),
      addr: 'Some address here',
      serverInfo: { key: 'value' },
      secKey: 'U0VDVVJJVFlLRVkwMDAwMA==',
      secID: 'U0VDSUQwMDA=',
      context: context ? context : random_item(CONTEXTS),
      buildName: hasData(buildNames)
        ? random_item(buildNames)
        : random_item(BUILDS),
      allocated: state === 'allocated' ? '1' : '0',
      registrationTime: '1548942623',
      priority: Math.floor(Math.random() * 100).toString(),
      freeSlots:
        state === 'allocated'
          ? Math.floor(Math.random() * 20).toString()
          : null,
      playlistID:
        state === 'allocated'
          ? Math.floor(Math.random() * 50).toString()
          : null,
      usageInfo:
        state === 'allocated'
          ? {
              maxSlots: 12,
              lobbyID: '123456789',
              openStatus: random_item([true, false]),
            }
          : null,
    },
    userID: Math.floor(Math.random() * 1000000000000000).toString(),
    ttl: '10',
  }));
};

export const getServers = (dataCenters, buildNames, context, serverStates) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () =>
        resolve({
          data: {
            data: createNewServer(
              dataCenters,
              buildNames,
              context,
              serverStates
            ),
          },
        }),
      1000
    )
  );

export const getMatchDetails = () =>
  new Promise((resolve, reject) =>
    setTimeout(
      () =>
        resolve({
          data: {
            data: range(random(150)).map(() => ({
              platform: random_item([
                'PS5',
                'PS4',
                'XB1',
                'XBSX',
                'battle',
                'steam',
                'PC',
              ]),
              matchStart: {
                player: {
                  uno_id: random(1000000000000000),
                  first_party_user_id: random(1000000000000000),
                },
                gamertag: randomUsername(),
              },
            })),
          },
        }),
      1000
    )
  );
