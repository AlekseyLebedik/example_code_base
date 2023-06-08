import React from 'react';
import { shallow } from 'enzyme';

import Details from '../presentational';
import { GROUP_TAB, ADVANCED_TAB, FEATURE_FLAGS_TAB } from '../../../constants';

describe('Users - Details component', () => {
  const props = {
    selectedItem: { id: 5, username: 'admin' },
    selectedTab: GROUP_TAB,
    onTabChange: jest.fn(),
    addUserToGroup: jest.fn(),
    groups: [],
    formAdvanced: '',
    formGroups: '',
    initialValuesAdvancedUsers: {},
    initialValuesPermGroups: {},
  };

  const root = shallow(<Details {...props} />);

  it('renders tabs structure', () => {
    expect(
      root.find('WithStyles(TabsComponent)').children().at(0).props().label
    ).toBe('Companies / Groups');
    expect(
      root.find('WithStyles(TabsComponent)').children().at(1).props().label
    ).toBe(ADVANCED_TAB);
    expect(
      root.find('WithStyles(TabsComponent)').children().at(2).props().label
    ).toBe(FEATURE_FLAGS_TAB);
  });

  it('group tab should be selected', () => {
    expect(root.find('WithStyles(TabsComponent)').props().value).toBe(
      GROUP_TAB
    );
  });
});
