import React from 'react';
import { shallow } from 'enzyme';

import MainDetailsEmpty from 'playpants/components/MainDetailsEmpty';
import { filestorageStatelessProps as props } from 'playpants/testUtils/eventProps';

import FileStorageStateless from '../presentational';

describe('FileStorageStateless', () => {
  const wrapper = shallow(<FileStorageStateless {...props} />);

  it('renders stateless filestorage correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders no title overlay only if needed', () => {
    expect(wrapper.find(MainDetailsEmpty)).toHaveLength(0);
    wrapper.setProps({ noTitleSelected: true });
    expect(wrapper.find(MainDetailsEmpty)).toHaveLength(1);
    wrapper.setProps({ noTitleSelected: false });
  });

  it('renders disabled upload properly', () => {
    wrapper.setProps({
      uploadDisabled: true,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders more files', () => {
    wrapper.setProps({
      getCollection: jest.fn().mockImplementation(() => [
        {
          title: 'File Title',
          filename: 'test.txt',
          remoteFilename: 'doubleXp.txt',
          context: '1',
          size: 314535,
          comment: 'we have no comment',
          progress: 0,
          download: false,
          delete: undefined,
          index: 0,
        },
        {
          title: 'File Title 2',
          filename: 'test2.txt',
          remoteFilename: 'doubleXp2.txt',
          context: '1',
          size: 314533453455,
          comment: 'we have no comment, yeah we do',
          progress: 50,
          download: false,
          delete: undefined,
          index: 1,
        },
      ]),
    });
    expect(wrapper).toMatchSnapshot();
  });
});
