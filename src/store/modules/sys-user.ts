import { defineStore } from "pinia";
import LoginController from "/@/api/system/login.ts";
import HttpResultUtils from "/@/struct/common/http-result-utils";
import { message as Message } from "ant-design-vue";
import router from "/@/router";
import CookiesUtils from "/@/utils/cookies";

/**
 * 登录用户的状态
 */
interface LoginUserState {
  // 用户的token
  token: string;
  // 用户的对象
  userInfo: SysUserStruct.sysUser | any;
}

export const sysUserStore = defineStore({
  id: "sysUserStore",
  state: (): LoginUserState => ({
    token: "",
    userInfo: null,
  }),
  getters: {
    // 获取token
    getToken(): string {
      return this.token;
    },
    // 获取用户信息
    getUserInfo(): SysUserStruct.sysUser {
      return this.userInfo;
    },
    // 获取用户登录名
    getUserName(): string {
      if (this.userInfo != null) {
        return this.userInfo.userName as string;
      }
      return "";
    },
  },
  actions: {
    /**
     * 登录
     * @param submitForm
     * @returns
     */
    USER_LOGIN(submitForm?: Login.LoginStruct) {
      return new Promise((resolve, reject) => {
        LoginController.loginApi(submitForm)
          .then((result: CallBack.Response) => {
            if (result.code == HttpResultUtils.SUCCESS) {
              Message.success("登录成功");
              this.token = result.data.token;
              this.userInfo = result.data.userInfo;
              CookiesUtils.setToken(result.data.token);
              router.replace("/blog");
            }
            resolve(result);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    },
    /**
     * @description 获取当前登录用户信息
     */
    async SET_LOGIN_USER_ACTION() {
      LoginController.getLoginUserApi().then((result: CallBack.Response) => {
        if (result.code == 200) {
          this.userInfo = result.data;
        }
      });
    },
    /**
     * @description 登出
     */
    USER_LOGOUT() {
      return new Promise((resolve, reject) => {
        LoginController.logoutApi().then((result: CallBack.Response) => {
          CookiesUtils.cleanToken();
          this.token = "";
          this.userInfo = null;
          router.push("/login");
          resolve(null);
        });
      });
    },
  },
});
