<template>
  <div class="base-title-view">
      <div></div>
      <div>
         <slot name="btn"></slot>
      </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.base-title-view{
    width: 100%;
    min-height: 30px;
    border: 1px red solid;
    border-left:3px #3498db solid;
    display: flex;
    justify-content: space-between;
}
</style>