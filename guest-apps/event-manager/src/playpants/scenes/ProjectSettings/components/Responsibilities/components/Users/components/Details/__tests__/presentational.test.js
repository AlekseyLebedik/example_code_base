import React from 'react';
import { shallow } from 'enzyme';
import { userDetailsProps as props } from 'playpants/testUtils/projectSettingsProps';
import { GROUP_TAB, ADVANCED_TAB } from '../constants';
import Details from '../presentational';

describe('User Details', () => {
  const root = shallow(<Details {...props} />);

  it('renders correctly', () => {
    expect(root).toMatchSnapshot();
  });

  it('renders tabs structure', () => {
    expect(
      root.find('WithStyles(TabsComponent)').children().at(0).props().label
    ).toBe(GROUP_TAB);
    expect(
      root.find('WithStyles(TabsComponent)').children().at(1).props().label
    ).toBe(ADVANCED_TAB);
  });

  it('group tab should be selected', () => {
    expect(root.find('WithStyles(TabsComponent)').props().value).toBe(
      GROUP_TAB
    );
  });
});
