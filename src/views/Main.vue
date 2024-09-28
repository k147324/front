<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <navHeader />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import navHeader from "../components/navHeader.vue";
</script>
<style lang="less" scoped>
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
</style>
