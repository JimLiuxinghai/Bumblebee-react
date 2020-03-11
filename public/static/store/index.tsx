import { createStore, applyMiddleware, Dispatch } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'
import history from '@/history';
import rootReducer from './reducers';
import { CombinedState } from '@/typings';

//promise和thunk都是中间件
//promise可让我们派发promise,thunk让我们可以派发函数

let store = applyMiddleware(routerMiddleware(history), promise, thunk, logger)(createStore)(rootReducer);
export type StoreDispatch = Dispatch;
export type StoreGetState = () => CombinedState;

export default store;