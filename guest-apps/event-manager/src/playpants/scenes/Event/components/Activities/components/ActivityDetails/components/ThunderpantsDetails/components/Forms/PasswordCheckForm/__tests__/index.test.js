import React from 'react';
import { shallow } from 'enzyme';

import { thunderpantsPasswordCheckForm as props } from 'playpants/testUtils/eventProps';
import { PasswordCheckFormBase } from '../index';

describe('PasswordCheckForm', () => {
  const root = shallow(<PasswordCheckFormBase {...props} />);
  it('renders default', () => {
    expect(root).toMatchSnapshot();
  });
});
