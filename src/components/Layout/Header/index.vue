<script setup>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  router.push("/login");
  ElMessage.success("退出成功");
};
</script>

<template>
  <div class="header-container">
    <div class="content">
      <el-button type="primary" color="#000" @click="handleLogout"
        >退出登录</el-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
