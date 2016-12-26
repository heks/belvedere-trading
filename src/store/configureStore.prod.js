import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/gifSagas.js';

const sagaMiddleware = createSagaMiddleware();
const finalCreateStore = compose(
  applyMiddleware(thunk, sagaMiddleware)
)(createStore);

module.exports = function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  sagaMiddleware.run(rootSaga);
  return store;
};
