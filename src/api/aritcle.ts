import request from './index';

class Aritcle {

    /**
     * @description 添加一片博客
     * @param data 
     * @returns 
     */
    public addOneAritcle(params:Aritcle.AritcleStruct) : Promise<CallBack.Response> {
        return request.axios({
            url:"/api/port/article/ArtClassData",
            method:"post",
            params
        });
    }

    /**
     * @description 查询列表
     * @param params 
     * @returns 
     */
    public getAritcleListApi(params?:Aritcle.AritcleStruct):Promise<CallBack.Response>{
        return request.axios({
            url:"/api/blogArticle/getArticleList",
            method:"post",
            params
        })
    }

}

export default new Aritcle();