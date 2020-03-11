import * as actionTypes from '@/store/action-types';
import { StoreDispatch, StoreGetState } from '@/store';
export default {
    setData(data: string) {
        return {
            type: actionTypes.SET_DATA,
            payload: data
        }
    },
    getData() {
        // getSliders()会返回一个promise 你向仓库里派发一个这样action.action.payload是一个promise
        // redux-promise中间件会等待promise完成。完成这后会再次向仓库派发action dispatch({type:GET_SLIDERS,payload:SliderData})
        return {
            type: actionTypes.GET_DATA,
            payload: "setAll"
        }
    },
    //获取List
    getList() {
        return function (dispatch: StoreDispatch, getState: StoreGetState) {
            (async function () {
                //todo:异步调用接口
            })();
        }
    }
}