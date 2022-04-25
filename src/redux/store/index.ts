import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

// dependency injection of services in saga using context
const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWares)),
);

sagaMiddleware.run(rootSaga);

export default store;
