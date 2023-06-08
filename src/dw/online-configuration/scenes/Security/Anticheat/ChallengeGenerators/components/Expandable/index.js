import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';

import './index.css';

const initialState = props => ({
  expanded: props.expanded,
});

class Expandable extends Component {
  static propTypes = {
    children: PropTypes.node,
    // eslint-disable-next-line
    expanded: PropTypes.bool,
  };

  static defaultProps = {
    children: undefined,
    expanded: false,
  };

  state = initialState(this.props);

  onToggle = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  };

  render() {
    const icon = this.state.expanded ? 'expand_less' : 'more_horiz';
    const tooltip = this.state.expanded ? 'Show Less' : 'Show More';
    return (
      <div className={`common-expandable__container ${icon}`}>
        <span className="common-expandable__wrapper">
          {this.props.children}
        </span>
        <Tooltip title={tooltip}>
          <IconButton
            onClick={this.onToggle}
            className="common-expandable__button"
          >
            <Icon>{icon}</Icon>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default Expandable;
