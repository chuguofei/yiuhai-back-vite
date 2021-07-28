import axios, { AxiosInstance } from "axios";
import { message as Message } from "ant-design-vue";
import { get } from "lodash-es";
import router from "../router/index";
import { registerRuntimeHelpers } from "@vue/compiler-core";

export default class MyAxios {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      timeout: 5000,
      withCredentials: false, // 表示跨域请求时是否需要使用凭证
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
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
    this.axios.interceptors.response.use(
      (response: any) => {
        let { data, code, msg } = response.data;
        if (data != undefined && data != null) {
          return response.data;
        } else if (response.config.url.indexOf("aliyun") > -1) {
          // 如果是oss上传放行。
          return null;
        }
        if (code == 500) {
          Message.error(msg);
          return Promise.reject(msg);
        }
        if (code == 401 || code == 403) {
          Message.error(msg);
          setTimeout(() => {
            router.replace("/login");
          }, 1000);
        }
        return Promise.reject(msg);
      },
      (error: any) => {
        console.log(
          `路由${error.config.url}请求失败，耗时${
            new Date().getTime() - error.config.startTime
          }ms`
        );
        const status = get(error, "response.status");
        switch (status) {
          case 400:
            error.message = "请求错误";
            break;
          case 401:
            error.message = "未授权，请登录";
            break;
          case 403:
            error.message = "拒绝访问";
            break;
          case 404:
            error.message = `请求地址出错: ${error.response.config.url}`;
            break;
          case 408:
            error.message = "请求超时";
            break;
          case 500:
            error.message = "服务器内部错误";
            break;
          case 501:
            error.message = "服务未实现";
            break;
          case 502:
            error.message = "网关错误";
            break;
          case 503:
            error.message = "服务不可用";
            break;
          case 504:
            error.message = "网关超时";
            break;
          case 505:
            error.message = "HTTP版本不受支持";
            break;
          default:
            Message.warning(error.message);
            break;
        }
        return Promise.reject(error.data);
      }
    );
  }
}
