import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { difference, intersection, pull } from 'lodash';
import classNames from 'classnames';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Search from 'dw/core/components/Search';
import { hasData } from 'dw/core/helpers/object';

import styles from './index.module.css';

const RenderTitle = ({ onSearch }) => (
  <>
    Select Permissions
    <Search placeholder="search permissions" onSearch={onSearch} size="large" />
  </>
);

RenderTitle.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

class PermissionListModal extends Component {
  state = {
    selectedPermissions: this.props.selectedOptions,
    options: this.props.options,
    collapsed: [],
  };

  onSearch = payload => {
    const { q } = payload;
    const { options: allOptions } = this.props;
    const result = [];
    Object.entries(allOptions).forEach(option => {
      const { label, options } = option[1];
      if (label.toLowerCase().includes(q.toLowerCase())) {
        result.push({ label, options });
      } else {
        const filteredOptions = options.filter(o =>
          o.label.toLowerCase().includes(q.toLowerCase())
        );
        if (hasData(filteredOptions)) {
          result.push({ label, options: filteredOptions });
        }
      }
    });
    this.setState({ options: result });
  };

  onToggle = label => () =>
    this.setState(prevState => {
      const { collapsed } = prevState;
      if (collapsed.includes(label)) {
        pull(collapsed, label);
      } else {
        collapsed.push(label);
      }
      return { collapsed };
    });

  setSelectedPermissions(values, checked) {
    this.setState(prevState => {
      const { selectedPermissions: prevPermissions } = prevState;
      const selectedPermissions = checked
        ? prevPermissions.concat(values)
        : difference(prevPermissions, values);
      return { selectedPermissions };
    });
  }

  selectPermission = value => event => {
    this.setSelectedPermissions([value], event.target.checked);
  };

  selectGroup = group => event => {
    this.setSelectedPermissions(
      group.map(g => g.value),
      event.target.checked
    );
  };

  isChecked = group => {
    const groupIDs = group.map(g => g.value);
    const { selectedPermissions } = this.state;
    return (
      groupIDs.length === intersection(selectedPermissions, groupIDs).length
    );
  };

  render() {
    const { visible, onCancel, onSubmit } = this.props;
    const { selectedPermissions, options, collapsed } = this.state;

    const footerButtons = [
      <Button key="cancel" onClick={onCancel}>
        Cancel
      </Button>,
      <Button
        key="primary"
        color="primary"
        focusRipple
        onClick={() => onSubmit(selectedPermissions)}
      >
        add permissions
      </Button>,
    ];

    return (
      <Dialog
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        fullWidth
        title={<RenderTitle onSearch={this.onSearch} />}
      >
        {options.map(option => (
          <div key={option.label}>
            <IconButton onClick={this.onToggle(option.label)}>
              <Icon>
                {collapsed.includes(option.label)
                  ? 'expand_more'
                  : 'expand_less'}
              </Icon>
            </IconButton>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.isChecked(option.options)}
                  onChange={this.selectGroup(option.options)}
                  className={styles.checkbox}
                />
              }
              label={option.label}
              className={styles.groupLabel}
            />
            <div
              className={classNames({
                [styles.collapsed]: collapsed.includes(option.label),
              })}
            >
              {option.options.map(group => (
                <div className={styles.group} key={group.value}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedPermissions.includes(group.value)}
                        onChange={this.selectPermission(group.value)}
                        className={styles.checkbox}
                      />
                    }
                    label={group.label}
                    className={styles.groupLabel}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Dialog>
    );
  }
}

PermissionListModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOptions: PropTypes.array,
};

PermissionListModal.defaultProps = {
  selectedOptions: [],
};

export default PermissionListModal;
