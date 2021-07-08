export interface dataState {
    isAdd: boolean
}


export const tableColumn = [
    {
        title: "文章编号",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "文章标题",
        dataIndex: "articleTitle",
        key: "articleTitle",
    },
    {
        title: "文章标签",
        dataIndex: "articleTags",
        key: "articleTags",
        slots: { customRender: "articleTags" },
    },
    {
        title: "文章分类",
        dataIndex: "articleCategoryName",
        key: "articleCategoryName",
    },
    {
        title: "操作",
        key: "handle",
        width: 250,
        align: "center",
        slots: { customRender: "handle" },
    },
]
