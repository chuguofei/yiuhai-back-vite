<template>
  <div v-if="!isAdd">
    <div class="margin-tb-10 padding-5">
      <a-button type="primary" @click="isAdd = true">新增文章</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" :pagination="false"> </a-table>
  </div>
  <ArticleAddCom @CallBack="CallBack" v-else />
</template>
<script lang="ts">
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, toRefs, onMounted, reactive } from "vue";
import ArticleAddCom from "./ArticleAdd.vue";
// api
import Aritcle from "@/api/aritcle.ts";
import Category from "@/api/category.ts";
const columns = [
  {
    title: "Age",
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle", customRender: "name" },
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default defineComponent({
  setup() {
    const dataState = reactive({
      isAdd: false,
    });

    const CallBack = (flag: Boolean) => {
      dataState.isAdd = flag;
    };

    onMounted(() => {
      Category.getCategoryListApi().then(res=>{
        console.log(res)
      })
      Aritcle.getAritcleListApi().then((res) => {
        console.log(res);
      });
    });

    return {
      ...toRefs(dataState),
      data,
      columns,
      CallBack,
    };
  },
  components: {
    SmileOutlined,
    DownOutlined,
    ArticleAddCom,
  },
});
</script>
