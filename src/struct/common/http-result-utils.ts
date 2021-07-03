
import { message as Message } from "ant-design-vue";
import { RequestMethType } from "./request-meth-type";

export default class HttpResultUtils {

    /**
     * 是否成功
     * @param result 
     * @param showErrMsg 
     * @returns 
     */
    static isSuccess(result:CallBack.Response,showErrMsg:boolean): boolean {
        if(result.code != 200){
            Message.error(result.msg);
        }
        return result.code == 200;
    }

}