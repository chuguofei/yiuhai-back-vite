import request from '.';


class Base {
    // 分组名称
    private apiGroupName:string = 'base';

    public getOssPolicy() {
        return request.axios({
            url: `/api/${this.apiGroupName}/getOssPolicy`,
            method: "get",
        });
    }
}

export default new Base();