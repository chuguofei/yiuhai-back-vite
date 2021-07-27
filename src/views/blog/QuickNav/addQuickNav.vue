<template>
  <vxe-modal v-model="open" :title="submitForm.id == null ? '新增导航':'修改导航'" width="1000" @hide="cancelMeth()">
    <vxe-form ref="xForm"  :rules="navNavRules" :data="submitForm" title-width="100" title-align="right">
      <vxe-form-item title="导航名称" field="name" :item-render="{}" span="12">
        <template #default="{ data }">
          <vxe-input v-model="data.name" placeholder="导航名称" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="导航链接" field="href" :item-render="{}" span="12">
        <template #default="{ data }">
          <vxe-input v-model="data.href" placeholder="导航链接" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="icon" field="icon" :item-render="{}" span="12">
        <template #default="{ data }">
          <vxe-input v-model="data.icon" placeholder="导航链接" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="导航类型" field="typeId" :item-render="{}" span="12">
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
      <vxe-button @click="submitHandleMeth">提交</vxe-button>
    </div>
  </vxe-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import QuickNavType from "/@/api/blog/quicknav-type";
import QuickNavController from "/@/api/blog/quicknav";
import { message as Message } from 'ant-design-vue';
// struct 
import { modalInfoStruct } from './struct/add-quick-nav';
// vxe-table

import { VxeFormMethods } from 'vxe-table'
export default {
  name: "addQuickNavComp",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:open","update:getListMeth"],
  setup(props, context) {
    const { emit } = context;
    const xForm = ref({} as VxeFormMethods);
    const cancelMeth = () => {
      emit("update:open", false);
    };

    const options = reactive({
      navTypeOptions: [],
    });

    onMounted(() => {
      getNavTypeOptions();
    });

    const modalInfo:modalInfoStruct = reactive({
      navNavRules:{
       name: [
          { required: true, message: '请输入导航名称' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ],
        icon: [
          { required: true, message: '请输入导航图标' },
        ],
        href: [
          { required: true, message: '请输入导航链接' },
        ],
        typeId: [
          { required: true, message: '请选择导航类型' },
        ],
      },
      submitForm: {
        id:null,
        name: "",
        icon: "",
        href: "",
        typeId: null,
      },
    });


    /**
     * @description 修改一行数据,从父组件ref过来
     */
    const formParentMeth = (rowItem: QuickNav.QuickNav)=>{
      modalInfo.submitForm.id = rowItem.id as number;
      modalInfo.submitForm.name = rowItem.name;
      modalInfo.submitForm.icon = rowItem.icon;
      modalInfo.submitForm.href = rowItem.href;
      modalInfo.submitForm.typeId = rowItem.navTypeId;
    }

    const getNavTypeOptions = () => {
      QuickNavType.list().then((res: CallBack.Response) => {
        options.navTypeOptions = res.data;
      });
    };

    // 提交
    const submitHandleMeth = () => {
      if(modalInfo.submitForm.id == null){
        QuickNavController.addQuickNavOneApi(modalInfo.submitForm).then(res=>{
          Message.success("添加成功");
          xForm.value.reset();
          emit("update:getListMeth");
          cancelMeth();
        })
      }else{
        QuickNavController.updateNavOne(modalInfo.submitForm).then(res=>{
          Message.success("修改成功");
          xForm.value.reset();
          emit("update:getListMeth");
          cancelMeth();
        })
      }
    };

   
    return {
      cancelMeth,
      xForm,
      ...toRefs(modalInfo),
      ...toRefs(options),
      submitHandleMeth,
      formParentMeth
    };
  },
};
</script>
