<template>
  <a-dropdown>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <template v-for="(item, index) in menuList">
          <a-menu-item
            v-if="index != menuList.length"
            :key="item.key"
            v-text="item.title"
          >
          </a-menu-item>
        </template>
      </a-menu>
    </template>
    <a-button>
      {{ userStore.getUserName }}
      <DownOutlined />
    </a-button>
  </a-dropdown>
</template>

<script>
import { defineComponent, ref } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { sysUserStore } from "/@/store/modules/sys-user";
import LoginContrller from "/@/api/system/login";
import { useRouter } from "vue-router";
export default defineComponent({
  components: { DownOutlined },
  setup() {
    const router = useRouter();
    // store
    const menuList = ref([
      {
        key: "aboutme",
        title: "我的",
      },
      {
        key: "logout",
        title: "登出",
      },
    ]);
    const userStore = sysUserStore();

    const handleMenuClick = (event) => {
      if (event.key == "aboutme") {
      } else if (event.key == "logout") {
        // 登出
        userStore.USER_LOGOUT();
      }
    };

    return {
      userStore,
      menuList,
      handleMenuClick,
    };
  },
});
</script>
