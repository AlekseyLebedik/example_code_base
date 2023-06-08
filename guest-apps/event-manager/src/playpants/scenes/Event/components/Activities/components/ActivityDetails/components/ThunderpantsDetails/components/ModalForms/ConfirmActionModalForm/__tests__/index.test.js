import React from 'react';
import { shallow } from 'enzyme';

import { thunderpantsConfirmActionModalForm as props } from 'playpants/testUtils/eventProps';
import { ConfirmActionModalFormBase } from '../index';

describe('ConfirmActionModalForm', () => {
  const root = shallow(<ConfirmActionModalFormBase {...props} />);
  it('renders default', () => {
    expect(root).toMatchSnapshot();
  });
});
