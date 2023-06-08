import React from 'react';
import { shallow } from 'enzyme';
import { groupListProps as props } from 'playpants/testUtils/projectSettingsProps';

import { GroupListBase } from '../index';

describe('GroupList', () => {
  const root = shallow(<GroupListBase {...props} />);

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

    it('should receive groups array as items prop', () => {
      expect(SearchableList.props().items).toBe(props.groupList);
    });

    it('should trigger action dispatch onSearch', () => {
      SearchableList.simulate('search');
      expect(props._onSearch).toHaveBeenCalled();
    });
  });
});
