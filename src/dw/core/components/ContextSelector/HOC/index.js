import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import queryString from 'query-string';
import Portal from '@material-ui/core/Portal';

import { hasData } from 'dw/core/helpers/object';
import Loading from 'dw/core/components/Loading';
import { ContextContainer } from '..';
import ContextSelector from '../components/ContextSelector';
import {
  currentContextSelector,
  availableOptionsSelector,
  userAvailableLoadedSelector,
  userSelector,
  contextRemotePropsSelector,
  usesMulticontextSelector,
} from '../selectors';
import * as Actions from '../actions';

import styles from './index.module.css';

class ContextService extends React.Component {
  static propTypes = {
    fetchAvailableContexts: PropTypes.func.isRequired,
    fetchContextsRegistry: PropTypes.func.isRequired,
    changeContext: PropTypes.func.isRequired,
    serviceName: PropTypes.string.isRequired,
    relatedServices: PropTypes.arrayOf(PropTypes.string).isRequired,
    endpoint: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    user: PropTypes.object,
    serviceDependsOnUser: PropTypes.bool,
    titleUsesMulticontext: PropTypes.bool,
    remoteProps: PropTypes.object,
    currentContext: PropTypes.object,
    history: PropTypes.shape({ replace: PropTypes.func.isRequired }),
    location: PropTypes.shape({ search: PropTypes.string.isRequired }),
    availableOptions: PropTypes.arrayOf(PropTypes.object),
    userAvailableLoaded: PropTypes.bool.isRequired,
    platformOnly: PropTypes.bool,
  };

  static defaultProps = {
    user: {},
    serviceDependsOnUser: false,
    titleUsesMulticontext: false,
    remoteProps: {},
    currentContext: {},
    availableOptions: undefined,
    location: {},
    history: {},
    platformOnly: undefined,
  };

  state = {
    currentContext: undefined,
    availableOptions: undefined,
  };

  static getDerivedStateFromProps(props, state) {
    const {
      currentContext = {},
      history,
      location,
      availableOptions,
      changeContext,
    } = props;
    const { currentContext: oldContext = {}, availableOptions: oldOptions } =
      state;
    if (availableOptions === undefined) return null;

    const newState = {};
    const query = queryString.parse(location.search);
    if (availableOptions !== oldOptions) {
      if (availableOptions.length > 0 && !currentContext.id) {
        let context = availableOptions.find(c => c.name === query.context);
        if (!context) [context] = availableOptions;
        if (query.context !== context.name) {
          query.context = context.name;
          location.search = queryString.stringify(query);
          history.replace(location);
        }
        changeContext(context);
        return null;
      }
      newState.availableOptions = availableOptions;
    }
    if (currentContext.id !== oldContext.id) {
      if (currentContext.name !== query.context) {
        query.context = currentContext.name;
        location.search = queryString.stringify(query);
        history.replace(location);
      }
      newState.currentContext = currentContext;
    }

    return hasData(newState) ? newState : null;
  }

