<template>
  <vxe-modal v-model="open" width="1000" :before-hide-method="cancelMeth">
    <vxe-form
      ref="xForm"
      :data="submitForm"
      :rules="rules"
      title-width="100"
      title-align="right"
    >
      <vxe-form-item title="导航名称" field="name" :item-render="{}" span="12">
        <template #default="{ data }">
          <vxe-input
            v-model="data.name"
            placeholder="导航名称"
            clearable
          ></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="导航类型" field="icon" :item-render="{}" span="12">
        <template #default="{ data }">
          <vxe-input
            v-model="data.icon"
            placeholder="导航类型"
            clearable
          ></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="导航链接" field="href" :item-render="{}" span="12">
        <template #default="{ data }">
          <vxe-input
            v-model="data.href"
            placeholder="导航链接"
            clearable
          ></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="名称" field="type" :item-render="{}" span="12">
        <template #default="{ data }">
          <vxe-select v-model="data.typeId"> </vxe-select>
        </template>
      </vxe-form-item>
    </vxe-form>
    <div class="text-right">
      <vxe-button>提交</vxe-button>
    </div>
  </vxe-modal>
</template>


<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default {
  name: "addQuickNavComp",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:open"],
  setup(props, context) {
    const { emit } = context;
    const cancelMeth = () => {
      emit("update:open", false);
    };

    const modalInfo = reactive({
      submitForm: {
        name: "",
        icon: "",
        href: "",
        typeId: null,
      },
    });

    return {
      cancelMeth,
      ...toRefs(modalInfo),
    };
  },
};
</script>
