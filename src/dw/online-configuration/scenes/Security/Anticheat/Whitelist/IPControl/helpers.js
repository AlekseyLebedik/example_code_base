import {
  WL_TYPE_NAME_USER_ID,
  WL_TYPE_NAME_GAMER_TAG,
  WL_TYPE_NAME_CONSOLE_ID,
  WL_TYPE_NAME_IP,
  WL_TYPE_NAME_IP_AND_GAMER_TAG,
  WL_TYPE_NAME_UNKNOWN,
} from './constants';

export function selectGroupWhenSaved(component) {
  if (component.state.creatingGroup) {
    const group = component.props?.ipGroups?.find(
      g => g.name === component.state.creatingGroup
    );
    if (group) {
      component.handleGroupChange(
        { label: group.name, value: group.id },
        { action: 'select-option' }
      );
    }
  }
}

export const mapWhitelistType = item => {
  if (item.ipAddr && item.gamerTag) {
    return WL_TYPE_NAME_IP_AND_GAMER_TAG;
  }
  if (item.ipAddr) {
    return WL_TYPE_NAME_IP;
  }
  if (item.gamerTag) {
    return WL_TYPE_NAME_GAMER_TAG;
  }
  if (item.userId) {
    return WL_TYPE_NAME_USER_ID;
  }
  if (item.consoleId) {
    return WL_TYPE_NAME_CONSOLE_ID;
  }
  return WL_TYPE_NAME_UNKNOWN;
};