  componentDidMount() {
    const { user, serviceDependsOnUser, relatedServices, platformOnly } =
      this.props;

    this.props.fetchContextsRegistry();
    relatedServices.forEach(serviceName => {
      this.props.fetchContextsRegistry({ serviceName });
    });

    if (serviceDependsOnUser) {
      if (user.userId) {
        const sideEffect = this.noAvailableContextsSideEffect;
        this.props.fetchAvailableContexts({
          userId: user.userId,
          sideEffect,
          platformOnly,
        });
        relatedServices.forEach(serviceName => {
          this.props.fetchAvailableContexts({
            serviceName,
            userId: user.userId,
            sideEffect,
            platformOnly,
          });
        });
      }
    } else {
      this.props.fetchAvailableContexts();
      relatedServices.forEach(serviceName => {
        this.props.fetchAvailableContexts({ serviceName });
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { user, serviceDependsOnUser, relatedServices, platformOnly } =
      this.props;
    const { user: prevUser } = prevProps;
    if (serviceDependsOnUser && prevUser.userId !== user.userId) {
      const sideEffect = this.noAvailableContextsSideEffect;
      this.props.fetchAvailableContexts({
        userId: user.userId,
        sideEffect,
        platformOnly,
      });
      relatedServices.forEach(serviceName => {
        this.props.fetchAvailableContexts({
          serviceName,
          userId: user.userId,
          sideEffect,
          platformOnly,
        });
      });
    }
  }

  onChange = context => {
    const { changeContext } = this.props;
    const { currentContext } = this.state;
    if (context) {
      if (currentContext && context.id !== currentContext.id) {
        changeContext(context);

        ReactGA.event({
          category: 'User',
          action: 'Changed Context from Context Selector',
        });
      }
    }
  };

  noAvailableContextsSideEffect = (payload, params) => {
    const { serviceName, userId } = params;
    if (
      userId &&
      !payload.data.data.find(context =>
        ['Platform', 'Any'].includes(context.type)
      ) &&
      this.props.titleUsesMulticontext
    ) {
      return Actions.showNoAvailablePlatformContextMessage(serviceName);
    }
    return null;
  };

  render() {
    const {
      serviceName,
      endpoint,
      serviceDependsOnUser,
      user,
      children,
      remoteProps: { externalRef, ...remoteProps },
      userAvailableLoaded,
    } = this.props;
    const { currentContext } = this.state;
    const { availableOptions } = this.state;
    if (
      availableOptions === undefined ||
      (serviceDependsOnUser && !userAvailableLoaded)
    )
      return <Loading />;
    return (
      <>
        {availableOptions.length > 0 && (
          <ContextContainer.Consumer>
            {contextContainer => (
              <Portal container={externalRef || contextContainer}>
                <ContextSelector
                  serviceName={serviceName}
                  endpoint={endpoint}
                  onChange={this.onChange}
                  serviceDependsOnUser={serviceDependsOnUser}
                  user={user}
                  {...remoteProps}
                />
              </Portal>
            )}
          </ContextContainer.Consumer>
        )}
        <div
          key={currentContext && currentContext.id}
          className={styles.container}
        >
          {children}
        </div>
      </>
    );
  }
}

const stateToProps = (state, props) => ({
  currentContext: currentContextSelector(state, props),
  availableOptions: availableOptionsSelector(state, props),
  userAvailableLoaded: userAvailableLoadedSelector(state),
  user: userSelector(state),
  remoteProps: contextRemotePropsSelector(state),
  titleUsesMulticontext: usesMulticontextSelector(state),
  titleId: state.Components.TitleSelector.currentTitle.id,
  envType: state.Components.TitleSelector.currentEnv.shortType,
});

const dispatchToProps = {
  fetchAvailableContexts: Actions.fetchAvailableContexts,
  fetchContextsRegistry: Actions.fetchContextsRegistry,
  changeContext: Actions.changeContext,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  fetchAvailableContexts: (params = {}) =>
    dispatchProps.fetchAvailableContexts({
      ...params,
      serviceName: params.serviceName || ownProps.serviceName,
      titleId: stateProps.titleId,
      envType: stateProps.envType,
    }),
  fetchContextsRegistry: (params = {}) =>
    dispatchProps.fetchContextsRegistry({
      ...params,
      serviceName: params.serviceName || ownProps.serviceName,
      titleId: stateProps.titleId,
      envType: stateProps.envType,
    }),
  changeContext: context => {
    dispatchProps.changeContext(context, ownProps.serviceName);
    ownProps.relatedServices.forEach(serviceName => {
      dispatchProps.changeContext(context, serviceName);
    });
  },
});

const ContextServiceConnected = compose(
  connect(stateToProps, dispatchToProps, mergeProps),
  withRouter
)(ContextService);

const contextAwareService =
  (serviceName, endpoint, services, params = {}) =>
  Component => {
    let serviceDependsOnUser;
    let platformOnly;
    if (typeof params === 'boolean') {
      serviceDependsOnUser = params;
    } else {
      ({ serviceDependsOnUser = false, platformOnly } = params);
    }
    let relatedServices = services || [];
    if (!Array.isArray(relatedServices)) relatedServices = [relatedServices];
    const WrappedComponent = props => (
      <ContextServiceConnected
        serviceName={serviceName}
        endpoint={endpoint}
        relatedServices={relatedServices}
        serviceDependsOnUser={serviceDependsOnUser}
        platformOnly={platformOnly}
      >
        <Component {...props} />
      </ContextServiceConnected>
    );
    const name = Component.name || Component.displayName;
    WrappedComponent.displayName = `contextAwareService(${name})`;
    return WrappedComponent;
  };

export default contextAwareService;
