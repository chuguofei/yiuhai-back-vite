<template>
  <div>
    <BaseTitle title="分类管理">
      <template v-slot:btn-group>
        <a-button type="primary" @click="btnHandleMeth('add')">添加分类</a-button>
      </template>
    </BaseTitle>

    <!-- table -->
    <a-table
      :columns="tableInfo.tableColumn"
      :data-source="tableInfo.tableData"
      :rowKey="(row) => row.id"
      :pagination="false"
      :loading="tableInfo.loading"
    >
      <template #id="{ text }">{{ text.id }}</template>
      <template #handle="{ record }">
        <a-button
          @click="btnHandleMeth('edit', record)"
          class="margin-right-5"
          type="primary"
          >修改</a-button
        >
        <a-popconfirm
          cancelText="取消"
          okText="确定"
          title="确定要删除该分类？"
          @confirm="delOneCategoryMeth(record.id)"
        >
          <a-button type="danger">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <div class="flex justify-end margin-top-5">
      <a-pagination
        show-size-changer
        :default-current="tableInfo.queryParams.current"
        :total="tableInfo.queryParams.total"
        :page-size="tableInfo.queryParams.size"
        @showSizeChange="onShowSizeChangeMeth"
        @change="onShowSizeChangeMeth"
      />
    </div>

    <!-- 添加 ｜ 修改 -->
    <a-modal v-model:visible="isAdd" title="添加菜单" @ok="submitHandle">
      <a-form ref="formRef" :model="CategoryInfo" :rules="rules">
        <a-form-item label="分类名称" name="categoryName">
          <a-input v-model:value="CategoryInfo.categoryName" placeholder="分类名称" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { message as Message } from "ant-design-vue";
import BaseTitle from "@/components/BaseTitle.vue";
import { RequestMethType } from "../struct/common/request-meth-type";
import { reactive, toRefs, ref, onMounted } from "vue";
import { cloneDeep } from "lodash-es";
// api
import Category from "@/api/category";
export default {
  components: { BaseTitle },
  setup() {
    const formRef = ref();
    let formState = reactive({
      title: "",
      // 表单提交的信息
      CategoryInfo: {
        id: null,
        categoryName: "",
      },
    });

    const rules = {
      categoryName: [
        { required: true, message: "请填写分类名称", trigger: "blur" },
        { min: 2, max: 10, message: "长度2-10个字符", trigger: "blur" },
      ],
    };

    const tableInfo = reactive({
      tableColumn: [
        {
          title: "Id",
          align: "center",
          key: "id",
          slots: { customRender: "id" },
        },
        {
          title: "分类名称",
          align: "center",
          key: "categoryName",
          dataIndex: "categoryName",
        },
        {
          title: "操作",
          key: "handle",
          width: 200,
          align: "center",
          slots: { customRender: "handle" },
        },
      ],
      loading: false,
      tableData: [],
      queryParams: {
        total: 0,
        current: 0,
        size: 10,
      },
    });

    const flagVisible = reactive({
      isAdd: false,
    });

    // method
    const submitHandle = () => {
      formRef.value
        .validate()
        .then(() => {
          let methods_type = !!!formState.CategoryInfo.id
            ? RequestMethType.Add
            : RequestMethType.Edit;
          Category.addOneOrEditCategoryApi(methods_type, formState.CategoryInfo).then(
            (res: any) => {
              formRef.value.resetFields();
              flagVisible.isAdd = false;
              initListDataMeth();
              Message.success(
                `${methods_type == RequestMethType.Add ? "添加" : "修改"}成功`
              );
            }
          );
        })
        .catch((error: any) => {});
    };

    // 统一按钮点击
    const btnHandleMeth = (type: string, rowItem?: any) => {
      resetFormMeth();
      if (type == "add") {
        formState.title = "添加分类";
        flagVisible.isAdd = true;
      } else if (type == "edit") {
        formState.CategoryInfo = cloneDeep(rowItem);
        formState.title = "修改分类";
        flagVisible.isAdd = true;
      }
    };

    // 获取列表数据
    const onShowSizeChangeMeth = (current: number, pageSize: number) => {
      tableInfo.queryParams.current = current;
      tableInfo.queryParams.size = pageSize;
      initListDataMeth();
    };
    const initListDataMeth = () => {
      tableInfo.loading = true;
      Category.getCategoryListApi(tableInfo.queryParams).then(
        (res: CallBack.ResponseTable) => {
          tableInfo.loading = false;
          tableInfo.tableData = res.data.records as any;
          tableInfo.queryParams.total = res.data.total;
        }
      );
    };

    // 删除
    const delOneCategoryMeth = (id: number) => {
      Category.delOneCategoryApi(id).then((res: CallBack.Response) => {
        initListDataMeth();
        Message.success("删除成功");
      });
    };

    // 重置表单
    const resetFormMeth = () => {
      formState.CategoryInfo = {
        id: null,
        categoryName: "",
      };
    };

    // hook
    onMounted(() => {
      initListDataMeth();
    });

    // method export
    const Method = {
      onShowSizeChangeMeth,
      btnHandleMeth,
      submitHandle,
      delOneCategoryMeth,
    };

    return {
      ...toRefs(flagVisible),
      formRef,
      ...toRefs(formState),
      rules,
      tableInfo,
      ...Method,
    };
  },
};
</script>

<style></style>
