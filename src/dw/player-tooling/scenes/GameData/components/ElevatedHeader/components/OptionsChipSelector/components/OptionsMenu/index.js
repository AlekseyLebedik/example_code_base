import React from 'react';
import PropTypes from 'prop-types';

import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import styles from './index.module.css';

const OptionsMenu = ({
  anchorEl,
  handleClickAway,
  onSelectOption,
  open,
  optionGroups,
  selectedOptions,
}) => (
  <ClickAwayListener onClickAway={handleClickAway}>
    <Popper anchorEl={anchorEl} open={open} placement="bottom-start" transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <MenuList className={styles.menuList}>
              {optionGroups.map(({ groupLabel, options }) => (
                <span key={groupLabel}>
                  {groupLabel !== 'globals' && (
                    <MenuItem className={styles.groupLabel} disabled>
                      {groupLabel}
                    </MenuItem>
                  )}
                  {options.map(({ value, label }) => (
                    <MenuItem
                      key={`${groupLabel}-${value}`}
                      className={styles.menuItem}
                    >
                      <FormControlLabel
                        className={styles.menuCheckbox}
                        control={
                          <Checkbox
                            checked={selectedOptions[groupLabel]?.includes(
                              value
                            )}
                            onChange={() => onSelectOption(groupLabel, value)}
                            name={value}
                            color="primary"
                          />
                        }
                        label={label}
                      />
                    </MenuItem>
                  ))}
                </span>
              ))}
            </MenuList>
          </Paper>
        </Fade>
      )}
    </Popper>
  </ClickAwayListener>
);

OptionsMenu.propTypes = {
  anchorEl: PropTypes.object,
  handleClickAway: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  optionGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOptions: PropTypes.object.isRequired,
};
OptionsMenu.defaultProps = { anchorEl: null };

export default OptionsMenu;
