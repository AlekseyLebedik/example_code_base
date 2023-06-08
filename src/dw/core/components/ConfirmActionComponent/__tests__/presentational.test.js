import React from 'react';
import { shallow } from 'enzyme';

import IconButton from 'dw/__mocks__/@material-ui/IconButton';
import Switch from '@material-ui/core/Switch';

import ConfirmActionStateless from '../presentational';

describe('ConfirmActionStateless', () => {
  it('does not render ConfirmDialog when isOpen is false', () => {
    const props = {
      isOpen: false,
      component: IconButton,
      confirm: {
        title: 'Confirm Delete',
        confirmMsg: 'Are you sure you want to delete the item?',
      },
      children: ['delete'],
      closeConfirm: jest.fn(),
      handleConfirm: jest.fn(),
    };
    expect(shallow(<ConfirmActionStateless {...props} />)).toMatchSnapshot();
  });

  it('renders Switch component', () => {
    const props = {
      isOpen: false,
      component: Switch,
      checked: true,
      confirm: {
        title: 'Confirm Disable',
        confirmMsg: 'Are you sure you want to disable the item?',
      },
      onChange: jest.fn(),
      closeConfirm: jest.fn(),
      handleConfirm: jest.fn(),
    };
    expect(shallow(<ConfirmActionStateless {...props} />)).toMatchSnapshot();
  });

  it('renders Tooltip when tooltipProps provided', () => {
    const props = {
      isOpen: false,
      component: IconButton,
      confirm: {
        title: 'Confirm Delete',
        confirmMsg: 'Are you sure you want to delete the item?',
      },
      tooltipProps: {
        title: 'Delete',
        placement: 'bottom-end',
      },
      children: ['delete'],
      closeConfirm: jest.fn(),
      handleConfirm: jest.fn(),
    };
    expect(shallow(<ConfirmActionStateless {...props} />)).toMatchSnapshot();
  });

  it('renders ConfirmDialog when isOpen is true', () => {
    const props = {
      isOpen: true,
      component: IconButton,
      confirm: {
        title: 'Confirm Delete',
        confirmMsg: 'Are you sure you want to delete the item?',
      },
      children: ['delete'],
      closeConfirm: jest.fn(),
      handleConfirm: jest.fn(),
    };
    expect(shallow(<ConfirmActionStateless {...props} />)).toMatchSnapshot();
  });

  it('renders custom component', () => {
    const props = {
      isOpen: false,
      component: 'a',
      confirm: {
        title: 'Confirm Disable',
        confirmMsg: 'Are you sure you want to disable the item?',
      },
      onClick: jest.fn(),
      closeConfirm: jest.fn(),
      handleConfirm: jest.fn(),
    };
    expect(shallow(<ConfirmActionStateless {...props} />)).toMatchSnapshot();
  });

  it('could be disabled with disabled prop', () => {
    const props = {
      isOpen: false,
      component: IconButton,
      children: ['delete'],
      closeConfirm: jest.fn(),
      handleConfirm: jest.fn(),
      disabled: true,
    };
    expect(shallow(<ConfirmActionStateless {...props} />)).toMatchSnapshot();
  });

  it('renders ConfirmDialog with checkedOption when isOpen is true', () => {
    const props = {
      isOpen: true,
      component: IconButton,
      confirm: {
        title: 'Confirm Delete',
        confirmMsg: 'Are you sure you want to delete the item?',
        checkedOption: {
          label: 'Delete all subitems.',
          defaultChecked: true,
          visible: () => true,
        },
      },
      children: ['delete'],
      closeConfirm: jest.fn(),
      handleConfirm: jest.fn(),
    };
    expect(shallow(<ConfirmActionStateless {...props} />)).toMatchSnapshot();
  });
});
