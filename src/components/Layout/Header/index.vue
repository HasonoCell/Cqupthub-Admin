<template>
  <div class="header-container">
    <div class="content">
      <div class="user-info">
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <span class="username">Admin</span>
      </div>
      <el-button color="#000" @click="handleLogout">退出登录</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../store';
import { ElMessage } from 'element-plus';

const userStore = useUserStore()
const router = useRouter()
const handleLogout = () => {
  userStore.removeToken()
  router.push('/login')
  ElMessage.success('退出成功')
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: end;
  align-items: center;
  height: 100%;
  width: 100%;

  .content {
    display: flex;
    gap: 10px;

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
