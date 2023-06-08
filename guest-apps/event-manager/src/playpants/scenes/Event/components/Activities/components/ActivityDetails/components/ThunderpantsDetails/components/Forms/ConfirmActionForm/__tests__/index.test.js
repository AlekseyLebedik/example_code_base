import React from 'react';
import { shallow } from 'enzyme';

import { thunderpantsConfirmActionForm as props } from 'playpants/testUtils/eventProps';
import { ConfirmActionFormBase } from '../index';

describe('ConfirmActionForm', () => {
  const root = shallow(<ConfirmActionFormBase {...props} />);
  it('renders default', () => {
    expect(root).toMatchSnapshot();
  });
});
