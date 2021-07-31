import request from "../";

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
      data,
    });
  }

  /**
   * @description 登出
   * @param data
   * @returns
   */
  public logoutApi(): Promise<CallBack.Response> {
    return request.axios({
      url: "/blogapi/logout",
      method: "post",
    });
  }

  /**
   * @description 获取当前用户信息
   * @returns
   */
  public getLoginUserApi() {
    return request.axios({
      url: "/blogapi/getLoginUser",
      method: "get",
    });
  }
}

export default new LoginController();
