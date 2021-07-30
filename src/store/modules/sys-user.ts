import { defineStore } from "pinia";
import LoginController from "/@/api/system/login.ts";
import HttpResultUtils from '/@/struct/common/http-result-utils';
import { message as Message } from 'ant-design-vue';
import router from '/@/router';
import CookiesUtils from '/@/utils/cookies'
/**
 * 登录用户的状态
 */
interface LoginUserState {
  // 用户的token
  token: string;
  // 用户的对象
  userInfo: SysUserStruct.sysUser;
}

export const sysUserStore = defineStore({
  id: "sysUserStore",
  state: (): LoginUserState => ({
    token: "",
    userInfo: {},
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getUserInfo(): SysUserStruct.sysUser {
      return this.userInfo;
    }
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
              router.replace("/")
            }
            resolve(result);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    }
  },
});
