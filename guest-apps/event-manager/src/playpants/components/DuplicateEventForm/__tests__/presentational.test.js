import React from 'react';
import { shallow } from 'enzyme';
import { duplicateEventFormStatelessProps as props } from 'playpants/testUtils/eventProps';
import MenuItem from '@material-ui/core/MenuItem';
import DuplicateEventFormStateless from '../presentational';

describe('DuplicateEventFormStateless', () => {
  const wrapper = shallow(<DuplicateEventFormStateless {...props} />);
  it('renders default properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Environment select component', () => {
    it('properly renders available environments', () => {
      wrapper.setProps({ availableEnvs: ['Development', 'Certification'] });
      expect(
        wrapper.find('[name="formEnvironment"]').find(MenuItem)
      ).toHaveLength(2);
    });
    it('changes targetEnvironment', () => {
      wrapper.setProps({ targetEnvironment: 'Certification' });
      expect(wrapper.find('[name="formEnvironment"]').props().value).toBe(
        'Certification'
      );
    });
  });

  describe('Platforms select component', () => {
    const payload = ['PS4', 'XB1'];
    it('properly renders available platforms', () => {
      wrapper.setProps({ availablePlatforms: payload });
      expect(
        wrapper.find('[name="formPlatforms"]').find(MenuItem)
      ).toHaveLength(2);
    });
    it('changes targetPlatforms', () => {
      wrapper.setProps({ targetPlatforms: payload });
      expect(
        wrapper.find('[name="formPlatforms"]').props().value
      ).toMatchObject(payload);
    });
  });

  describe('DateTime component', () => {
    const payloadMinDate = 1000000000;
    const payloadMaxDate = 2000000000;
    it('properly sets minDate and maxDate', () => {
      wrapper.setProps({
        publishAtMinDate: payloadMinDate,
        publishAtMaxDate: payloadMaxDate,
      });
      expect(wrapper.find('[name="formDateTime"]').props().minDate).toBe(
        payloadMinDate
      );
      expect(wrapper.find('[name="formDateTime"]').props().maxDate).toBe(
        payloadMaxDate
      );
    });
  });
});
