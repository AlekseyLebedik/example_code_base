import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change as changeAction } from 'redux-form';

import Select from 'dw/core/components/FormFields/Select';
import { optionsSelector, formatOptions } from 'dw/core/helpers/selectors';

import PermissionListModal from '../PermissionListModal';

class PermissionSelect extends React.Component {
  state = {
    isPermissionModalOpen: false,
  };

  closePermissionModal = () => this.setState({ isPermissionModalOpen: false });

  openPermissionModal = () => this.setState({ isPermissionModalOpen: true });

  changePermissions = permissions => {
    this.closePermissionModal();
    const {
      meta: { form },
      input: { name },
      change,
    } = this.props;
    change(form, name, permissions);
  };

  render() {
    const { options, change, ...props } = this.props;
    const formattedOptions = optionsSelector(formatOptions(options), {
      groupBy: 'group',
      value: 'id',
      label: 'name',
    });
    return (
      <>
        <Select
          {...props}
          SelectProps={{ open: false, onOpen: () => {} }}
          onClick={this.openPermissionModal}
          options={formattedOptions}
        />
        {this.state.isPermissionModalOpen && (
          <PermissionListModal
            visible
            name={props.input.name}
            onSubmit={this.changePermissions}
            onCancel={this.closePermissionModal}
            options={formattedOptions}
            selectedOptions={this.props.input.value}
          />
        )}
      </>
    );
  }
}

PermissionSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  change: PropTypes.func.isRequired,
};

PermissionSelect.defaultProps = {
  meta: {},
};

export default connect(null, { change: changeAction })(PermissionSelect);
