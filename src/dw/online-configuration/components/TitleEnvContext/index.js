import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MenuItem from '@material-ui/core/MenuItem';
import Select from 'dw/core/components/FormFields/Select';
import { makeCancelable } from 'dw/core/helpers/promise';
import { fetchContextsForService } from 'dw/core/components/ContextSelector/services';

import styles from './index.module.css';

class ContextComponentBase extends Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
    touch: PropTypes.func.isRequired,
    untouch: PropTypes.func.isRequired,
    environment: PropTypes.string,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    serviceName: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    envLabel: PropTypes.string,
    name: PropTypes.string,
  };

  static defaultProps = {
    environment: undefined,
    envLabel: undefined,
    name: undefined,
  };

  constructor(props) {
    super(props);
    this.state = { error: undefined, contexts: [] };
    this.name = this.props.name || this.props.input.name;
  }

  componentDidMount() {
    if (this.props.environment) {
      this.getAvailableContext(this.props.environment);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.environment !== prevProps.environment) {
      this.getAvailableContext(this.props.environment);
    }
  }

  componentWillUnmount() {
    if (this.getContextsPromise) this.getContextsPromise.cancel();
  }

  getAvailableContext = async environment => {
    const [titleId, envType] = environment.split(':');
    const { change, touch, untouch, serviceName, endpoint, input } = this.props;
    this.setState({ error: undefined });
    untouch(input.name);
    this.getContextsPromise = makeCancelable(
      fetchContextsForService({
        titleId,
        envType,
        serviceName,
        endpoint,
      })
    );
    const {
      data: { data },
    } = await this.getContextsPromise.promise;
    this.setState({ contexts: data });

    if (data.length === 0) {
      this.setState({
        error: 'Context is not configured for the endpoint',
      });
      change(this.name, null);
      touch(input.name);
    } else if (data.length === 1) {
      change(this.name, data.length ? data[0].name : '');
      touch(input.name);
    }
  };

  onChange = ({ target: { value } }) => this.props.change(this.name, value);

  render() {
    const { input, meta, environment, envLabel } = this.props;
    const { error: formError, touched } = meta;
    const { error: internalError, contexts } = this.state;
    const error = touched && (internalError || formError);

    if (contexts.length > 1) {
      const { value, onBlur, ...selectInput } = input;
      return (
        <Select
          {...selectInput}
          meta={meta}
          fullWidth
          label={`Context for environment '${envLabel}'`}
          name={this.name}
          onChange={this.onChange}
          value={value && value[environment]}
        >
          {contexts.map(({ name }) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      );
    }
    return (
      <div className={styles.contextContainer}>
        <div
          className={classNames(styles.label, {
            [styles.error]: error,
          })}
        >
          Context
        </div>
        {contexts.map(({ name }) => `${name} for environment '${envLabel}'`)}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
}

export default ContextComponentBase;
