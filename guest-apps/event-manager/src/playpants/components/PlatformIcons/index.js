import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { PlatformIcon } from 'dw/core/components';

import { projectColorsSelector } from './selectors';
import { DEFAULT_COLOR } from './constants';

export const PlatformIconsBase = ({ titles, projectColors }) =>
  titles.map(({ id, name, platform }) => {
    let color = DEFAULT_COLOR;
    projectColors.forEach(setting => {
      if (setting.title === id) {
        ({ color } = setting);
      }
    });
    return (
      <Tooltip title={name} key={name} TransitionComponent={Zoom}>
        <span>
          <PlatformIcon platform={platform} color={color} />
        </span>
      </Tooltip>
    );
  });

PlatformIconsBase.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.object).isRequired,
  projectColors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  projectColors: projectColorsSelector(state),
});

export default connect(mapStateToProps)(PlatformIconsBase);
