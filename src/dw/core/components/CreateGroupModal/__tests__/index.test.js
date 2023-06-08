import React from 'react';
import { shallow } from 'enzyme';

import CreateGroupModal from '../index';

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
      Component: jest.fn(),
    };
  });
  it('renders component', () => {
    expect(shallow(<CreateGroupModal {...props} />)).toMatchSnapshot();
  });
});
