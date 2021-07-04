import request from '.';
import { RequestMethType } from '../struct/common/request-meth-type'
import qs from "qs";

class Category {

    /**
     * @description 添加分类
     * @param data 
     * @returns 
     */
    public addOneOrEditCategoryApi(type: RequestMethType, data: Category.CategoryStruct) {
        let url = type == RequestMethType.Add ? `/api/blogArticleCategory/addOneCategory` : `/api/blogArticleCategory/editOneCategory`;
        return request.axios({
            url,
            method: "post",
            data,
        });
    }

    /**
     * 获取列表数据
     * @param data 
     * @returns 
     */
    public getCategoryListApi(data: Category.CategoryStruct) {
        return request.axios({
            url: "/api/blogArticleCategory/getCategoryList?" + qs.stringify(data),
            method: "get",
        });
    }

    /**
     * 获取列表数据 所有
     * @param data 
     * @returns 
     */
    public getAllListApi(data: Category.CategoryStruct) {
        return request.axios({
            url: "/api/blogArticleCategory/allList?" + qs.stringify(data),
            method: "get",
        });
    }


    /**
     * 删除一个分类
     * @param data 
     */
    public delOneCategoryApi(id: number) {
        return request.axios({
            url: `/api/blogArticleCategory/delOneCategory/${id}`,
            method: "delete",
        })
    }

}

export default new Category();