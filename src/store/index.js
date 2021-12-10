import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './middlewares/sagas';


const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const sagaMiddleware = createSagaMiddleware();
const middleWares = [
  sagaMiddleware
]
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleWares)),
);
sagaMiddleware.run(rootSaga);

export default store;