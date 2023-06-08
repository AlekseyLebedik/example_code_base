import React from 'react';
import { shallow } from 'enzyme';
import { userListProps as props } from 'playpants/testUtils/projectSettingsProps';

import { UserListBase } from '../index';

describe('UserList', () => {
  const root = shallow(<UserListBase {...props} />);

  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });

  describe('SectionTitle', () => {
    it('should always render', () => {
      expect(root.exists('WithStyles(SectionTitle)')).toBe(true);
    });
  });

  describe('SearchableList', () => {
    const SearchableList = root.find('SearchableList');
    it('should always render', () => {
      expect(SearchableList).toMatchSnapshot();
    });

    it('should receive users array as items prop', () => {
      expect(SearchableList.props().items).toBe(props.userList);
    });

    it('should trigger action dispatch onSearch', () => {
      SearchableList.simulate('search');
      expect(props.onSearch).toHaveBeenCalled();
    });
  });
});
