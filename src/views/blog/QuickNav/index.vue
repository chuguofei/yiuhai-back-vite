<template>
  <div>
    <BaseTitle title="快捷导航">
      <template v-slot:btn-group>
        <a-button
          type="primary"
          class="margin-right-10"
          @click="btnHandleMeth('add-quick-type')"
          v-text="'添加导航类型'"
        />
        <a-button
          type="primary"
          @click="btnHandleMeth('add-quick-nav')"
          v-text="'添加导航链接'"
        />
      </template>
    </BaseTitle>

    <!-- <vxe-table
      ref="xTable"
      :data="dataSource"
      keep-source
      class="margin-top-10"
      :loading="loading"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
    >
      <vxe-column field="id" title="id"></vxe-column>
      <vxe-column field="name" title="名称"></vxe-column>
      <vxe-column field="icon" title="图标"></vxe-column>
      <vxe-column field="href" title="链接"></vxe-column>
      <vxe-column field="navTypeName" title="类型"></vxe-column>
    </vxe-table> -->

    <!-- 添加导航类型 -->
    <add-type-comp
      v-if="visibleMeth.isQuickTypeAdd"
      :isQuickTypeAdd="visibleMeth.isQuickTypeAdd"
      @callBack="callBackTypeModal"
    ></add-type-comp>

    <!-- 添加导航 -->
    <add-quick-nav-comp v-model:open="visibleMeth.isQuickNavAdd"></add-quick-nav-comp>
  </div>
</template>

<script lang="ts">
import BaseTitle from "/@/components/BaseTitle.vue";
import addTypeComp from "./addType.vue";
import addQuickNavComp from "./addQuickNav.vue";
import { reactive, defineComponent, onMounted } from "vue";
import QuickNav from "../../../api/quicknav";
import { tableInfoStruct } from "./struct/index";
export default defineComponent({
  components: { BaseTitle, addTypeComp, addQuickNavComp },
  setup(props) {
    const visibleMeth = reactive({
      isQuickTypeAdd: false, // 添加导航类型
      isQuickNavAdd: false, // 添加导航
    });

    const tableInfo = reactive({
      loading: false,
      dataSource: [],
      queryParams: {
        total: 0,
        size: 10,
        current: 0,
      },
    });

    onMounted(() => {
      getListMeth();
    });

    // 弹框关闭
    const callBackTypeModal = (type: string) => {
      if ("add-type" == type) {
        visibleMeth.isQuickTypeAdd = false;
      } else if ("add-nav" == type) {
        visibleMeth.isQuickNavAdd = false;
      }
    };

    // 获取数据列表
    const getListMeth = () => {
      QuickNav.selectList().then((res) => {
        tableInfo.queryParams.total = res.data.total;
        tableInfo.dataSource = res.data.records;
      });
    };

    const btnHandleMeth = (type: string) => {
      if (type == "add-quick-type") {
        visibleMeth.isQuickTypeAdd = true;
      } else if (type == "add-quick-nav") {
        visibleMeth.isQuickNavAdd = true;
      }
    };

    // 提交按钮
    const submitHandleMeth = () => {
      console.log(123);
    };

    return {
      visibleMeth,
      btnHandleMeth,
      submitHandleMeth,
      callBackTypeModal,
      getListMeth,
    };
  },
});
</script>
