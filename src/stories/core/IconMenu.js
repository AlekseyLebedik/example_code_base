/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MenuItem from '@material-ui/core/MenuItem';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import IconMenu from 'dw/core/components/IconMenu';

storiesOf('core/IconMenu', module)
  .add('default', () => (
    <IconMenu icon="more_vert" tooltip="More Options">
      <MenuItem key="1">Item One</MenuItem>
      <MenuItem key="2">Item Two</MenuItem>
    </IconMenu>
  ))
  .add('Close on item click', () => (
    <IconMenu icon="more_vert" tooltip="More Options">
      {onClose => [
        <MenuItem
          key="1"
          onClick={e => {
            action('Item1 clicked')(e);
            onClose();
          }}
        >
          Item One
        </MenuItem>,
        <MenuItem
          key="2"
          onClick={e => {
            action('Item2 clicked')(e);
            onClose();
          }}
        >
          Item Two
        </MenuItem>,
      ]}
    </IconMenu>
  ))
  .add('Confirm', () => (
    <IconMenu icon="more_vert" tooltip="More Options">
      {onClose => [
        <MenuItem
          key="1"
          onClick={e => {
            action('Add item clicked')(e);
            onClose();
          }}
        >
          Add Item (no confirm)
        </MenuItem>,
        <ConfirmActionComponent
          key="2"
          component="MenuItem"
          onClick={e => {
            action('Delete item click confirmed')(e);
            onClose();
          }}
          confirm={{
            title: 'Confirm Delete',
            confirmMsg: 'Are you sure you want to delete Item?',
            destructive: true,
          }}
        >
          Delete Item (needs confirmation)
        </ConfirmActionComponent>,
      ]}
    </IconMenu>
  ));
