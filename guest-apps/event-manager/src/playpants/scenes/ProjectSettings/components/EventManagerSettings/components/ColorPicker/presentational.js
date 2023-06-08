import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';

import { PhotoshopPicker } from 'react-color';
import { PlatformIcon } from 'dw/core/components';
import { ICONS } from 'playpants/scenes/ProjectSettings/constants';

import styles from './index.module.css';

const StatelessColorPicker = props => {
  const {
    projectColors,
    handleRowSelection,
    open,
    selectedColor,
    handleChangeComplete,
    handleAccept,
    handleCancel,
  } = props;

  return (
    <div className={styles.ColorSettingsContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project Stage</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Icons</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectColors.map(({ title, name, color }) => (
            <TableRow
              key={title}
              hover
              onClick={() => handleRowSelection(title, color)}
            >
              <TableCell>{name}</TableCell>
              <TableCell>
                <span
                  className={styles.colorPreview}
                  style={{
                    background: color,
                  }}
                />
                {color}
              </TableCell>
              <TableCell>
                {ICONS.map(icon => (
                  <Tooltip title={icon} key={`${name}/${icon}`}>
                    <span>
                      <PlatformIcon platform={icon} color={color} size={24} />
                    </span>
                  </Tooltip>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        onBackdropClick={handleCancel}
        onEscapeKeyDown={handleCancel}
        open={open}
      >
        <PhotoshopPicker
          color={selectedColor}
          onChangeComplete={handleChangeComplete}
          onAccept={handleAccept}
          onCancel={handleCancel}
        />
      </Dialog>
    </div>
  );
};

StatelessColorPicker.propTypes = {
  projectColors: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChangeComplete: PropTypes.func.isRequired,
  handleRowSelection: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedColor: PropTypes.string,
};
StatelessColorPicker.defaultProps = {
  selectedColor: null,
};

export default StatelessColorPicker;
