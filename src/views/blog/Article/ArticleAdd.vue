<template>
  <BaseTitle title="添加文章">
    <template v-slot:btn-group>
      <a-button class="margin-right-10" @click="backListMeth()">返回</a-button>
      <a-button type="primary" @click="submitHandle()">提交</a-button>
    </template>
  </BaseTitle>
  <div class="article-view-box">
    <a-form ref="formRef" :model="formState" :wrapper-col="{ span: 20 }">
      <a-form-item label="文章标题" name="articleTitle">
        <a-input v-model:value="formState.data.articleTitle" allowClear />
      </a-form-item>
      <a-form-item label="封面图片" name="articleImg">
        <a-upload
          class="article-uploader"
          list-type="picture"
          :multiple="false"
          :beforeUpload="beforeUploadMeth"
          :customRequest="handleChangeMeth"
          :show-upload-list="false"
        >
          <img
            class="img"
            v-if="formState.data.articleImg"
            :src="formState.data.articleImg"
            alt="avatar"
          />
          <div v-else class="upload-box">
            <loading-outlined v-if="visibleState.uploadLoading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
        <a-input v-model:value="formState.data.articleImg" />
      </a-form-item>
      <a-form-item label="文章说明" name="articleExplain">
        <a-textarea
          v-model:value="formState.data.articleExplain"
          placeholder="请输入文章说明"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          allowClear
        />
      </a-form-item>
      <a-form-item label="文章标签" name="articleTags">
        <div
          class="chip inline-block article-tag margin-right-5"
          v-for="(item, index) in formState.data.articleTags"
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
          >添加标签
        </a-button>
      </a-form-item>
      <a-form-item>
        <div class="radio-group margin-right-10 inline-block" name="isTop">
          <span class="margin-right-10">是否<span class="font-red">置顶</span>：</span>
          <a-radio-group v-model:value="formState.data.isTop">
            <a-radio :value="false">否</a-radio>
            <a-radio :value="true">是</a-radio>
          </a-radio-group>
        </div>

        <div class="radio-group margin-right-10 inline-block" name="isPrivate">
          <span class="margin-right-10">是否<span class="font-red">私密</span>：</span>
          <a-radio-group v-model:value="formState.data.isPrivate">
            <a-radio :value="false">否</a-radio>
            <a-radio :value="true">是</a-radio>
          </a-radio-group>
        </div>

        <div class="radio-group margin-right-10 inline-block" name="isExternalLink">
          <span class="margin-right-10">是否<span class="font-red">外链</span>：</span>
          <a-radio-group
            v-model:value="formState.data.isExternalLink"
            @change="radioSwitchMeth('isExternalLink')"
          >
            <a-radio :value="false">否</a-radio>
            <a-radio :value="true">是</a-radio>
          </a-radio-group>
        </div>

        <div class="radio-group margin-right-10 inline-block" name="isRelease">
          <span class="margin-right-10">是否<span class="font-red">发布</span>：</span>
          <a-radio-group v-model:value="formState.data.isRelease">
            <a-radio :value="false">否</a-radio>
            <a-radio :value="true">是</a-radio>
          </a-radio-group>
        </div>
      </a-form-item>
      <a-form-item
        label="外链地址"
        v-if="formState.data.isExternalLink == true"
        name="externalLinkUrl"
      >
        <a-input v-model:value="formState.data.externalLinkUrl" allowClear />
      </a-form-item>
      <a-form-item label="文章分类" name="articleCategoryId">
        <a-select
          v-model:value="formState.data.articleCategoryId"
          ref="select"
          allowClear
        >
          <a-select-option v-for="item in categoryOptions" :key="item.id" :value="item.id"
            >{{ item.categoryName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="文章MD" name="articleContent">
        <!-- 写md组件 -->
        <v-md-editor
          @save="editorSaveMeth"
          @change="editorChangeMeth"
          v-model="formState.data.articleContent"
          :disabled-menus="[]"
          @upload-image="mkdownImgUploadMeth"
          height="500px"
        ></v-md-editor>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from "vue";
import { uuid } from "vue-uuid";
import { cloneDeep, debounce, chunk } from "lodash-es";
import BaseTitle from "/@/components/BaseTitle.vue";
import { message as Message } from "ant-design-vue";
import {
  CloseOutlined,
  UploadOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
// api
import Aritcle from "/@/api/blogaritcle";
import Category from "/@/api/blog/category.ts";
import Base from "../../../api/base.ts";

export default defineComponent({
  components: { BaseTitle, CloseOutlined, UploadOutlined, PlusOutlined, LoadingOutlined },
  props: {
    isAdd: Boolean,
  },
  emits: ["CallBack"],
  setup(props, { emit }) {
    const formState = reactive({
      data: {
        id: null,
        articleTitle: "",
        articleExplain: "",
        articleTags: [],
        articleCategoryId: null,
        articleContent: "",
        // articleImg: "https://gf-oss.oss-cn-beijing.aliyuncs.com/2021-07-06/2fbe77b0-de00-11eb-8f6f-cd7dfc059672.jpeg",
        articleImg: "",
        isTop: false,
        isPrivate: false,
        isExternalLink: false,
        externalLinkUrl: "",
        isRelease: true,
      },
    });

    const formTagInput = ref<string>("");

    // 显示隐藏
    const visibleState = reactive({
      uploadLoading: false, // 是否在上传中
    });

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

    const formParentMeth = (rowItem: any) => {
      const row = cloneDeep(rowItem);
      formState.data = row;
      formState.data.articleTags = row.articleTags.split("|");
    };

    // 添加标签
    const addTagMeth = () => {
      if (formTagInput.value.length == 0) {
        Message.error("请输入标签");
        return;
      }
      if (formState.data.articleTags.includes(formTagInput.value)) {
        Message.error("该标签已存在");
        return;
      }
      formState.data.articleTags.push(formTagInput.value);
      formTagInput.value = "";
    };

    // 删除标签
    const removeOneTagMeth = (index: number) => {
      formState.data.articleTags.splice(index, 1);
    };

    // 单选按钮切换
    const radioSwitchMeth = (name: string) => {
      if (name == "isExternalLink") {
        if (formState.data.isExternalLink == true) {
          formState.data.externalLinkUrl = ""; // 清空外链链接
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
      return isJpgOrPng && isLt2M;
    };

    // 文章封面图片上传
    const handleChangeMeth = (file: any) => {
      visibleState.uploadLoading = true;
      const _uuid = uuid.v1();
      const imgItem = {
        name: _uuid,
        status: "uploading",
        url: "",
        percent: 99,
      };
      fileList.value = [imgItem];
      Base.ImageCompressor(file.file, false).then((res: any) => {
        Message.success("上传成功");
        const imgItem = {
          uid: _uuid,
          name: _uuid,
          status: "done",
          url: res,
          percent: 100,
        };
        formState.data.articleImg = res;
        fileList.value = [imgItem];
        visibleState.uploadLoading = false;
      });
    };

    const mkdownImgUploadMeth = (event: any, insertImage: any, file: Array<File>) => {
      Base.ImageCompressor(file[0], true).then((img_url: String) => {
        console.log(img_url);
        insertImage({
          url: img_url,
          desc: "输入一段描述",
        });
      });
    };

    // 返回列表
    const backListMeth = () => {
      emit("CallBack", false);
    };

    // 提交
    const formRef = ref();
    const submitHandle = () => {
      // 文章标签
      const _articleTags = formState.data.articleTags.join(",");
      const submitForm = {
        id: formState.data.id,
        articleTitle: formState.data.articleTitle,
        articleExplain: formState.data.articleExplain,
        articleTags: _articleTags,
        articleCategoryId: formState.data.articleCategoryId,
        articleContent: formState.data.articleContent,
        articleImg: formState.data.articleImg,
        isTop: formState.data.isTop,
        isPrivate: formState.data.isPrivate,
        isExternalLink: formState.data.isExternalLink,
        externalLinkUrl: formState.data.externalLinkUrl,
        isRelease: formState.data.isRelease,
      };
      if (!!!formState.data.id) {
        // 添加
        Aritcle.addOneAritcleApi(submitForm).then((result: CallBack.Response) => {
          Message.success(result.msg);
          formRef.value.resetFields();
          backListMeth();
        });
      } else {
        // 修改
        Aritcle.editOneAritcleApi(submitForm).then((result: CallBack.Response) => {
          Message.success(result.msg);
          formRef.value.resetFields();
          backListMeth();
        });
      }
    };

    /**
     * @description 保存文章，防抖操作
     */
    const editorSaveMeth = debounce((text: any, html: any) => {
      const submitForm = {
        id: formState.data.id,
        articleContent: formState.data.articleContent,
      };
      Aritcle.saveAritcleContentApi(submitForm).then((result: CallBack.Response) => {
        Message.success("保存成功");
      });
    }, 500);

    const editorChangeMeth = (text: any, html: any) => {
      // 实时跟新
      // console.log(text, html);
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
      mkdownImgUploadMeth, // makedown 上传图片
      formParentMeth,
      editorSaveMeth, // 编辑器保存
      editorChangeMeth, // 编辑器更改
    };

    const States = {
      formState,
      visibleState,
      formTagInput,
    };

    return { formRef, fileList, ...toRefs(selectOptionsState), ...States, ...Method };
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

  .article-uploader {
    .img {
      width: 128px !important;
      height: 128px !important;
    }

    .ant-upload-select {
      overflow: hidden;
      border: 1px #999 dashed;
      width: 128px !important;
      height: 128px !important;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        border-color: #1890ff;
      }

      .upload-box {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .ant-upload-text {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
