import React from 'react';
import { shallow } from 'enzyme';

import { responsibilityUserGroupsProps as props } from 'playpants/testUtils/projectSettingsProps';
import { RESP_REDIRECT_URL } from 'playpants/scenes/ProjectSettings/constants';
import { ResponsibilityUserGroups } from '../index';

describe('Users - ResponsibilityUserGroups component', () => {
  const root = shallow(<ResponsibilityUserGroups {...props} />);

  it('renders link to groups page', () => {
    expect(root.find('Link').props().to).toBe(RESP_REDIRECT_URL);
    expect(root.find('Link').children().text()).toBe('group');
  });

  it('fetch available and assigned groups for the given user and project', () => {
    const newProps = {
      ...props,
      userID: 2,
      project: 2,
    };
    props.fetchAssignedGroups.mockReset();
    shallow(<ResponsibilityUserGroups {...newProps} />);
    expect(props.fetchAssignedGroups).toBeCalledWith(2, 2);
  });

  it('handle add user to the groups', () => {
    const selectedGroups = ['1', '2'];
    const instance = root.instance();
    instance.addUserToGroup(selectedGroups);
    expect(props.addUserToGroup).toBeCalledWith(1, selectedGroups, 1);
  });
});
