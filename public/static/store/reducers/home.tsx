import { AnyAction } from 'redux';
import { HomeState } from '@/typings';
import * as actionTypes from '@/store/action-types';
const initialState: HomeState = {
    data: 'all',
    username: ''
}
//immer 不可变数据集  redux-immutable  redux-immer
export default function (state: HomeState = initialState, action: AnyAction): HomeState {
    switch (action.type) {
        case actionTypes.SET_DATA:
            return { ...state, data: action.payload };
        case actionTypes.GET_DATA:
            if (action.error) {
                return state;
            } else {
                return { ...state, username: action.payload.data };
            }
        default:
            return state;
    }
}