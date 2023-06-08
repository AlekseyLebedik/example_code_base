import React from 'react';
import { string, oneOf, node } from 'prop-types';
import cn from 'classnames';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useStyles } from './styles';

const Svg = ({ icon, size, color, className, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon {...rest} className={cn(className, classes[color], classes[size])}>
      {icon}
    </SvgIcon>
  );
};

Svg.propTypes = {
  icon: node.isRequired,
  size: oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'illustration']),
  color: string,
  className: string,
};

Svg.defaultProps = {
  className: '',
  size: 'small',
  color: 'primary',
};

export default Svg;
