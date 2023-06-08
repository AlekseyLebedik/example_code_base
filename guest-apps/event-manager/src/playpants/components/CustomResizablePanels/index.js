import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ResizablePanels from 'dw/core/components/ResizablePanels';
import muiStyles from './styles';
import styles from './index.module.css';

const CustomResizablePanels = props => {
  const resizeablePanelProps = {
    sizes: [
      {
        size: 360,
        max: 500,
      },
    ],
    classes: {
      resizer: classNames(props.classes.bgGrey, styles.resizer),
      panel: classNames(props.classes.bgGrey, styles.panel),
    },
    titles: props.titles,
  };

  return (
    <ResizablePanels {...resizeablePanelProps}>
      {props.children}
    </ResizablePanels>
  );
};

CustomResizablePanels.propTypes = {
  classes: PropTypes.object.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

CustomResizablePanels.defaultProps = {
  titles: '',
};

export default withStyles(muiStyles)(CustomResizablePanels);
