import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import classNames from 'classnames';
import range from 'lodash/range';
import Downshift from 'downshift';

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

import styles from './index.module.css';

const IconBtn = ({ tooltip, icon, onClick }) => (
  <Tooltip title={tooltip}>
    <IconButton onClick={onClick}>
      <Icon fontSize="small">{icon}</Icon>
    </IconButton>
  </Tooltip>
);

IconBtn.propTypes = {
  tooltip: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Select = ({ selected, onClick, classes }) => (
  <div onClick={onClick} className={classNames(styles.select, classes.select)}>
    {selected}
  </div>
);

Select.propTypes = {
  selected: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

const SelectStyled = withStyles(() => ({
  select: {
    color: teal['500'],
  },
}))(Select);

const Toolbar = ({
  currentDate,
  backMonthHandler,
  forwardMonthHandler,
  changeMonthHandler,
  changeYearHandler,
}) => {
  const currentMonth = currentDate.format('MMMM');
  const currentYear = currentDate.year();

  return (
    <div className={styles.toolbarContainer}>
      <IconBtn
        tooltip="Go Back a Month"
        icon="keyboard_arrow_left"
        onClick={backMonthHandler}
      />
      <div className={styles.selectContainer}>
        <Downshift selectedItem={currentMonth}>
          {({ isOpen, selectedItem, toggleMenu, closeMenu }) => (
            <div styles={styles.downshiftContainer}>
              <SelectStyled onClick={toggleMenu} selected={selectedItem} />
              {isOpen ? (
                <Paper square className={styles.paper}>
                  {moment.months().map(month => (
                    <MenuItem
                      key={month}
                      selected={month === selectedItem}
                      onClick={e => {
                        changeMonthHandler(e.target.textContent);
                        closeMenu();
                      }}
                      className={styles.item}
                    >
                      {month}
                    </MenuItem>
                  ))}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
        <Downshift selectedItem={currentYear}>
          {({ isOpen, selectedItem, toggleMenu, closeMenu }) => (
            <div styles={styles.downshiftContainer}>
              <SelectStyled onClick={toggleMenu} selected={selectedItem} />
              {isOpen ? (
                <Paper square className={styles.paper}>
                  {range(currentYear - 2, currentYear + 5).map(year => (
                    <MenuItem
                      key={year}
                      selected={year === selectedItem}
                      onClick={e => {
                        changeYearHandler(e.target.textContent);
                        closeMenu();
                      }}
                      className={styles.item}
                    >
                      {year}
                    </MenuItem>
                  ))}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
      </div>
      <IconBtn
        tooltip="Go Forward a Month"
        icon="keyboard_arrow_right"
        onClick={forwardMonthHandler}
      />
    </div>
  );
};

Toolbar.propTypes = {
  currentDate: PropTypes.object.isRequired,
  backMonthHandler: PropTypes.func.isRequired,
  forwardMonthHandler: PropTypes.func.isRequired,
  changeMonthHandler: PropTypes.func.isRequired,
  changeYearHandler: PropTypes.func.isRequired,
};

export default Toolbar;
