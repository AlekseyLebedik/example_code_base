import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { NOTE_PLACEHOLDER, UNASSIGNED_GROUP } from './constants';
import { mapWhitelistType } from './helpers';

export const ipNotesSelector = state =>
  state.Scenes.Security.Anticheat.Whitelist.IPControl.ipNotes;

export const ipGroupsSelector = state =>
  state.Scenes.Security.Anticheat.Whitelist.IPControl.ipGroups;

const ipControlSelector = state =>
  state.Scenes.Security.Anticheat.Whitelist.IPControl.ipControl;

const userIdSelector = state =>
  state.Scenes.Security.Anticheat.Whitelist.IPControl.whitelistedUsers;

const sortByIp = items => {
  if (items) {
    const newItems = [...items];
    newItems.sort((a, b) => {
      if (a.ipInt > b.ipInt) return 1;
      if (a.ipInt < b.ipInt) return -1;
      return 0;
    });
    return newItems;
  }
  return items;
};

const sortByAlphabet = items => {
  if (items) {
    const newItems = [...items];
    newItems.sort((a, b) => {
      if (a.userId.toLowerCase() > b.userId.toLowerCase) return 1;
      if (a.userId.toLowerCase < b.userId.toLowerCase) return -1;
      return 0;
    });
    return newItems;
  }
  return items;
};

const enrichWhitelistItem = (items, formatDateTime) => {
  if (items) {
    return items.map(item => ({
      ...item,
      creatorNote: item.creatorNote || '',
      note: item.note ? item.note : NOTE_PLACEHOLDER,
      groupID: item.groupID || 0,
      group: item.group || UNASSIGNED_GROUP,
      updatedAt:
        item.note &&
        (formatDateTime(item.updatedAt) === 'Invalid date'
          ? item.updatedAt
          : formatDateTime(item.updatedAt)),
      type: mapWhitelistType(item),
    }));
  }
  return items;
};

const sortedIpSelector = createSelector(ipControlSelector, items =>
  sortByIp(items)
);

const sortedUsersSelector = createSelector(userIdSelector, items =>
  sortByAlphabet(items)
);

const ipGroupAndDateSelector = createSelector(
  sortedIpSelector,
  formatDateTimeSelector,
  (items, formatDateTime) => {
    return enrichWhitelistItem(items, formatDateTime);
  }
);

export const usersGroupAndDateSelector = createSelector(
  sortedUsersSelector,
  formatDateTimeSelector,
  (items, formatDateTime) => {
    return enrichWhitelistItem(items, formatDateTime);
  }
);

export const searchParams = state =>
  state.Scenes.Security.Anticheat.Whitelist.IPControl.q;

export const filteredSelector = createSelector(
  ipGroupAndDateSelector,
  searchParams,
  (items, q) => {
    if (!q) return items;
    return items.filter(
      item =>
        item.ipAddr.indexOf(q.q) !== -1 ||
        String(item.ipRange).indexOf(q.q) !== -1
    );
  }
);
