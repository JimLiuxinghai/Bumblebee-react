import { ReducersMapObject, AnyAction, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import home from './home';
import history from '@/history';
import { CombinedState } from '@/typings';
import produce from 'immer';
import { combineReducers } from 'redux-immer';


let reducers: ReducersMapObject<CombinedState, AnyAction> = {
    home,
    router: connectRouter(history)
}
const rootReducer: Reducer<CombinedState, any> = combineReducers<CombinedState>(produce, reducers);

export default rootReducer;