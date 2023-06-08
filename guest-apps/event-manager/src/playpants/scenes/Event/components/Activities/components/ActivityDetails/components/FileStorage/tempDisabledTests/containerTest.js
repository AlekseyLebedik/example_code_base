/* ---------------------------------------------------------------------------------------------------
TEMPORARILY DISABLE THIS TEST FILE UNTIL ENZYME IS UPDATED -- THEN WE CAN POTENTIALLY USE SHALLOW RENDERING 
------------------------------------------------------------------------------------------------------*/

/*
import React from 'react';
import { mount } from 'enzyme';
import createStore from 'playpants/store';

import { filestorageProps as props } from 'playpants/testUtils/eventProps';

import { FileStorage } from '../container';

const { activity } = props.selectedActivity;

describe('File Storage', () => {
  const { store } = createStore();
  const wrapper = mount(<FileStorage {...props} store={store} />);
  const instance = wrapper.instance();

  wrapper.setState({
    gridApi: {
      getRowNode: jest.fn().mockImplementation(() => ({
        setDataValue: jest.fn(),
      })),
      setColumnDefs: jest.fn(),
      sizeColumnsToFit: jest.fn(),
    },
    gridColumnApi: {
      setColumnVisible: jest.fn(),
    },
  });

  it('renders Default File Storage correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders file to table correctly when given one file', () => {
    wrapper.setProps({
      selectedActivity: {
        ...props.selectedActivity,
        activity: {
          files: [...activity.files],
        },
      },
      files: {
        [activity.files[0]]: {
          title: '',
          filename: 'test.txt',
          remoteFilename: 'test.txt',
          context: '1',
          comment: '',
          size: '5 bytes',
          progress: 0,
          download: false,
          'X-Progress-ID': 1563392198,
          id: 3,
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  describe('onDrop', () => {
    let spy;
    beforeEach(() => {
      instance.onDrop([
        new File(['test'], 'Newfile.txt', { lastModified: 1548547200 }),
      ]);
      spy = jest.spyOn(instance, 'onActivityUpdate');
    });

    it('should call uploadFile', () => {
      expect(props.uploadFile).toHaveBeenCalled();
    });
    it('should call onUpdate', () => {
      expect(spy).toHaveBeenCalled();
    });

    it('should set selectedActivity.activity.files with newest file id, and set files with newest file', () => {
      const newFile = {
        title: '',
        filename: 'newfile.txt',
        remoteFilename: 'newfile.txt',
        context: '1',
        comment: '',
        size: '7 bytes',
        progress: 0,
        download: false,
        'X-Progress-ID': 1563393000,
        id: 4,
      };
      const { fileDetails } = props.uploadFile();
      wrapper.setProps({
        files: { ...props.files, [fileDetails.id]: fileDetails },
        selectedActivity: {
          ...props.selectedActivity,
          activity: {
            files: [...props.selectedActivity.activity.files, fileDetails.id],
          },
        },
      });

      expect(wrapper.props().selectedActivity.activity.files[1]).toEqual(4);
      expect(wrapper.props().files['4']).toEqual(newFile);
    });

    it('should render newest file to table', () => {
      expect(instance).toMatchSnapshot();
    });
  });

  describe('onSaveCell', () => {
    let testEvent;
    beforeEach(() => {
      testEvent = {
        newValue: 'hello.txt',
        data: {
          index: 0,
        },
        colDef: {
          field: 'remoteFilename',
        },
      };

      instance.onSaveCell(testEvent);
    });

    it('should set remoteFilename of first file of selectedActivity to new value', () => {
      expect(instance.props.files['3'].remoteFilename).toBe(testEvent.newValue);
    });

    it('should call updateFile', () => {
      expect(props.updateFile).toHaveBeenCalled();
    });

    it('should call onUpdate', () => {
      expect(props.onUpdate).toHaveBeenCalled();
    });
  });

  describe('onDownloadFile', () => {
    beforeEach(() => {
      const gridApi = {
        getRowNode: jest.fn(() => ({
          data: { download: false },
          setDataValue: jest.fn(),
        })),
      };

      const e = {
        data: {
          index: 0,
        },
      };

      wrapper.setState({
        gridApi,
      });

      instance.onDownloadFile(e);
    });

    it('should download first file of selectedActivity', () => {
      expect(props.files['3'].download).toBe(false);
    });

    it('should call downloadFile', () => {
      expect(instance.props.downloadFile).toHaveBeenCalled();
    });
  });

  describe('onRemoveFile', () => {
    beforeEach(() => {
      instance.onRemoveFile({
        data: {
          index: 0,
        },
      });
    });

    it('should remove first file in selectedActivity', () => {
      expect(props.selectedActivity.activity.files[0]).toBe(undefined);
    });

    it('should call removeFile', () => {
      expect(props.removeFile).toHaveBeenCalled();
    });

    it('should call onUpdate', () => {
      expect(props.onUpdate).toHaveBeenCalled();
    });
  });
});
*/
