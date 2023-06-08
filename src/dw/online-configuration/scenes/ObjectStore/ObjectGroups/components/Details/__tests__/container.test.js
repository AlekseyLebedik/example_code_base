import React from 'react';
import { shallow } from 'enzyme';
import createStore from 'dw/online-configuration/store';

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
      removeGroupMembers: jest.fn(),
      selectedItemId: '1',
      isLoading: false,
      groupObjectsCount: 0,
      onDeleteObjects: jest.fn(),
      getGroupDetails: jest.fn(),
      fetchGroupObjects: jest.fn(),
      mergedData: [],
      formatDateTime: jest.fn(),
      groups: [],
      categories: [],
      replaceUsersModalVisible: false,
      replaceUsersModalLoading: false,
      isReplaceUsersModalPristine: true,
      onDownload: jest.fn(),
      promotePubGroups: jest.fn(),
      replaceUsersModalCancel: jest.fn(),
      replaceUsersOnRemoteSubmit: jest.fn(),
      replaceUsers: jest.fn(),
      openReplaceUsersModal: jest.fn(),
      onSubmitReplaceUsers: jest.fn(),
      deleteGroup: jest.fn(),
      onUploadFile: jest.fn(),
    };
    const gridApi = {
      getSelectedRows: jest.fn(() => [{ id: 1 }]),
      deselectAll: jest.fn(),
      sizeColumnstoFit: jest.fn(),
    };
    beforeEach(() => {
      GroupDetails.prototype.gridApi = gridApi;
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });

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
        }))
      );
    });
  });
});
