import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';

import aw from '@demonware/devzone-core/themes/projects/aw.svg';
import ghosts from '@demonware/devzone-core/themes/projects/ghosts.svg';
import iw from '@demonware/devzone-core/themes/projects/iw.svg';
import mw from '@demonware/devzone-core/themes/projects/mw.svg';
import ops2 from '@demonware/devzone-core/themes/projects/ops2.svg';
import ops3 from '@demonware/devzone-core/themes/projects/ops3.svg';
import t8 from '@demonware/devzone-core/themes/projects/t8.svg';
import ww2 from '@demonware/devzone-core/themes/projects/ww2.svg';

import '@demonware/devzone-core/themes/PlatformIcons';
import '@demonware/devzone-core/themes/PlatformIcons/style.css';
import styles from './index.module.css';

const decidePlatformIcon = platform => {
  switch (platform ? platform.toLowerCase() : '') {
    case 'crossplay':
      return 'icon-Crossplay-logo';
    case 'psp':
    case 'psp2':
    case 'psn':
    case 'ps2':
    case 'ps3':
    case 'ps4':
    case 'ps5':
      return 'icon-PS-logo';
    case 'xbl':
    case 'xb1':
    case 'xbox':
    case 'xbox360':
    case 'xbox one':
    case 'xbsx':
      return 'icon-Xbox-logo';
    case 'switch':
      return 'icon-Switch-logo';
    case 'pc':
      return 'icon-PC-logo';
    case 'steam':
    case 'pc-steam':
      return 'icon-Steam-logo';
    case 'wii-u':
      return 'icon-WiiU-logo';
    case 'wii':
      return 'icon-Wii-logo';
    case 'bnet':
    case 'battle':
    case 'pc-bnet':
      return 'icon-Bnet-logo';
    default:
      return null;
  }
};

const decideAltIcon = platform => {
  switch (platform ? platform.toLowerCase() : '') {
    case 'android':
      return 'android';
    case 'iphone':
      return 'phone_iphone';
    case 'mobile':
      return 'phone_android';
    default:
      return 'videogame_asset';
  }
};

const PlatformIcon = ({ platform, size, color, className }) => {
  let icon = null;
  let platformIcon = decidePlatformIcon(platform);
  const style = {};
  if (size) style.fontSize = size;
  if (color) style.color = color;
  if (platformIcon) {
    icon = (
      <span
        className={classNames(platformIcon, className, styles.platformIcon, {
          [styles.smaller]: ['Wii-U'].includes(platform),
        })}
        style={style}
      />
    );
  } else {
    platformIcon = decideAltIcon(platform);
    icon = (
      <Icon
        className={classNames(className, styles.platformIcon)}
        style={style}
      >
        {platformIcon}
      </Icon>
    );
  }
  return icon;
};

PlatformIcon.propTypes = {
  platform: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

PlatformIcon.defaultProps = {
  platform: null,
  size: undefined,
  color: undefined,
  className: '',
};

const decideProjectImg = platform => {
  switch (platform ? platform.toLowerCase() : '') {
    case 'aw':
      return aw;
    case 'ghosts':
      return ghosts;
    case 'iw':
    case 'iw8':
      return iw;
    case 'mw':
    case 'cod4':
    case 'mw2':
    case 'mw2r':
    case 'mw3':
    case 'mwr':
      return mw;
    case 'ops2':
      return ops2;
    case 'ops3':
      return ops3;
    case 't8':
      return t8;
    case 'ww2':
    case 's2':
      return ww2;
    default:
      return null;
  }
};

const ProjectIcon = ({ name, size, className }) => {
  const style = {};
  if (size) {
    style.width = size;
    style.height = size;
  }
  const img = decideProjectImg(name);
  return img ? (
    <img
      src={img}
      alt={name}
      className={classNames(className, styles.projectIcon, {
        [styles.smaller]: ['ops2', 'ops3'].includes(name.toLowerCase()),
        [styles.bigger]: ['ww2', 's2'].includes(name.toLowerCase()),
      })}
      style={style}
    />
  ) : (
    <span
      className={classNames(styles.letterAvatar, {
        [styles.condensed]: name.length > 2,
      })}
    >
      {name.toUpperCase().substring(0, 4)}
    </span>
  );
};

ProjectIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

ProjectIcon.defaultProps = {
  size: undefined,
  className: '',
};

export { PlatformIcon, ProjectIcon };
