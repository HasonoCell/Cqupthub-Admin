<template>
  <div class="header-container">
    <div class="left-content">
      <el-button link @click="$emit('toggle-collapse')">
        <el-icon :size="20">
          <component :is="isCollapse ? 'Expand' : 'Fold'" />
        </el-icon>
      </el-button>
    </div>

    <div class="right-content">
      <div class="user-info">
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <span class="username">Admin</span>
      </div>
      <el-button @click="handleLogout">退出登录</el-button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isCollapse: Boolean,
});

const handleLogout = () => {
  console.log("执行退出登录");
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  .left-content {
    display: flex;
    align-items: center;
  }

  .right-content {
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
