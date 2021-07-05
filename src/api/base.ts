import request from '.';

class Base {
    private apiGroupName: string = 'base';

    /**
     * 获取oss授权信息
     * @returns 
     */
    public getOssPolicy() {
        return request.axios({
            url: `/api/${this.apiGroupName}/getOssPolicy`,
            method: "get",
        });
    }

    /**
     * 文件上传
     */
    public ossUploadApi(file: File,uuid:string) {
        return new Promise((resolve, reject) => {
            this.getOssPolicy().then((result: any) => {
                let ossPolicy: BaseStruct.OssPolicy = result.data;
                var formData = new FormData();
                formData.append('policy', ossPolicy.policy);
                formData.append('signature', ossPolicy.signature);
                formData.append('ossaccessKeyId', ossPolicy.accessid);
                let filename = ossPolicy.dir + uuid + file.name.substring(file.name.lastIndexOf("."), file.name.length)
                formData.append('key', filename);
                formData.append('dir', ossPolicy.dir);
                formData.append('host', ossPolicy.host);
                formData.append('file', file);
                request.axios({
                    url: `https://gf-oss.oss-cn-beijing.aliyuncs.com`,
                    method: "post",
                    data: formData
                }).then(res => {
                    resolve(ossPolicy.host + "/" + filename);
                });
            })
        })
    }
}

export default new Base();