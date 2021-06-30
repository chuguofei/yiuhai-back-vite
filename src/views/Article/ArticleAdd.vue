<template>
  <div class="article-view-box">
   <div>
       <a-button class="margin-right-10" @click="backListMeth()">返回</a-button>
       <a-button  type="primary" @click="backListMeth()">提交</a-button>
   </div>
    <a-form ref="formRef" :model="formState" :wrapper-col="{ span: 24 }">
      <a-form-item label="文章标题">
        <a-input v-model:value="formState.articleTitle" allowClear />
      </a-form-item>
      <a-form-item label="选择封面图片">
        <a-upload list-type="picture" :multiple="false" :customRequest="handleChangeMeth" :before-upload="beforeUploadMeth"  v-model:file-list="fileList">
          <a-button><upload-outlined></upload-outlined>选择封面图片</a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="文章说明">
        <a-textarea
          v-model:value="formState.articleExplain"
          placeholder="请输入文章说明"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          allowClear
        />
      </a-form-item>

      <a-form-item label="文章标签">
        <div
          class="chip inline-block article-tag margin-right-5"
          v-for="(item, index) in formState.articleTags"
          :key="index"
        >
          <span>{{ item }}</span>
          <a-popconfirm
            title="确定要删除该标签？"
            ok-text="确定"
            cancel-text="关闭"
            @confirm="removeOneTagMeth(index)"
          >
            <CloseOutlined />
          </a-popconfirm>
        </div>
        <a-input v-model:value="formTagInput" />
        <a-button class="margin-right-10" type="dashed" @click="addTagMeth()"
          >添加标签</a-button
        >
      </a-form-item>
      <a-form-item>
        <div class="radio-group margin-right-10 inline-block">
          <span class="margin-right-10">是否<span class="font-red">置顶</span>：</span>
          <a-radio-group v-model:value="formState.isTop">
            <a-radio :value="false">否</a-radio>
            <a-radio :value="true">是</a-radio>
          </a-radio-group>
        </div>

        <div class="radio-group margin-right-10 inline-block">
          <span class="margin-right-10">是否<span class="font-red">私密</span>：</span>
          <a-radio-group v-model:value="formState.isPrivate">
            <a-radio :value="false">否</a-radio>
            <a-radio :value="true">是</a-radio>
          </a-radio-group>
        </div>

        <div class="radio-group margin-right-10 inline-block">
          <span class="margin-right-10">是否<span class="font-red">外链</span>：</span>
          <a-radio-group
            v-model:value="formState.isExternalLink"
            @change="radioSwitchMeth('isExternalLink')"
          >
            <a-radio :value="false">否</a-radio>
            <a-radio :value="true">是</a-radio>
          </a-radio-group>
        </div>

        <div class="radio-group margin-right-10 inline-block">
          <span class="margin-right-10">是否<span class="font-red">发布</span>：</span>
          <a-radio-group v-model:value="formState.isRelease">
            <a-radio :value="false">否</a-radio>
            <a-radio :value="true">是</a-radio>
          </a-radio-group>
        </div>
      </a-form-item>
      <a-form-item label="外链地址" v-if="formState.isExternalLink == true">
        <a-input v-model:value="formState.externalLinkUrl" allowClear />
      </a-form-item>
      <a-form-item label="文章分类">
        <a-select v-model:value="formState.articleCategoryId" ref="select">
          <a-select-option value="">Java</a-select-option>
          <a-select-option value="">Vue</a-select-option>
          <a-select-option value="">React</a-select-option>
          <a-select-option value="">全站</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="文章MD"></a-form-item>
    </a-form>
    <!-- 写md组件 -->
    <v-md-editor v-model="formState.articleContent" height="500px"></v-md-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import BaseTitle from "@/components/BaseTitle.vue";
import { message as Message } from "ant-design-vue";

import { CloseOutlined, UploadOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: { BaseTitle, CloseOutlined, UploadOutlined },
  props:{
    isAdd:Boolean
  },
  setup(props,ctx) {
    const formState = reactive({
      articleTitle: "",
      articleExplain: "",
      articleTags: [],
      articleCategoryId: null,
      articleContent: "",
      articleImg: "",
      isTop: false,
      isPrivate: false,
      isExternalLink: false,
      externalLinkUrl: "",
      isRelease: true,
    });

    let formTagInput = ref("");

    // 显示隐藏
    const visibleState = reactive({});

    /// Method

    // 添加标签
    const addTagMeth = () => {
      if (formTagInput.value.length == 0) {
        Message.error("请输入标签");
        return;
      }
      formState.articleTags.push(formTagInput.value);
      formTagInput.value = "";
    };

    // 删除标签
    const removeOneTagMeth = (index: number) => {
      console.log(index);
      formState.articleTags.splice(index, 1);
    };

    // 单选按钮切换
    const radioSwitchMeth = (name: string) => {
      if (name == "isExternalLink") {
        if (formState.isExternalLink == true) {
          formState.externalLinkUrl = ""; // 清空外链链接
        }
      }
    };

    interface FileItem {
        uid: string;
        name?: string;
        status?: string;
        response?: string;
        url?: string;
        preview?: string;
        originFileObj?: any;
        file: string | Blob;
    }
    // 上传文件的列表
    const fileList = ref<FileItem[]>([]);
    const beforeUploadMeth = (file: FileItem) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        Message.error('不是图片类型');
        return true;
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        Message.error('图片大小不能超过5M!');
        return true;
      }
      if(fileList.value.length > 0){
        Message.error('只能上传一张封面图!');
        return true;
      }

      fileList.value = [...fileList.value, file];
      return false;
    };
    // 上传封面图方法
    const handleChangeMeth = () => {
      console.log(fileList.value)
      // let fileList = [...info.fileList];
      // let file = fileList[0].originFileObj
      // // 开始上传
      // const formData = new FormData();
      // formData.append("file", file);
      // 开始上传 axios
    };

    // 返回列表
    const backListMeth = ()=>{
      ctx.emit("CallBack", false)
    }

    // 导出method
    const Method = { backListMeth , beforeUploadMeth, handleChangeMeth, addTagMeth, removeOneTagMeth, radioSwitchMeth };

    return { fileList,formState, visibleState, formTagInput, ...Method };
  },
});
</script>

<style scope lang="scss">
.article-view-box {
  padding: 10px 20px;

  .article-tag {
    border: 1px #666 solid;
    color: #666;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    span {
      margin-right: 5px;
    }
  }

  .radio-group {
    border: 1px #999 dashed;
    padding: 0 15px;
    border-radius: 5px;
  }
}
</style>
