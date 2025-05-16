<template>
  <div class="common-layout">
    <el-container direction="horizontal" style="height: 100vh">
      <el-aside :width="'200px'" class="aside" style="transition: width 0.3s">
        <SideBar />
      </el-aside>

      <el-container style="flex: 1; overflow: hidden">
        <el-header class="header" height="60px">
          <Header />
        </el-header>

        <el-main class="main" style="overflow: auto"> <router-view /> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import SideBar from "./SideBar/index.vue";
import Header from "./Header/index.vue";
</script>

<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100vh;
}

.el-container {
  display: flex;
  flex: 1;
  height: 100%;
  min-height: 0;
}

.aside {
  background: #fff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.header {
  border-bottom: 1px solid #ebeef5;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.main {
  background: #f3f4f6;
  padding: 20px;
}
</style>
