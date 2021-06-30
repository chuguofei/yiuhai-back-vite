<template>
  <div>
    <BaseTitle title="分类管理">
      <template v-slot:btn-group>
        <a-button type="primary" @click="isAdd = true">添加分类</a-button>
      </template>
    </BaseTitle>

    <a-modal v-model:visible="isAdd" title="添加菜单" @ok="submitHandle">
      <a-form ref="formRef" :model="formState" :rules="rules">
        <a-form-item label="分类名称" name="categoryName">
          <a-input v-model:value="formState.categoryName" placeholder="分类名称" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import BaseTitle from "@/components/BaseTitle.vue";
import { reactive, toRefs, ref } from "vue";
// api
import Category from "@/api/category";
export default {
  components: { BaseTitle },

  setup() {
    const formRef = ref();
    const formState = reactive({
      categoryName: "",
    });

    const rules = {
      categoryName: [
        { required: true, message: "请填写分类名称", trigger: "blur" },
        { min: 2, max: 10, message: "长度2-10个字符", trigger: "blur" },
      ],
    };

    const flagVisible = reactive({
      isAdd: false,
    });

    // method
    const submitHandle = () => {
      formRef.value
        .validate()
        .then(() => {
          Category.addOneCategoryApi(formState).then((res) => {
            formRef.value.resetFields();
            flagVisible.isAdd = false;
          });
        })
        .catch((error: any) => {});
    };

    return {
      ...toRefs(flagVisible),
      formRef,
      formState,
      rules,
      submitHandle,
    };
  },
};
</script>

<style></style>
