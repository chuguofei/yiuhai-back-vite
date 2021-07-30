import type { Router } from 'vue-router';
import { sysUserStore } from '/@/store/modules/sys-user';
import CookiesUtils from '../utils/cookies';
import { useRouter } from 'vue-router'
/**
 * @description 设置路由守卫
 */
export function setRouterGuards(router: Router) {
    // const _sysUserStore = sysUserStore();
    // let _token = _sysUserStore.getToken;

    router.beforeEach(async (to, from, next) => {
        console.log(to,from)
        let _token = CookiesUtils.getToken();
        if (_token == null) {
            next({ path: "/login" })
        } else {
            next();
        }
    });
}