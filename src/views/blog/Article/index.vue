<template>
  <div v-if="!isAdd">
    <div class="margin-tb-10 padding-5">
      <a-button type="primary" @click="btnHandleMeth('add')">新增文章</a-button>
    </div>
    <a-form :model="tableInfo.queryParams" layout="inline">
      <a-form-item label="文章标题">
        <a-input v-model:value="tableInfo.queryParams.articleTitle" allowClear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="getAritcleListMeth()"
          >查询</a-button
        >
      </a-form-item>
    </a-form>
    <a-table
      :columns="tableInfo.tableColumn"
      :data-source="tableInfo.tableData"
      :pagination="false"
      :rowKey="(row) => row.id"
      :loading="tableInfo.loading"
    >
      <template #articleTags="{ text }">{{ text }}</template>
      <template #handle="{ record }">
        <a-button class="margin-right-10">详情</a-button>
        <a-button
          class="btn-warning margin-right-10"
          @click="btnHandleMeth('edit', record)"
          >修改</a-button
        >
        <a-popconfirm
          cancelText="取消"
          okText="确定"
          title="确定要删除该文章？"
          @confirm="btnHandleMeth('del', record.id)"
        >
          <a-button type="danger">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
  <ArticleAddCom ref="articleAddComRef" @CallBack="CallBack" v-else />
</template>
<script lang="ts">
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, toRefs, onMounted, reactive, ref, nextTick } from "vue";
import ArticleAddCom from "./ArticleAdd.vue";
import { dataState, tableColumn } from "./index.data";
import { message as Message } from "ant-design-vue";
// api
import Aritcle from "/@/api/blog/aritcle";

export default defineComponent({
  setup() {
    // 表格数据
    const tableInfo = reactive({
      tableColumn,
      tableData: [],
      loading: false,
      queryParams: {
        articleTitle: "", // 文章标题
        current: 0,
        size: 10,
        total: 0,
      },
    });

    const dataState: dataState = reactive({
      isAdd: false,
    });

    // select options 数据
    const selectOptionsState = reactive({
      categoryOptions: [],
    });

    const CallBack = (flag: boolean) => {
      dataState.isAdd = flag;
      getAritcleListMeth(); // 刷新列表
    };

    /// method
    const getAritcleListMeth = () => {
      tableInfo.loading = true;
      Aritcle.getAritcleListApi(tableInfo.queryParams).then(
        (result: CallBack.ResponseTable) => {
          tableInfo.loading = false;
          tableInfo.tableData = result.data.records as any;
        }
      );
    };
    // 按钮操作
    const articleAddComRef = ref();
    const btnHandleMeth = (type: string, row?: any) => {
      if (type == "add") {
        dataState.isAdd = true;
      } else if (type == "edit") {
        dataState.isAdd = true;
        nextTick(() => {
          articleAddComRef.value.formParentMeth(row);
        });
      } else if (type == "del") {
        Aritcle.delOneAritcleApi(row).then((result: CallBack.Response) => {
          Message.success(result.msg);
          getAritcleListMeth(); // 刷新列表
        });
      }
    };

    onMounted(() => {
      getAritcleListMeth();
    });

    return {
      ...toRefs(dataState),
      ...toRefs(selectOptionsState),
      CallBack,
      getAritcleListMeth,
      btnHandleMeth,
      tableInfo,
      articleAddComRef,
    };
  },
  components: {
    SmileOutlined,
    DownOutlined,
    ArticleAddCom,
  },
});
</script>
