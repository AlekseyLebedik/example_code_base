import React from 'react';
import { shallow } from 'enzyme';

import { formatFileSize } from 'dw/core/helpers/formatters';
import { MAX_FILE_SIZE } from '../../../constants';

import FileUpload from '../container';

describe('PyScripts FileUpload', () => {
  const props = {
    data: {
      id: 'double_xp',
      inputs: [
        { key: 'attachments', value: [{ file: { name: 'testDuplicate' } }] },
      ],
    },
    label: 'test',
    handleChange: jest.fn(),
    value: {},
    handleDelete: jest.fn(),
    uniqueItems: true,
  };

  const stateSpy = jest.spyOn(FileUpload.prototype, 'setState');
  const root = shallow(<FileUpload {...props} />);

  it('renders the container component correctly', () => {
    expect(root).toMatchSnapshot();
  });

  describe('handleSubmit', () => {
    const e = {
      file: { name: 'screenshot', size: 5000 },
      base64: 'laisdhjfioawehj',
    };
    beforeEach(() => {
      root.instance().handleSubmit(e);
    });

    it('should call handleChange if no errors', () => {
      expect(props.handleChange).toHaveBeenCalled();
    });
  });

  describe('validate', () => {
    const e = {
      target: {
        name: 'attachments 1',
        value: {
          file: {
            name: 'screenshot',
            size: 5000,
          },
          base64: 'laisdhjfioawehj',
        },
      },
    };

    it('should set an error if the file is too big', () => {
      e.target.value.file.size = 50000000;
      root.instance().validate(e);
      expect(stateSpy).toHaveBeenCalledWith({
        error: true,
        errorMessage: `Max file size is ${formatFileSize(MAX_FILE_SIZE)}`,
      });
    });

    it('should set an error if the file is not unique', () => {
      e.target.value.file.name = 'testDuplicate';
      root.instance().validate(e);
      expect(stateSpy).toHaveBeenCalledWith({
        error: true,
        errorMessage: `Files must be unique`,
      });
    });
  });
});
