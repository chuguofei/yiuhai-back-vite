<template>
  <a-menu mode="inline">
    <template v-for="item in menuBarArr" :key="item.router">
      <a-sub-menu v-if="item.children">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>{{ item.label }}</template>
        <a-menu-item :key="_children.router" v-for="_children in item.children">
          <router-link :to="_children.router">
            {{ _children.label }}
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else>
        <template #icon>
          <MailOutlined />
        </template>
        <router-link :to="item.router">
          {{ item.label }}
        </router-link>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { MailOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: { MailOutlined },
  props: {
    menuBarArr: {
      type: Array,
      default: () => [],
    },
  },
  setup() {},
});
</script>
