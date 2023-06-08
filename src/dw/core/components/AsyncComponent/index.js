import React, { Component } from 'react';
import last from 'lodash/last';

import { makeCancelable } from 'dw/core/helpers/promise';

export default function asyncComponent(importComponent) {
  let name = 'AsyncComponent';
  let re;
  try {
    re = new RegExp('\\| ([a-zA-Z]*)');
    // eslint-disable-next-line
    name = re.exec(String(importComponent))[1];
  } catch (e) {
    try {
      re = new RegExp("'(.*)'");
      name = last(re.exec(String(importComponent))[1].split('/'));
    } catch (err) {
      // Need component name for tests
    }
  }

  class AsyncComponent extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      this.importPromise = makeCancelable(importComponent());
      this.importPromise.promise
        .then(({ default: component }) => this.setState({ component }))
        .catch(e => {
          this.setState(() => {
            throw new Error(`Cannot import module "${name}". ${String(e)}`);
          });
        });
    }

    componentWillUnmount() {
      if (this.importPromise) {
        this.importPromise.cancel();
      }
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  AsyncComponent.displayName = name;

  return AsyncComponent;
}
