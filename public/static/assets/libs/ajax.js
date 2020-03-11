import axios from 'axios';
// import Notify from 'notify';

const baseURL = '/api/v1';
export default function ajax(config = {}){
    const method = config.method || 'get';
    const defaultConfig = {
        url: baseURL + config.url,
        method: method,
        noCache: config.noCache || false
    }
    let key = 'params';
    if (method === 'post' || method === 'put') {
        key = 'data';
    }

    //添加st,避免304
    config.data = Object.assign(config.data || {}, {
        st: getTime()
    })
    
    defaultConfig[key] = config.data;
    
    return axios(defaultConfig)
        .then((res) => {
            const status = res.data.status;
            // 成功的状态直接返回数据
            if (status.code == '200') {
                return res.data.data;
            }
            else if (status.code == '2501') {
                window.location.href = '/logout';
            }
            else if (status.code == '802') {
                return res.data
            }
            else {
                // Notify.error(status.msg)

                throw new Error(res.status);
            }
        })
     
}

function getTime() {
    let time = util.date.format(new Date(), 'yyyy-MM-dd hh:mm');
    return new Date(time).getTime()
}
//去掉了缓存
// function getData(defaultConfig) {
//     return axios(defaultConfig)
//         .then((res) => {
//             const status = res.data.status;
//             // 成功的状态直接返回数据
//             if (status.code == '200') {
                
//                 return res.data.data;
//             }
//             else if (status.code == '2501') {
//                 window.location.href = window.RMSCONFIG.logoutUrl;
//             }
//             else {
//                 Notify.error(status.msg)

//                 throw new Error(res.status);
//             }
//         })
// }