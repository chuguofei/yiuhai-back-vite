import request from '../';
import qs from 'qs';

class QuickNavController {

    /**
     * @description 导航立列表
     * @param data 
     * @returns 
     */
    public selectList(data?: QuickNav.QuickNav): Promise<CallBack.ResponseTable> {
        return request.axios({
            url: `/blogapi/quickNav/selectList?` + qs.stringify(data),
            method: "get",
        })
    }


    /**
     * @description 添加导航类型
     * @param data 
     * @returns 
     */
    public addQuickNavOneApi(data?: QuickNav.QuickNav): Promise<CallBack.ResponseTable> {
        return request.axios({
            url: `/blogapi/quickNav/addQuickNavOne`,
            method: "post",
            data,
        })
    }

    /**
    * @description 修改导航类型
    * @param data 
    * @returns 
    */
    public updateNavOne(data?: QuickNav.QuickNav): Promise<CallBack.ResponseTable> {
        return request.axios({
            url: `/blogapi/quickNav/updateQuickNavOne`,
            method: "put",
            data,
        })
    }

    /**
     * @description 修改导航类型
     * @param data 
     * @returns 
     */
    public delQuickNavOne(id?: string): Promise<CallBack.ResponseTable> {
        return request.axios({
            url: `/blogapi/quickNav/removeQuickNavOne/${id}`,
            method: "delete",
        });
    }
}

export default new QuickNavController();