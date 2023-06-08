import React from 'react';
import { shallow } from 'enzyme';
import { statelessColorPickerProps as props } from 'playpants/testUtils/projectSettingsProps';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Dialog from '@material-ui/core/Dialog';

import StatelessColorPicker from '../presentational';

describe('StatelessColorPicker', () => {
  const root = shallow(<StatelessColorPicker {...props} />);

  it('renders correctly', () => {
    expect(root).toMatchSnapshot();
  });

  describe('Table', () => {
    const renderedTable = root.find(Table);
    it('should always render', () => {
      expect(renderedTable).toMatchSnapshot();
    });

    describe('TableHead', () => {
      const renderedTableHead = renderedTable.find(TableHead);
      it('should always render', () => {
        expect(renderedTableHead).toMatchSnapshot();
      });

      it('should only have one row', () => {
        expect(renderedTableHead.children).toHaveLength(1);
      });
    });

    describe('TableBody', () => {
      const renderedTableBody = renderedTable.find(TableBody);
      it('should always render', () => {
        expect(renderedTableBody).toMatchSnapshot();
      });
      it('should have equal rows to projectColors length', () => {
        expect(renderedTableBody.children()).toHaveLength(
          props.projectColors.length
        );
      });
    });
  });

  describe('Dialog', () => {
    const renderedDialog = root.find(Dialog);
    it('should always render', () => {
      expect(renderedDialog).toMatchSnapshot();
    });

    it('should be closed by default', () => {
      expect(renderedDialog.props().open).toBe(false);
    });

    describe('ColorPicker', () => {
      const ColorPicker = renderedDialog.find('ColorPicker');
      it('should always render', () => {
        expect(ColorPicker).toMatchSnapshot();
      });

      it('should handleAccept on accept color change', () => {
        const spy = jest.spyOn(props, 'handleAccept');
        ColorPicker.prop('onAccept')(jest.fn());
        expect(spy).toHaveBeenCalled();
      });

      it('should handleCancel on cancel color change', () => {
        const spy = jest.spyOn(props, 'handleCancel');
        ColorPicker.prop('onCancel')(jest.fn());
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
