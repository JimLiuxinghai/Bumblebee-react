import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const request: AxiosInstance = axios.create();

//请求拦截
request.interceptors.request.use((config: AxiosRequestConfig) => {
    return config;
}, (error: AxiosError) => {
    return Promise.reject(`AxiosRequestConfig:${error}`);
});

//请求成功后 直接需要的返回数据
request.interceptors.response.use((res: AxiosResponse) => {
    if (res.status === 200) {
        res = res.data;
    }
    return res;
}, (error: AxiosError) => { 
    return Promise.reject(`AxiosResponse:${error}`);
});

export default request;
