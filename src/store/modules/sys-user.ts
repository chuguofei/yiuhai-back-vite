import { defineStore } from "pinia";

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
  getters: {},
  actions: {},
});
