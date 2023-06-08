import React from 'react';
import { shallow } from 'enzyme';

import { achievementPropsStateless as props } from 'playpants/testUtils/eventProps';
// import KeyValue from 'dw/core/components/KeyValue';
// import UserInputComponent from 'dw/core/components/AutocompleteGeneral';
// import MainDetailsEmpty from 'playpants/components/MainDetailsEmpty';
import AchievementDetailsStateless from '../presentational';

describe('AchievementDetails presentational', () => {
  const wrapper = shallow(<AchievementDetailsStateless {...props} />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // it('renders no title overlay only if needed', () => {
  //   expect(wrapper.find(MainDetailsEmpty)).toHaveLength(0);
  //   wrapper.setProps({ noTitleSelected: true });
  //   expect(wrapper.find(MainDetailsEmpty)).toHaveLength(1);
  //   wrapper.setProps({ noTitleSelected: false });
  // });

  // it('renders summary of selected achievement', () => {
  //   expect(wrapper.find(KeyValue)).toHaveLength(1);
  // });

  // it('hides summary if no achievement is selected', () => {
  //   wrapper.setProps({ rulesetDetails: null });
  //   expect(wrapper.find(KeyValue)).toHaveLength(0);
  // });

  // it('value of Select component changes with rulesetToActivateLabel', () => {
  //   const label = 'stronghold-99';
  //   wrapper.setProps({ rulesetToActivateLabel: label });
  //   expect(wrapper.find(UserInputComponent).props().defaultValue).toEqual(
  //     label
  //   );
  // });

  // it('key values are those of the selected achievement', () => {
  //   const ruleset = {
  //     lastUpdateTimestamp: 1565842670,
  //     codeHash: '4mhdBfYBdYmeco1ve62h0b6rue8=',
  //     label: 'stronghold-0',
  //     codeSignature:
  //       'v/kWwu8MBe1GGSxK64a3OqKynmKpGJYGlylUMT0asJ+ZHiuonlDAl2igzISRqgMuPWJf/HqCxvAbxuAMxq+YCg==',
  //     activationTimestamp: null,
  //     creationTimestamp: 1565841881,
  //     isActive: false,
  //     codeSignatureTimestamp: 1565841881,
  //   };

  //   wrapper.setProps({ rulesetDetails: ruleset });
  //   expect(wrapper.find(KeyValue).props().item).toEqual(ruleset);
  // });
});
