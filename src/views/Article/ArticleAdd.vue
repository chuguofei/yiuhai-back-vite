<template>
  <BaseTitle title="添加文章">
    <template v-slot:btn-group>
      <a-button class="margin-right-10" @click="backListMeth()">返回</a-button>
      <a-button type="primary" @click="submitHandle()">提交</a-button>
    </template>
  </BaseTitle>
  <div class="article-view-box">
    <a-form ref="formRef" :model="formState" :wrapper-col="{ span: 20 }">
      <a-form-item label="文章标题">
        <a-input v-model:value="formState.articleTitle" allowClear />
      </a-form-item>
      <a-form-item label="选择封面图片">
        <a-upload
          list-type="picture"
          :multiple="false"
          :beforeUpload="beforeUploadMeth"
          :customRequest="handleChangeMeth"
          v-model:file-list="fileList"
        >
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
        <a-select v-model:value="formState.articleCategoryId" ref="select" allowClear>
          <a-select-option v-for="item in categoryOptions" :value="item.id">{{
            item.categoryName
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="文章MD"></a-form-item>
    </a-form>
    <!-- 写md组件 -->
    <v-md-editor v-model="formState.articleContent" height="500px"></v-md-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from "vue";
import { uuid } from "vue-uuid";
import BaseTitle from "@/components/BaseTitle.vue";
import { message as Message } from "ant-design-vue";

import { CloseOutlined, UploadOutlined } from "@ant-design/icons-vue";

// api
import Aritcle from "../../api/aritcle";
import Category from "@/api/category.ts";
import Base from "@/api/base.ts";
export default defineComponent({
  components: { BaseTitle, CloseOutlined, UploadOutlined },
  props: {
    isAdd: Boolean,
  },
  setup(props, ctx) {
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

    let formTagInput = ref<string>("");

    // 显示隐藏
    const visibleState = reactive({});

    /// options
    const selectOptionsState = reactive({
      categoryOptions: [],
    });

    // hook

    onMounted(() => {
      initDataMeth();
    });

    /// Method
    const initDataMeth = () => {
      Category.getAllListApi().then((res: any) => {
        selectOptionsState.categoryOptions = res.data;
      });
    };

    // 添加标签
    const addTagMeth = () => {
      if (formTagInput.value.length == 0) {
        Message.error("请输入标签");
        return;
      }
      if (formState.articleTags.includes(formTagInput.value)) {
        Message.error("该标签已存在");
        return;
      }
      formState.articleTags.push(formTagInput.value);
      formTagInput.value = "";
    };

    // 删除标签
    const removeOneTagMeth = (index: number) => {
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

    // 上传文件的列表
    const fileList = ref<any[]>([]);
    const beforeUploadMeth = (file: any) => {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        Message.error("不是图片类型");
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        Message.error("图片大小不能超过5M!");
      }
      if (fileList.value.length > 0) {
        Message.error("只能上传一张封面图!");
      }

      return isJpgOrPng && isLt2M && fileList.value.length < 1;
    };

    const handleChangeMeth = (file: any) => {
      const _uuid = uuid.v1();
      const imgItem = {
        name: _uuid,
        status: "uploading",
        url: "",
        percent: 99,
      };
      fileList.value = [imgItem];
      Base.ossUploadApi(file.file,_uuid).then((res: any) => {
        console.log(res);
        const imgItem = {
          uid: _uuid,
          name: _uuid,
          status: "done",
          url: res,
          percent: 100,
        };
        fileList.value = [imgItem];
      });
    };

    // 返回列表
    const backListMeth = () => {
      ctx.emit("CallBack", false);
    };

    // 提交
    const submitHandle = () => {
      const articleTags = formState.articleTags.join("|");
      Aritcle.addOneAritcle({
        articleTitle: formState.articleTitle,
        articleExplain: formState.articleExplain,
        articleTags,
        articleCategoryId: formState.articleCategoryId,
        articleContent: formState.articleContent,
        articleImg: formState.articleImg,
        isTop: formState.isTop,
        isPrivate: formState.isPrivate,
        isExternalLink: formState.isExternalLink,
        externalLinkUrl: formState.externalLinkUrl,
        isRelease: formState.isRelease,
      }).then((result) => {});
    };

    // 导出method
    const Method = {
      backListMeth,
      beforeUploadMeth,
      addTagMeth,
      removeOneTagMeth,
      radioSwitchMeth,
      submitHandle,
      handleChangeMeth, // 图片上传
    };

    const States = {
      formState,
      visibleState,
      formTagInput,
    };

    return { fileList, ...toRefs(selectOptionsState), ...States, ...Method };
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
// LTAI5tECiEF1XwR4g8UMT6Bc
// 4aMaR08nvFv31h38gyPvp7rsaacnuL
</style>
