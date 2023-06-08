import React from 'react';
import { shallow } from 'enzyme';

import UsersTable from '../index';

const mockedUsers = [
  { email: 'admin@test.com', id: 1, name: 'Admin', username: 'admin' },
];

describe('UsersTable', () => {
  it('renders empty component when no users in a group', () => {
    const newProps = {
      items: [],
      onChange: jest.fn(),
      onRemove: jest.fn(),
      onEdit: jest.fn(),
      onEditAll: jest.fn(),
    };
    const usersTable = shallow(<UsersTable {...newProps} />);
    expect(usersTable.find('EmptyComponent')).toHaveLength(1);
  });

  it('renders users in the given group using AgGridReact', () => {
    const newProps = {
      items: mockedUsers,
      onChange: jest.fn(),
      onRemove: jest.fn(),
      onEdit: jest.fn(),
      onEditAll: jest.fn(),
    };
    const usersTable = shallow(<UsersTable {...newProps} />).shallow();
    const grid = usersTable.find('AgGridReact');
    expect(grid).toHaveLength(1);
    expect(grid.props().rowData).toMatchObject(
      mockedUsers.map((user, idx) => ({ ...user, idx }))
    );
  });
});
