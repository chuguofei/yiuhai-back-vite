import axios, { AxiosInstance } from 'axios';
import { message as Message } from "ant-design-vue";

export default class MyAxios {

    public axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            timeout: 5000,
            withCredentials: false, // 表示跨域请求时是否需要使用凭证
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            }
        })
        this.onRequest();
        this.onResponse();
    }

    /**
     * @description 拦截器
     */
    private onRequest() {
        this.axios.interceptors.request.use((config: any) => {
            config.startTime = new Date().getTime();
            return config;
        });
    }

    /**
     * @description 响应器
     */
    private onResponse() {
        this.axios.interceptors.response.use((response: any) => {
            if (response.data.code == 500) {
                Message.error(response.data.msg);
            }
            return response.data;
        }, (err: any) => {
            console.log(`路由${err.config.url}请求失败，耗时${new Date().getTime() - err.config.startTime}ms`
            );
            return Promise.resolve(err.data);
        });
    }

}