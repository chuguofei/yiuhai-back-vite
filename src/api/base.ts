import request from '.';
import ImageCompressor from 'js-image-compressor'
import { uuid } from "vue-uuid";
import { message as Message } from 'ant-design-vue'

let _water_mark_text = "www.guofeian.cn";

class Base {
    private apiGroupName: string = 'base';

    /**
     * 获取oss授权信息
     * @returns 
     */
    public getOssPolicy() {
        return request.axios({
            url: `/blogapi/${this.apiGroupName}/getOssPolicy`,
            method: "get",
        });
    }

    /**
     * 文件上传
     */
    public ossUploadApi(file: File, uuid: string) {
        return new Promise((resolve, reject) => {
            this.getOssPolicy().then((result: any) => {
                let ossPolicy: BaseStruct.OssPolicy = result.data;
                var formData: any = new FormData();
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
                    headers: {
                        'ContentType': 'image/jpeg'
                    },
                    data: formData
                }).then((res: any) => {
                    resolve(ossPolicy.host + "/" + filename);
                });
            })
        })
    }

    /**
     * @description 图片压缩 + 水印
     * @param files 
     * @returns 
     */
    public ImageCompressor(files: Array<File>, isMaketextFlag?: Boolean) {
        return new Promise((resolve, reject) => {
            const _uuid = uuid.v1();
            let file = files[0];
            let options = {
                file: file,
                // 图片绘画前
                beforeDraw: (ctx: CanvasRenderingContext2D) => {
                    // const canvas = document.createElement('canvas');
                    // const ctx = canvas.getContext('2d');

                    // ctx.filter = 'grayscale(100%)';
                    Message.loading("开始压缩...");
                },

                // 压缩成功回调
                success: (blob: any) => {
                    // let a = new FileReader();
                    // a.onload = (e: any) => {
                    //     Message.destroy();
                    //     Message.success("图片压缩成功")
                    //     resolve(e.target.result);
                    // }
                    // a.readAsDataURL(blob);

                    let chuliImg = new window.File([blob], _uuid, { type: file.type });
                    this.ossUploadApi(chuliImg, _uuid).then(result => {
                        Message.destroy();
                        Message.success("图片压缩成功");
                        resolve(result);
                    });
                    // console.log(`压缩之后图片尺寸大小: ${result.size},类型:${result.type} `);
                    // console.log('实际压缩率： ', ((file.size - result.size) / file.size * 100).toFixed(2) + '%');
                }
            };
            if (isMaketextFlag) {
                let isMaketext = {
                    // 图片绘画后
                    afterDraw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
                        ctx.restore();
                        console.log('绘图完成...');
                        ctx.fillStyle = '#fff';
                        ctx.font = (canvas.width * 0.02) + 'px microsoft yahei';
                        ctx.fillText(_water_mark_text, canvas.width * 0.82, canvas.height - 25);
                    },

                    // 压缩前回调
                    beforeCompress: (result: any) => {
                        // console.log(`压缩之前图片尺寸大小: ${result.size},类型:${result.type} `);
                    },
                }
                options = Object.assign(isMaketext, options);
            }
            new ImageCompressor(options);
        });
    }


}

export default new Base();