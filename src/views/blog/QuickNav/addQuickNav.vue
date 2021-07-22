<template>
  <vxe-modal v-model="open" width="1000" :before-hide-method="cancelMeth">
    <vxe-form ref="xForm" :data="submitForm" title-width="100" title-align="right">
      <vxe-form-item title="导航名称" :item-render="{}" span="12">
        <template #default="{ data }">
          <vxe-input v-model="data.name" placeholder="导航名称" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="导航链接" :item-render="{}" span="12">
        <template #default="{ data }">
          <vxe-input v-model="data.href" placeholder="导航链接" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="icon" :item-render="{}" span="12">
        <template #default="{ data }">
          <vxe-input v-model="data.icon" placeholder="导航链接" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="导航类型" :item-render="{}" span="12">
        <template #default="{ data }">
          <vxe-select v-model="data.typeId" placeholder="默认尺寸">
            <vxe-option
              v-for="item in navTypeOptions"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></vxe-option>
          </vxe-select>
        </template>
      </vxe-form-item>
    </vxe-form>
    <div class="text-right">
      <vxe-button>提交</vxe-button>
    </div>
  </vxe-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import QuickNavType from "../../../api/quicknav-type";

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

    const options = reactive({
      navTypeOptions: [],
    });

    onMounted(() => {
      getNavTypeOptions();
    });

    const modalInfo = reactive({
      submitForm: {
        name: "",
        icon: "",
        href: "",
        typeId: null,
      },
    });

    const getNavTypeOptions = () => {
      QuickNavType.list().then((res: CallBack.Response) => {
        options.navTypeOptions = res.data;
      });
    };

    // 提交
    const submitHandleMeth = () => {};

    return {
      cancelMeth,
      ...toRefs(modalInfo),
      ...toRefs(options),
    };
  },
};
</script>
