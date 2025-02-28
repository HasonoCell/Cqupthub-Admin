<template>
  <div
    class="sidebar-container"
    :style="{ width: isCollapse ? '64px' : '200px' }"
  >
    <div class="logo-wrapper">
      <div class="logo" :class="{ 'collapse-logo': isCollapse }">Logo</div>
    </div>

    <el-menu
      :collapse="isCollapse"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="#333"
      active-text-color="#409eff"
      router
    >
      <el-menu-item
        v-for="route in menuRoutes"
        :key="route.path"
        :index="route.path"
      >
        <el-icon>
          <component :is="route.meta.icon" />
        </el-icon>
        <template #title>
          <span>{{ route.meta.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";

defineProps({
  isCollapse: Boolean,
});

const router = useRouter();

const menuRoutes = computed(() => {
  const layoutRoute = router.options.routes.find(r => r.name === 'layout');
  return layoutRoute?.children?.filter(route => route.meta?.showInMenu) || [];
});
</script>

<style scoped>
.sidebar-container {
  height: 100%;
  transition: width 0.3s ease;
  overflow: hidden;
}

.logo-wrapper {
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px solid #e6e6e6;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
  transition: all 0.3s;
}

.collapse-logo {
  font-size: 24px;
  letter-spacing: 2px;
}

.el-menu {
  border-right: none;
}

.el-menu--collapse {
  :deep(.el-menu-item) {
    display: flex;
    justify-content: center;

    > span {
      display: none;
    }
    .el-icon {
      margin-right: 0 !important;
    }
  }
}

.el-menu-item {
  height: 56px;
  line-height: 56px;
  font-size: 14px;

  &:hover {
    background-color: #e6f7ff !important;
  }

  .el-icon {
    margin-right: 8px;
    font-size: 18px;
  }
}

.el-menu-item.is-active {
  background-color: #e6f7ff !important;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background-color: #409eff;
  }
}
</style>
