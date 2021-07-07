export interface dataState {
    isAdd: boolean
}

export const tableColumn = [
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
]
