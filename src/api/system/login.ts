import request  from '../';

/**
 * 登录Controller
 */
class LoginController {

    /**
     * @description 登录
     * @param data 
     * @returns 
     */
     public loginApi(data?: Login.LoginStruct): Promise<CallBack.Response> {
        return request.axios({
            url: "/blogapi/login",
            method: "post",
            data
        });
    }
}

export default new LoginController();