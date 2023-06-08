import React from 'react';
import { shallow } from 'enzyme';
import { customDrawerDropzoneProps } from 'playpants/testUtils/components/customDrawerDropzoneProps';
import { CustomDrawerDropzoneBase } from '../index';

describe('CustomDrawerDropzone', () => {
  const root = shallow(
    <CustomDrawerDropzoneBase {...customDrawerDropzoneProps} />
  );
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
