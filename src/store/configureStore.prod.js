import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/gifSagas.js';

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware];
const finalCreateStore = compose(
  applyMiddleware(...middleware)
)(createStore);

module.exports = function configureStore(initialState) {
  sagaMiddleware.run(rootSaga);
  return finalCreateStore(rootReducer, initialState);
};
