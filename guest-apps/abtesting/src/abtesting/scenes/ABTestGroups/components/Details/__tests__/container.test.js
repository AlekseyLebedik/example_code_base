import React from 'react';
import { shallow } from 'enzyme';
import createStore from 'shared/store';

import GroupDetailsStateless from '../presentational';
import Details from '../index';
import { GroupDetails } from '../container';

describe('Details', () => {
  const { store } = createStore();
  const props = {
    store,
  };

  it('loads the Details component correctly', () => {
    const root = shallow(<Details {...props} />);
    expect(root).toMatchSnapshot();
  });

  it('renders GroupDetailsStateless', () => {
    const root = shallow(<Details {...props} />);
    expect(root.find(GroupDetailsStateless)).toBeDefined();
  });

  describe('GroupDetails', () => {
    const groupDetailsProps = {
      groupMembers: [],
      addGroupMember: jest.fn(),
      getGroupDetails: jest.fn(),
      fetchTests: jest.fn(),
      fetchConfigs: jest.fn(),
      removeGroupMembers: jest.fn(),
      deleteGroup: jest.fn(),
      selectedItemId: '1',
      isLoading: false,
      groups: [],
      onSubmitReplaceUsers: jest.fn(),
      context: '1:dev',
    };

    it('renders GroupDetails component correctly', () => {
      const root = shallow(<GroupDetails {...groupDetailsProps} />);
      expect(root).toMatchSnapshot();
    });

    it('on removeGroupMembers calls removeGroupMembers', () => {
      const users = [{ id: 1, username: 'testUser' }];
      const root = shallow(<GroupDetails {...groupDetailsProps} />);
      root.instance().removeGroupMembers(users);
      expect(groupDetailsProps.removeGroupMembers).toBeCalledWith(
        groupDetailsProps.selectedItemId,
        users.map(({ id: userID, username: userName }) => ({
          userID,
          userName,
        })),
        groupDetailsProps.context
      );
    });
  });
});
