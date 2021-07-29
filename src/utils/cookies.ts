import Cookies from 'js-cookie'

class CookiesUtils {
    private tokenKey: string = "gf-token";

    /**
     * @description 设置token
     * @param value 要填充的值
     */
    public setToken(value: string): any {
        Cookies.set(this.tokenKey, value);
    }

    /**
     * @description 获取token
     * @returns token
     */
    public getToken(): string {
        return Cookies.get(this.tokenKey) as string;
    }

}

export default new CookiesUtils;