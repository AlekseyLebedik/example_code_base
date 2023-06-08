import React from 'react';
import { shallow } from 'enzyme';

import FileUploadStateless from '../presentational';

describe('PyScript FileUploadStateless', () => {
  const props = {
    label: 'test',
    handleChange: jest.fn(),
    value: {},
    handleDelete: jest.fn(),
    uploadProps: {
      input: { value: '', onChange: jest.fn() },
      meta: { touched: true, error: false },
      buttonProps: { color: 'primary' },
    },
  };

  const newRoot = shallow(<FileUploadStateless {...props} />);
  props.value = { file: { name: 'screenshot', size: 5000 } };
  const root = shallow(<FileUploadStateless {...props} />);

  it('renders the component correctly if no value received', () => {
    expect(newRoot).toMatchSnapshot();
  });

  it('renders the component correctly if value received', () => {
    expect(root).toMatchSnapshot();
  });
});
