import request from '.';
import qs from 'qs';

class QuickNavType {

    /**
     * @description 导航立列表
     * @param data 
     * @returns 
     */
    public list(data?: QuickNav.QuickNavType): Promise<CallBack.ResponseTable> {
        return request.axios({
            url: `/blogapi/quickNavType/selectList`,
            method: "get",
        })
    }


    /**
     * @description 添加导航类型
     * @param data 
     * @returns 
     */
    public addQuickTypeOneApi(data?: QuickNav.QuickNavType): Promise<CallBack.ResponseTable> {
        return request.axios({
            url: `/blogapi/quickNavType/addQuickTypeOne`,
            method: "post",
            data,
        })
    }

    /**
    * @description 修改导航类型
    * @param data 
    * @returns 
    */
    public updateTypeOne(data?: QuickNav.QuickNavType): Promise<CallBack.ResponseTable> {
        return request.axios({
            url: `/blogapi/quickNavType/updateQuickTypeOne`,
            method: "put",
            data,
        })
    }

    /**
     * @description 修改导航类型
     * @param data 
     * @returns 
     */
    public delQuickTypeOne(id?: Number): Promise<CallBack.ResponseTable> {
        return request.axios({
            url: `/blogapi/quickNavType/delQuickTypeOne/${id}`,
            method: "delete",
        });
    }
}

export default new QuickNavType();