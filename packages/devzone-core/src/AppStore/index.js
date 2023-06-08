import React, {
  useReducer,
  useRef,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { runSaga, stdChannel } from 'redux-saga';
import isEqual from 'lodash/isEqual';

import rootReducer, { INITIAL_STATE } from '../modules/reducers';

import rootSaga from '../sagas';

if (!global.AppStateProvider) global.AppStateProvider = React.createContext();
const { AppStateProvider } = global;

function useReducerAndSaga(reducer, initialState, saga) {
  const [state, reactDispatch] = useReducer(reducer, initialState);
  const env = useRef(state);
  env.current = state;
  const channel = useMemo(() => stdChannel(), []);
  const getState = useCallback(() => env.current, []);
  const dispatch = useCallback(a => {
    if (typeof a === 'function') {
      a(dispatch, getState);
    } else {
      setImmediate(channel.put, a);
      reactDispatch(a);
    }
  }, []);

  useEffect(() => {
    const task = runSaga({ channel, dispatch, getState }, saga);
    return () => task.cancel();
  }, [channel, dispatch, getState, saga]);

  return [state, dispatch];
}

const ContextProvider = ({ children, ...props }) => {
  // setup useReducer with the returned value of the reducers function
  const [state, dispatch] = useReducerAndSaga(
    rootReducer,
    INITIAL_STATE,
    props.rootSaga
  );
  // pass in the returned value of useReducer
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  window.globalAppStore = { dispatch: contextValue.dispatch };

  return (
    <AppStateProvider.Provider value={contextValue}>
      {children}
    </AppStateProvider.Provider>
  );
};
ContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  rootSaga: PropTypes.func,
};
ContextProvider.defaultProps = {
  children: null,
  rootSaga,
};

const useSelector = selector => {
  const ref = useRef();
  const { state } = useContext(AppStateProvider);
  const value = selector(state);
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

const useDispatch = () => {
  const { dispatch } = useContext(AppStateProvider);
  return dispatch;
};

const connect =
  (mapStateToProps, mapDispatchToProps, mergeProps) => WrappedComponent => {
    const Component = React.forwardRef(({ store, ...props }, ref) => (
      <AppStateProvider.Consumer>
        {value => {
          if (!(value || store)) {
            // eslint-disable-next-line
            console.warn(
              'withDevzoneCoreConnect: Neither <strong>ContextProvider</strong> nor <strong>store</strong> is used. ' +
                'Using original component.'
            );
            return <WrappedComponent {...props} ref={ref} />;
          }
          const { state, dispatch } = value || store;

          let stateToProps = {};
          if (mapStateToProps) {
            stateToProps = mapStateToProps(state, props);
            if (typeof stateToProps === 'function') {
              stateToProps = stateToProps(state, props);
            }
          }

          let dispatchToProps = {};
          if (mapDispatchToProps) {
            if (typeof mapDispatchToProps === 'function') {
              dispatchToProps = mapDispatchToProps(dispatch);
            } else {
              dispatchToProps = Object.entries(mapDispatchToProps).reduce(
                (acc, [key, action]) => ({
                  ...acc,
                  [key]: (...args) => dispatch(action(...args)),
                }),
                {}
              );
            }
          }

          const componentProps = {
            ...props,
            ...stateToProps,
            ...dispatchToProps,
            ...(mergeProps && {
              ...mergeProps(stateToProps, dispatchToProps, props),
            }),
          };

          return <WrappedComponent {...componentProps} ref={ref} />;
        }}
      </AppStateProvider.Consumer>
    ));
    Component.propTypes = {
      store: PropTypes.object,
    };
    Component.defaultProps = {
      store: null,
    };
    const componentName = WrappedComponent.displayName || WrappedComponent.name;
    Component.displayName = `withDevzoneCoreConnect(${componentName})`;
    return Component;
  };

export {
  ContextProvider,
  AppStateProvider as ContextConsumer,
  connect,
  useSelector,
  useDispatch,
};
