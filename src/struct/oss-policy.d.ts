

declare namespace BaseStruct {

    interface OssPolicy {
        accessid?: string,
        policy?: string,
        signature?: string,
        dir?: string,
        host?: string,
        key?: string,
        expire?: number,
        file?: File
    }

}