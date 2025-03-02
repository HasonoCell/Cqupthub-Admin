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
      class="el-menu-vertical"
      background-color="#fff"
      text-color="#333"
      active-text-color="#fff"
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
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

defineProps({
  isCollapse: Boolean,
});

const router = useRouter();
const route = useRoute();

const menuRoutes = computed(() => {
  return router.options.routes.filter((route) => route.meta?.showInMenu);
});
</script>

<style scoped lang="scss">
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
  transition: all 0.3s;
}

.collapse-logo {
  font-size: 24px;
  letter-spacing: 2px;
}

.el-menu {
  border-right: none;
}

::v-deep .el-menu--collapse .el-menu-item {
  display: flex;
  justify-content: center;

  > span {
    display: none;
  }

  .el-icon {
    margin-right: 0 !important;
  }
}

.el-menu-item {
  height: 56px;
  line-height: 56px;
  font-size: 14px;

  &:hover {
    background-color: #858484 !important;
    color: #ffffff !important;
  }

  .el-icon {
    margin-right: 8px;
    font-size: 18px;
  }
}

/* 激活项样式 */
.el-menu-item.is-active {
  background-color: #000000 !important;
  position: relative;
}
</style>
