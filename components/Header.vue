<template>
  <a-layout-header class="header">
    <div class="logo" />
    <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
      <a-menu-item key="1"> Home </a-menu-item>
      <a-menu-item key="2"> Nav 2 </a-menu-item>
      <a-menu-item key="3"> Nav 3 </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  z-index: 1;
  width: 100%;
}
</style>