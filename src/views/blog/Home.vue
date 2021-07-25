<template>
  <button @click="add()">添加</button>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      {{ item.name }}
      <input v-model="item.value" />
      <button @click="del(index)">删除</button>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, name: "张三1", value: "" },
        { id: 2, name: "张三2", value: "" },
        { id: 3, name: "张三3", value: "" },
        { id: 4, name: "张三4", value: "" },
      ],
    };
  },
  methods: {
    del(index) {
      this.list.splice(index, 1);
    },
    add() {
      let name_ = this.list.length;
      this.list.push({ id: null, name: `张三${name_}`, value: "" });
    },
  },
};
</script>

<style></style>
