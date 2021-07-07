<template>
  <div v-if="!isAdd">
    <div class="margin-tb-10 padding-5">
      <a-button type="primary" @click="isAdd = true">新增文章</a-button>
    </div>
    <a-table
      :columns="tableInfo.tableColumn"
      :data-source="tableInfo.tableData"
      :pagination="false"
    >
      <template #articleTags="{ text }">{{ text }}</template>
    </a-table>
  </div>
  <ArticleAddCom @CallBack="CallBack" v-else />
</template>
<script lang="ts">
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, toRefs, onMounted, reactive } from "vue";
import ArticleAddCom from "./ArticleAdd.vue";
import { dataState, tableColumn } from "./index.data";
// api
import Aritcle from "/@/api/aritcle.ts";
import Category from "/@/api/category.ts";

export default defineComponent({
  setup() {
    // 表格数据
    const tableInfo = reactive({
      tableColumn,
      tableData: [],
      queryParams: {},
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
    };

    onMounted(() => {
      Aritcle.getAritcleListApi().then((result: CallBack.ResponseTable) => {
        tableInfo.tableData = result.data.records as any;
      });
    });

    return {
      ...toRefs(dataState),
      ...toRefs(selectOptionsState),
      CallBack,
      tableInfo,
    };
  },
  components: {
    SmileOutlined,
    DownOutlined,
    ArticleAddCom,
  },
});
</script>
