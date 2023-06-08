import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IconMenu from 'dw/core/components/IconMenu';
import MenuItem from '@material-ui/core/MenuItem';

import { duplicateActivity } from 'playpants/scenes/Event/components/Activities/actions';

export const DuplicateBase = ({ dupActivity, selectedActivity, titles }) => {
  const leftOverTitles = titles.filter(
    title => !selectedActivity.title_envs.includes(title.id)
  );
  return (
    leftOverTitles.length > 0 && (
      <IconMenu
        icon="file_copy"
        tooltip="Duplicate Activity to a Title"
        ButtonProps={{ color: 'primary' }}
      >
        {onClose =>
          leftOverTitles.map(title => (
            <MenuItem
              key={title.name}
              onClick={() => {
                dupActivity(selectedActivity, title.id);
                onClose();
              }}
            >
              {title.name}
            </MenuItem>
          ))
        }
      </IconMenu>
    )
  );
};

DuplicateBase.propTypes = {
  dupActivity: PropTypes.func.isRequired,
  selectedActivity: PropTypes.object.isRequired,
  titles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => ({
  dupActivity: bindActionCreators(duplicateActivity, dispatch),
});

export default connect(null, mapDispatchToProps)(DuplicateBase);
