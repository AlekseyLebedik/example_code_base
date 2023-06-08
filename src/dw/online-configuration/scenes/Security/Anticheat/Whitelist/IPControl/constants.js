import styles from './presentational.module.css';

export const NOTE_PLACEHOLDER = 'Click to add note';

export const UNASSIGNED_GROUP = 'Unassigned Group';

export const COLUMNS = [
  {
    headerName: 'Group',
    field: 'group',
    rowGroup: true,
    filter: true,
    editable: true,
    cellClass: [styles.cellEditor],
    cellEditorSelector: params => {
      if (params.node.group) {
        return { component: 'renameIpGroupEditor' };
      }
      return { component: 'createSelectGroupEditor' };
    },
    suppressKeyboardEvent: params => {
      // Need this to allow CreatableSelect and RenameIPGroup input to receive the Enter event
      const { key } = params.event;
      return key === 'Enter' && params.editing;
    },
    minWidth: 250,
    sortable: true,
    sort: 'desc',
    comparator: (valueA, valueB, nodeA, nodeB) => {
      if (valueA === valueB) return 0;
      if (
        nodeA.group &&
        nodeA.allLeafChildren[0]?.data?.group &&
        nodeB.group &&
        nodeB.allLeafChildren[0]?.data.group
      ) {
        if (
          nodeA.allLeafChildren[0].data.group ===
          nodeB.allLeafChildren[0].data.group
        )
          return 0;
        if (nodeA.allLeafChildren[0].data.group === UNASSIGNED_GROUP) return -1;
        if (nodeB.allLeafChildren[0].data.group === UNASSIGNED_GROUP) return 1;
        return nodeA.allLeafChildren[0].data.group >
          nodeB.allLeafChildren[0].data.group
          ? -1
          : 1;
      }
      if (nodeA.data?.group === nodeB.data?.group) return 0;
      if (nodeA.data?.group === UNASSIGNED_GROUP) return -1;
      if (nodeB.data?.group === UNASSIGNED_GROUP) return 1;
      return nodeA.data?.group > nodeB.data?.group ? -1 : 1;
    },
  },
  {
    field: 'group',
    headerName: 'Group Name',
    hide: true,
  },
  {
    field: 'type',
    headerName: 'Whitelist Type',
    minWidth: 150,
  },
  {
    field: 'ipRange',
    headerName: 'IP Range',
    minWidth: 100,
  },
  {
    field: 'creatorNote',
    headerName: 'Creator Notes',
    editable: false,
    minWidth: 200,
  },
  {
    field: 'note',
    headerName: 'Notes',
    editable: true,
    cellEditor: 'agLargeTextCellEditor',
    cellEditorPopup: true,
    cellEditorParams: {
      maxLength: '255', // override the editor defaults
      cols: '50',
      rows: '5',
    },
    cellStyle: params => {
      if (params.value === NOTE_PLACEHOLDER) {
        return { color: 'rgba(0, 0, 0, 0.54)' };
      }
      return null;
    },
    onCellValueChanged: ({ newValue, data, context }) => {
      // TODO - be nice to move these up to onUpdateNote so keep note
      // processing central and remove unnececessary context passing
      if (data.ipAddr) {
        // Support legacy API for IP note updating
        if (newValue && newValue.trim() !== '') {
          if (data.noteID) {
            context.updateIPNote({
              id: data.noteID,
              note: newValue,
              ipAddr: data.ipAddr,
              ipRange: data.ipRange,
              groupID: data.groupID,
            });
          } else {
            context.addIPNote({
              note: newValue,
              ipAddr: data.ipAddr,
              ipRange: data.ipRange,
              groupID: data.groupID,
            });
          }
        } else if (data.noteID) {
          context.deleteIPNote({
            id: data.noteID,
          });
        }
      } else {
        context.onUpdateNote(data, newValue);
      }
    },
  },
  {
    field: 'updatedAt',
    headerName: 'Note updated',
  },
];

export const WL_TYPE_NAME_USER_ID = 'Player UserID';
export const WL_TYPE_NAME_GAMER_TAG = 'Player GamerTag';
export const WL_TYPE_NAME_CONSOLE_ID = 'ConsoleID';
export const WL_TYPE_NAME_IP = 'IP/Ranges';
export const WL_TYPE_NAME_IP_AND_GAMER_TAG = 'IP/Ranges and Player UserName';
export const WL_TYPE_NAME_UNKNOWN = 'Unknown';

export const WL_TYPE_VALUE_USER_ID = 'userId';
export const WL_TYPE_VALUE_GAMER_TAG = 'gamerTag';
export const WL_TYPE_VALUE_CONSOLE_ID = 'consoleId';
export const WL_TYPE_VALUE_IP = 'ip';
export const WL_TYPE_VALUE_IP_AND_GAMER_TAG = 'ipAndGamerTag';

export const WL_TYPE_OPTIONS = [
  {
    value: WL_TYPE_VALUE_IP,
    label: WL_TYPE_NAME_IP,
  },
  {
    value: WL_TYPE_VALUE_USER_ID,
    label: WL_TYPE_NAME_USER_ID,
  },
  /* Future supports
  {
    value: WL_TYPE_VALUE_IP_AND_GAMER_TAG,
    label: WL_TYPE_NAME_IP_AND_GAMER_TAG,
  },
  {
    value: WL_TYPE_VALUE_GAMER_TAG,
    label: WL_TYPE_NAME_GAMER_TAG,
  },
  {
    value: WL_TYPE_VALUE_CONSOLE_ID,
    label: WL_TYPE_NAME_CONSOLE_ID,
  },
  */
];
