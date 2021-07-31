import type { Router } from "vue-router";
import CookiesUtils from "../utils/cookies";
import { sysUserStore } from "/@/store/modules/sys-user";

/**
 * @description 设置路由守卫
 */
export function setRouterGuards(router: Router) {
  const store = sysUserStore();

  router.beforeEach(async (to, from, next) => {
    if (to.path == "/login") {
      next();
      return;
    }
    let _token = CookiesUtils.getToken();
    if (_token == null || _token == undefined) {
      next("/login");
    } else {
      if (store.getUserInfo == null) {
        store.SET_LOGIN_USER_ACTION();
      }
      next();
    }
  });
}
