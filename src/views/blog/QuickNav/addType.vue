<template>
  <vxe-modal
    v-model="isQuickTypeAdd"
    width="800"
    :before-hide-method="cancelMeth"
  >
    <vxe-form ref="xForm" :data="submitForm" :rules="rules">
      <vxe-form-item title="名称" field="name" :item-render="{}" span="8">
        <template #default="{ data }">
          <vxe-input
            v-model="data.name"
            placeholder="导航类型"
            clearable
          ></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item>
        <vxe-button
          type="submit"
          content="添加"
          @click="submitHandleMeth()"
        ></vxe-button>
      </vxe-form-item>
    </vxe-form>
    <vxe-table
      ref="xTable"
      :data="dataSource"
      keep-source
      class="margin-top-10"
      :loading="loading"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
    >
      <vxe-column field="id" title="id"></vxe-column>
      <vxe-column
        field="name"
        title="导航类型"
        :edit-render="{ name: 'input', attrs: { type: 'text' } }"
      ></vxe-column>
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
          <template v-if="btnHandleMeth('is-active', row)">
            <vxe-button
              @click="btnHandleMeth('edit-save', row)"
              v-text="'保存'"
            />
            <vxe-button
              @click="btnHandleMeth('edit-cancel', row)"
              v-text="'取消'"
            />
          </template>
          <template v-else>
            <vxe-button @click="btnHandleMeth('edit', row)">编辑</vxe-button>
          </template>
        </template>
      </vxe-column>
    </vxe-table>
    <div class="text-right margin-top-10 margin-right-10">
      <vxe-button @click="cancelMeth()">关闭</vxe-button>
    </div>
  </vxe-modal>
</template>

<script lang="ts">
import { reactive, toRefs, ref, onMounted } from "vue";
import QuickNav from "../../../api/quicknav";
import { VxeFormEvents, VxeTableInstance } from "vxe-table";
import { message as Message } from "ant-design-vue";
export default {
  props: {
    isQuickTypeAdd: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["callBack"],
  setup(props, { emit }) {
    const xForm = ref({});
    const xTable = ref({} as VxeTableInstance);
    const quickTypeFormRef = ref();

    const modalInfo = reactive({
      rules: {
        name: [{ required: true, message: "请输入导航名称" }],
      },
      submitForm: {
        name: "",
      },
    });

    const tableInfo = reactive({
      loading: false,
      dataSource: [],
    });

    const cancelMeth = () => {
      emit("callBack", "add-type");
    };

    const submitHandleMeth: VxeFormEvents.Submit = () => {
      QuickNav.addQuickTypeOneApi(modalInfo.submitForm).then((res) => {
        modalInfo.submitForm.name = "";
        Message.success("添加成功");
        getTableListMeth();
      });
    };

    const getTableListMeth = () => {
      tableInfo.loading = true;
      QuickNav.list().then((res: CallBack.Response) => {
        tableInfo.dataSource = res.data;
        tableInfo.loading = false;
      });
    };

    // 按钮统一入口
    const btnHandleMeth = (type: string, item: any) => {
      const $table = xTable.value;
      if (type == "del") {
        QuickNav.delQuickTypeOne(item.id).then((res: CallBack.Response) => {
          Message.success("删除成功");
          getTableListMeth();
        });
      } else if (type == "is-active") {
        return $table.isActiveByRow(item);
      } else if (type == "edit") {
        // 编辑按钮
        $table.setActiveRow(item);
      } else if (type == "edit-save") {
        // 修改-保存按钮
        $table.clearActived().then(() => {
          QuickNav.updateTypeOne(item).then((res: CallBack.Response) => {
            Message.success("修改成功");
            getTableListMeth();
          });
        });
      } else if (type == "edit-cancel") {
        // 取消按钮
        $table.clearActived().then(() => {
          $table.revertData(item);
        });
      }
    };

    onMounted(() => {
      getTableListMeth();
    });

    return {
      xForm,
      xTable,
      quickTypeFormRef,
      ...toRefs(modalInfo),
      cancelMeth,
      ...toRefs(tableInfo),
      submitHandleMeth,
      btnHandleMeth,
    };
  },
};
</script>