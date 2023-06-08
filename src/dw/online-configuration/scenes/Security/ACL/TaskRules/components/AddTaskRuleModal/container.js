import { Component } from 'react';
import { connect } from 'react-redux';

import AddTaskRuleModalStateless from './presentational';
import { serviceInfoSelector, servicesListSelector } from './selectors';
import { formFields } from './constants';

const stateToProps = state => ({
  serviceInfo: serviceInfoSelector(state),
  servicesList: servicesListSelector(state),
  submitting: state.Scenes.Security.ACL.TaskRules.addModalSubmitting,
});

class AddTaskRuleModal extends Component {
  static propTypes = {
    ...AddTaskRuleModalStateless.propTypes,
  };

  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        service: '*',
        task: '*',
        clientType: '*',
        allow: false,
      },
      formErrors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(field, newValue) {
    const updates = {};
    updates[field] = newValue;
    if (field === 'service') {
      updates.task = null;
    }
    this.setState(prevState => {
      const errors = { ...prevState.formErrors };
      switch (field) {
        case 'clientType':
          updates.clientType =
            !newValue || newValue === '*' ? newValue : parseInt(newValue, 10);
          break;
        case 'service':
          updates.task = '*';
          if (newValue && errors[field]) {
            delete errors[field];
          }
          break;
        case 'task':
          if (newValue && errors[field]) {
            delete errors[field];
          }
          break;
        default:
      }
      return {
        formValues: {
          ...prevState.formValues,
          ...updates,
        },
        formErrors: errors,
      };
    });
  }

  onSubmit() {
    if (this.isValid()) {
      this.props.onSubmit(this.state.formValues);
    }
  }

  onBlur(field) {
    this.validate(field);
  }

  isValid() {
    this.validate();
    return Object.keys(this.state.formErrors).length === 0;
  }

  validate(field) {
    this.setState(prevState => {
      const errors = {
        ...prevState.formErrors,
      };
      (field === undefined ? formFields : [field]).forEach(fieldName => {
        const value = this.state.formValues[fieldName];
        let error;
        switch (fieldName) {
          case 'clientType': {
            const clientType = parseInt(value, 10);
            if (
              value !== '*' &&
              (Number.isNaN(clientType) || clientType < 0 || clientType > 255)
            ) {
              error =
                'Must be "*" or a number in the range (0 <= clientType <= 255)';
            }
            break;
          }
          case 'allow':
            break;
          default:
            if (!value) {
              error = 'Required';
            }
            break;
        }
        if (error !== undefined) {
          errors[fieldName] = error;
        } else if (errors[fieldName]) {
          delete errors[fieldName];
        }
      });
      return { formErrors: errors };
    });
  }

  render() {
    const { formValues, formErrors } = this.state;
    const taskChoices =
      !formValues.service || formValues.service === '*'
        ? ['*']
        : this.props.serviceInfo[formValues.service];
    return AddTaskRuleModalStateless({
      ...this.props,
      onChange: this.onChange,
      onBlur: this.onBlur,
      onSubmit: this.onSubmit,
      formErrors,
      formValues,
      taskChoices,
    });
  }
}

export default connect(stateToProps)(AddTaskRuleModal);
