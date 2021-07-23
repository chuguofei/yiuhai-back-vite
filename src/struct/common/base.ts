

declare namespace Base {

    interface Page {
        total?: number, // 总数
        current?: number, // 当前页面
        size?: number, // 每页显示多少条数据
        orderByColumn?: string, // 排序列
        asc?: string, // 排序类型 asc desc
    }

}