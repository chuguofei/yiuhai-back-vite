import request from '.';
import qs from 'qs';
class Aritcle {

    /**
     * @description 添加一片博客
     * @param data 
     * @returns 
     */
    public addOneAritcleApi(data: Aritcle.AritcleStruct): Promise<CallBack.Response> {
        return request.axios({
            url: "/api/blogArticle/addArticleOne",
            method: "post",
            data
        });
    }

    /**
     * @description 修改一片博客
     * @param data 
     * @returns 
     */
    public editOneAritcleApi(data: Aritcle.AritcleStruct): Promise<CallBack.Response> {
        return request.axios({
            url: "/api/blogArticle/editArticleOne",
            method: "put",
            data
        });
    }

    /**
    * @description 删除一片博客
    * @param data 
    * @returns 
    */
    public delOneAritcleApi(id?: Number): Promise<CallBack.Response> {
        return request.axios({
            url: `/api/blogArticle/delArticleOne/${id}`,
            method: "delete",
        });
    }

    /**
     * @description 查询列表
     * @param data 
     * @returns 
     */
    public getAritcleListApi(data?: Aritcle.AritcleStruct): Promise<CallBack.ResponseTable> {
        return request.axios({
            url: "/api/blogArticle/getArticleList?" + qs.stringify(data),
            method: "get"
        })
    }

}

export default new Aritcle();