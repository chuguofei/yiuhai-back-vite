
declare namespace CallBack {

    interface page {
        current: number,
        size: number,
        total: number,
        records: Array<any>,
    }

    /**
     * 后台返回值
     */
    export interface Response {
        code: number,
        msg: string,
        data: Object,
    }

    /**
     * 后台返回值
     */
    export interface ResponseTable {
        code: number,
        msg: string,
        data: page,
    }

}