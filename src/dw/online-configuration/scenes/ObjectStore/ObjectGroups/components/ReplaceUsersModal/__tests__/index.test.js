import React from 'react';
import { shallow } from 'enzyme';

import ReplaceUsersModal from '../index';
import Form from '../../ReplaceUsersForm';

jest.mock('@material-ui/core/DialogContent');

describe('CreateGroupModal', () => {
  let props;
  beforeEach(() => {
    props = {
      visible: true,
      loading: false,
      pristine: true,
      onCancel: jest.fn(),
      onRemoteSubmit: jest.fn(),
      onSubmit: jest.fn(),
    };
  });
  it('renders component', () => {
    expect(shallow(<ReplaceUsersModal {...props} />)).toMatchSnapshot();
  });

  it('renders a form', () => {
    const wrapper = shallow(<ReplaceUsersModal {...props} />);
    expect(wrapper.find(Form)).toBeDefined();
  });
});
