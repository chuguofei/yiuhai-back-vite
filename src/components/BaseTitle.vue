<template>
  <div class="base-title-view">
      <div class="flex justify-end align-center font-bold padding-left-5"  v-text="title"></div>
      <div class="flex-1"></div>
      <div>
         <slot name="btn-group"></slot>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props:{
    title:{
      type:String,
      default:"",
    }
  },
  setup(props) {
    
  }
});
</script>

<style lang="scss">
.base-title-view{
    width: 100%;
    min-height: 30px;
    border-left:3px #3498db solid;
    display: flex;
    justify-content: space-between;
}
</style>