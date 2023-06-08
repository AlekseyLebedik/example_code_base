import React from 'react';
import { shallow } from 'enzyme';

import Fab from 'dw/__mocks__/@material-ui/Fab';
import MenuItem from 'dw/__mocks__/@material-ui/MenuItem';
import TextField from 'dw/__mocks__/@material-ui/TextField';
import UsersList from '../index';
import UsersTable from '../UsersTable';

const mockedUsers = [
  { email: 'admin@test.com', id: 1, name: 'Admin', username: 'admin' },
];
const availableUsers = [
  { email: 'admin@test.com', id: 1, name: 'Admin', username: 'admin' },
  {
    email: 'username@test.com',
    id: 2,
    name: 'User Name',
    username: 'username',
  },
];
const insertMock = jest.fn();

describe('Groups - UsersList component', () => {
  const props = {
    availableUsers,
    fields: {
      map: callback =>
        mockedUsers.map((user, idx) => callback(`user${idx}`, idx)),
      get: idx => availableUsers[idx],
      insert: insertMock,
      name: 'users',
      getAll: () => mockedUsers,
    },
    meta: { form: 'my-form' },
  };

  const root = shallow(
    <UsersList
      {...props}
      store={{
        subscribe: jest.fn(),
        dispatch: jest.fn(),
        getState: jest.fn(),
      }}
    />
  ).shallow();

  it('renders structure', () => {
    expect(root.find('AddUser')).toHaveLength(1);
    expect(root.find(UsersTable)).toHaveLength(1);
  });

  describe('AddUser component', () => {
    const addUser = root.find('AddUser').shallow();
    it('structure', () => {
      expect(addUser.find(TextField)).toHaveLength(1);
      const btn = addUser.find(Fab);
      expect(btn).toHaveLength(1);
      expect(btn.props().className).toBe('addUser');
    });

    it('props', () => {
      expect(root.find('AddUser').props()).toMatchObject({
        availableUsers: props.availableUsers,
        fields: props.fields,
        userInputComponent: undefined,
      });
    });

    it('add button disabled if nothing selected in user select', () => {
      const btn = addUser.find(Fab);
      expect(btn.props().disabled).toBeTruthy();
    });

    it('available user could be added to the list', () => {
      const instance = addUser.instance();
      instance.onSelectUser(availableUsers[0]);
      addUser.update();
      const btn = addUser.find(Fab);
      btn.props().onClick();
      expect(props.fields.insert).toBeCalledWith(0, availableUsers[0]);
    });

    it('users assigned to the group are not displayed in the available user list', () => {
      expect(addUser.find(MenuItem)).toHaveLength(1);
      expect(addUser.find(MenuItem).children().text()).toBe('User Name');
    });

    it('empty available user list', () => {
      const newProps = {
        ...props,
        availableUsers: [],
      };
      const wrapper = shallow(
        <UsersList
          {...newProps}
          store={{
            subscribe: jest.fn(),
            dispatch: jest.fn(),
            getState: jest.fn(),
          }}
        />
      ).shallow();
      const item = wrapper.find('AddUser').shallow().find(MenuItem);
      expect(item.props().disabled).toBe(true);
      expect(item.children().text()).toBe('No Users Available');
    });
  });

  describe('UsersTable', () => {
    it('renders empty component when no users in a group', () => {
      const newProps = {
        items: [],
        onChange: jest.fn(),
        onRemove: jest.fn(),
      };
      const usersTable = shallow(<UsersTable {...newProps} />);
      expect(usersTable.find('EmptyComponent')).toHaveLength(1);
    });

    it('renders users in the given group using AgGridReact', () => {
      const newProps = {
        items: mockedUsers,
        onChange: jest.fn(),
        onRemove: jest.fn(),
      };
      const usersTable = shallow(<UsersTable {...newProps} />).shallow();
      const grid = usersTable.find('AgGridReact');
      expect(grid).toHaveLength(1);
      expect(grid.props().rowData).toMatchObject(
        mockedUsers.map((user, idx) => ({ ...user, idx }))
      );
    });
  });
});
