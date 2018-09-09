import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducers from './reducers';
import rootSaga from './sagas';

const devMiddleWare = [];
const enhancers = [];
if (process.env.NODE_ENV !== 'production') {
  devMiddleWare.push(logger);
}

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware, ...devMiddleWare];

enhancers.push(applyMiddleware(...middlewares));

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  compose(...enhancers),
);
sagaMiddleware.run(rootSaga);
export { store, history };
