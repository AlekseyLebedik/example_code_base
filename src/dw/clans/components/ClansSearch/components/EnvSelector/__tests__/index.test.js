import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

import EnvSelector from '../index';

describe('Clans - EnvSelector', () => {
  it('renders with no props', () => {
    act(() => {
      const wrapper = shallow(<EnvSelector />);
      expect(wrapper.find('SelectField')).toMatchSnapshot();
    });
  });
});
