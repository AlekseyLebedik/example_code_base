import React from 'react';
import { shallow } from 'enzyme';

import { templatesFieldProps as props } from 'playpants/testUtils/scheduleProps';

import TemplatesField from '../index';

describe('TemplatesField', () => {
  const wrapper = shallow(<TemplatesField {...props} />);

  it('renders default properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
