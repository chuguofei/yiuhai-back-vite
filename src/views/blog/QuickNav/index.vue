<template>
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

  <!-- table表格 -->
  <vxe-table
    ref="xTable"
    :data="dataSource"
    keep-source
    class="margin-top-10"
    :loading="loading"
    :edit-config="{ trigger: 'manual', mode: 'row' }"
  >
    <vxe-column field="id" title="id"></vxe-column>
    <vxe-column field="name" title="名称"></vxe-column>
    <vxe-column title="图标">
      <template #default="{ row }">
        <img :src="row.icon" width="30" height="30" />
      </template>
    </vxe-column>
    <vxe-column field="href" title="链接">
      <template #default="{ row }">
        <a :href="row.href" target="_blank">{{ row.href }}</a>
      </template>
    </vxe-column>
    <vxe-column field="navTypeName" title="类型"></vxe-column>
    <vxe-column title="操作">
      <template #default="{ row }">
        <a-popconfirm
          title="确定要删除该标签？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="btnHandleMeth('del', row)"
        >
          <vxe-button status="danger" v-text="'删除'" />
        </a-popconfirm>
        <vxe-button
          status="warning"
          v-text="'修改'"
          @click="btnHandleMeth('edit', row)"
        />
      </template>
    </vxe-column>
  </vxe-table>
  <vxe-pager
    background
    align="right"
    size="small"
    v-model:current-page="queryParams.current"
    v-model:page-size="queryParams.size"
    :total="queryParams.total"
    @page-change="getListMeth"
    :layouts="['PrevPage', 'Number', 'NextPage', 'Sizes', 'FullJump', 'Total']"
  >
    >
  </vxe-pager>

  <!-- 添加导航类型 -->
  <add-type-comp
    v-if="visibleMeth.isQuickTypeAdd"
    :isQuickTypeAdd="visibleMeth.isQuickTypeAdd"
    @callBack="callBackTypeModal"
  ></add-type-comp>

  <!-- 添加导航 -->
  <add-quick-nav-comp
    ref="quickNavRef"
    v-if="visibleMeth.isQuickNavAdd"
    v-model:open="visibleMeth.isQuickNavAdd"
    @update:getListMeth="getListMeth"
  ></add-quick-nav-comp>
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted, ref, toRefs, nextTick } from "vue";
// components
import BaseTitle from "/@/components/BaseTitle.vue";
import addTypeComp from "./addType.vue";
import addQuickNavComp from "./addQuickNav.vue";
// api
import QuickNavController from "../../../api/quicknav";
// struct
import { tableInfoStruct } from "./struct/index";
// ui
import { message as Message } from "ant-design-vue";
export default defineComponent({
  components: { BaseTitle, addTypeComp, addQuickNavComp },
  setup(props) {
    const visibleMeth = reactive({
      isQuickTypeAdd: false, // 添加导航类型
      isQuickNavAdd: false, // 添加导航
    });

    const tableInfo: tableInfoStruct = reactive({
      loading: false,
      dataSource: [],
      queryParams: {
        total: 0,
        size: 10,
        current: 1,
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
      QuickNavController.selectList(tableInfo.queryParams).then((res) => {
        tableInfo.queryParams.total = res.data.total;
        tableInfo.dataSource = res.data.records;
      });
    };

    // 按钮操作
    const quickNavRef = ref();
    const btnHandleMeth = (type: string, rowItem: QuickNav.QuickNav) => {
      if (type == "add-quick-type") {
        visibleMeth.isQuickTypeAdd = true;
      } else if (type == "add-quick-nav") {
        visibleMeth.isQuickNavAdd = true;
      } else if (type == "del") {
        QuickNavController.delQuickNavOne(rowItem.id as string).then((res) => {
          Message.success("删除成功");
          getListMeth(); // 刷新列表
        });
      } else if (type == "edit") {
        visibleMeth.isQuickNavAdd = true;
        nextTick(() => {
          quickNavRef.value.formParentMeth(rowItem);
        });
      }
    };

    return {
      quickNavRef,
      ...toRefs(tableInfo),
      visibleMeth,
      btnHandleMeth,
      callBackTypeModal,
      getListMeth,
    };
  },
});
</script>
