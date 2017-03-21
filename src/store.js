import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { fromJS } from 'immutable'

// import root reducers

import rootReducer from './reducers/index'

export default function configureStore(history) {

  const defaultState = fromJS({});

  // const myMiddle = store => next => action => {
  //   // console.log('Action fired', action);
  //   next(action);
  // };

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const enhancers = composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(history))
  );

  const store = createStore(rootReducer, defaultState , enhancers);

  return store;

};
