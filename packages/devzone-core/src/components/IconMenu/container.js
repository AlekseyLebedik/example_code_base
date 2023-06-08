import React, { Component } from 'react';

import IconMenuStateless from './presentational';

class IconMenu extends Component {
  state = { menuAnchorEl: null };

  toggleMenu = menuAnchorEl => this.setState({ menuAnchorEl });

  render() {
    return (
      <IconMenuStateless
        {...this.props}
        menuAnchorEl={this.state.menuAnchorEl}
        toggleMenu={this.toggleMenu}
      />
    );
  }
}

export default IconMenu;
