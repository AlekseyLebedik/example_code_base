import React from 'react';
import { shallow } from 'enzyme';

import UploadButton from '../index';

describe('UploadButton', () => {
  const props = {
    uploadDisabled: false,
    onFileUploadButton: jest.fn(),
  };

  const root = shallow(<UploadButton {...props} />);

  it('renders default props UploadButton', () => {
    expect(root).toMatchSnapshot();
  });

  it('renders disabled upload button', () => {
    root.setProps({ uploadDisabled: true });
    expect(root).toMatchSnapshot();
  });
});
