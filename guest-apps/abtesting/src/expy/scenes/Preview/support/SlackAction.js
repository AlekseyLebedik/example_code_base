import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import SlackIcon from '../../../icons/SlackIcon';
import Svg from '../../../components/Svg';

const options = ['Notify', 'Request Approval'];

const SlackButton = ({ className, onClick }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleMenuItemClick = ({ value }) => {
    setOpen(false);
    onClick({ value });
  };

  const handleToggle = () => setOpen(prevOpen => !prevOpen);

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Button
        className={className}
        variant="outlined"
        size="small"
        onClick={handleToggle}
        ref={anchorRef}
        startIcon={<Svg size="medium" icon={<SlackIcon />} />}
      >
        Request Approval
      </Button>
      <Popper
        style={{ zIndex: '2' }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={() =>
                        handleMenuItemClick({ value: option, index })
                      }
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

SlackButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

SlackButton.defaultProps = {
  className: undefined,
  onClick: undefined,
};

export default SlackButton;
