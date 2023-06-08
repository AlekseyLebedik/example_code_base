import React from 'react';
import { mount } from 'enzyme';
import createStore from 'playpants/store';
import { uploadFileProps as props } from 'playpants/testUtils/eventProps';
import UploadFile from '../container';

describe('UploadFile', () => {
  const { store } = createStore();
  const wrapper = mount(<UploadFile {...props} store={store} />);

  it('initial rendering', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // TESTS to be moved from FileStorage container and enabled here when enzyme is updated

  // const instance = wrapper.instance();

  // describe('onDrop', () => {
  //   it('calls the appropriate api functions', () => {
  //      instance.onDrop({ name: 'file' });
  //     expect(props.uploadFileAction).toHaveBeenCalled();
  //   });
  // });

  // describe('progressTimer', () => {
  //   it('progress of file upload', () => {
  //     instance.progressTimer(20);
  //   });
  // });

  // describe('uploadFile', () => {
  //   const spy = jest.spyOn(instance, 'progressTimer');
  //   instance.uploadFile({ name: 'file' });
  //   expect(spy).toHaveBeenCalled();
  //   expect(props.uploadFileAction).toHaveBeenCalled();
  // });
});
