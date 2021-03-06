import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import DevTools from '../containers/DevTools';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/gifSagas.js';


/**
 * Entirely optional, this tiny library adds some functionality to
 * your DevTools, by logging actions/state to your console. Used in
 * conjunction with your standard DevTools monitor gives you great
 * flexibility!
 */
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const finalCreateStore = compose(
  // Middleware you want to use in development:
  applyMiddleware(logger, sagaMiddleware),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)(createStore);

module.exports = function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  sagaMiddleware.run(rootSaga);
  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
};
