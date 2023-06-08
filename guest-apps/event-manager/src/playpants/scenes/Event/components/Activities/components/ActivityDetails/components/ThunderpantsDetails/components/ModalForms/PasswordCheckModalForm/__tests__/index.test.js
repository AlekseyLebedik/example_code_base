import React from 'react';
import { shallow } from 'enzyme';

import { thunderpantsPasswordCheckModalForm as props } from 'playpants/testUtils/eventProps';
import { PasswordCheckModalFormBase } from '../index';

describe('PasswordCheckModalForm', () => {
  const root = shallow(<PasswordCheckModalFormBase {...props} />);
  it('renders default', () => {
    expect(root).toMatchSnapshot();
  });
});
