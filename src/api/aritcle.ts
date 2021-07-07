import request from '.';

class Aritcle {

    /**
     * @description 添加一片博客
     * @param data 
     * @returns 
     */
    public addOneAritcle(data: Aritcle.AritcleStruct):Promise<CallBack.Response>{
        return request.axios({
            url: "/api/blogArticle/addArticleOne",
            method: "post",
            data
        });
    }

    /**
     * @description 查询列表
     * @param data 
     * @returns 
     */
    public getAritcleListApi(data?: Aritcle.AritcleStruct):Promise<CallBack.ResponseTable>{
        return request.axios({
            url: "/api/blogArticle/getArticleList",
            method: "post",
            data
        })
    }

}

export default new Aritcle();