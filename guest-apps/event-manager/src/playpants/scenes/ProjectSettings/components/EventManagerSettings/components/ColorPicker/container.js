import React, { Component } from 'react';
import { connect } from 'react-redux';
import uniqBy from 'lodash/uniqBy';

import PropTypes from 'prop-types';
import { colorSettingsSelector } from 'playpants/components/App/selectors';
import { projectColorsSelector } from 'playpants/components/PlatformIcons/selectors';
import StatelessColorPicker from './presentational';

export class ColorPickerBase extends Component {
  static propTypes = {
    colorSettings: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectColors: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateProjectSetting: PropTypes.func.isRequired,
  };

  state = { open: false };

  handleRowSelection = (selectedTitle, selectedColor) => {
    this.setState({
      open: true,
      selectedTitle,
      selectedColor,
    });
  };

  handleChangeComplete = color => {
    this.setState({
      selectedColor: color.hex,
    });
  };

  handleAccept = () => {
    const { colorSettings, projectColors, updateProjectSetting } = this.props;
    const { selectedTitle, selectedColor } = this.state;
    const newColorSettings = projectColors.map(({ title, color }) =>
      title === selectedTitle
        ? { title, color: selectedColor }
        : { title, color }
    );
    updateProjectSetting(
      'color_settings',
      uniqBy([...newColorSettings, ...colorSettings], 'title')
    );
    this.setState({ open: false });
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <StatelessColorPicker
        {...this.props}
        {...this.state}
        handleRowSelection={this.handleRowSelection}
        handleChangeComplete={this.handleChangeComplete}
        handleAccept={this.handleAccept}
        handleCancel={this.handleCancel}
      />
    );
  }
}

const mapStateToProps = state => ({
  colorSettings: colorSettingsSelector(state),
  projectColors: projectColorsSelector(state),
});

export default connect(mapStateToProps)(ColorPickerBase);
