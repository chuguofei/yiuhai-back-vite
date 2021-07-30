import type { Router } from 'vue-router';
import CookiesUtils from '../utils/cookies';


/**
 * @description 设置路由守卫
 */
export function setRouterGuards(router: Router) {
    // const _sysUserStore = sysUserStore();
    // let _token = _sysUserStore.getToken;

    router.beforeEach(async (to, from, next) => {
        if(to.path == '/login'){
            next();
            return
        }
        let _token = CookiesUtils.getToken();
        if (_token == null || _token == undefined) {
            next('/login')
        } else {
            next();
        }
    });
}