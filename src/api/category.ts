import request from '.';

class Category {

    /**
     * @description 添加分类
     * @param data 
     * @returns 
     */
    public addOneCategoryApi(data: Category.CategoryStruct) {
        return request.axios({
            url: "/api/blogArticleCategory/addOneCategory",
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
            url: "/api/blogArticleCategory/getCategoryList",
            method: "post",
            data: data || {},
        });
    }

}

export default new Category();